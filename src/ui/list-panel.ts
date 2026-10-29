import type { Annotation } from '../types'
import { LIST_CSS } from './styles'

interface ListPanelCallbacks {
  /** Open annotations, in creation order */
  annotations: () => Annotation[]
  currentPage: () => string
  pageOf: (a: Annotation) => string
  screenshotSrc: (a: Annotation) => string | null
  /** Toolbar position, so the panel opens beside it */
  anchor: () => DOMRect | null
  onCopy: (list: Annotation[]) => Promise<boolean>
  onDelete: (list: Annotation[]) => Promise<void>
  onSave: (a: Annotation, comment: string) => Promise<void>
  onGoTo: (a: Annotation) => void
  onClose: () => void
}

type Scope = 'all' | 'page'

const ICONS = {
  close: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>`,
  goto: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>`,
  copy: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
  edit: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>`,
  trash: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
  check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
} as const

function esc(s: string): string {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function timeAgo(iso: string): string {
  const s = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000)
  if (s < 60) return 'just now'
  if (s < 3600) return `${Math.floor(s / 60)}m ago`
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`
  return `${Math.floor(s / 86400)}d ago`
}

/** Side panel that lists every captured note: select, copy, edit, delete, go to. */
export class ListPanel {
  private host: HTMLElement | null = null
  private shadow: ShadowRoot | null = null
  private scope: Scope = 'all'
  private selected = new Set<string>()
  private editingId: string | null = null
  private draft = ''
  private confirmDelete = false
  private confirmTimer: ReturnType<typeof setTimeout> | null = null
  private boundPosition = (): void => this.position()

  constructor(private readonly cb: ListPanelCallbacks) {}

  isOpen(): boolean {
    return this.host !== null
  }

  open(): void {
    if (this.host) return
    this.host = document.createElement('div')
    this.host.setAttribute('data-instruckt', 'list')
    // Keep panel clicks and typing away from page handlers (forms, @click.outside, shortcuts)
    for (const evt of ['click', 'mousedown', 'pointerdown', 'keydown', 'keyup', 'keypress', 'submit'] as const) {
      this.host.addEventListener(evt, (e) => e.stopPropagation())
    }
    this.shadow = this.host.attachShadow({ mode: 'open' })
    const style = document.createElement('style')
    style.textContent = LIST_CSS
    this.shadow.appendChild(style)
    const panel = document.createElement('div')
    panel.className = 'panel'
    this.shadow.appendChild(panel)
    panel.addEventListener('click', (e) => this.onClick(e))
    panel.addEventListener('change', (e) => this.onChange(e))
    panel.addEventListener('input', (e) => this.onInput(e))
    panel.addEventListener('keydown', (e) => this.onKeydown(e))
    ;(document.getElementById('instruckt-root') ?? document.body).appendChild(this.host)
    window.addEventListener('resize', this.boundPosition, { passive: true })
    this.render()
    this.position()
  }

  close(): void {
    if (!this.host) return
    this.host.remove()
    this.host = null
    this.shadow = null
    this.editingId = null
    this.resetConfirm()
    window.removeEventListener('resize', this.boundPosition)
  }

  /** Re-render after the annotations changed */
  refresh(): void {
    if (this.host) this.render()
  }

  destroy(): void {
    this.close()
  }

  // ── Data ────────────────────────────────────────────────────

  private all(): Annotation[] {
    return this.cb.annotations()
  }

  private shown(): Annotation[] {
    if (this.scope === 'all') return this.all()
    const page = this.cb.currentPage()
    return this.all().filter(a => this.cb.pageOf(a) === page)
  }

  /** Selected notes that are in view; nothing selected means the whole view */
  private targets(): Annotation[] {
    const shown = this.shown()
    const picked = shown.filter(a => this.selected.has(a.id))
    return picked.length > 0 ? picked : shown
  }

  private byId(id: string | undefined): Annotation | undefined {
    return id ? this.all().find(a => a.id === id) : undefined
  }

  // ── Render ──────────────────────────────────────────────────

  private render(): void {
    const panel = this.shadow?.querySelector('.panel')
    if (!panel) return

    const all = this.all()
    const page = this.cb.currentPage()
    const pageCount = all.filter(a => this.cb.pageOf(a) === page).length
    const shown = this.shown()
    const ids = new Set(shown.map(a => a.id))
    for (const id of this.selected) if (!ids.has(id)) this.selected.delete(id)
    if (this.editingId && !ids.has(this.editingId)) this.editingId = null

    const nSel = this.selected.size
    const allSel = shown.length > 0 && nSel === shown.length
    const label = nSel > 0 ? `${nSel} selected` : 'Select all'
    const copyLabel = nSel > 0 ? `Copy ${nSel}` : 'Copy all'
    const delLabel = this.confirmDelete ? 'Sure? Click again' : (nSel > 0 ? `Delete ${nSel}` : 'Delete all')

    // Number each note the way its marker is numbered: by order on its own page
    const numbers = new Map<string, number>()
    const perPage = new Map<string, number>()
    for (const a of all) {
      const p = this.cb.pageOf(a)
      const n = (perPage.get(p) ?? 0) + 1
      perPage.set(p, n)
      numbers.set(a.id, n)
    }

    const groups = new Map<string, Annotation[]>()
    for (const a of shown) {
      const p = this.cb.pageOf(a)
      if (!groups.has(p)) groups.set(p, [])
      groups.get(p)!.push(a)
    }
    // Current page first
    const order = [...groups.keys()].sort((x, y) => (x === page ? -1 : y === page ? 1 : 0))

    const body = shown.length === 0
      ? `<div class="empty">${all.length === 0
        ? 'No notes yet.<br>Press <kbd>A</kbd> and click any element to add one.'
        : 'No notes on this page.'}</div>`
      : order.map(p => `
        <div class="group">
          <div class="group-head"><span class="path" title="${esc(p)}">${esc(p)}</span>${p === page ? '<span class="here">this page</span>' : ''}</div>
          ${groups.get(p)!.map(a => this.renderItem(a, numbers.get(a.id) ?? 0)).join('')}
        </div>`).join('')

    panel.innerHTML = `
      <div class="head">
        <div class="title">Notes <span class="count">${all.length}</span></div>
        <button class="icon-btn" data-action="close" title="Close (Esc)" aria-label="Close">${ICONS.close}</button>
      </div>
      <div class="tabs" role="tablist">
        <button class="tab ${this.scope === 'all' ? 'on' : ''}" data-action="scope" data-scope="all" role="tab">All pages <span>${all.length}</span></button>
        <button class="tab ${this.scope === 'page' ? 'on' : ''}" data-action="scope" data-scope="page" role="tab">This page <span>${pageCount}</span></button>
      </div>
      ${shown.length > 0 ? `
      <div class="bulk">
        <label class="sel-all"><input type="checkbox" data-action="select-all" ${allSel ? 'checked' : ''} />${label}</label>
        <div class="bulk-actions">
          <button class="btn" data-action="copy-bulk">${copyLabel}</button>
          <button class="btn danger ${this.confirmDelete ? 'confirm' : ''}" data-action="delete-bulk">${delLabel}</button>
        </div>
      </div>` : ''}
      <div class="list">${body}</div>
    `
    const box = panel.querySelector<HTMLInputElement>('[data-action="select-all"]')
    if (box) box.indeterminate = nSel > 0 && !allSel

    if (this.editingId) {
      const ta = panel.querySelector<HTMLTextAreaElement>('textarea')
      if (ta) { ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length) }
    }
  }

  private renderItem(a: Annotation, n: number): string {
    const editing = this.editingId === a.id
    const src = this.cb.screenshotSrc(a)
    const comment = a.comment === '(screenshot)' ? '<em>Screenshot only</em>' : esc(a.comment)
    const text = editing
      ? `<textarea rows="3" data-id="${a.id}">${esc(this.draft)}</textarea>
         <div class="edit-actions">
           <button class="btn" data-action="cancel-edit">Cancel</button>
           <button class="btn primary" data-action="save" data-id="${a.id}">Save</button>
         </div>`
      : `<div class="comment">${comment}</div>`
    return `
      <div class="item ${this.selected.has(a.id) ? 'sel' : ''}" data-id="${a.id}">
        <input type="checkbox" data-action="select" data-id="${a.id}" ${this.selected.has(a.id) ? 'checked' : ''} aria-label="Select note ${n}" />
        <span class="num ${a.screenshot ? 'shot' : ''}">${n}</span>
        <div class="main">
          ${text}
          <div class="meta"><span class="el" title="${esc(a.elementPath)}">${esc(a.framework?.component ?? a.element)}</span><span>${timeAgo(a.createdAt)}</span></div>
          ${src && !editing ? `<img class="thumb" src="${esc(src)}" alt="Screenshot" data-action="goto" data-id="${a.id}" />` : ''}
        </div>
        ${editing ? '' : `<div class="row-actions">
          <button class="icon-btn" data-action="goto" data-id="${a.id}" title="Show on page" aria-label="Show on page">${ICONS.goto}</button>
          <button class="icon-btn" data-action="copy" data-id="${a.id}" title="Copy" aria-label="Copy">${ICONS.copy}</button>
          <button class="icon-btn" data-action="edit" data-id="${a.id}" title="Edit" aria-label="Edit">${ICONS.edit}</button>
          <button class="icon-btn danger" data-action="delete" data-id="${a.id}" title="Delete" aria-label="Delete">${ICONS.trash}</button>
        </div>`}
      </div>`
  }

  private position(): void {
    if (!this.host) return
    const vw = window.innerWidth
    const gap = 8
    const margin = 16
    const r = this.cb.anchor()
    const style: Record<string, string> = { position: 'fixed', zIndex: '2147483646', top: `${margin}px`, left: 'auto', right: 'auto' }
    let width = 380
    if (r && r.left + r.width / 2 > vw / 2) {
      const room = r.left - gap - margin
      width = Math.min(width, room)
      style.right = `${vw - r.left + gap}px`
    } else if (r) {
      const room = vw - r.right - gap - margin
      width = Math.min(width, room)
      style.left = `${r.right + gap}px`
    }
    if (!r || width < 280) {
      // Too narrow beside the toolbar: lay it over the right side instead
      width = Math.min(380, vw - 2 * margin)
      style.right = `${margin}px`
      style.left = 'auto'
    }
    style.width = `${width}px`
    Object.assign(this.host.style, style)
  }

  // ── Events ──────────────────────────────────────────────────

  private async onClick(e: Event): Promise<void> {
    const btn = (e.target as Element).closest<HTMLElement>('[data-action]')
    if (!btn || btn instanceof HTMLInputElement) return
    const action = btn.dataset.action
    const a = this.byId(btn.dataset.id)
    if (action !== 'delete-bulk') this.resetConfirm()

    switch (action) {
      case 'close':
        this.close()
        this.cb.onClose()
        break
      case 'scope':
        this.scope = btn.dataset.scope === 'page' ? 'page' : 'all'
        this.selected.clear()
        this.render()
        break
      case 'copy-bulk':
        if (await this.cb.onCopy(this.targets())) this.flash(btn, 'Copied')
        break
      case 'delete-bulk':
        if (!this.confirmDelete) {
          this.confirmDelete = true
          this.confirmTimer = setTimeout(() => { this.resetConfirm(); this.render() }, 3000)
          this.render()
          return
        }
        this.resetConfirm()
        await this.cb.onDelete(this.targets())
        this.selected.clear()
        this.render()
        break
      case 'goto':
        if (a) this.cb.onGoTo(a)
        break
      case 'copy':
        if (a && await this.cb.onCopy([a])) this.flash(btn, ICONS.check)
        break
      case 'edit':
        if (!a) return
        this.editingId = a.id
        this.draft = a.comment === '(screenshot)' ? '' : a.comment
        this.render()
        break
      case 'cancel-edit':
        this.editingId = null
        this.render()
        break
      case 'save':
        await this.save()
        break
      case 'delete':
        if (!a) return
        this.selected.delete(a.id)
        await this.cb.onDelete([a])
        break
    }
  }

  private onChange(e: Event): void {
    const box = e.target as HTMLInputElement
    if (box.dataset.action === 'select-all') {
      const shown = this.shown()
      if (box.checked) shown.forEach(a => this.selected.add(a.id))
      else this.selected.clear()
    } else if (box.dataset.action === 'select' && box.dataset.id) {
      if (box.checked) this.selected.add(box.dataset.id)
      else this.selected.delete(box.dataset.id)
    } else {
      return
    }
    this.resetConfirm()
    this.render()
  }

  private onInput(e: Event): void {
    const ta = e.target as HTMLTextAreaElement
    if (ta.tagName === 'TEXTAREA') this.draft = ta.value
  }

  private onKeydown(e: KeyboardEvent): void {
    const inText = (e.target as HTMLElement).tagName === 'TEXTAREA'
    if (inText && e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void this.save()
    } else if (e.key === 'Escape') {
      if (this.editingId) {
        this.editingId = null
        this.render()
      } else {
        this.close()
        this.cb.onClose()
      }
    }
  }

  private async save(): Promise<void> {
    const a = this.byId(this.editingId ?? undefined)
    const comment = this.draft.trim()
    if (!a || !comment) return
    this.editingId = null
    await this.cb.onSave(a, comment)
    this.render()
  }

  private resetConfirm(): void {
    this.confirmDelete = false
    if (this.confirmTimer) clearTimeout(this.confirmTimer)
    this.confirmTimer = null
  }

  /** Show a short "done" state on a button */
  private flash(btn: HTMLElement, html: string): void {
    const before = btn.innerHTML
    btn.innerHTML = html
    btn.classList.add('done')
    setTimeout(() => {
      btn.innerHTML = before
      btn.classList.remove('done')
    }, 1200)
  }
}
