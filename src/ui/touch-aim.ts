import { AIM_CSS } from './styles'

interface TouchAimCallbacks {
  /** Draw the highlight on an element (with its label), or hide it with null */
  highlight: (el: Element | null) => void
  isOurs: (el: Element | null) => boolean
  /** Open the note popup for the aimed element */
  onAdd: (el: Element) => void
}

const HOLD_MS = 280
/** The ring sits this far above the finger, so the finger does not hide what it aims at */
const LIFT = 48
const MOVE_TOLERANCE = 8

const ICON_X = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>`

/**
 * Aiming on a touch screen, where there is no hover. A tap aims at an element (nothing opens yet);
 * a hold, then a drag, moves the aim with a ring above the finger. A small bar under the aimed
 * element adds the note or stops aiming. A quick swipe still scrolls the page.
 */
export class TouchAim {
  private host: HTMLElement
  private bar: HTMLDivElement
  private ring: HTMLDivElement
  private aimed: Element | null = null
  private holdTimer: ReturnType<typeof setTimeout> | null = null
  private holding = false
  private start = { x: 0, y: 0 }
  private suppressUntil = 0
  private raf = 0

  constructor(private readonly cb: TouchAimCallbacks) {
    this.host = document.createElement('div')
    this.host.setAttribute('data-instruckt', 'aim')
    Object.assign(this.host.style, { position: 'fixed', inset: '0', zIndex: '2147483646', pointerEvents: 'none' })
    const shadow = this.host.attachShadow({ mode: 'open' })
    const style = document.createElement('style')
    style.textContent = AIM_CSS
    shadow.appendChild(style)

    this.bar = document.createElement('div')
    this.bar.className = 'bar'
    this.bar.hidden = true
    this.bar.innerHTML = `<button type="button" class="x" aria-label="Stop aiming">${ICON_X}</button><button type="button" class="add">Add note</button>`
    this.bar.querySelector('.x')!.addEventListener('click', (e) => { e.stopPropagation(); this.clear() })
    this.bar.querySelector('.add')!.addEventListener('click', (e) => {
      e.stopPropagation()
      const el = this.aimed
      if (!el) return
      this.hideBar()
      this.cb.onAdd(el)
    })
    shadow.appendChild(this.bar)

    this.ring = document.createElement('div')
    this.ring.className = 'ring'
    this.ring.hidden = true
    shadow.appendChild(this.ring)

    for (const evt of ['click', 'mousedown', 'pointerdown', 'touchstart'] as const) {
      this.host.addEventListener(evt, (e) => e.stopPropagation())
    }
    ;(document.getElementById('instruckt-root') ?? document.body).appendChild(this.host)
  }

  attach(): void {
    window.addEventListener('touchstart', this.onTouchStart, { capture: true, passive: true })
    window.addEventListener('touchmove', this.onTouchMove, { capture: true, passive: false })
    window.addEventListener('touchend', this.onTouchEnd, true)
    window.addEventListener('touchcancel', this.onTouchEnd, true)
    window.addEventListener('contextmenu', this.onContextMenu, true)
    window.addEventListener('scroll', this.onScroll, { passive: true })
    window.addEventListener('resize', this.onScroll, { passive: true })
  }

  detach(): void {
    window.removeEventListener('touchstart', this.onTouchStart, true)
    window.removeEventListener('touchmove', this.onTouchMove, true)
    window.removeEventListener('touchend', this.onTouchEnd, true)
    window.removeEventListener('touchcancel', this.onTouchEnd, true)
    window.removeEventListener('contextmenu', this.onContextMenu, true)
    window.removeEventListener('scroll', this.onScroll)
    window.removeEventListener('resize', this.onScroll)
    this.cancelHold()
    this.clear()
  }

  getAimed(): Element | null {
    return this.aimed
  }

  /** A tap: aim at it, or open the note when it is inside what is already aimed */
  tap(target: Element): void {
    if (Date.now() < this.suppressUntil) return
    if (this.aimed && this.aimed.contains(target)) {
      const el = this.aimed
      this.hideBar()
      this.cb.onAdd(el)
      return
    }
    this.aim(target)
  }

  aim(el: Element): void {
    this.aimed = el
    this.cb.highlight(el)
    this.placeBar()
  }

  clear(): void {
    this.aimed = null
    this.hideBar()
    this.cb.highlight(null)
  }

  /** After the note popup closes, the aim is done */
  done(): void {
    this.aimed = null
    this.hideBar()
  }

  destroy(): void {
    this.detach()
    this.host.remove()
  }

  // ── Hold and drag ───────────────────────────────────────────

  private onTouchStart = (e: TouchEvent): void => {
    if (e.touches.length !== 1 || this.cb.isOurs(e.target as Element)) { this.cancelHold(); return }
    const t = e.touches[0]
    this.start = { x: t.clientX, y: t.clientY }
    this.cancelHold()
    this.holdTimer = setTimeout(() => {
      this.holdTimer = null
      this.holding = true
      this.hideBar()
      this.moveRing(this.start.x, this.start.y)
    }, HOLD_MS)
  }

  private onTouchMove = (e: TouchEvent): void => {
    const t = e.touches[0]
    if (!t) return
    if (this.holding) {
      e.preventDefault()
      this.moveRing(t.clientX, t.clientY)
      return
    }
    if (this.holdTimer && Math.hypot(t.clientX - this.start.x, t.clientY - this.start.y) > MOVE_TOLERANCE) this.cancelHold()
  }

  private onTouchEnd = (): void => {
    if (this.holdTimer) this.cancelHold()
    if (!this.holding) return
    this.holding = false
    this.ring.hidden = true
    // A hold can still end in a click on some browsers; it must not re-aim
    this.suppressUntil = Date.now() + 450
    if (this.aimed) this.placeBar()
  }

  private onContextMenu = (e: Event): void => {
    if (this.holding || this.holdTimer || this.aimed) e.preventDefault()
  }

  private cancelHold(): void {
    if (this.holdTimer) clearTimeout(this.holdTimer)
    this.holdTimer = null
  }

  private moveRing(x: number, y: number): void {
    const ry = y - LIFT
    this.ring.hidden = false
    this.ring.style.left = `${x}px`
    this.ring.style.top = `${ry}px`
    const el = document.elementFromPoint(x, ry)
    if (!el || this.cb.isOurs(el) || el === document.documentElement || el === document.body) return
    if (el !== this.aimed) {
      this.aimed = el
      this.cb.highlight(el)
    }
  }

  // ── Bar ─────────────────────────────────────────────────────

  private onScroll = (): void => {
    if (!this.aimed) return
    cancelAnimationFrame(this.raf)
    this.raf = requestAnimationFrame(() => {
      if (!this.aimed) return
      this.cb.highlight(this.aimed)
      if (!this.bar.hidden) this.placeBar()
    })
  }

  private placeBar(): void {
    if (!this.aimed || this.holding) return
    this.bar.hidden = false
    const r = this.aimed.getBoundingClientRect()
    const vw = window.innerWidth
    const vh = window.innerHeight
    const m = 8
    const bw = this.bar.offsetWidth
    const bh = this.bar.offsetHeight
    let top = r.bottom + 10
    if (top + bh > vh - m) top = r.top - bh - 34
    if (top < m) top = vh - bh - 16
    const left = Math.max(m, Math.min(r.left + r.width / 2 - bw / 2, vw - bw - m))
    this.bar.style.left = `${left}px`
    this.bar.style.top = `${top}px`
  }

  private hideBar(): void {
    this.bar.hidden = true
  }
}
