import type { Annotation, InstrucktConfig, PendingAnnotation } from './types'
import { InstrucktApi } from './api'
import type { AnnotationPayload } from './api'
import { Toolbar } from './ui/toolbar'
import { ElementHighlight } from './ui/highlight'
import { AnnotationPopup, screenshotUrl } from './ui/popup'
import { AnnotationMarkers } from './ui/markers'
import { ListPanel } from './ui/list-panel'
import { TouchAim } from './ui/touch-aim'
import { injectGlobalStyles } from './ui/styles'
import { getElementSelector, getElementName, getElementLabel, getNearbyText, getCssClasses, getPageBoundingBox } from './selector'
import { captureElement, captureRegion, selectRegion, setPreferScreenCapture } from './ui/screenshot'
import { resolveElementInfo as resolveElementSource } from 'element-source'
import type { SourceFrame } from './types'
import * as livewireAdapter from './adapters/livewire'
import * as vueAdapter from './adapters/vue'
import * as svelteAdapter from './adapters/svelte'
import * as reactAdapter from './adapters/react'
import * as bladeAdapter from './adapters/blade'

// Re-export for api.ts consumers
export type { AnnotationPayload }

/** A v4 UUID. `crypto.randomUUID` exists only in secure contexts, and a phone opens a dev server over plain http. */
function newId(): string {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  const b = crypto.getRandomValues(new Uint8Array(16))
  b[6] = (b[6] & 0x0f) | 0x40
  b[8] = (b[8] & 0x3f) | 0x80
  const h = Array.from(b, x => x.toString(16).padStart(2, '0')).join('')
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`
}

/** Normalize URL to pathname for page-scoping (ignore query/hash) */
function pageKey(): string {
  return window.location.pathname
}

export class Instruckt {
  private config: Required<Pick<InstrucktConfig, 'endpoint' | 'theme' | 'position'>> & InstrucktConfig
  private api: InstrucktApi
  private toolbar: Toolbar | null = null
  private highlight: ElementHighlight | null = null
  private popup: AnnotationPopup | null = null
  private markers: AnnotationMarkers | null = null
  private listPanel: ListPanel | null = null
  private touchAim: TouchAim | null = null
  /** The kind of pointer behind the last press; a touch tap aims before it opens a note */
  private lastPointerType = 'mouse'
  private annotations: Annotation[] = []
  private isAnnotating = false
  private rafId: number | null = null
  private pendingMouseTarget: Element | null = null
  private highlightLocked = false
  private pollTimer: ReturnType<typeof setInterval> | null = null
  private initialLoadDone = false
  private hasBackend = false
  private boundKeydown: (e: KeyboardEvent) => void
  private boundReposition = (): void => {
    this.markers?.reposition(this.annotations)
  }

  constructor(config: InstrucktConfig) {
    this.config = {
      adapters: ['livewire', 'vue', 'svelte', 'react', 'blade'],
      theme: 'auto',
      position: 'bottom-right',
      ...config,
    }
    this.api = new InstrucktApi(config.endpoint)
    this.boundKeydown = this.onKeydown.bind(this)
    this.init()
  }

  private init(): void {
    injectGlobalStyles(this.config.colors)

    // Livewire / Flux use shadow DOM which breaks DOM-to-image screenshot libs.
    // When Livewire is detected, go straight to Screen Capture API.
    const adapters = this.config.adapters ?? []
    if (adapters.includes('livewire') && livewireAdapter.isAvailable()) {
      setPreferScreenCapture(true)
    }

    if (this.config.theme !== 'auto') {
      document.documentElement.setAttribute('data-instruckt-theme', this.config.theme)
    }

    this.toolbar = new Toolbar(this.config.position, {
      onToggleAnnotate: (active) => {
        this.setAnnotating(active)
      },
      onScreenshot: () => this.startRegionCapture(),
      onCopy: () => this.copyAnnotations(this.activeAnnotations(), true),
      onCopyAndClear: () => this.copyAndClear(),
      onToggleList: (open) => this.setListOpen(open),
      onClearPage: () => this.clearPage(),
      onClearAll: () => this.clearEverything(),
      onMinimize: (min) => this.onMinimize(min),
    }, this.config.keys, this.config.tools)

    this.highlight = new ElementHighlight()
    this.touchAim = this.makeTouchAim()
    this.popup = new AnnotationPopup()
    this.markers = new AnnotationMarkers((annotation) => this.onMarkerClick(annotation))
    this.listPanel = this.makeListPanel()
    if (this.toolbar.isMinimized()) this.markers.setVisible(false)

    document.addEventListener('keydown', this.boundKeydown)
    window.addEventListener('scroll', this.boundReposition, { passive: true })
    window.addEventListener('resize', this.boundReposition, { passive: true })

    // Survive SPA navigation across frameworks
    document.addEventListener('livewire:navigated', () => this.reattach())
    document.addEventListener('inertia:navigate', () => this.syncMarkers())
    window.addEventListener('popstate', () => {
      setTimeout(() => this.reattach(), 0)
    })

    // Load persisted annotations from the backend (async — calls syncMarkers when done)
    this.loadAnnotations()
  }

  private makeTouchAim(): TouchAim {
    return new TouchAim({
      highlight: (el) => {
        if (el) {
          this.highlight?.show(el, getElementLabel(el))
          this.highlightLocked = true
        } else {
          this.highlight?.hide()
          this.highlightLocked = false
        }
      },
      isOurs: (el) => this.isInstruckt(el),
      onAdd: (el) => {
        const r = el.getBoundingClientRect()
        this.openNoteFor(el, r.left + r.width / 2, r.top + r.height / 2)
      },
    })
  }

  private makeToolbarCallbacks() {
    return {
      onToggleAnnotate: (active: boolean) => {
        this.setAnnotating(active)
      },
      onScreenshot: () => this.startRegionCapture(),
      onCopy: () => this.copyAnnotations(this.activeAnnotations(), true),
      onCopyAndClear: () => this.copyAndClear(),
      onToggleList: (open: boolean) => this.setListOpen(open),
      onClearPage: () => this.clearPage(),
      onClearAll: () => this.clearEverything(),
      onMinimize: (min: boolean) => this.onMinimize(min),
    }
  }

  private makeListPanel(): ListPanel {
    return new ListPanel({
      annotations: () => this.activeAnnotations(),
      currentPage: () => pageKey(),
      pageOf: (a) => this.annotationPageKey(a),
      screenshotSrc: (a) => screenshotUrl(a.screenshot, this.config.endpoint),
      anchor: () => this.toolbar?.getListAnchor() ?? null,
      onHover: (a) => this.markers?.setHover(a?.id ?? null),
      onCopy: (list) => this.copyAnnotations(list, true),
      onDelete: (list) => this.deleteAnnotations(list),
      onSave: (a, comment) => this.saveComment(a, comment),
      onGoTo: (a) => this.goTo(a),
      onClose: () => this.toolbar?.setListActive(false),
    })
  }

  private setListOpen(open: boolean): void {
    if (open) this.listPanel?.open()
    else this.listPanel?.close()
    this.toolbar?.setListActive(open)
  }

  /** Bring an annotation into view: scroll to it on this page, or open its page. */
  private goTo(a: Annotation): void {
    if (this.annotationPageKey(a) !== pageKey()) {
      window.location.assign(a.url)
      return
    }
    let el: Element | null = null
    try { el = document.querySelector(a.elementPath) } catch { /* invalid selector */ }
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    else window.scrollTo({ top: Math.max(0, a.y - window.innerHeight / 2), behavior: 'smooth' })
    this.markers?.pulse(a.id)
  }

  private reattach(): void {
    const wasAnnotating = this.isAnnotating
    const wasListOpen = this.listPanel?.isOpen() ?? false
    const wasMinimized = this.toolbar?.isMinimized() ?? false

    // Detach current listeners before rebuilding
    if (this.isAnnotating) this.detachAnnotateListeners()
    this.isAnnotating = false

    // Remove any stale instruckt DOM (Livewire caches and restores old HTML on back nav)
    document.querySelectorAll('[data-instruckt]').forEach(el => el.remove())

    // Rebuild everything fresh
    this.toolbar = new Toolbar(this.config.position, this.makeToolbarCallbacks(), this.config.keys, this.config.tools)
    if (wasMinimized) this.toolbar.minimize()

    this.markers = new AnnotationMarkers((annotation) => this.onMarkerClick(annotation))
    this.highlight = new ElementHighlight()
    this.touchAim = this.makeTouchAim()
    this.listPanel = this.makeListPanel()

    if (wasMinimized) this.markers.setVisible(false)

    // Re-inject global styles (Livewire may have swapped <head> content)
    const existing = document.getElementById('instruckt-global')
    if (existing) existing.remove()
    injectGlobalStyles(this.config.colors)

    this.syncMarkers()

    // Restore active modes
    if (wasAnnotating && !wasMinimized) this.setAnnotating(true)
    if (wasListOpen && !wasMinimized) this.setListOpen(true)
  }

  // ── Minimize ────────────────────────────────────────────────────

  private onMinimize(minimized: boolean): void {
    if (minimized) {
      // Deactivate everything when minimized
      if (this.isAnnotating) this.setAnnotating(false)
      this.setListOpen(false)
      this.toolbar?.setAnnotateActive(false)
      this.markers?.setVisible(false)
      this.popup?.destroy()
    } else {
      // Show markers again when restored
      this.markers?.setVisible(true)
    }
  }

  // ── Persistence ─────────────────────────────────────────────────

  private static get STORAGE_KEY() {
    return `instruckt:${window.location.origin}:annotations`
  }

  private async loadAnnotations(): Promise<void> {
    // Always load localStorage first as baseline
    this.loadFromStorage()

    try {
      const remote = await this.api.getAnnotations()
      this.hasBackend = true
      // Merge: remote is source of truth, but keep any local-only annotations
      const remoteIds = new Set(remote.map(a => a.id))
      const localOnly = this.annotations.filter(a => !remoteIds.has(a.id))
      this.annotations = [...remote, ...localOnly]
      this.saveToStorage()
    } catch {
      // No backend — localStorage already loaded above
      this.hasBackend = false
    }
    this.initialLoadDone = true
    this.syncMarkers()
  }

  private saveToStorage(): void {
    try {
      // Store screenshot data URIs in IndexedDB to avoid blowing localStorage's ~5MB limit
      const screenshotMap = new Map<string, string>()
      const stripped = this.annotations.map(a => {
        if (a.screenshot?.startsWith('data:')) {
          screenshotMap.set(a.id, a.screenshot)
          return { ...a, screenshot: `idb:${a.id}` }
        }
        return a
      })
      localStorage.setItem(Instruckt.STORAGE_KEY, JSON.stringify(stripped))
      if (screenshotMap.size > 0) this.saveScreenshotsToIdb(screenshotMap)
    } catch { /* storage full or unavailable */ }
  }

  private loadFromStorage(): void {
    try {
      const raw = localStorage.getItem(Instruckt.STORAGE_KEY)
      if (raw) {
        this.annotations = JSON.parse(raw)
        // Restore screenshot data URIs from IndexedDB
        const idbRefs = this.annotations.filter(a => a.screenshot?.startsWith('idb:'))
        if (idbRefs.length > 0) this.loadScreenshotsFromIdb(idbRefs)
      }
    } catch { /* corrupt or unavailable */ }
  }

  private static readonly IDB_NAME = 'instruckt'
  private static readonly IDB_STORE = 'screenshots'

  private openIdb(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(Instruckt.IDB_NAME, 1)
      req.onupgradeneeded = () => {
        const db = req.result
        if (!db.objectStoreNames.contains(Instruckt.IDB_STORE)) {
          db.createObjectStore(Instruckt.IDB_STORE)
        }
      }
      req.onsuccess = () => resolve(req.result)
      req.onerror = () => reject(req.error)
    })
  }

  private async saveScreenshotsToIdb(screenshots: Map<string, string>): Promise<void> {
    try {
      const db = await this.openIdb()
      const tx = db.transaction(Instruckt.IDB_STORE, 'readwrite')
      const store = tx.objectStore(Instruckt.IDB_STORE)
      for (const [id, dataUri] of screenshots) {
        store.put(dataUri, id)
      }
      db.close()
    } catch { /* IndexedDB unavailable */ }
  }

  private async loadScreenshotsFromIdb(annotations: Annotation[]): Promise<void> {
    try {
      const db = await this.openIdb()
      const tx = db.transaction(Instruckt.IDB_STORE, 'readonly')
      const store = tx.objectStore(Instruckt.IDB_STORE)
      for (const a of annotations) {
        const id = a.screenshot!.replace('idb:', '')
        const req = store.get(id)
        req.onsuccess = () => {
          if (req.result) a.screenshot = req.result
        }
      }
      await new Promise<void>((resolve) => { tx.oncomplete = () => resolve() })
      db.close()
      this.syncMarkers()
    } catch { /* IndexedDB unavailable */ }
  }

  /** Start or stop polling based on whether there are active annotations */
  private updatePolling(): void {
    // Don't start polling until the initial backend fetch has completed —
    // stale localStorage may show phantom active annotations.
    if (!this.initialLoadDone) return

    const hasActive = this.totalActiveCount() > 0
    if (hasActive && !this.pollTimer) {
      this.pollTimer = setInterval(() => this.pollForChanges(), 3000)
    } else if (!hasActive && this.pollTimer) {
      clearInterval(this.pollTimer)
      this.pollTimer = null
    }
  }

  /** Poll API for status changes (e.g. agent resolved via MCP) */
  private async pollForChanges(): Promise<void> {
    try {
      const remote = await this.api.getAnnotations()
      let changed = false
      for (const r of remote) {
        const local = this.annotations.find(a => a.id === r.id)
        if (local && local.status !== r.status) {
          local.status = r.status
          local.resolvedAt = r.resolvedAt
          local.resolvedBy = r.resolvedBy
          changed = true
        }
      }
      if (changed) {
        this.saveToStorage()
      }
      // Always re-evaluate polling — even if no status changed, the active
      // count may have dropped to zero (e.g. after loadAnnotations merged).
      this.syncMarkers()
    } catch { /* no backend or network error — skip */ }
  }

  // ── Page-scoped markers ─────────────────────────────────────────

  private syncMarkers(): void {
    this.markers?.clear()
    const current = pageKey()
    let idx = 0
    for (const a of this.annotations) {
      if (a.status === 'resolved' || a.status === 'dismissed') continue
      if (this.annotationPageKey(a) === current) {
        idx++
        this.markers?.upsert(a, idx)
      }
    }
    this.toolbar?.setAnnotationCount(this.pageAnnotations().length)
    this.toolbar?.setTotalCount(this.totalActiveCount())
    this.listPanel?.refresh()
    this.updatePolling()
  }

  private annotationPageKey(a: Annotation): string {
    try {
      return new URL(a.url).pathname
    } catch {
      return a.url
    }
  }

  private pageAnnotations(): Annotation[] {
    const current = pageKey()
    return this.annotations.filter(a =>
      this.annotationPageKey(a) === current &&
      a.status !== 'resolved' && a.status !== 'dismissed'
    )
  }

  private activeAnnotations(): Annotation[] {
    return this.annotations.filter(a => a.status !== 'resolved' && a.status !== 'dismissed')
  }

  private totalActiveCount(): number {
    return this.activeAnnotations().length
  }

  // ── Annotate mode ─────────────────────────────────────────────

  private setAnnotating(active: boolean): void {
    this.isAnnotating = active
    this.toolbar?.setAnnotateActive(active)
    if (active) {
      this.attachAnnotateListeners()
    } else {
      this.detachAnnotateListeners()
      this.highlightLocked = false
      this.highlight?.hide()
      if (this.rafId !== null) { cancelAnimationFrame(this.rafId); this.rafId = null }
    }
  }

  // ── Event listeners ───────────────────────────────────────────

  private boundMouseMove = (e: MouseEvent): void => {
    if (this.highlightLocked) return
    this.pendingMouseTarget = e.target as Element
    if (this.rafId === null) {
      this.rafId = requestAnimationFrame(() => {
        this.rafId = null
        if (this.highlightLocked) return
        if (this.pendingMouseTarget && !this.isInstruckt(this.pendingMouseTarget)) {
          this.highlight?.show(this.pendingMouseTarget)
        } else {
          this.highlight?.hide()
        }
      })
    }
  }

  private boundMouseLeave = (): void => {
    if (this.highlightLocked) return
    this.highlight?.hide()
  }

  /** Block mousedown/pointerdown in annotation mode so SPA frameworks can't navigate */
  private boundAnnotateBlock = (e: Event): void => {
    if (e instanceof PointerEvent) this.lastPointerType = e.pointerType
    if (this.isInstruckt(e.target)) return
    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation()
  }

  private boundClick = (e: MouseEvent): void => {
    const target = e.target as Element
    if (this.isInstruckt(target)) return
    // Always block clicks in annotation mode — prevents SPA navigation
    // from changing the page before the user can finish their note.
    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation()

    // No hover on a touch screen: the first tap only aims, so the user can check it before the note opens
    const pointerType = (e as PointerEvent).pointerType || this.lastPointerType
    if (pointerType === 'touch' || pointerType === 'pen') {
      this.touchAim?.tap(target)
      return
    }
    this.openNoteFor(target, e.clientX, e.clientY)
  }

  private openNoteFor(target: Element, x: number, y: number): void {
    const selectedText = window.getSelection()?.toString().trim() || undefined
    const elementPath = getElementSelector(target)
    const elementName = getElementName(target)
    const elementLabel = getElementLabel(target)
    const cssClasses = getCssClasses(target)
    const nearbyText = getNearbyText(target) || undefined
    const boundingBox = getPageBoundingBox(target)

    this.highlight?.show(target)
    this.highlightLocked = true

    // Resolve framework context async (element-source returns Promises)
    this.detectFramework(target).then(framework => {
      const pending: PendingAnnotation = {
        element: target,
        elementPath,
        elementName,
        elementLabel,
        cssClasses,
        boundingBox,
        x,
        y,
        selectedText,
        nearbyText,
        framework: framework ?? undefined,
      }

      this.showAnnotationPopup(pending)
    })
  }

  private showAnnotationPopup(pending: PendingAnnotation): void {
    this.popup?.showNew(pending, {
      onSubmit: (result) => {
        this.touchAim?.done()
        this.highlightLocked = false
        this.highlight?.hide()
        this.submitAnnotation(pending, result.comment, result.screenshot)
      },
      onCancel: () => {
        this.touchAim?.done()
        this.highlightLocked = false
        this.highlight?.hide()
      },
    })
  }

  private attachAnnotateListeners(): void {
    document.addEventListener('mousemove', this.boundMouseMove)
    document.addEventListener('mouseleave', this.boundMouseLeave)
    // Block mousedown/pointerdown first — SPA frameworks (Livewire wire:navigate,
    // Inertia) intercept these before click fires
    for (const evt of ['mousedown', 'pointerdown'] as const) {
      window.addEventListener(evt, this.boundAnnotateBlock, true)
    }
    // Use window capture to fire before framework handlers on document
    window.addEventListener('click', this.boundClick, true)
    this.touchAim?.attach()
  }

  private detachAnnotateListeners(): void {
    document.removeEventListener('mousemove', this.boundMouseMove)
    document.removeEventListener('mouseleave', this.boundMouseLeave)
    for (const evt of ['mousedown', 'pointerdown'] as const) {
      window.removeEventListener(evt, this.boundAnnotateBlock, true)
    }
    window.removeEventListener('click', this.boundClick, true)
    this.touchAim?.detach()
  }

  private isInstruckt(el: EventTarget | null): boolean {
    if (!el || !(el instanceof Element)) return false
    return el.closest('[data-instruckt]') !== null
  }

  // ── Region screenshot ────────────────────────────────────────

  private async startRegionCapture(): Promise<void> {
    // Temporarily exit annotation mode so the crosshair doesn't interfere
    const wasAnnotating = this.isAnnotating
    if (wasAnnotating) this.setAnnotating(false)

    const rect = await selectRegion()
    if (!rect) {
      if (wasAnnotating) this.setAnnotating(true)
      return
    }

    const screenshot = await captureRegion(rect)
    if (!screenshot) {
      if (wasAnnotating) this.setAnnotating(true)
      return
    }

    // Find the element at the center of the selected region
    const centerX = rect.x + rect.width / 2
    const centerY = rect.y + rect.height / 2
    const target = document.elementFromPoint(centerX, centerY) ?? document.body

    const framework = await this.detectFramework(target)

    const pending: PendingAnnotation = {
      element: target,
      elementPath: getElementSelector(target),
      elementName: getElementName(target),
      elementLabel: getElementLabel(target),
      cssClasses: getCssClasses(target),
      boundingBox: getPageBoundingBox(target),
      x: centerX,
      y: centerY,
      nearbyText: getNearbyText(target) || undefined,
      screenshot,
      framework: framework ?? undefined,
    }

    this.showAnnotationPopup(pending)
  }

  // ── Framework detection ───────────────────────────────────────

  /**
   * Use element-source as the primary resolver for React/Vue/Svelte,
   * then layer our adapters on top for props/state/framework-specific metadata.
   * Livewire and Blade are handled by our adapters only (element-source doesn't support them).
   */
  private async detectFramework(el: Element) {
    const adapters = this.config.adapters ?? []

    // Livewire first — element-source doesn't handle it
    if (adapters.includes('livewire')) {
      const ctx = livewireAdapter.getContext(el)
      if (ctx) return ctx
    }

    // Try element-source for React/Vue/Svelte (gives us full component stack + precise source locations)
    const esAdapters = ['vue', 'svelte', 'react'] as const
    if (esAdapters.some(a => adapters.includes(a))) {
      try {
        const info = await resolveElementSource(el)
        if (info.source) {
          const stack: SourceFrame[] = info.stack.map(f => ({
            filePath: f.filePath,
            lineNumber: f.lineNumber,
            columnNumber: f.columnNumber,
            componentName: f.componentName,
          }))

          // Determine which framework this is from our adapters (for props/state)
          let adapterCtx = null
          if (adapters.includes('vue')) adapterCtx = vueAdapter.getContext(el)
          if (!adapterCtx && adapters.includes('svelte')) adapterCtx = svelteAdapter.getContext(el)
          if (!adapterCtx && adapters.includes('react')) adapterCtx = reactAdapter.getContext(el)

          // Merge: element-source provides source location + stack,
          // our adapter provides framework name, props/state, and framework-specific fields
          if (adapterCtx) {
            return {
              ...adapterCtx,
              component: info.componentName ?? adapterCtx.component,
              source_file: info.source.filePath,
              source_line: info.source.lineNumber ?? adapterCtx.source_line,
              source_column: info.source.columnNumber ?? undefined,
              component_stack: stack.length > 0 ? stack : undefined,
            }
          }

          // element-source resolved it but none of our adapters claimed it —
          // still return what we got (could be Solid or an unrecognized framework)
          return {
            framework: 'react' as const, // element-source defaults to React resolver
            component: info.componentName ?? 'Component',
            source_file: info.source.filePath,
            source_line: info.source.lineNumber ?? undefined,
            source_column: info.source.columnNumber ?? undefined,
            component_stack: stack.length > 0 ? stack : undefined,
          }
        }
      } catch {
        // element-source failed — fall through to our adapters
      }
    }

    // Fallback: use our adapters directly (no element-source enrichment)
    if (adapters.includes('vue')) {
      const ctx = vueAdapter.getContext(el)
      if (ctx) return ctx
    }
    if (adapters.includes('svelte')) {
      const ctx = svelteAdapter.getContext(el)
      if (ctx) return ctx
    }
    if (adapters.includes('react')) {
      const ctx = reactAdapter.getContext(el)
      if (ctx) return ctx
    }

    // Blade is last — fallback when no JS framework claims the element
    if (adapters.includes('blade')) {
      const ctx = bladeAdapter.getContext(el)
      if (ctx) return ctx
    }
    return null
  }

  // ── Submit ────────────────────────────────────────────────────

  private async submitAnnotation(pending: PendingAnnotation, comment: string, screenshot?: string): Promise<void> {
    const payload: AnnotationPayload = {
      x: (pending.x / window.innerWidth) * 100,
      y: pending.y + window.scrollY,
      comment,
      element: pending.elementName,
      elementPath: pending.elementPath,
      cssClasses: pending.cssClasses,
      boundingBox: pending.boundingBox,
      selectedText: pending.selectedText,
      nearbyText: pending.nearbyText,
      screenshot,
      intent: 'fix',
      severity: 'important',
      framework: pending.framework,
      url: window.location.href,
    }

    let annotation: Annotation
    try {
      annotation = await this.api.addAnnotation(payload)
    } catch {
      // No backend — create a local-only annotation
      annotation = {
        ...payload,
        id: newId(),
        status: 'pending',
        createdAt: new Date().toISOString(),
      }
    }
    this.annotations.push(annotation)
    this.saveToStorage()
    this.syncMarkers()
    this.config.onAnnotationAdd?.(annotation)
    // Auto-copy everything open; no execCommand fallback, it would steal focus from the page
    this.copyAnnotations(this.activeAnnotations(), false)
  }

  // ── Marker click — edit or delete ─────────────────────────────

  private onMarkerClick(annotation: Annotation): void {
    this.popup?.showEdit(annotation, {
      onSave: (a, newComment) => this.saveComment(a, newComment),
      onDelete: (a) => this.deleteAnnotations([a]),
    }, this.config.endpoint)
  }

  private async saveComment(a: Annotation, comment: string): Promise<void> {
    try {
      const updated = await this.api.updateAnnotation(a.id, { comment })
      this.onAnnotationUpdated(updated)
    } catch {
      // No backend: update locally
      this.onAnnotationUpdated({ ...a, comment, updatedAt: new Date().toISOString() })
    }
  }

  private onAnnotationUpdated(updated: Annotation): void {
    const idx = this.annotations.findIndex(a => a.id === updated.id)
    if (idx >= 0) {
      this.annotations[idx] = updated
    }
    this.saveToStorage()
    this.syncMarkers()
  }

  /** Dismiss on the backend (best effort) and drop locally. */
  private async deleteAnnotations(list: Annotation[]): Promise<void> {
    if (list.length === 0) return
    await Promise.all(list.map(a => this.api.updateAnnotation(a.id, { status: 'dismissed' }).catch(() => { /* no backend */ })))
    const ids = new Set(list.map(a => a.id))
    this.annotations = this.annotations.filter(a => !ids.has(a.id))
    this.saveToStorage()
    this.syncMarkers()
  }

  // ── Clear ───────────────────────────────────────────────────────

  private clearPage(): Promise<void> {
    return this.deleteAnnotations(this.pageAnnotations())
  }

  private clearEverything(): Promise<void> {
    return this.deleteAnnotations(this.activeAnnotations())
  }

  /** Copy every open annotation, and clear them only if the copy worked. */
  private async copyAndClear(): Promise<boolean> {
    const list = this.activeAnnotations()
    if (list.length === 0) return false
    const copied = await this.copyAnnotations(list, true)
    if (copied) await this.deleteAnnotations(list)
    return copied
  }

  // ── Keyboard ──────────────────────────────────────────────────

  private onKeydown(e: KeyboardEvent): void {
    if (this.toolbar?.isMinimized()) return
    const target = e.target as HTMLElement
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return
    if (target.closest('[contenteditable="true"]')) return
    // Shadow DOM retargets e.target to the host element — check if a popup is open
    if (this.isInstruckt(target)) return

    const keys = this.config.keys ?? {}
    const noMod = !e.metaKey && !e.ctrlKey && !e.altKey
    if (e.key === (keys.annotate ?? 'a') && noMod) {
      this.setAnnotating(!this.isAnnotating)
    }
    if (e.key === (keys.list ?? 'l') && noMod) {
      this.setListOpen(!(this.listPanel?.isOpen() ?? false))
    }
    if (e.key === (keys.screenshot ?? 'c') && noMod) {
      this.startRegionCapture()
    }
    if (e.key === (keys.clearPage ?? 'x') && noMod) {
      this.clearPage()
    }
    if (e.key === 'Escape') {
      if (this.isAnnotating) this.setAnnotating(false)
      if (this.listPanel?.isOpen()) this.setListOpen(false)
    }
  }

  // ── Copy / export ─────────────────────────────────────────────

  /** Copy annotations as markdown. With fallback=true, uses execCommand for non-secure contexts (user-initiated only). */
  private async copyAnnotations(list: Annotation[], fallback: boolean): Promise<boolean> {
    const md = this.exportMarkdown(list)
    if (window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(md)
        return true
      } catch { return false }
    }
    if (!fallback) return false
    try {
      const el = document.createElement('textarea')
      el.value = md
      el.readOnly = true
      // 16px stops iOS from zooming; setSelectionRange is what iOS Safari needs to select
      el.style.cssText = 'position:fixed;left:-9999px;top:0;font-size:16px'
      el.setAttribute('data-instruckt', 'copy')
      document.body.appendChild(el)
      el.select()
      el.setSelectionRange(0, md.length)
      const ok = document.execCommand('copy')
      el.remove()
      return ok
    } catch { return false }
  }

  exportMarkdown(list: Annotation[] = this.activeAnnotations()): string {
    const pending = list.filter(a => a.status !== 'resolved' && a.status !== 'dismissed')
    if (pending.length === 0) {
      return `# UI Feedback\n\nNo open annotations.`
    }

    // Group by page
    const byPage = new Map<string, Annotation[]>()
    for (const a of pending) {
      const key = this.annotationPageKey(a)
      if (!byPage.has(key)) byPage.set(key, [])
      byPage.get(key)!.push(a)
    }

    const multiPage = byPage.size > 1
    const lines: string[] = []

    if (multiPage) {
      lines.push(`# UI Feedback`)
      lines.push('')
    }

    for (const [path, annotations] of byPage) {
      if (multiPage) {
        lines.push(`## ${path}`)
      } else {
        lines.push(`# UI Feedback: ${path}`)
      }
      lines.push('')

      const hPrefix = multiPage ? '###' : '##'

      annotations.forEach((a, i) => {
        // Feedback-first heading with element context
        const componentSuffix = a.framework?.component ? ` in \`${a.framework.component}\`` : ''
        lines.push(`${hPrefix} ${i + 1}. ${a.comment}`)
        lines.push(`- ID: \`${a.id}\``)
        lines.push(`- Element: \`${a.element}\`${componentSuffix}`)

        // Source file path (resolved server-side or from framework dev mode)
        if (a.framework?.source_file) {
          let loc = a.framework.source_file
          if (a.framework.source_line) {
            loc += `:${a.framework.source_line}`
            if (a.framework.source_column) loc += `:${a.framework.source_column}`
          }
          lines.push(`- Source: \`${loc}\``)
        } else if (a.framework?.data?.file) {
          lines.push(`- File: \`${a.framework.data.file}\``)
        }

        // Component stack (from element-source)
        if (a.framework?.component_stack && a.framework.component_stack.length > 1) {
          lines.push(`- Component stack:`)
          for (const frame of a.framework.component_stack) {
            let frameLoc = frame.filePath
            if (frame.lineNumber) {
              frameLoc += `:${frame.lineNumber}`
              if (frame.columnNumber) frameLoc += `:${frame.columnNumber}`
            }
            const name = frame.componentName ? `${frame.componentName} ` : ''
            lines.push(`  - ${name}\`${frameLoc}\``)
          }
        }

        if (a.cssClasses) {
          lines.push(`- Classes: \`${a.cssClasses}\``)
        }
        if (a.selectedText) {
          lines.push(`- Text: "${a.selectedText}"`)
        } else if (a.nearbyText) {
          lines.push(`- Text: "${a.nearbyText.slice(0, 100)}"`)
        }
        if (a.screenshot) {
          if (!a.screenshot.startsWith('data:')) {
            // Backend-saved file path
            const screenshotPath = this.config.screenshotPath ?? 'storage/app/_instruckt/'
            const screenshotInstruction = this.config.mcp ? ` — call \`instruckt.get_screenshot\` with ID \`${a.id}\` to view` : ''
            lines.push(`- Screenshot: \`${screenshotPath}${a.screenshot}\`${screenshotInstruction}`)
          } else {
            // Inline data URI as a markdown image
            lines.push(`- Screenshot: ![Screenshot](${a.screenshot})`)
          }
        }
        lines.push('')
      })
    }

    if (this.config.mcp) {
      lines.push('---')
      lines.push('')
      lines.push('After making changes, use the `instruckt.resolve` MCP tool to mark each annotation as resolved.')
    }

    return lines.join('\n').trim()
  }

  // ── Public API ────────────────────────────────────────────────

  getAnnotations(): Annotation[] { return [...this.annotations] }

  destroy(): void {
    this.setAnnotating(false)
    document.removeEventListener('keydown', this.boundKeydown)
    window.removeEventListener('scroll', this.boundReposition)
    window.removeEventListener('resize', this.boundReposition)
    this.toolbar?.destroy()
    this.highlight?.destroy()
    this.touchAim?.destroy()
    this.popup?.destroy()
    this.markers?.destroy()
    this.listPanel?.destroy()
    if (this.rafId !== null) cancelAnimationFrame(this.rafId)
    if (this.pollTimer !== null) clearInterval(this.pollTimer)
  }
}
