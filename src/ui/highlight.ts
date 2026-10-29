/** Hover highlight overlay — uses all inline styles, no CSS class needed */
export class ElementHighlight {
  private el: HTMLElement
  private label: HTMLElement

  constructor() {
    this.el = document.createElement('div')
    // All styling inline to avoid any host-page CSS interference
    Object.assign(this.el.style, {
      position: 'fixed',
      pointerEvents: 'none', // MUST be none — prevents swallowing clicks
      zIndex: '2147483644',
      border: '2px solid rgba(99,102,241,0.7)',
      background: 'rgba(99,102,241,0.1)',
      borderRadius: '3px',
      transition: 'all 0.06s ease',
      display: 'none',
    })
    this.el.setAttribute('data-instruckt', 'highlight')
    // The element name, shown when aiming on a touch screen (the finger hides the element)
    this.label = document.createElement('div')
    Object.assign(this.label.style, {
      position: 'absolute',
      left: '-2px',
      maxWidth: 'min(320px, 90vw)',
      padding: '2px 6px',
      borderRadius: '4px',
      background: 'rgb(99,102,241)',
      color: '#fff',
      font: '500 11px/16px ui-monospace, SFMono-Regular, Menlo, monospace',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: 'none',
    })
    this.el.appendChild(this.label)
    const root = document.getElementById('instruckt-root') ?? document.body
    root.appendChild(this.el)
  }

  show(el: Element, label?: string): void {
    const rect = el.getBoundingClientRect()
    if (rect.width === 0 && rect.height === 0) {
      this.hide()
      return
    }
    Object.assign(this.el.style, {
      display: 'block',
      left: `${rect.left}px`,
      top: `${rect.top}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
    })
    if (label) {
      this.label.textContent = label
      // Above the box, or inside its top edge when there is no room above
      const above = rect.top > 22
      Object.assign(this.label.style, { display: 'block', top: above ? '-22px' : '2px', left: above ? '-2px' : '2px' })
    } else {
      this.label.style.display = 'none'
    }
  }

  hide(): void {
    this.el.style.display = 'none'
  }

  destroy(): void {
    this.el.remove()
  }
}
