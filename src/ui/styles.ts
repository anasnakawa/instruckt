/** Global styles injected into document.head — ONLY what must affect the host page */
export const GLOBAL_CSS = /* css */ `
body.ik-annotating,
body.ik-annotating * { cursor: crosshair !important; }
/* Our own UI keeps normal cursors; the crosshair is only for picking page elements */
body.ik-annotating [data-instruckt],
body.ik-annotating [data-instruckt] * { cursor: default !important; }
body.ik-annotating [data-instruckt] .ik-marker { cursor: pointer !important; }
/* Touch screens: a hold aims, so it must not select text or open the system menu */
@media (hover: none) {
  body.ik-annotating,
  body.ik-annotating * { -webkit-touch-callout: none !important; -webkit-user-select: none !important; user-select: none !important; }
  body.ik-annotating [data-instruckt],
  body.ik-annotating [data-instruckt] * { -webkit-user-select: auto !important; user-select: auto !important; }
}
`

/** Touch aim: the ring above the finger and the bar under the aimed element */
export const AIM_CSS = /* css */ `
:host { all: initial; }
[hidden] { display: none !important; }
.ring {
  position: fixed;
  width: 28px; height: 28px;
  margin: -14px 0 0 -14px;
  border-radius: 50%;
  border: 2px solid rgb(99,102,241);
  background: rgba(99,102,241,0.15);
  box-shadow: 0 0 0 2px rgba(255,255,255,0.9), 0 2px 8px rgba(0,0,0,0.25);
  pointer-events: none;
}
.ring::after {
  content: '';
  position: absolute; left: 50%; top: 50%;
  width: 4px; height: 4px; margin: -2px 0 0 -2px;
  border-radius: 50%;
  background: rgb(99,102,241);
}
.bar {
  position: fixed;
  display: flex; align-items: center; gap: 6px;
  padding: 5px;
  border-radius: 12px;
  background: #1e1b2e;
  box-shadow: 0 4px 16px rgba(0,0,0,0.3);
  pointer-events: auto;
  touch-action: manipulation;
  font: 600 14px/1 system-ui, -apple-system, sans-serif;
}
.bar button {
  display: inline-flex; align-items: center; justify-content: center;
  height: 36px; border: 0; border-radius: 8px;
  font: inherit; cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.x { width: 36px; background: rgba(255,255,255,0.1); color: #fff; }
.add { padding: 0 14px; background: rgb(99,102,241); color: #fff; }
`

/** Toolbar shadow DOM styles — fully isolated */
export const TOOLBAR_CSS = /* css */ `
:host {
  all: initial;
  display: block;
  position: fixed;
  z-index: 2147483646;
}

* { box-sizing: border-box; }

:host-context([data-instruckt-theme="dark"]),
@media (prefers-color-scheme: dark) {
  :host {
    --ik-bg: #1c1c1e; --ik-bg2: #2c2c2e; --ik-border: #38383a;
    --ik-text: #f4f4f5; --ik-muted: #a1a1aa;
    --ik-shadow: 0 8px 32px rgba(0,0,0,.4), 0 0 0 1px rgba(255,255,255,.06);
  }
}

:host {
  --ik-accent: #6366f1;
  --ik-accent-h: #4f46e5;
  --ik-bg: #ffffff;
  --ik-bg2: #f4f4f5;
  --ik-border: #e4e4e7;
  --ik-text: #18181b;
  --ik-muted: #a1a1aa;
  --ik-shadow: 0 8px 32px rgba(0,0,0,.08), 0 0 0 1px rgba(0,0,0,.04);
}

.toolbar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  background: var(--ik-bg);
  border-radius: 12px;
  padding: 6px;
  box-shadow: var(--ik-shadow);
  user-select: none;
  touch-action: none;
  cursor: grab;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
.toolbar:active { cursor: grabbing; }

.drag-handle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10px;
  cursor: grab;
  opacity: 0.35;
  transition: opacity 0.15s ease;
  flex-shrink: 0;
  margin-bottom: 2px;
}
.drag-handle:hover { opacity: 0.7; }
.drag-handle:active { cursor: grabbing; opacity: 0.9; }
.drag-handle svg { pointer-events: none; }

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: var(--ik-muted);
  cursor: pointer;
  padding: 0;
  position: relative;
  transition: background .15s ease, color .15s ease;
}
.btn svg { display: block; }
.btn:hover { background: var(--ik-bg2); color: var(--ik-text); }
.btn[data-tooltip]::before {
  content: attr(data-tooltip);
  position: absolute;
  right: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 6px;
  background: var(--ik-text);
  color: var(--ik-bg);
  pointer-events: none;
  opacity: 0;
  transition: opacity .1s ease;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
.btn[data-tooltip]:hover::before { opacity: 1; }
/* No hover on touch screens: a tapped button would keep its tooltip up */
@media (hover: none) { .btn[data-tooltip]::before { display: none; } }
.btn.active { background: var(--ik-accent); color: #fff; }
.btn.active:hover { background: var(--ik-accent-h); }

.divider { width: 18px; height: 1px; background: var(--ik-border); margin: 3px 0; }

.badge {
  position: absolute;
  top: -3px; right: -3px;
  min-width: 16px; height: 16px;
  background: #ef4444;
  color: #fff;
  border-radius: 8px;
  font-size: 10px; font-weight: 600;
  display: flex; align-items: center; justify-content: center;
  padding: 0 4px;
  line-height: 1;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.badge-total { background: var(--ik-accent); }

.minimize-btn { color: var(--ik-muted); opacity: .6; }
.minimize-btn:hover { opacity: 1; }

.danger-btn { color: var(--ik-muted); opacity: .6; }
.danger-btn:hover { opacity: 1; color: #ef4444; }

.clear-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.clear-all-btn {
  display: none;
  position: absolute;
  right: 100%;
  top: 0;
  background: var(--ik-bg);
  box-shadow: var(--ik-shadow);
  border-radius: 8px;
}
/* clear-all tooltip inherits from .btn[data-tooltip]::before */
/* Invisible bridge so hover doesn't break crossing the gap */
.clear-all-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: 100%;
  width: 6px;
  height: 100%;
}
/* Clear-page tooltip shows above-left so it doesn't cover the clear-all button */
.clear-wrap > .btn:first-child[data-tooltip]::before {
  right: 0;
  left: auto;
  top: auto;
  bottom: calc(100% + 8px);
  transform: none;
}
.clear-wrap:hover .clear-all-btn { display: flex; align-items: center; justify-content: center; }

.fab {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: var(--ik-bg);
  color: var(--ik-muted);
  box-shadow: var(--ik-shadow);
  cursor: pointer;
  padding: 0;
  transition: color .15s ease, transform .15s ease;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
.fab:hover { color: var(--ik-accent); transform: scale(1.1); }
.fab { position: relative; touch-action: none; }
@media (pointer: coarse) { .fab { width: 40px; height: 40px; } }

.fab-badge {
  position: absolute;
  top: -4px; right: -4px;
  min-width: 16px; height: 16px;
  background: #6366f1;
  color: #fff;
  border-radius: 8px;
  font-size: 9px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  padding: 0 3px;
  line-height: 1;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* doneAction and the load error sit under the toolbar or the round button */
:host(.ik-stack) { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.done-btn, .error-note {
  border: none;
  border-radius: 999px;
  min-height: 36px;
  padding: 0 14px;
  white-space: nowrap;
  font: 600 13px/1 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  cursor: pointer;
  box-shadow: var(--ik-shadow);
}
.done-btn { background: var(--ik-accent); color: #fff; }
.done-btn:hover { background: var(--ik-accent-h); }
.error-note { background: #fef2f2; color: #b91c1c; max-width: 240px; white-space: normal; line-height: 1.3; padding: 8px 12px; }
@media (pointer: coarse) { .done-btn { min-height: 44px; padding: 0 18px; font-size: 15px; } }
`

/** Popup shadow DOM styles — fully isolated */
export const POPUP_CSS = /* css */ `
:host {
  all: initial;
  display: block;
  position: fixed;
  z-index: 2147483647;
}

* { box-sizing: border-box; }

:host {
  --ik-accent: #6366f1;
  --ik-accent-h: #4f46e5;
  --ik-bg: #ffffff;
  --ik-bg2: #f8f8f8;
  --ik-border: #e4e4e7;
  --ik-text: #18181b;
  --ik-muted: #71717a;
  --ik-shadow: 0 4px 24px rgba(0,0,0,.12);
  --ik-radius: 10px;
  --ik-hl: rgba(99,102,241,.15);
}

@media (prefers-color-scheme: dark) {
  :host {
    --ik-bg: #1c1c1e; --ik-bg2: #2c2c2e; --ik-border: #3a3a3c;
    --ik-text: #f4f4f5; --ik-muted: #a1a1aa;
    --ik-shadow: 0 4px 24px rgba(0,0,0,.5);
    --ik-hl: rgba(99,102,241,.2);
  }
}

.popup {
  width: 340px;
  background: var(--ik-bg);
  border: 1px solid var(--ik-border);
  border-radius: var(--ik-radius);
  box-shadow: var(--ik-shadow);
  padding: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 13px;
  color: var(--ik-text);
  animation: pop-in .12s ease;
}
@keyframes pop-in {
  from { opacity:0; transform: scale(.95) translateY(4px); }
  to   { opacity:1; transform: scale(1) translateY(0); }
}

.header { display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; }
.element-tag {
  font-size:11px; font-family:ui-monospace,monospace; color:var(--ik-muted);
  background:var(--ik-bg2); border-radius:4px; padding:2px 6px;
  max-width:220px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
}
.close-btn {
  background:none; border:none; color:var(--ik-muted);
  cursor:pointer; font-size:18px; line-height:1; padding:0;
}

.fw-badge {
  display:inline-flex; align-items:center; gap:4px;
  font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.05em;
  color:var(--ik-accent); background:var(--ik-hl); border-radius:4px;
  padding:2px 6px; margin-bottom:8px;
}
.selected-text {
  font-size:12px; color:var(--ik-muted); background:var(--ik-bg2);
  border-left:3px solid var(--ik-accent); padding:4px 8px;
  border-radius:0 4px 4px 0; margin-bottom:10px;
  overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
}

.label {
  font-size:10px; font-weight:700; text-transform:uppercase;
  letter-spacing:.05em; color:var(--ik-muted); margin-bottom:4px;
}
.row { display:flex; gap:6px; margin-bottom:10px; }
.chips { display:flex; gap:4px; flex-wrap:wrap; }

.chip {
  font-size:11px; padding:3px 8px; border-radius:12px;
  border:1px solid var(--ik-border); background:transparent;
  color:var(--ik-muted); cursor:pointer; transition:all .1s;
}
.chip:hover { border-color:var(--ik-accent); color:var(--ik-accent); }
.chip.sel { background:var(--ik-accent); border-color:var(--ik-accent); color:#fff; }
.chip.blocking.sel  { background:#ef4444; border-color:#ef4444; }
.chip.important.sel { background:#f97316; border-color:#f97316; }
.chip.suggestion.sel{ background:#22c55e; border-color:#22c55e; }

.screenshot-slot { margin-bottom: 10px; }

.btn-capture {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 8px 10px;
  border: 1px dashed var(--ik-border);
  border-radius: 6px;
  background: var(--ik-bg2);
  color: var(--ik-muted);
  font-size: 12px;
  font-family: inherit;
  cursor: pointer;
  transition: border-color .15s, color .15s;
}
.btn-capture:hover {
  border-color: var(--ik-accent);
  color: var(--ik-accent);
}
.btn-capture svg { flex-shrink: 0; }

.screenshot-preview {
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--ik-border);
  margin-bottom: 10px;
}
.screenshot-preview img {
  display: block;
  width: 100%;
  max-height: 200px;
  object-fit: contain;
  background: var(--ik-bg2);
}
.screenshot-remove {
  position: absolute;
  top: 4px; right: 4px;
  width: 20px; height: 20px;
  border-radius: 50%;
  border: none;
  background: rgba(0,0,0,.6);
  color: #fff;
  font-size: 12px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}
.screenshot-remove:hover { background: #ef4444; }

textarea {
  width:100%; min-height:80px; resize:vertical;
  border:1px solid var(--ik-border); border-radius:6px;
  background:var(--ik-bg2); color:var(--ik-text);
  font-family:inherit; font-size:13px; padding:8px 10px;
  outline:none; transition:border-color .15s; margin-bottom:10px;
}
textarea:focus { border-color:var(--ik-accent); }
textarea::placeholder { color:var(--ik-muted); }

.actions { display:flex; justify-content:flex-end; gap:6px; }
.save-error { color:#ef4444; font-size:12px; margin:-4px 0 8px; }

.btn-secondary {
  padding:6px 14px; border-radius:6px; border:1px solid var(--ik-border);
  background:transparent; color:var(--ik-muted); font-size:12px; cursor:pointer; transition:all .1s;
}
.btn-secondary:hover { border-color:var(--ik-muted); color:var(--ik-text); }

.btn-primary {
  padding:6px 14px; border-radius:6px; border:none;
  background:var(--ik-accent); color:#fff;
  font-size:12px; font-weight:700; cursor:pointer; transition:background .1s;
}
.btn-primary:hover { background:var(--ik-accent-h); }
.btn-primary:disabled { opacity:.5; cursor:not-allowed; }

.btn-danger {
  padding:6px 14px; border-radius:6px; border:1px solid #ef4444;
  background:transparent; color:#ef4444;
  font-size:12px; cursor:pointer; transition:all .1s;
}
.btn-danger:hover { background:#ef4444; color:#fff; }

/* Thread view */
.thread { margin-top:10px; border-top:1px solid var(--ik-border); padding-top:10px; }
.msg { margin-bottom:8px; }
.msg-role {
  font-size:10px; font-weight:700; text-transform:uppercase;
  letter-spacing:.05em; margin-bottom:2px;
}
.msg-role.human { color:var(--ik-accent); }
.msg-role.agent { color:#22c55e; }
.msg-content { font-size:12px; line-height:1.5; }

.status-badge {
  display:inline-flex; align-items:center; gap:4px;
  font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.05em;
  border-radius:4px; padding:2px 6px;
}
.status-badge.pending      { background:rgba(99,102,241,.15); color:var(--ik-accent); }
.status-badge.resolved     { background:rgba(34,197,94,.15); color:#22c55e; }
.status-badge.dismissed    { background:var(--ik-bg2); color:var(--ik-muted); }
`

/** Marker pin styles injected into document.head — pins overlay the page */
export const MARKER_CSS = /* css */ `
.ik-marker {
  position: absolute;
  z-index: 2147483645;
  width: 24px; height: 24px;
  border-radius: 50%;
  background: var(--ik-marker-default, #6366f1);
  color: #fff;
  font-size: 11px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px color-mix(in srgb, var(--ik-marker-default, #6366f1) 40%, transparent);
  transition: transform .15s ease;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  pointer-events: all;
  user-select: none;
}
.ik-marker:hover { transform: scale(1.15); }
.ik-marker.has-screenshot { background: var(--ik-marker-screenshot, #22c55e); box-shadow: 0 2px 8px color-mix(in srgb, var(--ik-marker-screenshot, #22c55e) 40%, transparent); }
@keyframes ik-pulse {
  0%   { box-shadow: 0 0 0 0 color-mix(in srgb, var(--ik-marker-default, #6366f1) 70%, transparent); transform: scale(1.3); }
  100% { box-shadow: 0 0 0 18px transparent; transform: scale(1); }
}
.ik-marker.ik-pulse { animation: ik-pulse .8s ease-out 2; }
.ik-has-hover .ik-marker:not(.ik-hover) { opacity: .3; }
.ik-marker.ik-hover {
  transform: scale(1.45);
  z-index: 1;
  outline: 3px solid color-mix(in srgb, var(--ik-marker-default, #6366f1) 35%, transparent);
  outline-offset: 2px;
}
.ik-marker { transition: transform .15s ease, opacity .15s ease; }
.ik-marker.dismissed { background: var(--ik-marker-dismissed, #71717a); box-shadow: 0 2px 8px rgba(0,0,0,.2); }
`

/** Inject styles into document.head (idempotent) */
export function injectGlobalStyles(colors?: import('../types').MarkerColors): void {
  if (document.getElementById('instruckt-global')) return
  const vars = colors
    ? `:root {${colors.default ? ` --ik-marker-default: ${colors.default};` : ''}${colors.screenshot ? ` --ik-marker-screenshot: ${colors.screenshot};` : ''}${colors.dismissed ? ` --ik-marker-dismissed: ${colors.dismissed};` : ''} }\n`
    : ''
  const style = document.createElement('style')
  style.id = 'instruckt-global'
  style.textContent = vars + GLOBAL_CSS + MARKER_CSS
  document.head.appendChild(style)
}

/** List panel shadow DOM styles: every captured note, beside the toolbar */
export const LIST_CSS = /* css */ `
:host {
  all: initial;
  display: block;
  position: fixed;
  z-index: 2147483646;
}

* { box-sizing: border-box; }

:host {
  --ik-accent: #6366f1;
  --ik-accent-h: #4f46e5;
  --ik-bg: #ffffff;
  --ik-bg2: #f4f4f5;
  --ik-border: #e4e4e7;
  --ik-text: #18181b;
  --ik-muted: #71717a;
  --ik-danger: #dc2626;
  --ik-sel: rgba(99,102,241,.08);
  --ik-shadow: 0 8px 32px rgba(0,0,0,.12), 0 0 0 1px rgba(0,0,0,.04);
}

@media (prefers-color-scheme: dark) {
  :host {
    --ik-bg: #1c1c1e; --ik-bg2: #2c2c2e; --ik-border: #3a3a3c;
    --ik-text: #f4f4f5; --ik-muted: #a1a1aa; --ik-danger: #f87171;
    --ik-sel: rgba(99,102,241,.18);
    --ik-shadow: 0 8px 32px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.06);
  }
}

.panel {
  cursor: default;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 32px);
  background: var(--ik-bg);
  color: var(--ik-text);
  border-radius: 12px;
  box-shadow: var(--ik-shadow);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 13px;
  line-height: 1.4;
  overflow: hidden;
  animation: ik-in .12s ease;
}
@keyframes ik-in { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }

.head {
  display: flex; align-items: center; justify-content: space-between; padding: 12px 12px 8px 14px;
  cursor: grab; user-select: none; touch-action: none;
}
.head:active { cursor: grabbing; }
.title { font-size: 14px; font-weight: 700; display: flex; align-items: center; gap: 6px; }
.count {
  font-size: 11px; font-weight: 700; color: #fff; background: var(--ik-accent);
  border-radius: 9px; padding: 1px 7px; min-width: 18px; text-align: center;
}

.tabs { display: flex; gap: 4px; padding: 0 12px 8px; }
.tab {
  flex: 1; border: 1px solid var(--ik-border); background: transparent; color: var(--ik-muted);
  border-radius: 8px; padding: 6px 8px; font: inherit; font-size: 12px; font-weight: 600; cursor: pointer;
}
.tab span { font-weight: 500; opacity: .8; margin-left: 2px; }
.tab:hover { color: var(--ik-text); }
.tab.on { background: var(--ik-text); border-color: var(--ik-text); color: var(--ik-bg); }

.bulk {
  display: flex; align-items: center; justify-content: space-between; gap: 8px;
  padding: 8px 12px 8px 14px; border-top: 1px solid var(--ik-border); border-bottom: 1px solid var(--ik-border);
  background: var(--ik-bg2);
}
.sel-all { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--ik-muted); cursor: pointer; user-select: none; }
.bulk-actions { display: flex; gap: 6px; }

input[type="checkbox"] { width: 15px; height: 15px; margin: 0; accent-color: var(--ik-accent); cursor: pointer; flex-shrink: 0; }

.btn {
  border: 1px solid var(--ik-border); background: var(--ik-bg); color: var(--ik-text);
  border-radius: 7px; padding: 5px 10px; font: inherit; font-size: 12px; font-weight: 600; cursor: pointer;
  white-space: nowrap; transition: background .1s, border-color .1s, color .1s;
}
.btn:hover { border-color: var(--ik-muted); }
.btn.primary { background: var(--ik-accent); border-color: var(--ik-accent); color: #fff; }
.btn.primary:hover { background: var(--ik-accent-h); }
.btn.danger { color: var(--ik-danger); }
.btn.danger:hover, .btn.danger.confirm { background: var(--ik-danger); border-color: var(--ik-danger); color: #fff; }
.btn.done { color: #16a34a; border-color: #16a34a; }

.icon-btn {
  display: inline-flex; align-items: center; justify-content: center;
  width: 26px; height: 26px; border: none; border-radius: 6px; padding: 0;
  background: transparent; color: var(--ik-muted); cursor: pointer;
}
.icon-btn:hover { background: var(--ik-bg2); color: var(--ik-text); }
.icon-btn.danger:hover { color: var(--ik-danger); }
.icon-btn.done { color: #16a34a; }

.list { overflow-y: auto; overscroll-behavior: contain; padding: 4px 0 8px; }

.group-head {
  display: flex; align-items: center; gap: 6px; padding: 10px 14px 4px;
  font-size: 11px; font-weight: 700; color: var(--ik-muted);
}
.path { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.here {
  flex-shrink: 0; font-size: 10px; text-transform: uppercase; letter-spacing: .04em;
  color: var(--ik-accent); background: var(--ik-sel); border-radius: 4px; padding: 1px 5px;
}

.item {
  position: relative; display: flex; align-items: flex-start; gap: 8px;
  padding: 8px 12px 8px 14px; border-radius: 0;
}
.item:hover { background: var(--ik-bg2); }
.item.sel { background: var(--ik-sel); }
.item > input { margin-top: 3px; }

.num {
  flex-shrink: 0; width: 20px; height: 20px; border-radius: 50%;
  background: var(--ik-marker-default, #6366f1); color: #fff;
  font-size: 10px; font-weight: 700; display: flex; align-items: center; justify-content: center;
}
.num.shot { background: var(--ik-marker-screenshot, #22c55e); }

.main { flex: 1; min-width: 0; }
.comment { cursor: text; user-select: text; }
.comment {
  white-space: pre-wrap; word-break: break-word;
  display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden;
}
.comment em { color: var(--ik-muted); }
.meta { display: flex; gap: 8px; margin-top: 3px; font-size: 11px; color: var(--ik-muted); }
.el { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 200px; }
.thumb {
  display: block; margin-top: 6px; max-width: 100%; max-height: 90px; border-radius: 6px;
  border: 1px solid var(--ik-border); background: var(--ik-bg2); object-fit: contain; cursor: pointer;
}

.row-actions {
  display: flex; gap: 1px; flex-shrink: 0; opacity: 0; transition: opacity .1s;
}
.item:hover .row-actions, .item:focus-within .row-actions { opacity: 1; }
@media (hover: none) { .row-actions { opacity: 1; } }

textarea {
  width: 100%; resize: vertical; min-height: 64px;
  border: 1px solid var(--ik-accent); border-radius: 6px; outline: none;
  background: var(--ik-bg); color: var(--ik-text); font: inherit; padding: 6px 8px;
}
.edit-actions { display: flex; justify-content: flex-end; gap: 6px; margin-top: 6px; }

.empty { padding: 28px 16px 32px; text-align: center; color: var(--ik-muted); line-height: 1.6; }
kbd {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11px; padding: 1px 5px; border-radius: 4px;
  border: 1px solid var(--ik-border); background: var(--ik-bg2); color: var(--ik-text);
}
`
