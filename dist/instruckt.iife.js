/* instruckt v0.5.0 | MIT */
"use strict";var Instruckt=(()=>{var ue=Object.defineProperty,ir=Object.defineProperties,sr=Object.getOwnPropertyDescriptor,ar=Object.getOwnPropertyDescriptors,lr=Object.getOwnPropertyNames,ce=Object.getOwnPropertySymbols;var Le=Object.prototype.hasOwnProperty,_t=Object.prototype.propertyIsEnumerable;var Rt=(t,e,n)=>e in t?ue(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,S=(t,e)=>{for(var n in e||(e={}))Le.call(e,n)&&Rt(t,n,e[n]);if(ce)for(var n of ce(e))_t.call(e,n)&&Rt(t,n,e[n]);return t},E=(t,e)=>ir(t,ar(e));var Lt=(t,e)=>{var n={};for(var r in t)Le.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&ce)for(var r of ce(t))e.indexOf(r)<0&&_t.call(t,r)&&(n[r]=t[r]);return n};var cr=(t,e)=>{for(var n in e)ue(t,n,{get:e[n],enumerable:!0})},ur=(t,e,n,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of lr(e))!Le.call(t,o)&&o!==n&&ue(t,o,{get:()=>e[o],enumerable:!(r=sr(e,o))||r.enumerable});return t};var dr=t=>ur(ue({},"__esModule",{value:!0}),t);var Ds={};cr(Ds,{Instruckt:()=>le,init:()=>Bs});function hr(){let t=document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]+)/);return t?decodeURIComponent(t[1]):""}function Me(){let t={"Content-Type":"application/json",Accept:"application/json","X-Requested-With":"XMLHttpRequest"},e=hr();return e&&(t["X-XSRF-TOKEN"]=e),t}function W(t){let e={};for(let[n,r]of Object.entries(t)){let o=n.replace(/_([a-z])/g,(i,s)=>s.toUpperCase());e[o]=Array.isArray(r)?r.map(i=>i&&typeof i=="object"&&!Array.isArray(i)?W(i):i):r&&typeof r=="object"&&!Array.isArray(r)?W(r):r}return e}function Ie(t){let e={};for(let[n,r]of Object.entries(t)){let o=n.replace(/[A-Z]/g,i=>`_${i.toLowerCase()}`);e[o]=r&&typeof r=="object"&&!Array.isArray(r)?Ie(r):r}return e}var de=class{constructor(e){this.endpoint=e}async getAnnotations(){let e=await fetch(`${this.endpoint}/annotations`,{headers:Me()});if(!e.ok)throw new Error(`instruckt: failed to load annotations (${e.status})`);return(await e.json()).map(r=>W(r))}async addAnnotation(e){let n=await fetch(`${this.endpoint}/annotations`,{method:"POST",headers:Me(),body:JSON.stringify(Ie(e))});if(!n.ok)throw new Error(`instruckt: failed to add annotation (${n.status})`);return W(await n.json())}async updateAnnotation(e,n){let r=await fetch(`${this.endpoint}/annotations/${e}`,{method:"PATCH",headers:Me(),body:JSON.stringify(Ie(n))});if(!r.ok)throw new Error(`instruckt: failed to update annotation (${r.status})`);return W(await r.json())}};var pr=`
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
`,Mt=`
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
`,It=`
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
`,Pe=`
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
`,mr=`
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
`;function Oe(t){if(document.getElementById("instruckt-global"))return;let e=t?`:root {${t.default?` --ik-marker-default: ${t.default};`:""}${t.screenshot?` --ik-marker-screenshot: ${t.screenshot};`:""}${t.dismissed?` --ik-marker-dismissed: ${t.dismissed};`:""} }
`:"",n=document.createElement("style");n.id="instruckt-global",n.textContent=e+pr+mr,document.head.appendChild(n)}var Pt=`
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
`;var T={annotate:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>',list:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/></svg>',copyClear:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v4"/><path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"/><rect x="8" y="2" width="8" height="4" rx="1"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="21" y1="15" x2="15" y2="21"/></svg>',copy:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',check:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',clear:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',minimize:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="7 13 12 18 17 13"/><line x1="12" y1="6" x2="12" y2="18"/></svg>',screenshot:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',logo:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>'},R=class R{constructor(e,n,r,o){this.position=e;this.callbacks=n;this.fabBadge=null;this.annotateActive=!1;this.listActive=!1;this.minimized=!1;this.totalCount=0;this.dragging=!1;this.dragOffset={x:0,y:0};this.dragStart={x:0,y:0};this.dragMoved=!1;this.keys=r!=null?r:{},this.tools=o!=null?o:{},this.build(),this.setupDrag()}show(e){return this.tools[e]!==!1}build(){var p,m,g,f,v;this.host=document.createElement("div"),this.host.setAttribute("data-instruckt","toolbar"),this.shadow=this.host.attachShadow({mode:"open"});let e=document.createElement("style");e.textContent=It,this.shadow.appendChild(e),this.toolbarEl=document.createElement("div"),this.toolbarEl.className="toolbar";let n=document.createElement("div");n.className="drag-handle",n.setAttribute("aria-label","Drag to reposition toolbar"),n.innerHTML=`<svg width="16" height="6" viewBox="0 0 16 6" fill="currentColor">
      <circle cx="4" cy="1.5" r="1.2"/><circle cx="8" cy="1.5" r="1.2"/><circle cx="12" cy="1.5" r="1.2"/>
      <circle cx="4" cy="4.5" r="1.2"/><circle cx="8" cy="4.5" r="1.2"/><circle cx="12" cy="4.5" r="1.2"/>
    </svg>`,this.toolbarEl.appendChild(n);let r=this.keys;this.annotateBtn=this.makeBtn(T.annotate,`Annotate elements (${((p=r.annotate)!=null?p:"A").toUpperCase()})`,()=>{let b=!this.annotateActive;this.setAnnotateActive(b),this.callbacks.onToggleAnnotate(b)}),this.listBtn=this.makeBtn(T.list,`All notes (${((m=r.list)!=null?m:"L").toUpperCase()})`,()=>{let b=!this.listActive;this.setListActive(b),this.callbacks.onToggleList(b)});let o=this.makeBtn(T.screenshot,`Screenshot region (${((g=r.screenshot)!=null?g:"C").toUpperCase()})`,()=>{this.callbacks.onScreenshot()});this.copyBtn=this.makeBtn(T.copy,"Copy all notes",async()=>{await this.callbacks.onCopy()&&this.flashDone(this.copyBtn,T.copy)}),this.copyClearBtn=this.makeBtn(T.copyClear,"Copy all notes, then clear them",async()=>{await this.callbacks.onCopyAndClear()&&this.flashDone(this.copyClearBtn,T.copyClear)});let i=document.createElement("div");i.className="clear-wrap";let s=this.makeBtn(T.clear,`Clear this page (${((f=r.clearPage)!=null?f:"X").toUpperCase()})`,()=>{var b,y;(y=(b=this.callbacks).onClearPage)==null||y.call(b)});s.classList.add("danger-btn");let a=this.makeBtn('<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>',"Delete all instructions.",()=>{var b,y;return(y=(b=this.callbacks).onClearAll)==null?void 0:y.call(b)});a.classList.add("danger-btn","clear-all-btn"),i.appendChild(s),i.appendChild(a);let l=this.makeBtn(T.minimize,"Minimize toolbar",()=>{this.setMinimized(!0)});l.classList.add("minimize-btn");let d=()=>{let b=document.createElement("div");return b.className="divider",b},u=[],c=b=>{u.length>0&&u.push(d()),u.push(b)};this.show("annotate")&&c(this.annotateBtn),this.show("screenshot")&&c(o),this.show("list")&&c(this.listBtn),this.show("copy")&&c(this.copyBtn),this.show("copy_clear")&&c(this.copyClearBtn),(this.show("clear_page")||this.show("clear_all"))&&c(i),this.show("minimize")&&c(l),this.toolbarEl.append(...u),this.shadow.appendChild(this.toolbarEl),this.fab=document.createElement("button"),this.fab.className="fab",this.fab.title="Open instruckt toolbar",this.fab.setAttribute("aria-label","Open instruckt toolbar"),this.fab.innerHTML=T.logo,this.fab.style.display="none",this.fab.addEventListener("click",b=>{b.stopPropagation(),!this.dragMoved&&this.setMinimized(!1)}),this.shadow.appendChild(this.fab),this.host.addEventListener("click",b=>b.stopPropagation()),this.host.addEventListener("mousedown",b=>b.stopPropagation()),this.host.addEventListener("pointerdown",b=>b.stopPropagation()),this.applyPosition(),this.loadSavedPosition(),((v=document.getElementById("instruckt-root"))!=null?v:document.body).appendChild(this.host),this.startMinimized()&&this.minimize(),this.keepOnScreen(),window.addEventListener("resize",()=>this.keepOnScreen(),{passive:!0})}startMinimized(){try{let e=localStorage.getItem(R.MINIMIZED_KEY);if(e!==null)return e==="1"}catch(e){}return window.matchMedia("(max-width: 639px), (max-height: 499px)").matches}keepOnScreen(){let e=this.host.getBoundingClientRect();if(e.width===0)return;let n=8,r=window.innerWidth,o=window.innerHeight;if(e.left>=n&&e.top>=n&&e.right<=r-n&&e.bottom<=o-n)return;let i=Math.max(n,Math.min(e.left,r-e.width-n)),s=Math.max(n,Math.min(e.top,o-e.height-n));Object.assign(this.host.style,{left:`${i}px`,bottom:`${o-s-e.height}px`,top:"auto",right:"auto"})}flashDone(e,n){var r;(r=e.querySelector("svg"))==null||r.remove(),e.insertAdjacentHTML("afterbegin",T.check),setTimeout(()=>{var o;(o=e.querySelector("svg"))==null||o.remove(),e.insertAdjacentHTML("afterbegin",n)},1200)}makeBtn(e,n,r){let o=document.createElement("button");return o.className="btn",o.setAttribute("data-tooltip",n),o.setAttribute("aria-label",n),o.innerHTML=e,o.addEventListener("click",i=>{i.stopPropagation(),r()}),o}applyPosition(){let e="16px";Object.assign(this.host.style,{position:"fixed",zIndex:"2147483646",bottom:this.position.includes("bottom")?e:"auto",top:this.position.includes("top")?e:"auto",right:this.position.includes("right")?e:"auto",left:this.position.includes("left")?e:"auto"})}savePosition(){let{left:e,right:n,top:r,bottom:o}=this.host.style;try{localStorage.setItem(R.POSITION_KEY,JSON.stringify({left:e,right:n,top:r,bottom:o}))}catch(i){}}loadSavedPosition(){try{let e=localStorage.getItem(R.POSITION_KEY);if(!e)return;let{left:n,right:r,top:o,bottom:i}=JSON.parse(e);Object.assign(this.host.style,{left:n,right:r,top:o,bottom:i})}catch(e){}}setupDrag(){this.shadow.addEventListener("pointerdown",n=>{let r=n,o=r.target;if(o.closest(".btn"))return;this.dragging=!0,this.dragMoved=!1;let i=this.host.getBoundingClientRect();this.dragOffset={x:r.clientX-i.left,y:r.clientY-i.top},this.dragStart={x:r.clientX,y:r.clientY},o.closest(".fab")||r.preventDefault()}),document.addEventListener("pointermove",n=>{this.dragging&&(!this.dragMoved&&Math.hypot(n.clientX-this.dragStart.x,n.clientY-this.dragStart.y)<5||(this.dragMoved=!0,Object.assign(this.host.style,{left:`${n.clientX-this.dragOffset.x}px`,bottom:`${window.innerHeight-(n.clientY-this.dragOffset.y)-this.host.offsetHeight}px`,top:"auto",right:"auto"})))});let e=()=>{this.dragging&&(this.dragging=!1,this.dragMoved&&(this.keepOnScreen(),this.savePosition(),setTimeout(()=>{this.dragMoved=!1},0)))};document.addEventListener("pointerup",e),document.addEventListener("pointercancel",e)}setMinimized(e){var n,r;this.minimized=e;try{localStorage.setItem(R.MINIMIZED_KEY,e?"1":"0")}catch(o){}this.toolbarEl.style.display=e?"none":"",this.fab.style.display=e?"":"none",this.updateFabBadge(),(r=(n=this.callbacks).onMinimize)==null||r.call(n,e),requestAnimationFrame(()=>this.keepOnScreen())}updateFabBadge(){var e;this.totalCount>0&&this.minimized?(this.fabBadge||(this.fabBadge=document.createElement("span"),this.fabBadge.className="fab-badge",this.fab.appendChild(this.fabBadge)),this.fabBadge.textContent=this.totalCount>99?"99+":String(this.totalCount)):((e=this.fabBadge)==null||e.remove(),this.fabBadge=null)}isMinimized(){return this.minimized}minimize(){this.minimized=!0,this.toolbarEl.style.display="none",this.fab.style.display="",this.updateFabBadge()}setAnnotateActive(e){this.annotateActive=e,this.annotateBtn.classList.toggle("active",e),document.body.classList.toggle("ik-annotating",e)}setListActive(e){this.listActive=e,this.listBtn.classList.toggle("active",e)}getListAnchor(){return{bar:this.host.getBoundingClientRect(),button:this.listBtn.getBoundingClientRect()}}setMode(e){this.setAnnotateActive(e==="annotating")}setAnnotationCount(e){let n=this.annotateBtn.querySelector(".badge");e>0?(n||(n=document.createElement("span"),n.className="badge",this.annotateBtn.appendChild(n)),n.textContent=e>99?"99+":String(e)):n==null||n.remove()}setTotalCount(e){this.totalCount=e,this.updateFabBadge();let n=this.listBtn.querySelector(".badge");e>0?(n||(n=document.createElement("span"),n.className="badge badge-total",this.listBtn.appendChild(n)),n.textContent=e>99?"99+":String(e)):n==null||n.remove()}destroy(){this.host.remove(),document.body.classList.remove("ik-annotating")}};R.MINIMIZED_KEY="instruckt:toolbar-min",R.POSITION_KEY="instruckt:toolbar-pos";var Y=R;var q=class{constructor(){var n;this.el=document.createElement("div"),Object.assign(this.el.style,{position:"fixed",pointerEvents:"none",zIndex:"2147483644",border:"2px solid rgba(99,102,241,0.7)",background:"rgba(99,102,241,0.1)",borderRadius:"3px",transition:"all 0.06s ease",display:"none"}),this.el.setAttribute("data-instruckt","highlight"),this.label=document.createElement("div"),Object.assign(this.label.style,{position:"absolute",left:"-2px",maxWidth:"min(320px, 90vw)",padding:"2px 6px",borderRadius:"4px",background:"rgb(99,102,241)",color:"#fff",font:"500 11px/16px ui-monospace, SFMono-Regular, Menlo, monospace",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",display:"none"}),this.el.appendChild(this.label),((n=document.getElementById("instruckt-root"))!=null?n:document.body).appendChild(this.el)}show(e,n){let r=e.getBoundingClientRect();if(r.width===0&&r.height===0){this.hide();return}if(Object.assign(this.el.style,{display:"block",left:`${r.left}px`,top:`${r.top}px`,width:`${r.width}px`,height:`${r.height}px`}),n){this.label.textContent=n;let o=r.top>22;Object.assign(this.label.style,{display:"block",top:o?"-22px":"2px",left:o?"-2px":"2px"})}else this.label.style.display="none"}hide(){this.el.style.display="none"}destroy(){this.el.remove()}};function fr(t,e){return t[13]=1,t[14]=e>>8,t[15]=e&255,t[16]=e>>8,t[17]=e&255,t}var Ut=112,zt=72,Vt=89,Wt=115,Fe;function gr(){let t=new Int32Array(256);for(let e=0;e<256;e++){let n=e;for(let r=0;r<8;r++)n=n&1?3988292384^n>>>1:n>>>1;t[e]=n}return t}function br(t){let e=-1;Fe||(Fe=gr());for(let n=0;n<t.length;n++)e=Fe[(e^t[n])&255]^e>>>8;return e^-1}function vr(t){let e=t.length-1;for(let n=e;n>=4;n--)if(t[n-4]===9&&t[n-3]===Ut&&t[n-2]===zt&&t[n-1]===Vt&&t[n]===Wt)return n-3;return 0}function yr(t,e,n=!1){let r=new Uint8Array(13);e*=39.3701,r[0]=Ut,r[1]=zt,r[2]=Vt,r[3]=Wt,r[4]=e>>>24,r[5]=e>>>16,r[6]=e>>>8,r[7]=e&255,r[8]=r[4],r[9]=r[5],r[10]=r[6],r[11]=r[7],r[12]=1;let o=br(r),i=new Uint8Array(4);if(i[0]=o>>>24,i[1]=o>>>16,i[2]=o>>>8,i[3]=o&255,n){let s=vr(t);return t.set(r,s),t.set(i,s+13),t}else{let s=new Uint8Array(4);s[0]=0,s[1]=0,s[2]=0,s[3]=9;let a=new Uint8Array(54);return a.set(t,0),a.set(s,33),a.set(r,37),a.set(i,50),a}}var wr="AAlwSFlz",kr="AAAJcEhZ",xr="AAAACXBI";function Sr(t){let e=t.indexOf(wr);return e===-1&&(e=t.indexOf(kr)),e===-1&&(e=t.indexOf(xr)),e}var Yt="[modern-screenshot]",_=typeof window!="undefined",Er=_&&"Worker"in window,Cr=_&&"atob"in window,Tr=_&&"btoa"in window,jt,De=_?(jt=window.navigator)==null?void 0:jt.userAgent:"",qt=De.includes("Chrome"),he=De.includes("AppleWebKit")&&!qt,He=De.includes("Firefox"),Ar=t=>t&&"__CONTEXT__"in t,Nr=t=>t.constructor.name==="CSSFontFaceRule",Rr=t=>t.constructor.name==="CSSImportRule",_r=t=>t.constructor.name==="CSSLayerBlockRule",A=t=>t.nodeType===1,J=t=>typeof t.className=="object",Kt=t=>t.tagName==="image",Lr=t=>t.tagName==="use",K=t=>A(t)&&typeof t.style!="undefined"&&!J(t),Mr=t=>t.nodeType===8,Ir=t=>t.nodeType===3,U=t=>t.tagName==="IMG",pe=t=>t.tagName==="VIDEO",Pr=t=>t.tagName==="CANVAS",Or=t=>t.tagName==="TEXTAREA",Fr=t=>t.tagName==="INPUT",$r=t=>t.tagName==="STYLE",Br=t=>t.tagName==="SCRIPT",Dr=t=>t.tagName==="SELECT",Hr=t=>t.tagName==="SLOT",jr=t=>t.tagName==="IFRAME",Ur=(...t)=>console.warn(Yt,...t);function zr(t){var n;let e=(n=t==null?void 0:t.createElement)==null?void 0:n.call(t,"canvas");return e&&(e.height=e.width=1),!!e&&"toDataURL"in e&&!!e.toDataURL("image/webp").includes("image/webp")}var $e=t=>t.startsWith("data:");function Xt(t,e){if(t.match(/^[a-z]+:\/\//i))return t;if(_&&t.match(/^\/\//))return window.location.protocol+t;if(t.match(/^[a-z]+:/i)||!_)return t;let n=me().implementation.createHTMLDocument(),r=n.createElement("base"),o=n.createElement("a");return n.head.appendChild(r),n.body.appendChild(o),e&&(r.href=e),o.href=t,o.href}function me(t){var e;return(e=t&&A(t)?t==null?void 0:t.ownerDocument:t)!=null?e:window.document}var fe="http://www.w3.org/2000/svg";function Vr(t,e,n){let r=me(n).createElementNS(fe,"svg");return r.setAttributeNS(null,"width",t.toString()),r.setAttributeNS(null,"height",e.toString()),r.setAttributeNS(null,"viewBox",`0 0 ${t} ${e}`),r}function Wr(t,e){let n=new XMLSerializer().serializeToString(t);return e&&(n=n.replace(/[\u0000-\u0008\v\f\u000E-\u001F\uD800-\uDFFF\uFFFE\uFFFF]/gu,"")),`data:image/svg+xml;charset=utf-8,${encodeURIComponent(n)}`}function Yr(t,e){return new Promise((n,r)=>{let o=new FileReader;o.onload=()=>n(o.result),o.onerror=()=>r(o.error),o.onabort=()=>r(new Error(`Failed read blob to ${e}`)),e==="dataUrl"?o.readAsDataURL(t):e==="arrayBuffer"&&o.readAsArrayBuffer(t)})}var qr=t=>Yr(t,"dataUrl");function j(t,e){let n=me(e).createElement("img");return n.decoding="sync",n.loading="eager",n.src=t,n}function X(t,e){return new Promise(n=>{let{timeout:r,ownerDocument:o,onError:i,onWarn:s}=e!=null?e:{},a=typeof t=="string"?j(t,me(o)):t,l=null,d=null;function u(){n(a),l&&clearTimeout(l),d==null||d()}if(r&&(l=setTimeout(u,r)),pe(a)){let c=a.currentSrc||a.src;if(!c)return a.poster?X(a.poster,e).then(n):u();if(a.readyState>=2)return u();let h=u,p=m=>{s==null||s("Failed video load",c,m),i==null||i(m),u()};d=()=>{a.removeEventListener("loadeddata",h),a.removeEventListener("error",p)},a.addEventListener("loadeddata",h,{once:!0}),a.addEventListener("error",p,{once:!0})}else{let c=Kt(a)?a.href.baseVal:a.currentSrc||a.src;if(!c)return u();let h=async()=>{if(U(a)&&"decode"in a)try{await a.decode()}catch(m){s==null||s("Failed to decode image, trying to render anyway",a.dataset.originalSrc||c,m)}u()},p=m=>{s==null||s("Failed image load",a.dataset.originalSrc||c,m),u()};if(U(a)&&a.complete)return h();d=()=>{a.removeEventListener("load",h),a.removeEventListener("error",p)},a.addEventListener("load",h,{once:!0}),a.addEventListener("error",p,{once:!0})}})}async function Kr(t,e){K(t)&&(U(t)||pe(t)?await X(t,e):await Promise.all(["img","video"].flatMap(n=>Array.from(t.querySelectorAll(n)).map(r=>X(r,e)))))}var Gt=(function(){let e=0,n=()=>`0000${(Math.random()*36**4<<0).toString(36)}`.slice(-4);return()=>(e+=1,`u${n()}${e}`)})();function Jt(t){return t==null?void 0:t.split(",").map(e=>e.trim().replace(/"|'/g,"").toLowerCase()).filter(Boolean)}var Ot=0;function Xr(t){let e=`${Yt}[#${Ot}]`;return Ot++,{time:n=>t&&console.time(`${e} ${n}`),timeEnd:n=>t&&console.timeEnd(`${e} ${n}`),warn:(...n)=>t&&Ur(...n)}}function Gr(t){return{cache:t?"no-cache":"force-cache"}}async function ge(t,e){return Ar(t)?t:Jr(t,E(S({},e),{autoDestruct:!0}))}async function Jr(t,e){var p,m,g,f,v;let{scale:n=1,workerUrl:r,workerNumber:o=1}=e||{},i=!!(e!=null&&e.debug),s=(p=e==null?void 0:e.features)!=null?p:!0,a=(m=t.ownerDocument)!=null?m:_?window.document:void 0,l=(f=(g=t.ownerDocument)==null?void 0:g.defaultView)!=null?f:_?window:void 0,d=new Map,u=E(S({width:0,height:0,quality:1,type:"image/png",scale:n,backgroundColor:null,style:null,filter:null,maximumCanvasSize:0,timeout:3e4,progress:null,debug:i,fetch:S({requestInit:Gr((v=e==null?void 0:e.fetch)==null?void 0:v.bypassingCache),placeholderImage:"data:image/png;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",bypassingCache:!1},e==null?void 0:e.fetch),fetchFn:null,font:{},drawImageInterval:100,workerUrl:null,workerNumber:o,onCloneEachNode:null,onCloneNode:null,onEmbedNode:null,onCreateForeignObjectSvg:null,includeStyleProperties:null,autoDestruct:!1},e),{__CONTEXT__:!0,log:Xr(i),node:t,ownerDocument:a,ownerWindow:l,dpi:n===1?null:96*n,svgStyleElement:Zt(a),svgDefsElement:a==null?void 0:a.createElementNS(fe,"defs"),svgStyles:new Map,defaultComputedStyles:new Map,workers:[...Array.from({length:Er&&r&&o?o:0})].map(()=>{try{let b=new Worker(r);return b.onmessage=async y=>{var x,I,P,Nt;let{url:w,result:k}=y.data;k?(I=(x=d.get(w))==null?void 0:x.resolve)==null||I.call(x,k):(Nt=(P=d.get(w))==null?void 0:P.reject)==null||Nt.call(P,new Error(`Error receiving message from worker: ${w}`))},b.onmessageerror=y=>{var k,x;let{url:w}=y.data;(x=(k=d.get(w))==null?void 0:k.reject)==null||x.call(k,new Error(`Error receiving message from worker: ${w}`))},b}catch(b){return u.log.warn("Failed to new Worker",b),null}}).filter(Boolean),fontFamilies:new Map,fontCssTexts:new Map,acceptOfImage:`${[zr(a)&&"image/webp","image/svg+xml","image/*","*/*"].filter(Boolean).join(",")};q=0.8`,requests:d,drawImageCount:0,tasks:[],features:s,isEnable:b=>{var y,w;return b==="restoreScrollPosition"?typeof s=="boolean"?!1:(y=s[b])!=null?y:!1:typeof s=="boolean"?s:(w=s[b])!=null?w:!0},shadowRoots:[]});u.log.time("wait until load"),await Kr(t,{timeout:u.timeout,onWarn:u.log.warn}),u.log.timeEnd("wait until load");let{width:c,height:h}=Zr(t,u);return u.width=c,u.height=h,u}function Zt(t){if(!t)return;let e=t.createElement("style"),n=e.ownerDocument.createTextNode(`
.______background-clip--text {
  background-clip: text;
  -webkit-background-clip: text;
}
`);return e.appendChild(n),e}function Zr(t,e){let{width:n,height:r}=e;if(A(t)&&(!n||!r)){let o=t.getBoundingClientRect();n=n||o.width||Number(t.getAttribute("width"))||0,r=r||o.height||Number(t.getAttribute("height"))||0}return{width:n,height:r}}async function Qr(t,e){let{log:n,timeout:r,drawImageCount:o,drawImageInterval:i}=e;n.time("image to canvas");let s=await X(t,{timeout:r,onWarn:e.log.warn}),{canvas:a,context2d:l}=eo(t.ownerDocument,e),d=()=>{try{l==null||l.drawImage(s,0,0,a.width,a.height)}catch(u){e.log.warn("Failed to drawImage",u)}};if(d(),e.isEnable("fixSvgXmlDecode"))for(let u=0;u<o;u++)await new Promise(c=>{setTimeout(()=>{l==null||l.clearRect(0,0,a.width,a.height),d(),c()},u+i)});return e.drawImageCount=0,n.timeEnd("image to canvas"),a}function eo(t,e){let{width:n,height:r,scale:o,backgroundColor:i,maximumCanvasSize:s}=e,a=t.createElement("canvas");a.width=Math.floor(n*o),a.height=Math.floor(r*o),a.style.width=`${n}px`,a.style.height=`${r}px`,s&&(a.width>s||a.height>s)&&(a.width>s&&a.height>s?a.width>a.height?(a.height*=s/a.width,a.width=s):(a.width*=s/a.height,a.height=s):a.width>s?(a.height*=s/a.width,a.width=s):(a.width*=s/a.height,a.height=s));let l=a.getContext("2d");return l&&i&&(l.fillStyle=i,l.fillRect(0,0,a.width,a.height)),{canvas:a,context2d:l}}function Qt(t,e){if(t.ownerDocument)try{let i=t.toDataURL();if(i!=="data:,")return j(i,t.ownerDocument)}catch(i){e.log.warn("Failed to clone canvas",i)}let n=t.cloneNode(!1),r=t.getContext("2d"),o=n.getContext("2d");try{return r&&o&&o.putImageData(r.getImageData(0,0,t.width,t.height),0,0),n}catch(i){e.log.warn("Failed to clone canvas",i)}return n}function to(t,e){var n;try{if((n=t==null?void 0:t.contentDocument)!=null&&n.body)return je(t.contentDocument.body,e)}catch(r){e.log.warn("Failed to clone iframe",r)}return t.cloneNode(!1)}function no(t){let e=t.cloneNode(!1);return t.currentSrc&&t.currentSrc!==t.src&&(e.src=t.currentSrc,e.srcset=""),e.loading==="lazy"&&(e.loading="eager"),e}async function ro(t,e){if(t.ownerDocument&&!t.currentSrc&&t.poster)return j(t.poster,t.ownerDocument);let n=t.cloneNode(!1);n.crossOrigin="anonymous",t.currentSrc&&t.currentSrc!==t.src&&(n.src=t.currentSrc);let r=n.ownerDocument;if(r){let o=!0;if(await X(n,{onError:()=>o=!1,onWarn:e.log.warn}),!o)return t.poster?j(t.poster,t.ownerDocument):n;n.currentTime=t.currentTime,await new Promise(s=>{n.addEventListener("seeked",s,{once:!0})});let i=r.createElement("canvas");i.width=t.offsetWidth,i.height=t.offsetHeight;try{let s=i.getContext("2d");s&&s.drawImage(n,0,0,i.width,i.height)}catch(s){return e.log.warn("Failed to clone video",s),t.poster?j(t.poster,t.ownerDocument):n}return Qt(i,e)}return n}function oo(t,e){return Pr(t)?Qt(t,e):jr(t)?to(t,e):U(t)?no(t):pe(t)?ro(t,e):t.cloneNode(!1)}function io(t){let e=t.sandbox;if(!e){let{ownerDocument:n}=t;try{n&&(e=n.createElement("iframe"),e.id=`__SANDBOX__${Gt()}`,e.width="0",e.height="0",e.style.visibility="hidden",e.style.position="fixed",n.body.appendChild(e),e.srcdoc='<!DOCTYPE html><meta charset="UTF-8"><title></title><body>',t.sandbox=e)}catch(r){t.log.warn("Failed to getSandBox",r)}}return e}var so=["width","height","-webkit-text-fill-color"],ao=["stroke","fill"];function en(t,e,n){let{defaultComputedStyles:r}=n,o=t.nodeName.toLowerCase(),i=J(t)&&o!=="svg",s=i?ao.map(g=>[g,t.getAttribute(g)]).filter(([,g])=>g!==null):[],a=[i&&"svg",o,s.map((g,f)=>`${g}=${f}`).join(","),e].filter(Boolean).join(":");if(r.has(a))return r.get(a);let l=io(n),d=l==null?void 0:l.contentWindow;if(!d)return new Map;let u=d==null?void 0:d.document,c,h;i?(c=u.createElementNS(fe,"svg"),h=c.ownerDocument.createElementNS(c.namespaceURI,o),s.forEach(([g,f])=>{h.setAttributeNS(null,g,f)}),c.appendChild(h)):c=h=u.createElement(o),h.textContent=" ",u.body.appendChild(c);let p=d.getComputedStyle(h,e),m=new Map;for(let g=p.length,f=0;f<g;f++){let v=p.item(f);so.includes(v)||m.set(v,p.getPropertyValue(v))}return u.body.removeChild(c),r.set(a,m),m}function tn(t,e,n){var a;let r=new Map,o=[],i=new Map;if(n)for(let l of n)s(l);else for(let l=t.length,d=0;d<l;d++){let u=t.item(d);s(u)}for(let l=o.length,d=0;d<l;d++)(a=i.get(o[d]))==null||a.forEach((u,c)=>r.set(c,u));function s(l){let d=t.getPropertyValue(l),u=t.getPropertyPriority(l),c=l.lastIndexOf("-"),h=c>-1?l.substring(0,c):void 0;if(h){let p=i.get(h);p||(p=new Map,i.set(h,p)),p.set(l,[d,u])}e.get(l)===d&&!u||(h?o.push(h):r.set(l,[d,u]))}return r}function lo(t,e,n,r){var c,h,p,m;let{ownerWindow:o,includeStyleProperties:i,currentParentNodeStyle:s}=r,a=e.style,l=o.getComputedStyle(t),d=en(t,null,r);s==null||s.forEach((g,f)=>{d.delete(f)});let u=tn(l,d,i);u.delete("transition-property"),u.delete("all"),u.delete("d"),u.delete("content"),n&&(u.delete("margin-top"),u.delete("margin-right"),u.delete("margin-bottom"),u.delete("margin-left"),u.delete("margin-block-start"),u.delete("margin-block-end"),u.delete("margin-inline-start"),u.delete("margin-inline-end"),u.set("box-sizing",["border-box",""])),((c=u.get("background-clip"))==null?void 0:c[0])==="text"&&e.classList.add("______background-clip--text"),qt&&(u.has("font-kerning")||u.set("font-kerning",["normal",""]),(((h=u.get("overflow-x"))==null?void 0:h[0])==="hidden"||((p=u.get("overflow-y"))==null?void 0:p[0])==="hidden")&&((m=u.get("text-overflow"))==null?void 0:m[0])==="ellipsis"&&t.scrollWidth===t.clientWidth&&u.set("text-overflow",["clip",""]));for(let g=a.length,f=0;f<g;f++)a.removeProperty(a.item(f));return u.forEach(([g,f],v)=>{a.setProperty(v,g,f)}),u}function co(t,e){(Or(t)||Fr(t)||Dr(t))&&e.setAttribute("value",t.value)}var uo=["::before","::after"],ho=["::-webkit-scrollbar","::-webkit-scrollbar-button","::-webkit-scrollbar-thumb","::-webkit-scrollbar-track","::-webkit-scrollbar-track-piece","::-webkit-scrollbar-corner","::-webkit-resizer"];function po(t,e,n,r,o){let{ownerWindow:i,svgStyleElement:s,svgStyles:a,currentNodeStyle:l}=r;if(!s||!i)return;function d(u){var y;let c=i.getComputedStyle(t,u),h=c.getPropertyValue("content");if(!h||h==="none")return;o==null||o(h),h=h.replace(/(')|(")|(counter\(.+\))/g,"");let p=[Gt()],m=en(t,u,r);l==null||l.forEach((w,k)=>{m.delete(k)});let g=tn(c,m,r.includeStyleProperties);g.delete("content"),g.delete("-webkit-locale"),((y=g.get("background-clip"))==null?void 0:y[0])==="text"&&e.classList.add("______background-clip--text");let f=[`content: '${h}';`];if(g.forEach(([w,k],x)=>{f.push(`${x}: ${w}${k?" !important":""};`)}),f.length===1)return;try{e.className=[e.className,...p].join(" ")}catch(w){r.log.warn("Failed to copyPseudoClass",w);return}let v=f.join(`
  `),b=a.get(v);b||(b=[],a.set(v,b)),b.push(`.${p[0]}${u}`)}uo.forEach(d),n&&ho.forEach(d)}var Ft=new Set(["symbol"]);async function $t(t,e,n,r,o){if(A(n)&&($r(n)||Br(n))||r.filter&&!r.filter(n))return;Ft.has(e.nodeName)||Ft.has(n.nodeName)?r.currentParentNodeStyle=void 0:r.currentParentNodeStyle=r.currentNodeStyle;let i=await je(n,r,!1,o);r.isEnable("restoreScrollPosition")&&mo(t,i),e.appendChild(i)}async function Bt(t,e,n,r){var i;let o=t.firstChild;A(t)&&t.shadowRoot&&(o=(i=t.shadowRoot)==null?void 0:i.firstChild,n.shadowRoots.push(t.shadowRoot));for(let s=o;s;s=s.nextSibling)if(!Mr(s))if(A(s)&&Hr(s)&&typeof s.assignedNodes=="function"){let a=s.assignedNodes();for(let l=0;l<a.length;l++)await $t(t,e,a[l],n,r)}else await $t(t,e,s,n,r)}function mo(t,e){if(!K(t)||!K(e))return;let{scrollTop:n,scrollLeft:r}=t;if(!n&&!r)return;let{transform:o}=e.style,i=new DOMMatrix(o),{a:s,b:a,c:l,d}=i;i.a=1,i.b=0,i.c=0,i.d=1,i.translateSelf(-r,-n),i.a=s,i.b=a,i.c=l,i.d=d,e.style.transform=i.toString()}function fo(t,e){let{backgroundColor:n,width:r,height:o,style:i}=e,s=t.style;if(n&&s.setProperty("background-color",n,"important"),r&&s.setProperty("width",`${r}px`,"important"),o&&s.setProperty("height",`${o}px`,"important"),i)for(let a in i)s[a]=i[a]}var go=/^[\w-:]+$/;async function je(t,e,n=!1,r){var d,u,c,h;let{ownerDocument:o,ownerWindow:i,fontFamilies:s,onCloneEachNode:a}=e;if(o&&Ir(t))return r&&/\S/.test(t.data)&&r(t.data),o.createTextNode(t.data);if(o&&i&&A(t)&&(K(t)||J(t))){let p=await oo(t,e);if(e.isEnable("removeAbnormalAttributes")){let y=p.getAttributeNames();for(let w=y.length,k=0;k<w;k++){let x=y[k];go.test(x)||p.removeAttribute(x)}}let m=e.currentNodeStyle=lo(t,p,n,e);n&&fo(p,e);let g=!1;if(e.isEnable("copyScrollbar")){let y=[(d=m.get("overflow-x"))==null?void 0:d[0],(u=m.get("overflow-y"))==null?void 0:u[0]];g=y.includes("scroll")||(y.includes("auto")||y.includes("overlay"))&&(t.scrollHeight>t.clientHeight||t.scrollWidth>t.clientWidth)}let f=(c=m.get("text-transform"))==null?void 0:c[0],v=Jt((h=m.get("font-family"))==null?void 0:h[0]),b=v?y=>{f==="uppercase"?y=y.toUpperCase():f==="lowercase"?y=y.toLowerCase():f==="capitalize"&&(y=y[0].toUpperCase()+y.substring(1)),v.forEach(w=>{let k=s.get(w);k||s.set(w,k=new Set),y.split("").forEach(x=>k.add(x))})}:void 0;return po(t,p,g,e,b),co(t,p),pe(t)||await Bt(t,p,e,b),await(a==null?void 0:a(p)),p}let l=t.cloneNode(!1);return await Bt(t,l,e),await(a==null?void 0:a(l)),l}function bo(t){if(t.ownerDocument=void 0,t.ownerWindow=void 0,t.svgStyleElement=void 0,t.svgDefsElement=void 0,t.svgStyles.clear(),t.defaultComputedStyles.clear(),t.sandbox){try{t.sandbox.remove()}catch(e){t.log.warn("Failed to destroyContext",e)}t.sandbox=void 0}t.workers=[],t.fontFamilies.clear(),t.fontCssTexts.clear(),t.requests.clear(),t.tasks=[],t.shadowRoots=[]}function vo(t){let a=t,{url:e,timeout:n,responseType:r}=a,o=Lt(a,["url","timeout","responseType"]),i=new AbortController,s=n?setTimeout(()=>i.abort(),n):void 0;return fetch(e,S({signal:i.signal},o)).then(l=>{if(!l.ok)throw new Error("Failed fetch, not 2xx response",{cause:l});switch(r){case"arrayBuffer":return l.arrayBuffer();case"dataUrl":return l.blob().then(qr);default:return l.text()}}).finally(()=>clearTimeout(s))}function G(t,e){let{url:n,requestType:r="text",responseType:o="text",imageDom:i}=e,s=n,{timeout:a,acceptOfImage:l,requests:d,fetchFn:u,fetch:{requestInit:c,bypassingCache:h,placeholderImage:p},font:m,workers:g,fontFamilies:f}=t;r==="image"&&(he||He)&&t.drawImageCount++;let v=d.get(n);if(!v){h&&h instanceof RegExp&&h.test(s)&&(s+=(/\?/.test(s)?"&":"?")+new Date().getTime());let b=r.startsWith("font")&&m&&m.minify,y=new Set;b&&r.split(";")[1].split(",").forEach(I=>{f.has(I)&&f.get(I).forEach(P=>y.add(P))});let w=b&&y.size,k=S({url:s,timeout:a,responseType:w?"arrayBuffer":o,headers:r==="image"?{accept:l}:void 0},c);v={type:r,resolve:void 0,reject:void 0,response:null},v.response=(async()=>{if(u&&r==="image"){let x=await u(n);if(x)return x}return!he&&n.startsWith("http")&&g.length?new Promise((x,I)=>{g[d.size&g.length-1].postMessage(S({rawUrl:n},k)),v.resolve=x,v.reject=I}):vo(k)})().catch(x=>{if(d.delete(n),r==="image"&&p)return t.log.warn("Failed to fetch image base64, trying to use placeholder image",s),typeof p=="string"?p:p(i);throw x}),d.set(n,v)}return v.response}async function nn(t,e,n,r){if(!rn(t))return t;for(let[o,i]of yo(t,e))try{let s=await G(n,{url:i,requestType:r?"image":"text",responseType:"dataUrl"});t=t.replace(wo(o),`$1${s}$3`)}catch(s){n.log.warn("Failed to fetch css data url",o,s)}return t}function rn(t){return/url\((['"]?)([^'"]+?)\1\)/.test(t)}var on=/url\((['"]?)([^'"]+?)\1\)/g;function yo(t,e){let n=[];return t.replace(on,(r,o,i)=>(n.push([i,Xt(i,e)]),r)),n.filter(([r])=>!$e(r))}function wo(t){let e=t.replace(/([.*+?^${}()|\[\]\/\\])/g,"\\$1");return new RegExp(`(url\\(['"]?)(${e})(['"]?\\))`,"g")}var ko=["background-image","border-image-source","-webkit-border-image","-webkit-mask-image","list-style-image"];function xo(t,e){return ko.map(n=>{let r=t.getPropertyValue(n);return!r||r==="none"?null:((he||He)&&e.drawImageCount++,nn(r,null,e,!0).then(o=>{!o||r===o||t.setProperty(n,o,t.getPropertyPriority(n))}))}).filter(Boolean)}function So(t,e){if(U(t)){let n=t.currentSrc||t.src;if(!$e(n))return[G(e,{url:n,imageDom:t,requestType:"image",responseType:"dataUrl"}).then(r=>{r&&(t.srcset="",t.dataset.originalSrc=n,t.src=r||"")})];(he||He)&&e.drawImageCount++}else if(J(t)&&!$e(t.href.baseVal)){let n=t.href.baseVal;return[G(e,{url:n,imageDom:t,requestType:"image",responseType:"dataUrl"}).then(r=>{r&&(t.dataset.originalSrc=n,t.href.baseVal=r||"")})]}return[]}function Eo(t,e){var a;let{ownerDocument:n,svgDefsElement:r}=e,o=(a=t.getAttribute("href"))!=null?a:t.getAttribute("xlink:href");if(!o)return[];let[i,s]=o.split("#");if(s){let l=`#${s}`,d=e.shadowRoots.reduce((u,c)=>u!=null?u:c.querySelector(`svg ${l}`),n==null?void 0:n.querySelector(`svg ${l}`));if(i&&t.setAttribute("href",l),r!=null&&r.querySelector(l))return[];if(d)return r==null||r.appendChild(d.cloneNode(!0)),[];if(i)return[G(e,{url:i,responseType:"text"}).then(u=>{r==null||r.insertAdjacentHTML("beforeend",u)})]}return[]}function sn(t,e){let{tasks:n}=e;A(t)&&((U(t)||Kt(t))&&n.push(...So(t,e)),Lr(t)&&n.push(...Eo(t,e))),K(t)&&n.push(...xo(t.style,e)),t.childNodes.forEach(r=>{sn(r,e)})}async function Co(t,e){let{ownerDocument:n,svgStyleElement:r,fontFamilies:o,fontCssTexts:i,tasks:s,font:a}=e;if(!(!n||!r||!o.size))if(a&&a.cssText){let l=Ht(a.cssText,e);r.appendChild(n.createTextNode(`${l}
`))}else{let l=Array.from(n.styleSheets).filter(u=>{try{return"cssRules"in u&&!!u.cssRules.length}catch(c){return e.log.warn(`Error while reading CSS rules from ${u.href}`,c),!1}});await Promise.all(l.flatMap(u=>Array.from(u.cssRules).map(async(c,h)=>{if(Rr(c)){let p=h+1,m=c.href,g="";try{g=await G(e,{url:m,requestType:"text",responseType:"text"})}catch(v){e.log.warn(`Error fetch remote css import from ${m}`,v)}let f=g.replace(on,(v,b,y)=>v.replace(y,Xt(y,m)));for(let v of Ao(f))try{u.insertRule(v,v.startsWith("@import")?p+=1:u.cssRules.length)}catch(b){e.log.warn("Error inserting rule from remote css import",{rule:v,error:b})}}})));let d=[];l.forEach(u=>{Be(u.cssRules,d)}),d.filter(u=>{var c;return Nr(u)&&rn(u.style.getPropertyValue("src"))&&((c=Jt(u.style.getPropertyValue("font-family")))==null?void 0:c.some(h=>o.has(h)))}).forEach(u=>{let c=u,h=i.get(c.cssText);h?r.appendChild(n.createTextNode(`${h}
`)):s.push(nn(c.cssText,c.parentStyleSheet?c.parentStyleSheet.href:null,e).then(p=>{p=Ht(p,e),i.set(c.cssText,p),r.appendChild(n.createTextNode(`${p}
`))}))})}}var To=/(\/\*[\s\S]*?\*\/)/g,Dt=/((@.*?keyframes [\s\S]*?){([\s\S]*?}\s*?)})/gi;function Ao(t){if(t==null)return[];let e=[],n=t.replace(To,"");for(;;){let i=Dt.exec(n);if(!i)break;e.push(i[0])}n=n.replace(Dt,"");let r=/@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi,o=new RegExp("((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})","gi");for(;;){let i=r.exec(n);if(i)o.lastIndex=r.lastIndex;else if(i=o.exec(n),i)r.lastIndex=o.lastIndex;else break;e.push(i[0])}return e}var No=/url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g,Ro=/src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;function Ht(t,e){let{font:n}=e,r=n?n==null?void 0:n.preferredFormat:void 0;return r?t.replace(Ro,o=>{for(;;){let[i,,s]=No.exec(o)||[];if(!s)return"";if(s===r)return`src: ${i};`}}):t}function Be(t,e=[]){for(let n of Array.from(t))_r(n)?e.push(...Be(n.cssRules)):"cssRules"in n?Be(n.cssRules,e):e.push(n);return e}async function _o(t,e){let n=await ge(t,e);if(A(n.node)&&J(n.node))return n.node;let{ownerDocument:r,log:o,tasks:i,svgStyleElement:s,svgDefsElement:a,svgStyles:l,font:d,progress:u,autoDestruct:c,onCloneNode:h,onEmbedNode:p,onCreateForeignObjectSvg:m}=n;o.time("clone node");let g=await je(n.node,n,!0);if(s&&r){let w="";l.forEach((k,x)=>{w+=`${k.join(`,
`)} {
  ${x}
}
`}),s.appendChild(r.createTextNode(w))}o.timeEnd("clone node"),await(h==null?void 0:h(g)),d!==!1&&A(g)&&(o.time("embed web font"),await Co(g,n),o.timeEnd("embed web font")),o.time("embed node"),sn(g,n);let f=i.length,v=0,b=async()=>{for(;;){let w=i.pop();if(!w)break;try{await w}catch(k){n.log.warn("Failed to run task",k)}u==null||u(++v,f)}};u==null||u(v,f),await Promise.all([...Array.from({length:4})].map(b)),o.timeEnd("embed node"),await(p==null?void 0:p(g));let y=Lo(g,n);return a&&y.insertBefore(a,y.children[0]),s&&y.insertBefore(s,y.children[0]),c&&bo(n),await(m==null?void 0:m(y)),y}function Lo(t,e){let{width:n,height:r}=e,o=Vr(n,r,t.ownerDocument),i=o.ownerDocument.createElementNS(o.namespaceURI,"foreignObject");return i.setAttributeNS(null,"x","0%"),i.setAttributeNS(null,"y","0%"),i.setAttributeNS(null,"width","100%"),i.setAttributeNS(null,"height","100%"),i.append(t),o.appendChild(i),o}async function Mo(t,e){var s;let n=await ge(t,e),r=await _o(n),o=Wr(r,n.isEnable("removeControlCharacter"));n.autoDestruct||(n.svgStyleElement=Zt(n.ownerDocument),n.svgDefsElement=(s=n.ownerDocument)==null?void 0:s.createElementNS(fe,"defs"),n.svgStyles.clear());let i=j(o,r.ownerDocument);return await Qr(i,n)}async function Io(t,e){let n=await ge(t,e),{log:r,quality:o,type:i,dpi:s}=n,a=await Mo(n);r.time("canvas to data url");let l=a.toDataURL(i,o);if(["image/png","image/jpeg"].includes(i)&&s&&Cr&&Tr){let[d,u]=l.split(","),c=0,h=!1;if(i==="image/png"){let y=Sr(u);y>=0?(c=Math.ceil((y+28)/3)*4,h=!0):c=33/3*4}else i==="image/jpeg"&&(c=18/3*4);let p=u.substring(0,c),m=u.substring(c),g=window.atob(p),f=new Uint8Array(g.length);for(let y=0;y<f.length;y++)f[y]=g.charCodeAt(y);let v=i==="image/png"?yr(f,s,h):fr(f,s),b=window.btoa(String.fromCharCode(...v));l=[d,",",b,m].join("")}return r.timeEnd("canvas to data url"),l}async function Ue(t,e){return Io(await ge(t,E(S({},e),{type:"image/png"})))}function an(t){var e;return!((e=t.getAttribute)!=null&&e.call(t,"data-instruckt"))}var O=null;async function ln(){return O&&O.active||(O=await navigator.mediaDevices.getDisplayMedia({video:{displaySurface:"browser"},preferCurrentTab:!0}),O.getVideoTracks()[0].addEventListener("ended",()=>{O=null})),O}async function Po(t){let e=document.createElement("video");e.srcObject=t,e.muted=!0,await e.play(),await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));let n=await createImageBitmap(e);return e.pause(),e.srcObject=null,n}function cn(t,e){return Po(t).then(n=>{let r=window.devicePixelRatio||1,o=document.createElement("canvas");return o.width=e.width*r,o.height=e.height*r,o.getContext("2d").drawImage(n,e.x*r,e.y*r,e.width*r,e.height*r,0,0,o.width,o.height),n.close(),o.toDataURL("image/png")})}var ze=!1;function un(t){ze=t}async function dn(t){if(!ze)try{let e=await Ue(t,{scale:2,filter:an});if(e)return e}catch(e){}try{let e=await ln();return await cn(e,t.getBoundingClientRect())}catch(e){return console.warn("[instruckt] captureElement failed:",e),null}}async function hn(t){if(!ze)try{let e=await Ue(document.body,{scale:2,filter:an});if(e)return await Oo(e,t)}catch(e){}try{let e=await ln();return await cn(e,t)}catch(e){return console.warn("[instruckt] captureRegion failed:",e),null}}function Oo(t,e){return new Promise((n,r)=>{let o=new Image;o.onload=()=>{let s=document.createElement("canvas");s.width=e.width*2,s.height=e.height*2,s.getContext("2d").drawImage(o,e.x*2,e.y*2,e.width*2,e.height*2,0,0,e.width*2,e.height*2),n(s.toDataURL("image/png"))},o.onerror=r,o.src=t})}function pn(){return new Promise(t=>{let e=document.createElement("div");Object.assign(e.style,{position:"fixed",inset:"0",zIndex:"2147483647",cursor:"crosshair",background:"rgba(0,0,0,0.1)",touchAction:"none"}),e.setAttribute("data-instruckt","region-select");let n=document.createElement("div");Object.assign(n.style,{position:"fixed",border:"2px dashed #6366f1",background:"rgba(99,102,241,0.08)",borderRadius:"4px",display:"none",pointerEvents:"none"}),e.appendChild(n);let r=0,o=0,i=!1,s=h=>{e.setPointerCapture(h.pointerId),r=h.clientX,o=h.clientY,i=!0,n.style.display="block",l(h)},a=h=>{i&&l(h)},l=h=>{let p=Math.min(r,h.clientX),m=Math.min(o,h.clientY),g=Math.abs(h.clientX-r),f=Math.abs(h.clientY-o);Object.assign(n.style,{left:`${p}px`,top:`${m}px`,width:`${g}px`,height:`${f}px`})},d=h=>{if(!i)return;i=!1;let p=Math.min(r,h.clientX),m=Math.min(o,h.clientY),g=Math.abs(h.clientX-r),f=Math.abs(h.clientY-o);c(),g<10||f<10?t(null):t(new DOMRect(p,m,g,f))},u=h=>{h.key==="Escape"&&(c(),t(null))},c=()=>{e.remove(),document.removeEventListener("keydown",u,!0)};e.addEventListener("pointerdown",s),e.addEventListener("pointermove",a),e.addEventListener("pointerup",d),e.addEventListener("pointercancel",()=>{c(),t(null)}),document.addEventListener("keydown",u,!0),document.body.appendChild(e)})}function Ve(t,e){return t?t.startsWith("data:")?t:`${e!=null?e:"/instruckt"}/${t}`:null}function L(t){return String(t!=null?t:"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}var be=class{constructor(){this.host=null;this.shadow=null;this.boundOutside=e=>{this.host&&!this.host.contains(e.target)&&this.destroy()}}showNew(e,n){var m,g;this.destroy(),this.host=document.createElement("div"),this.host.setAttribute("data-instruckt","popup"),this.stopHostPropagation(this.host),this.shadow=this.host.attachShadow({mode:"open"});let r=document.createElement("style");r.textContent=Pe,this.shadow.appendChild(r);let o=document.createElement("div");o.className="popup";let i=e.framework?`<div class="fw-badge">${L(e.framework.component)}</div>`:"",s=e.selectedText?`<div class="selected-text">"${L(e.selectedText.slice(0,80))}"</div>`:"",a=!!e.screenshot;o.innerHTML=`
      <div class="header">
        <span class="element-tag" title="${L(e.elementPath)}">${L(e.elementLabel)}</span>
        <button class="close-btn" title="Cancel (Esc)">\u2715</button>
      </div>
      ${i}${s}
      <div class="screenshot-slot">${a?`<div class="screenshot-preview"><img src="${e.screenshot}" alt="Screenshot" /><button class="screenshot-remove" title="Remove screenshot">\u2715</button></div>`:'<button class="btn-capture" data-action="capture"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg> Capture screenshot</button>'}</div>
      <textarea placeholder="${a?"Add a note (optional)":"What needs to change here?"}" rows="3"></textarea>
      <div class="actions">
        <button class="btn-secondary" data-action="cancel">Cancel</button>
        <button class="btn-primary" data-action="submit" ${a?"":"disabled"}>Add note</button>
      </div>
    `;let l=(m=e.screenshot)!=null?m:null,d=o.querySelector("textarea"),u=o.querySelector('[data-action="submit"]'),c=o.querySelector(".screenshot-slot"),h=()=>{u.disabled=!l&&d.value.trim().length===0},p=()=>{let f=c.querySelector('[data-action="capture"]');f==null||f.addEventListener("click",async()=>{f.textContent="Capturing...";let b=await dn(e.element);b?(l=b,c.innerHTML=`<div class="screenshot-preview"><img src="${b}" alt="Screenshot" /><button class="screenshot-remove" title="Remove screenshot">\u2715</button></div>`,d.placeholder="Add a note (optional)",p(),h()):(f.textContent="Capture failed",setTimeout(()=>{f.parentElement&&(f.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg> Capture screenshot')},1500))});let v=c.querySelector(".screenshot-remove");v==null||v.addEventListener("click",()=>{l=null,c.innerHTML='<button class="btn-capture" data-action="capture"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg> Capture screenshot</button>',d.placeholder="What needs to change here?",p(),h()})};p(),d.addEventListener("input",h),d.addEventListener("keydown",f=>{f.stopPropagation(),f.key==="Enter"&&!f.shiftKey&&(f.preventDefault(),u.disabled||u.click()),f.key==="Escape"&&(n.onCancel(),this.destroy())}),o.querySelector('[data-action="cancel"]').addEventListener("click",()=>{n.onCancel(),this.destroy()}),o.querySelector(".close-btn").addEventListener("click",()=>{n.onCancel(),this.destroy()}),u.addEventListener("click",()=>{let f=d.value.trim();!f&&!l||(n.onSubmit({comment:f||"(screenshot)",screenshot:l!=null?l:void 0}),this.destroy())}),this.shadow.appendChild(o),((g=document.getElementById("instruckt-root"))!=null?g:document.body).appendChild(this.host),this.positionHost(e.x,e.y),this.setupOutsideClick(),d.focus()}showEdit(e,n,r){var f;this.destroy(),this.host=document.createElement("div"),this.host.setAttribute("data-instruckt","popup"),this.stopHostPropagation(this.host),this.shadow=this.host.attachShadow({mode:"open"});let o=document.createElement("style");o.textContent=Pe,this.shadow.appendChild(o);let i=document.createElement("div");i.className="popup";let s=e.framework?`<div class="fw-badge">${L(e.framework.component)}</div>`:"",a=Ve(e.screenshot,r),l=a?`<div class="screenshot-preview screenshot-slot"><img src="${a}" alt="Screenshot" /><button class="screenshot-remove" title="Remove screenshot">\u2715</button></div>`:"",d=e.comment==="(screenshot)"?"":e.comment;i.innerHTML=`
      <div class="header">
        <span class="element-tag" title="${L(e.elementPath)}">${L(e.element)}</span>
        <button class="close-btn">\u2715</button>
      </div>
      ${s}${l}
      <textarea rows="3">${L(d)}</textarea>
      <div class="actions">
        <button class="btn-danger" data-action="delete">Remove</button>
        <button class="btn-primary" data-action="save">Save</button>
      </div>
    `,i.querySelector(".close-btn").addEventListener("click",()=>this.destroy());let u=i.querySelector(".screenshot-remove");u==null||u.addEventListener("click",()=>{n.onSave(e,e.comment);let v=i.querySelector(".screenshot-slot");v&&v.remove()});let c=i.querySelector("textarea"),h=i.querySelector('[data-action="save"]'),p=i.querySelector('[data-action="delete"]');c.addEventListener("keydown",v=>{v.stopPropagation(),v.key==="Enter"&&!v.shiftKey&&(v.preventDefault(),h.click()),v.key==="Escape"&&this.destroy()}),h.addEventListener("click",()=>{let v=c.value.trim();v&&(n.onSave(e,v),this.destroy())}),p.addEventListener("click",()=>{n.onDelete(e),this.destroy()}),this.shadow.appendChild(i),((f=document.getElementById("instruckt-root"))!=null?f:document.body).appendChild(this.host);let m=e.x/100*window.innerWidth,g=e.y-window.scrollY;this.positionHost(m,g),this.setupOutsideClick(),c.focus(),c.setSelectionRange(c.value.length,c.value.length)}stopHostPropagation(e){for(let n of["click","mousedown","pointerdown","keydown","keyup","keypress","submit"])e.addEventListener(n,r=>r.stopPropagation())}positionHost(e,n){if(this.host){this.host.setAttribute("popover","manual");try{this.host.showPopover()}catch(r){}Object.assign(this.host.style,{position:"fixed",zIndex:"2147483647",left:"-9999px",top:"0"}),requestAnimationFrame(()=>{var d,u;if(!this.host)return;let r=360,o=(u=(d=this.host.querySelector(".popup"))==null?void 0:d.getBoundingClientRect().height)!=null?u:300,i=window.innerWidth,s=window.innerHeight,a=Math.max(10,Math.min(e+10,i-r)),l=Math.max(10,Math.min(n+10,s-o-10));Object.assign(this.host.style,{left:`${a}px`,top:`${l}px`})})}}setupOutsideClick(){setTimeout(()=>document.addEventListener("mousedown",this.boundOutside),0)}destroy(){var e;(e=this.host)==null||e.remove(),this.host=null,this.shadow=null,document.removeEventListener("mousedown",this.boundOutside)}};var Z=class{constructor(e){this.onClick=e;this.markers=new Map;var r;this.container=document.createElement("div"),Object.assign(this.container.style,{position:"fixed",inset:"0",pointerEvents:"none",zIndex:"2147483645"}),this.container.setAttribute("data-instruckt","markers"),((r=document.getElementById("instruckt-root"))!=null?r:document.body).appendChild(this.container)}upsert(e,n){let r=this.markers.get(e.id);if(r){this.updateStyle(r.el,e);return}let o=document.createElement("div"),i=e.screenshot?" has-screenshot":"";o.className=`ik-marker ${this.statusClass(e.status)}${i}`,o.textContent=String(n),o.title=e.comment==="(screenshot)"?"Screenshot":e.comment.slice(0,60),o.style.pointerEvents="all",o.style.left=`${e.x/100*window.innerWidth}px`,o.style.top=`${e.y-window.scrollY}px`,o.addEventListener("click",s=>{s.stopPropagation(),this.onClick(e)}),this.container.appendChild(o),this.markers.set(e.id,{el:o,annotationId:e.id})}update(e){let n=this.markers.get(e.id);n&&this.updateStyle(n.el,e)}updateStyle(e,n){let r=n.screenshot?" has-screenshot":"";e.className=`ik-marker ${this.statusClass(n.status)}${r}`,e.title=n.comment==="(screenshot)"?"Screenshot":n.comment.slice(0,60)}statusClass(e){return e==="resolved"?"resolved":e==="dismissed"?"dismissed":""}reposition(e){e.forEach(n=>{let r=this.markers.get(n.id);r&&(r.el.style.left=`${n.x/100*window.innerWidth}px`,r.el.style.top=`${n.y-window.scrollY}px`)})}setHover(e){for(let{el:n,annotationId:r}of this.markers.values())n.classList.toggle("ik-hover",r===e);this.container.classList.toggle("ik-has-hover",e!==null&&this.markers.has(e))}pulse(e){var r;let n=(r=this.markers.get(e))==null?void 0:r.el;n&&(n.classList.remove("ik-pulse"),n.offsetWidth,n.classList.add("ik-pulse"),setTimeout(()=>n.classList.remove("ik-pulse"),1600))}remove(e){let n=this.markers.get(e);n&&(n.el.remove(),this.markers.delete(e))}setVisible(e){this.container.style.display=e?"":"none"}clear(){for(let{el:e}of this.markers.values())e.remove();this.markers.clear()}destroy(){this.container.remove(),this.markers.clear()}};var z={close:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>',goto:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>',copy:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',edit:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>',trash:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',check:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'};function F(t){return String(t!=null?t:"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Fo(t){let e=Math.max(0,(Date.now()-new Date(t).getTime())/1e3);return e<60?"just now":e<3600?`${Math.floor(e/60)}m ago`:e<86400?`${Math.floor(e/3600)}h ago`:`${Math.floor(e/86400)}d ago`}var ve=class{constructor(e){this.cb=e;this.host=null;this.shadow=null;this.scope="all";this.selected=new Set;this.editingId=null;this.draft="";this.confirmDelete=!1;this.confirmTimer=null;this.hoverId=null;this.dragged=null;this.drag=null;this.boundPosition=()=>this.position()}isOpen(){return this.host!==null}open(){var r;if(this.host)return;this.host=document.createElement("div"),this.host.setAttribute("data-instruckt","list");for(let o of["click","mousedown","pointerdown","keydown","keyup","keypress","submit"])this.host.addEventListener(o,i=>i.stopPropagation());this.shadow=this.host.attachShadow({mode:"open"});let e=document.createElement("style");e.textContent=Pt,this.shadow.appendChild(e);let n=document.createElement("div");n.className="panel",this.shadow.appendChild(n),n.addEventListener("click",o=>this.onClick(o)),n.addEventListener("change",o=>this.onChange(o)),n.addEventListener("input",o=>this.onInput(o)),n.addEventListener("keydown",o=>this.onKeydown(o)),n.addEventListener("mouseover",o=>this.onHover(o)),n.addEventListener("mouseleave",()=>this.setHover(null)),n.addEventListener("pointerdown",o=>this.onDragStart(o)),n.addEventListener("pointermove",o=>this.onDragMove(o)),n.addEventListener("pointerup",()=>{this.drag=null}),n.addEventListener("pointercancel",()=>{this.drag=null}),((r=document.getElementById("instruckt-root"))!=null?r:document.body).appendChild(this.host),window.addEventListener("resize",this.boundPosition,{passive:!0}),this.render(),this.position()}close(){this.host&&(this.host.remove(),this.host=null,this.shadow=null,this.editingId=null,this.dragged=null,this.drag=null,this.setHover(null),this.resetConfirm(),window.removeEventListener("resize",this.boundPosition))}refresh(){this.host&&(this.render(),this.position())}destroy(){this.close()}all(){return this.cb.annotations()}shown(){if(this.scope==="all")return this.all();let e=this.cb.currentPage();return this.all().filter(n=>this.cb.pageOf(n)===e)}targets(){let e=this.shown(),n=e.filter(r=>this.selected.has(r.id));return n.length>0?n:e}byId(e){return e?this.all().find(n=>n.id===e):void 0}render(){var b,y;let e=(b=this.shadow)==null?void 0:b.querySelector(".panel");if(!e)return;let n=this.all(),r=this.cb.currentPage(),o=n.filter(w=>this.cb.pageOf(w)===r).length,i=this.shown(),s=new Set(i.map(w=>w.id));for(let w of this.selected)s.has(w)||this.selected.delete(w);this.editingId&&!s.has(this.editingId)&&(this.editingId=null);let a=this.selected.size,l=i.length>0&&a===i.length,d=a>0?`${a} selected`:"Select all",u=a>0?`Copy ${a}`:"Copy all",c=this.confirmDelete?"Sure? Click again":a>0?`Delete ${a}`:"Delete all",h=new Map,p=new Map;for(let w of n){let k=this.cb.pageOf(w),x=((y=p.get(k))!=null?y:0)+1;p.set(k,x),h.set(w.id,x)}let m=new Map;for(let w of i){let k=this.cb.pageOf(w);m.has(k)||m.set(k,[]),m.get(k).push(w)}let g=[...m.keys()].sort((w,k)=>w===r?-1:k===r?1:0),f=i.length===0?`<div class="empty">${n.length===0?"No notes yet.<br>Press <kbd>A</kbd> and click any element to add one.":"No notes on this page."}</div>`:g.map(w=>`
        <div class="group">
          <div class="group-head"><span class="path" title="${F(w)}">${F(w)}</span>${w===r?'<span class="here">this page</span>':""}</div>
          ${m.get(w).map(k=>{var x;return this.renderItem(k,(x=h.get(k.id))!=null?x:0)}).join("")}
        </div>`).join("");e.innerHTML=`
      <div class="head" title="Drag to move">
        <div class="title">Notes <span class="count">${n.length}</span></div>
        <button class="icon-btn" data-action="close" title="Close (Esc)" aria-label="Close">${z.close}</button>
      </div>
      <div class="tabs" role="tablist">
        <button class="tab ${this.scope==="all"?"on":""}" data-action="scope" data-scope="all" role="tab">All pages <span>${n.length}</span></button>
        <button class="tab ${this.scope==="page"?"on":""}" data-action="scope" data-scope="page" role="tab">This page <span>${o}</span></button>
      </div>
      ${i.length>0?`
      <div class="bulk">
        <label class="sel-all"><input type="checkbox" data-action="select-all" ${l?"checked":""} />${d}</label>
        <div class="bulk-actions">
          <button class="btn" data-action="copy-bulk">${u}</button>
          <button class="btn danger ${this.confirmDelete?"confirm":""}" data-action="delete-bulk">${c}</button>
        </div>
      </div>`:""}
      <div class="list">${f}</div>
    `;let v=e.querySelector('[data-action="select-all"]');if(v&&(v.indeterminate=a>0&&!l),this.editingId){let w=e.querySelector("textarea");w&&(w.focus(),w.setSelectionRange(w.value.length,w.value.length))}}renderItem(e,n){var a,l;let r=this.editingId===e.id,o=this.cb.screenshotSrc(e),i=e.comment==="(screenshot)"?"<em>Screenshot only</em>":F(e.comment),s=r?`<textarea rows="3" data-id="${e.id}">${F(this.draft)}</textarea>
         <div class="edit-actions">
           <button class="btn" data-action="cancel-edit">Cancel</button>
           <button class="btn primary" data-action="save" data-id="${e.id}">Save</button>
         </div>`:`<div class="comment">${i}</div>`;return`
      <div class="item ${this.selected.has(e.id)?"sel":""}" data-id="${e.id}">
        <input type="checkbox" data-action="select" data-id="${e.id}" ${this.selected.has(e.id)?"checked":""} aria-label="Select note ${n}" />
        <span class="num ${e.screenshot?"shot":""}">${n}</span>
        <div class="main">
          ${s}
          <div class="meta"><span class="el" title="${F(e.elementPath)}">${F((l=(a=e.framework)==null?void 0:a.component)!=null?l:e.element)}</span><span>${Fo(e.createdAt)}</span></div>
          ${o&&!r?`<img class="thumb" src="${F(o)}" alt="Screenshot" data-action="goto" data-id="${e.id}" />`:""}
        </div>
        ${r?"":`<div class="row-actions">
          <button class="icon-btn" data-action="goto" data-id="${e.id}" title="Show on page" aria-label="Show on page">${z.goto}</button>
          <button class="icon-btn" data-action="copy" data-id="${e.id}" title="Copy" aria-label="Copy">${z.copy}</button>
          <button class="icon-btn" data-action="edit" data-id="${e.id}" title="Edit" aria-label="Edit">${z.edit}</button>
          <button class="icon-btn danger" data-action="delete" data-id="${e.id}" title="Delete" aria-label="Delete">${z.trash}</button>
        </div>`}
      </div>`}position(){if(!this.host)return;let e=window.innerWidth,n=window.innerHeight,r=10,o=16,i=this.host.offsetHeight;if(this.dragged){let u=this.host.offsetWidth,c=Math.max(o-u+80,Math.min(this.dragged.left,e-80)),h=Math.max(0,Math.min(this.dragged.top,n-40));Object.assign(this.host.style,{left:`${c}px`,top:`${h}px`,right:"auto"});return}let s=this.cb.anchor(),a=Math.min(380,e-2*o),l=e-o-a,d=o;if(s){let u=s.bar.left-r-o,c=e-s.bar.right-r-o;u>=280&&u>=c?(a=Math.min(380,u),l=s.bar.left-r-a):c>=280&&(a=Math.min(380,c),l=s.bar.right+r),d=Math.max(o,Math.min(s.button.top-10,n-o-i))}Object.assign(this.host.style,{position:"fixed",zIndex:"2147483646",width:`${a}px`,left:`${l}px`,top:`${d}px`,right:"auto"})}onDragStart(e){let n=e.target;if(!n.closest(".head")||n.closest("button")||!this.host)return;let r=this.host.getBoundingClientRect();this.drag={dx:e.clientX-r.left,dy:e.clientY-r.top},n.closest(".head").setPointerCapture(e.pointerId),e.preventDefault()}onDragMove(e){this.drag&&(this.dragged={left:e.clientX-this.drag.dx,top:e.clientY-this.drag.dy},this.position())}onHover(e){var r;let n=e.target.closest(".item");this.setHover((r=n==null?void 0:n.dataset.id)!=null?r:null)}setHover(e){var n;e!==this.hoverId&&(this.hoverId=e,this.cb.onHover((n=this.byId(e!=null?e:void 0))!=null?n:null))}async onClick(e){let n=e.target.closest("[data-action]");if(!n||n instanceof HTMLInputElement)return;let r=n.dataset.action,o=this.byId(n.dataset.id);switch(r!=="delete-bulk"&&this.resetConfirm(),r){case"close":this.close(),this.cb.onClose();break;case"scope":this.scope=n.dataset.scope==="page"?"page":"all",this.selected.clear(),this.render();break;case"copy-bulk":await this.cb.onCopy(this.targets())&&this.flash(n,"Copied");break;case"delete-bulk":if(!this.confirmDelete){this.confirmDelete=!0,this.confirmTimer=setTimeout(()=>{this.resetConfirm(),this.render()},3e3),this.render();return}this.resetConfirm(),await this.cb.onDelete(this.targets()),this.selected.clear(),this.render();break;case"goto":o&&this.cb.onGoTo(o);break;case"copy":o&&await this.cb.onCopy([o])&&this.flash(n,z.check);break;case"edit":if(!o)return;this.editingId=o.id,this.draft=o.comment==="(screenshot)"?"":o.comment,this.render();break;case"cancel-edit":this.editingId=null,this.render();break;case"save":await this.save();break;case"delete":if(!o)return;this.selected.delete(o.id),await this.cb.onDelete([o]);break}}onChange(e){let n=e.target;if(n.dataset.action==="select-all"){let r=this.shown();n.checked?r.forEach(o=>this.selected.add(o.id)):this.selected.clear()}else if(n.dataset.action==="select"&&n.dataset.id)n.checked?this.selected.add(n.dataset.id):this.selected.delete(n.dataset.id);else return;this.resetConfirm(),this.render()}onInput(e){let n=e.target;n.tagName==="TEXTAREA"&&(this.draft=n.value)}onKeydown(e){e.target.tagName==="TEXTAREA"&&e.key==="Enter"&&!e.shiftKey?(e.preventDefault(),this.save()):e.key==="Escape"&&(this.editingId?(this.editingId=null,this.render()):(this.close(),this.cb.onClose()))}async save(){var r;let e=this.byId((r=this.editingId)!=null?r:void 0),n=this.draft.trim();!e||!n||(this.editingId=null,await this.cb.onSave(e,n),this.render())}resetConfirm(){this.confirmDelete=!1,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}flash(e,n){let r=e.innerHTML;e.innerHTML=n,e.classList.add("done"),setTimeout(()=>{e.innerHTML=r,e.classList.remove("done")},1200)}};var $o=280,Bo=48,Do=8,Ho='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>',ye=class{constructor(e){this.cb=e;this.aimed=null;this.holdTimer=null;this.holding=!1;this.start={x:0,y:0};this.suppressUntil=0;this.raf=0;this.onTouchStart=e=>{if(e.touches.length!==1||this.cb.isOurs(e.target)){this.cancelHold();return}let n=e.touches[0];this.start={x:n.clientX,y:n.clientY},this.cancelHold(),this.holdTimer=setTimeout(()=>{this.holdTimer=null,this.holding=!0,this.hideBar(),this.moveRing(this.start.x,this.start.y)},$o)};this.onTouchMove=e=>{let n=e.touches[0];if(n){if(this.holding){e.preventDefault(),this.moveRing(n.clientX,n.clientY);return}this.holdTimer&&Math.hypot(n.clientX-this.start.x,n.clientY-this.start.y)>Do&&this.cancelHold()}};this.onTouchEnd=()=>{this.holdTimer&&this.cancelHold(),this.holding&&(this.holding=!1,this.ring.hidden=!0,this.suppressUntil=Date.now()+450,this.aimed&&this.placeBar())};this.onContextMenu=e=>{(this.holding||this.holdTimer||this.aimed)&&e.preventDefault()};this.onScroll=()=>{this.aimed&&(cancelAnimationFrame(this.raf),this.raf=requestAnimationFrame(()=>{this.aimed&&(this.cb.highlight(this.aimed),this.bar.hidden||this.placeBar())}))};var o;this.host=document.createElement("div"),this.host.setAttribute("data-instruckt","aim"),Object.assign(this.host.style,{position:"fixed",inset:"0",zIndex:"2147483646",pointerEvents:"none"});let n=this.host.attachShadow({mode:"open"}),r=document.createElement("style");r.textContent=Mt,n.appendChild(r),this.bar=document.createElement("div"),this.bar.className="bar",this.bar.hidden=!0,this.bar.innerHTML=`<button type="button" class="x" aria-label="Stop aiming">${Ho}</button><button type="button" class="add">Add note</button>`,this.bar.querySelector(".x").addEventListener("click",i=>{i.stopPropagation(),this.clear()}),this.bar.querySelector(".add").addEventListener("click",i=>{i.stopPropagation();let s=this.aimed;s&&(this.hideBar(),this.cb.onAdd(s))}),n.appendChild(this.bar),this.ring=document.createElement("div"),this.ring.className="ring",this.ring.hidden=!0,n.appendChild(this.ring);for(let i of["click","mousedown","pointerdown","touchstart"])this.host.addEventListener(i,s=>s.stopPropagation());((o=document.getElementById("instruckt-root"))!=null?o:document.body).appendChild(this.host)}attach(){window.addEventListener("touchstart",this.onTouchStart,{capture:!0,passive:!0}),window.addEventListener("touchmove",this.onTouchMove,{capture:!0,passive:!1}),window.addEventListener("touchend",this.onTouchEnd,!0),window.addEventListener("touchcancel",this.onTouchEnd,!0),window.addEventListener("contextmenu",this.onContextMenu,!0),window.addEventListener("scroll",this.onScroll,{passive:!0}),window.addEventListener("resize",this.onScroll,{passive:!0})}detach(){window.removeEventListener("touchstart",this.onTouchStart,!0),window.removeEventListener("touchmove",this.onTouchMove,!0),window.removeEventListener("touchend",this.onTouchEnd,!0),window.removeEventListener("touchcancel",this.onTouchEnd,!0),window.removeEventListener("contextmenu",this.onContextMenu,!0),window.removeEventListener("scroll",this.onScroll),window.removeEventListener("resize",this.onScroll),this.cancelHold(),this.clear()}getAimed(){return this.aimed}tap(e){if(!(Date.now()<this.suppressUntil)){if(this.aimed&&this.aimed.contains(e)){let n=this.aimed;this.hideBar(),this.cb.onAdd(n);return}this.aim(e)}}aim(e){this.aimed=e,this.cb.highlight(e),this.placeBar()}clear(){this.aimed=null,this.hideBar(),this.cb.highlight(null)}done(){this.aimed=null,this.hideBar()}destroy(){this.detach(),this.host.remove()}cancelHold(){this.holdTimer&&clearTimeout(this.holdTimer),this.holdTimer=null}moveRing(e,n){let r=n-Bo;this.ring.hidden=!1,this.ring.style.left=`${e}px`,this.ring.style.top=`${r}px`;let o=document.elementFromPoint(e,r);!o||this.cb.isOurs(o)||o===document.documentElement||o===document.body||o!==this.aimed&&(this.aimed=o,this.cb.highlight(o))}placeBar(){if(!this.aimed||this.holding)return;this.bar.hidden=!1;let e=this.aimed.getBoundingClientRect(),n=window.innerWidth,r=window.innerHeight,o=8,i=this.bar.offsetWidth,s=this.bar.offsetHeight,a=e.bottom+10;a+s>r-o&&(a=e.top-s-34),a<o&&(a=r-s-16);let l=Math.max(o,Math.min(e.left+e.width/2-i/2,n-i-o));this.bar.style.left=`${l}px`,this.bar.style.top=`${a}px`}hideBar(){this.bar.hidden=!0}};function We(t){if(t.id)return`#${CSS.escape(t.id)}`;let e=[],n=t;for(;n&&n!==document.documentElement;){let r=n.tagName.toLowerCase(),o=n.parentElement;if(!o){e.unshift(r);break}let i=Array.from(n.classList).filter(a=>!a.match(/^(hover|focus|active|visited|is-|has-)/)).slice(0,3);if(i.length>0){let a=`${r}.${i.map(CSS.escape).join(".")}`;if(o.querySelectorAll(a).length===1){e.unshift(a);break}}let s=Array.from(o.children).filter(a=>a.tagName===n.tagName);if(s.length===1)e.unshift(r);else{let a=s.indexOf(n)+1;e.unshift(`${r}:nth-of-type(${a})`)}n=o}return e.join(" > ")}function Ye(t){let e=t.tagName.toLowerCase(),n=t.getAttribute("wire:model")||t.getAttribute("wire:click");if(n)return`${e}[wire:${n.split(".")[0]}]`;if(t.id)return`${e}#${t.id}`;let r=t.classList[0];return r?`${e}.${r}`:e}function we(t){let e=t.tagName.toLowerCase(),n=(t.textContent||"").trim().replace(/\s+/g," ").slice(0,40),r=[];t.id&&r.push(`id="${t.id}"`);let o=t.getAttribute("role");o&&r.push(`role="${o}"`);let i=t.getAttribute("wire:model")||t.getAttribute("wire:click");i&&r.push(`wire:${t.hasAttribute("wire:model")?"model":"click"}="${i}"`);let s=r.length?" "+r.join(" "):"",a=`<${e}${s}>`;return n?`${a} ${n}`:a}function qe(t){return(t.textContent||"").trim().replace(/\s+/g," ").slice(0,120)}function Ke(t){return Array.from(t.classList).filter(e=>!e.match(/^(instruckt-)/)).join(" ")}function Xe(t){let e=t.getBoundingClientRect();return{x:e.left+window.scrollX,y:e.top+window.scrollY,width:e.width,height:e.height}}var Ge="0.5.32",Se=`bippy-${Ge}`,mn=Object.defineProperty,jo=Object.prototype.hasOwnProperty,Q=()=>{},fn=t=>{try{Function.prototype.toString.call(t).indexOf("^_^")>-1&&setTimeout(()=>{throw Error("React is running in production mode, but dead code elimination has not been applied. Read how to correctly configure React for production: https://reactjs.org/link/perf-use-production-build")})}catch(e){}},Ee=(t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>!!(t&&"getFiberRoots"in t),gn=!1,ke,ee=(t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>gn?!0:(t&&typeof t.inject=="function"&&(ke=t.inject.toString()),!!(ke!=null&&ke.includes("(injected)"))),xe=new Set,M=new Set,Je=t=>{let e=new Map,n=0,r={_instrumentationIsActive:!1,_instrumentationSource:Se,checkDCE:fn,hasUnsupportedRendererAttached:!1,inject(o){let i=++n;return e.set(i,o),M.add(o),r._instrumentationIsActive||(r._instrumentationIsActive=!0,xe.forEach(s=>s())),i},on:Q,onCommitFiberRoot:Q,onCommitFiberUnmount:Q,onPostCommitFiberRoot:Q,renderers:e,supportsFiber:!0,supportsFlight:!0};try{mn(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__",{configurable:!0,enumerable:!0,get(){return r},set(s){if(s&&typeof s=="object"){let a=r.renderers;r=s,a.size>0&&(a.forEach((l,d)=>{M.add(l),s.renderers.set(d,l)}),te(t))}}});let o=window.hasOwnProperty,i=!1;mn(window,"hasOwnProperty",{configurable:!0,value:function(...s){try{if(!i&&s[0]==="__REACT_DEVTOOLS_GLOBAL_HOOK__")return globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__=void 0,i=!0,-0}catch(a){}return o.apply(this,s)},writable:!0})}catch(o){te(t)}return r},te=t=>{t&&xe.add(t);try{let e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!e)return;if(!e._instrumentationSource){e.checkDCE=fn,e.supportsFiber=!0,e.supportsFlight=!0,e.hasUnsupportedRendererAttached=!1,e._instrumentationSource=Se,e._instrumentationIsActive=!1;let n=Ee(e);if(n||(e.on=Q),e.renderers.size){e._instrumentationIsActive=!0,xe.forEach(i=>i());return}let r=e.inject,o=ee(e);o&&!n&&(gn=!0,e.inject({scheduleRefresh(){}})&&(e._instrumentationIsActive=!0)),e.inject=i=>{let s=r(i);return M.add(i),o&&e.renderers.set(s,i),e._instrumentationIsActive=!0,xe.forEach(a=>a()),s}}(e.renderers.size||e._instrumentationIsActive||ee())&&(t==null||t())}catch(e){}},Ze=()=>jo.call(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__"),ne=t=>Ze()?(te(t),globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__):Je(t),Qe=()=>{var t,e;return!!(typeof window<"u"&&((t=window.document)!=null&&t.createElement||((e=window.navigator)==null?void 0:e.product)==="ReactNative"))},Ce=()=>{try{Qe()&&ne()}catch(t){}};Ce();var et=0,tt=1;var nt=5;var rt=11,ot=13;var it=15,st=16;var at=19;var lt=26,ct=27,ut=28,dt=30;var ht=t=>{switch(t.tag){case 1:case 11:case 0:case 14:case 15:return!0;default:return!1}};function re(t,e,n=!1){if(!t)return null;let r=e(t);if(r instanceof Promise)return(async()=>{if(await r===!0)return t;let i=n?t.return:t.child;for(;i;){let s=await mt(i,e,n);if(s)return s;i=n?null:i.sibling}return null})();if(r===!0)return t;let o=n?t.return:t.child;for(;o;){let i=pt(o,e,n);if(i)return i;o=n?null:o.sibling}return null}var pt=(t,e,n=!1)=>{if(!t)return null;if(e(t)===!0)return t;let r=n?t.return:t.child;for(;r;){let o=pt(r,e,n);if(o)return o;r=n?null:r.sibling}return null},mt=async(t,e,n=!1)=>{if(!t)return null;if(await e(t)===!0)return t;let r=n?t.return:t.child;for(;r;){let o=await mt(r,e,n);if(o)return o;r=n?null:r.sibling}return null};var ft=t=>{let e=t;return typeof e=="function"?e:typeof e=="object"&&e?ft(e.type||e.render):null},$=t=>{let e=t;if(typeof e=="string")return e;if(typeof e!="function"&&!(typeof e=="object"&&e))return null;let n=e.displayName||e.name||null;if(n)return n;let r=ft(e);return r&&(r.displayName||r.name)||null};var oe=()=>{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;return!!(t!=null&&t._instrumentationIsActive)||Ee(t)||ee(t)};var V=t=>{var n,r,o,i;let e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(e!=null&&e.renderers)for(let s of e.renderers.values())try{let a=(n=s.findFiberByHostInstance)==null?void 0:n.call(s,t);if(a)return a}catch(a){}if(typeof t=="object"&&t){if("_reactRootContainer"in t)return(i=(o=(r=t._reactRootContainer)==null?void 0:r._internalRoot)==null?void 0:o.current)==null?void 0:i.child;for(let s in t)if(s.startsWith("__reactContainer$")||s.startsWith("__reactInternalInstance$")||s.startsWith("__reactFiber"))return t[s]||null}return null},Uo=Error();var bn=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,zo=["rsc://","file:///","webpack://","webpack-internal://","node:","turbopack://","metro://","/app-pages-browser/","/(app-pages-browser)/"],Vo=["<anonymous>","eval",""],Tn=/\.(jsx|tsx|ts|js)$/,Wo=/(\.min|bundle|chunk|vendor|vendors|runtime|polyfill|polyfills)\.(js|mjs|cjs)$|(chunk|bundle|vendor|vendors|runtime|polyfill|polyfills|framework|app|main|index)[-_.][A-Za-z0-9_-]{4,}\.(js|mjs|cjs)$|[\da-f]{8,}\.(js|mjs|cjs)$|[-_.][\da-f]{20,}\.(js|mjs|cjs)$|\/dist\/|\/build\/|\/.next\/|\/out\/|\/node_modules\/|\.webpack\.|\.vite\.|\.turbopack\./i,Yo=/^\?[\w~.-]+(?:=[^&#]*)?(?:&[\w~.-]+(?:=[^&#]*)?)*$/,An="(at Server)",qo=/(^|@)\S+:\d+/,Nn=/^\s*at .*(\S+:\d+|\(native\))/m,Ko=/^(eval@)?(\[native code\])?$/;var Ae=(t,e)=>{if((e==null?void 0:e.includeInElement)!==!1){let n=t.split(`
`),r=[];for(let o of n)if(/^\s*at\s+/.test(o)){let i=vn(o,void 0)[0];i&&r.push(i)}else if(/^\s*in\s+/.test(o)){let i=o.replace(/^\s*in\s+/,"").replace(/\s*\(at .*\)$/,"");r.push({functionName:i,source:o})}else if(o.match(qo)){let i=yn(o,void 0)[0];i&&r.push(i)}return vt(r,e)}return t.match(Nn)?vn(t,e):yn(t,e)},Rn=t=>{if(!t.includes(":"))return[t,void 0,void 0];let e=t.startsWith("(")&&/:\d+\)$/.test(t)?t.slice(1,-1):t,n=/(.+?)(?::(\d+))?(?::(\d+))?$/.exec(e);return n?[n[1],n[2]||void 0,n[3]||void 0]:[e,void 0,void 0]},vt=(t,e)=>e&&e.slice!=null?Array.isArray(e.slice)?t.slice(e.slice[0],e.slice[1]):t.slice(0,e.slice):t;var vn=(t,e)=>vt(t.split(`
`).filter(n=>!!n.match(Nn)),e).map(n=>{let r=n;r.includes("(eval ")&&(r=r.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));let o=r.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),i=o.match(/ (\(.+\)$)/);o=i?o.replace(i[0],""):o;let s=Rn(i?i[1]:o);return{functionName:i&&o||void 0,fileName:["eval","<anonymous>"].includes(s[0])?void 0:s[0],lineNumber:s[1]?+s[1]:void 0,columnNumber:s[2]?+s[2]:void 0,source:r}});var yn=(t,e)=>vt(t.split(`
`).filter(n=>!n.match(Ko)),e).map(n=>{let r=n;if(r.includes(" > eval")&&(r=r.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),!r.includes("@")&&!r.includes(":"))return{functionName:r};{let o=/(([^\n\r"\u2028\u2029]*".[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*(?:@[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*)*(?:[\n\r\u2028\u2029][^@]*)?)?[^@]*)@/,i=r.match(o),s=i&&i[1]?i[1]:void 0,a=Rn(r.replace(o,""));return{functionName:s,fileName:a[0],lineNumber:a[1]?+a[1]:void 0,columnNumber:a[2]?+a[2]:void 0,source:r}}});var Xo=44,wn="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Go=new Uint8Array(64),_n=new Uint8Array(128);for(let t=0;t<wn.length;t++){let e=wn.charCodeAt(t);Go[t]=e,_n[e]=t}function ie(t,e){let n=0,r=0,o=0;do o=_n[t.next()],n|=(o&31)<<r,r+=5;while(o&32);let i=n&1;return n>>>=1,i&&(n=-2147483648|-n),e+n}function kn(t,e){return t.pos>=e?!1:t.peek()!==Xo}var Jo=class{constructor(t){this.pos=0,this.buffer=t}next(){return this.buffer.charCodeAt(this.pos++)}peek(){return this.buffer.charCodeAt(this.pos)}indexOf(t){let{buffer:e,pos:n}=this,r=e.indexOf(t,n);return r===-1?e.length:r}};function Ln(t){let{length:e}=t,n=new Jo(t),r=[],o=0,i=0,s=0,a=0,l=0;do{let d=n.indexOf(";"),u=[],c=!0,h=0;for(o=0;n.pos<d;){let p;o=ie(n,o),o<h&&(c=!1),h=o,kn(n,d)?(i=ie(n,i),s=ie(n,s),a=ie(n,a),kn(n,d)?(l=ie(n,l),p=[o,i,s,a,l]):p=[o,i,s,a]):p=[o],u.push(p),n.pos++}c||Zo(u),r.push(u),n.pos=d+1}while(n.pos<=e);return r}function Zo(t){t.sort(Qo)}function Qo(t,e){return t[0]-e[0]}var Mn=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,ei=/^data:application\/json[^,]+base64,/,ti=/(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^*]+?)[ \t]*(?:\*\/)[ \t]*$)/,In=typeof WeakRef<"u",se=new Map,Te=new Map,ni=t=>In&&t instanceof WeakRef,xn=(t,e,n,r)=>{if(n<0||n>=t.length)return null;let o=t[n];if(!o||o.length===0)return null;let i=null;for(let u of o)if(u[0]<=r)i=u;else break;if(!i||i.length<4)return null;let[,s,a,l]=i;if(s===void 0||a===void 0||l===void 0)return null;let d=e[s];return d?{columnNumber:l,fileName:d,lineNumber:a+1}:null},ri=(t,e,n)=>{if(t.sections){let r=null;for(let s of t.sections)if(e>s.offset.line||e===s.offset.line&&n>=s.offset.column)r=s;else break;if(!r)return null;let o=e-r.offset.line,i=e===r.offset.line?n-r.offset.column:n;return xn(r.map.mappings,r.map.sources,o,i)}return xn(t.mappings,t.sources,e-1,n)},oi=(t,e)=>{let n=e.split(`
`),r;for(let i=n.length-1;i>=0&&!r;i--){let s=n[i].match(ti);s&&(r=s[1]||s[2])}if(!r)return null;let o=Mn.test(r);if(!(ei.test(r)||o||r.startsWith("/"))){let i=t.split("/");i[i.length-1]=r,r=i.join("/")}return r},ii=t=>({file:t.file,mappings:Ln(t.mappings),names:t.names,sourceRoot:t.sourceRoot,sources:t.sources,sourcesContent:t.sourcesContent,version:3}),si=t=>{let e=t.sections.map(({map:r,offset:o})=>({map:E(S({},r),{mappings:Ln(r.mappings)}),offset:o})),n=new Set;for(let r of e)for(let o of r.map.sources)n.add(o);return{file:t.file,mappings:[],names:[],sections:e,sourceRoot:void 0,sources:Array.from(n),sourcesContent:void 0,version:3}},Sn=t=>{if(!t)return!1;let e=t.trim();if(!e)return!1;let n=e.match(Mn);if(!n)return!0;let r=n[0].toLowerCase();return r==="http:"||r==="https:"},ai=async(t,e=fetch)=>{if(!Sn(t))return null;let n;try{let o=await e(t);if(!o.ok)return null;n=await o.text()}catch(o){return null}if(!n)return null;let r=oi(t,n);if(!r||!Sn(r))return null;try{let o=await e(r);if(!o.ok)return null;let i=await o.json();return"sections"in i?si(i):ii(i)}catch(o){return null}},li=async(t,e=!0,n)=>{if(e&&se.has(t)){let i=se.get(t);if(i==null)return null;if(ni(i)){let s=i.deref();if(s)return s;se.delete(t)}else return i}if(e&&Te.has(t))return Te.get(t);let r=ai(t,n);e&&Te.set(t,r);let o=await r;return e&&Te.delete(t),e&&(o===null?se.set(t,null):se.set(t,In?new WeakRef(o):o)),o},ci=async(t,e=!0,n)=>await Promise.all(t.map(async r=>{if(!r.fileName)return r;let o=await li(r.fileName,e,n);if(!o||typeof r.lineNumber!="number"||typeof r.columnNumber!="number")return r;let i=ri(o,r.lineNumber,r.columnNumber);return i?E(S({},r),{source:i.fileName&&r.source?r.source.replace(r.fileName,i.fileName):r.source,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,isSymbolicated:!0}):r})),yt=t=>{var e;return t._debugStack instanceof Error&&typeof((e=t._debugStack)==null?void 0:e.stack)=="string"},ui=()=>{let t=ne();for(let e of[...Array.from(M),...Array.from(t.renderers.values())]){let n=e.currentDispatcherRef;if(n&&typeof n=="object")return"H"in n?n.H:n.current}return null},En=t=>{for(let e of M){let n=e.currentDispatcherRef;n&&typeof n=="object"&&("H"in n?n.H=t:n.current=t)}},N=t=>`
    in ${t}`,di=(t,e)=>{let n=N(t);return e&&(n+=` (at ${e})`),n},gt=!1,bt=(t,e)=>{var a;if(!t||gt)return"";let n=Error.prepareStackTrace;Error.prepareStackTrace=void 0,gt=!0;let r=ui();En(null);let o=console.error,i=console.warn;console.error=()=>{},console.warn=()=>{};try{let l={DetermineComponentFrameRoot(){let c;try{if(e){let h=function(){throw Error()};if(Object.defineProperty(h.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(h,[])}catch(p){c=p}Reflect.construct(t,[],h)}else{try{h.call()}catch(p){c=p}t.call(h.prototype)}}else{try{throw Error()}catch(p){c=p}let h=t();h&&typeof h.catch=="function"&&h.catch(()=>{})}}catch(h){if(h instanceof Error&&c instanceof Error&&typeof h.stack=="string")return[h.stack,c.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot",(a=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name"))!=null&&a.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});let[d,u]=l.DetermineComponentFrameRoot();if(d&&u){let c=d.split(`
`),h=u.split(`
`),p=0,m=0;for(;p<c.length&&!c[p].includes("DetermineComponentFrameRoot");)p++;for(;m<h.length&&!h[m].includes("DetermineComponentFrameRoot");)m++;if(p===c.length||m===h.length)for(p=c.length-1,m=h.length-1;p>=1&&m>=0&&c[p]!==h[m];)m--;for(;p>=1&&m>=0;p--,m--)if(c[p]!==h[m]){if(p!==1||m!==1)do if(p--,m--,m<0||c[p]!==h[m]){let g=`
${c[p].replace(" at new "," at ")}`,f=$(t);return f&&g.includes("<anonymous>")&&(g=g.replace("<anonymous>",f)),g}while(p>=1&&m>=0);break}}}finally{gt=!1,Error.prepareStackTrace=n,En(r),console.error=o,console.warn=i}let s=t?$(t):"";return s?N(s):""},hi=(t,e)=>{let n=t.tag,r="";switch(n){case ut:r=N("Activity");break;case tt:r=bt(t.type,!0);break;case rt:r=bt(t.type.render,!1);break;case et:case it:r=bt(t.type,!1);break;case nt:case lt:case ct:r=N(t.type);break;case st:r=N("Lazy");break;case ot:r=t.child!==e&&e!==null?N("Suspense Fallback"):N("Suspense");break;case at:r=N("SuspenseList");break;case dt:r=N("ViewTransition");break;default:return""}return r},pi=t=>{try{let e="",n=t,r=null;do{e+=hi(n,r);let o=n._debugInfo;if(o&&Array.isArray(o))for(let i=o.length-1;i>=0;i--){let s=o[i];typeof s.name=="string"&&(e+=di(s.name,s.env))}r=n,n=n.return}while(n);return e}catch(e){return e instanceof Error?`
Error generating stack: ${e.message}
${e.stack}`:""}},wt=t=>{let e=Error.prepareStackTrace;Error.prepareStackTrace=void 0;let n=t;if(!n)return"";Error.prepareStackTrace=e,n.startsWith(`Error: react-stack-top-frame
`)&&(n=n.slice(29));let r=n.indexOf(`
`);if(r!==-1&&(n=n.slice(r+1)),r=Math.max(n.indexOf("react_stack_bottom_frame"),n.indexOf("react-stack-bottom-frame")),r!==-1&&(r=n.lastIndexOf(`
`,r)),r!==-1)n=n.slice(0,r);else return"";return n},mi=t=>{var e;return!!((e=t.fileName)!=null&&e.startsWith("rsc://")&&t.functionName)},fi=(t,e)=>t.fileName===e.fileName&&t.lineNumber===e.lineNumber&&t.columnNumber===e.columnNumber,gi=t=>{var n;let e=new Map;for(let r of t)for(let o of r.stackFrames){if(!mi(o))continue;let i=o.functionName,s=(n=e.get(i))!=null?n:[];s.some(a=>fi(a,o))||(s.push(o),e.set(i,s))}return e},bi=(t,e,n)=>{var s,a;if(!t.functionName)return E(S({},t),{isServer:!0});let r=e.get(t.functionName);if(!r||r.length===0)return E(S({},t),{isServer:!0});let o=(s=n.get(t.functionName))!=null?s:0,i=r[o%r.length];return n.set(t.functionName,o+1),E(S({},t),{isServer:!0,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,source:(a=t.source)==null?void 0:a.replace(An,`(${i.fileName}:${i.lineNumber}:${i.columnNumber})`)})},vi=t=>{let e=[];return re(t,n=>{var o;if(!yt(n))return;let r=typeof n.type=="string"?n.type:$(n.type)||"<anonymous>";e.push({componentName:r,stackFrames:Ae(wt((o=n._debugStack)==null?void 0:o.stack))})},!0),e},Pn=async(t,e=!0,n)=>{let r=vi(t),o=Ae(pi(t)),i=gi(r),s=new Map;return ci(o.map(a=>{var l,d;return(d=(l=a.source)==null?void 0:l.includes(An))!=null&&d?bi(a,i,s):a}).filter((a,l,d)=>{if(l===0)return!0;let u=d[l-1];return a.functionName!==u.functionName}),e,n)};var Cn=t=>t.split("/").filter(Boolean).length,yi=t=>{var e;return(e=t.split("/").filter(Boolean)[0])!=null?e:null},wi=t=>{let e=t.indexOf("/",1);if(e===-1||Cn(t.slice(0,e))!==1)return t;let n=t.slice(e);if(!Tn.test(n)||Cn(n)<2)return t;let r=yi(n);return!r||r.startsWith("@")||r.length>4?t:n},kt=t=>{if(!t||Vo.some(i=>i===t))return"";let e=t,n=e.startsWith("http://")||e.startsWith("https://");if(n)try{e=new URL(e).pathname}catch(i){}if(n&&(e=wi(e)),e.startsWith("about://React/")){let i=e.slice(14),s=i.indexOf("/"),a=i.indexOf(":");e=s!==-1&&(a===-1||s<a)?i.slice(s+1):i}let r=!0;for(;r;){r=!1;for(let i of zo)if(e.startsWith(i)){e=e.slice(i.length),i==="file:///"&&(e=`/${e.replace(/^\/+/,"")}`),r=!0;break}}if(bn.test(e)){let i=e.match(bn);i&&(e=e.slice(i[0].length))}if(e.startsWith("//")){let i=e.indexOf("/",2);e=i===-1?"":e.slice(i)}let o=e.indexOf("?");if(o!==-1){let i=e.slice(o);Yo.test(i)&&(e=e.slice(0,o))}return e},On=t=>{let e=kt(t);return!(!e||!Tn.test(e)||Wo.test(e))};var ki=5e3,xi=4e3,Fn=xi/2,Si=3,zn=1,Ei=1;var Ci=1,xt=t=>typeof Element!="undefined"&&t instanceof Element,Ti=["_","$","motion.","styled.","chakra.","ark.","Primitive.","Slot."],Ai=new Set(["InnerLayoutRouter","RedirectErrorBoundary","RedirectBoundary","HTTPAccessFallbackErrorBoundary","HTTPAccessFallbackBoundary","LoadingBoundary","ErrorBoundary","InnerScrollAndFocusHandler","ScrollAndFocusHandler","RenderFromTemplateContext","OuterLayoutRouter","body","html","DevRootHTTPAccessFallbackBoundary","AppDevOverlayErrorBoundary","AppDevOverlay","HotReload","Router","ErrorBoundaryHandler","AppRouter","ServerRoot","SegmentStateProvider","RootErrorBoundary","LoadableComponent","MotionDOMComponent"]),Ni=new Set(["Suspense","Fragment","StrictMode","Profiler","SuspenseList"]),ae,Ri=t=>(t&&(ae=void 0),ae!=null||(ae=typeof document!="undefined"&&!!(document.getElementById("__NEXT_DATA__")||document.querySelector("nextjs-portal"))),ae),Vn=t=>Ai.has(t)||Ni.has(t)?!0:Ti.some(e=>t.startsWith(e)),Wn=t=>!(t.length<=Ci||Vn(t)||t[0]!==t[0].toUpperCase()||t.includes("Provider")||t.includes("Context")),_i=t=>!(!t||Vn(t)||t==="SlotClone"||t==="Slot"),Yn=["about://React/","rsc://React/"],Li=t=>Yn.some(e=>t.startsWith(e)),Mi=t=>{for(let e of Yn){if(!t.startsWith(e))continue;let n=t.indexOf("/",e.length),r=t.lastIndexOf("?");if(n>-1&&r>-1)return decodeURI(t.slice(n+1,r))}return t},Ii=async t=>{var i,s,a,l,d,u;let e=[],n=[];for(let c=0;c<t.length;c++){let h=t[c];!h.isServer||!h.fileName||(e.push(c),n.push({file:Mi(h.fileName),methodName:(i=h.functionName)!=null?i:"<unknown>",line1:(s=h.lineNumber)!=null?s:null,column1:(a=h.columnNumber)!=null?a:null,arguments:[]}))}if(n.length===0)return t;let r=new AbortController,o=setTimeout(()=>r.abort(),ki);try{let c=await fetch("/__nextjs_original-stack-frames",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({frames:n,isServer:!0,isEdgeServer:!1,isAppDirectory:!0}),signal:r.signal});if(!c.ok)return t;let h=await c.json(),p=[...t];for(let m=0;m<e.length;m++){let g=h[m];if((g==null?void 0:g.status)!=="fulfilled")continue;let f=(l=g.value)==null?void 0:l.originalStackFrame;if(!(f!=null&&f.file)||f.ignored)continue;let v=e[m];p[v]=E(S({},t[v]),{fileName:f.file,lineNumber:(d=f.line1)!=null?d:void 0,columnNumber:(u=f.column1)!=null?u:void 0,isSymbolicated:!0})}return p}catch(c){return t}finally{clearTimeout(o)}},Pi=t=>{let e=new Map;return re(t,n=>{if(!yt(n))return!1;let r=wt(n._debugStack.stack);if(!r)return!1;for(let o of Ae(r))!o.functionName||!o.fileName||Li(o.fileName)&&(e.has(o.functionName)||e.set(o.functionName,E(S({},o),{isServer:!0})));return!1},!0),e},Oi=(t,e)=>{if(!e.some(o=>o.isServer&&!o.fileName&&o.functionName))return e;let r=Pi(t);return r.size===0?e:e.map(o=>{if(!o.isServer||o.fileName||!o.functionName)return o;let i=r.get(o.functionName);return i?E(S({},o),{fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber}):o})},qn=t=>{if(!oe()||V(t))return t;if(xt(t)){let e=t.parentElement;for(;e;){if(V(e))return e;e=e.parentElement}}return t},$n=new WeakMap,Fi=async t=>{try{let e=V(t);if(!e)return null;let n=await Pn(e);if(Ri()){let r=Oi(e,n);return Ii(r)}return n}catch(e){return null}},Kn=t=>{if(!oe())return Promise.resolve([]);let e=qn(t),n=$n.get(e);if(n)return n;let r=Fi(e);return $n.set(e,r),r},$i=t=>{var e;if(!t||t.length===0)return null;for(let n of t)if(n.fileName&&On(n.fileName))return{filePath:kt(n.fileName),lineNumber:(e=n.lineNumber)!=null?e:null,columnNumber:null,componentName:n.functionName&&Wn(n.functionName)?n.functionName:null};return null},Bi=async t=>{let e=await Kn(t),n=$i(e);return n?[n]:[]},Di=async t=>{if(!oe())return null;let e=await Kn(t);if(e){for(let i of e)if(i.functionName&&Wn(i.functionName))return i.functionName}let n=qn(t),r=V(n);if(!r)return null;let o=r.return;for(;o;){if(ht(o)){let i=$(o.type);if(i&&_i(i))return i}o=o.return}return null},B={name:"react",resolveStack:Bi,resolveComponentName:Di},H=t=>typeof t=="object"&&t!==null&&!Array.isArray(t),D=t=>typeof t=="string"?t:null,Ne=t=>typeof t=="number"&&Number.isFinite(t)?t:null,Hi="__svelte_meta",ji=t=>{let e=t;for(;e;){let n=Reflect.get(e,Hi);if(H(n))return n;e=e.parentElement}return null},Ui=t=>{let e=t.loc;if(!H(e))return null;let n=D(e.file),r=Ne(e.line),o=Ne(e.column);return!n||r===null||o===null?null:{filePath:n,lineNumber:r,columnNumber:o+zn}},zi=t=>{let e=t.parent;for(;H(e);){let n=D(e.componentTag);if(n)return n;e=e.parent}return null},Vi=t=>{let e=[],n=t.parent;for(;H(n);){let r=D(n.file),o=Ne(n.line),i=Ne(n.column),s=D(n.componentTag);r&&o!==null&&i!==null&&e.push({filePath:r,lineNumber:o,columnNumber:i+zn,componentName:s}),n=n.parent}return e},Wi=t=>{var i,s;let e=ji(t);if(!e)return[];let n=Ui(e);if(!n)return[];let r=[{filePath:n.filePath,lineNumber:n.lineNumber,columnNumber:n.columnNumber,componentName:zi(e)}],o=new Set([`${n.filePath}:${n.lineNumber}:${n.columnNumber}`]);for(let a of Vi(e)){let l=`${a.filePath}:${(i=a.lineNumber)!=null?i:""}:${(s=a.columnNumber)!=null?s:""}`;o.has(l)||(o.add(l),r.push(a))}return r},Yi={name:"svelte",resolveStack:Wi},Bn=":",Dn=t=>{let e=Number.parseInt(t,10);return Number.isNaN(e)||e<1?null:e},Xn=t=>{let e=t.lastIndexOf(Bn);if(e===-1)return null;let n=t.lastIndexOf(Bn,e-1);if(n===-1)return null;let r=t.slice(0,n);if(!r)return null;let o=t.slice(n+1,e),i=t.slice(e+1),s=Dn(o),a=Dn(i);return s===null||a===null?null:{filePath:r,lineNumber:s,columnNumber:a}},Gn="data-v-inspector",qi=`[${Gn}]`,Ki="__vueParentComponent",Jn=t=>{if(!t)return null;let e=t.type;return H(e)?e:null},Xi=t=>{let e=Reflect.get(t,Ki);return H(e)?e:null},Zn=t=>{let e=t;for(;e;){let n=Xi(e);if(n)return n;e=e.parentElement}return null},Qn=t=>{var e;return t?(e=D(t.__name))!=null?e:D(t.name):null},Gi=t=>t?D(t.__file):null,Ji=t=>{if(!t)return null;let e=Reflect.get(t,"parent");return H(e)?e:null},Zi=t=>{let e=[],n=Zn(t);for(;n;)e.push(n),n=Ji(n);return e},Qi=t=>Zi(t).map(e=>{let n=Jn(e),r=Gi(n);return r?{filePath:r,lineNumber:null,columnNumber:null,componentName:Qn(n)}:null}).filter(e=>!!e),es=t=>{let e=t.closest(qi);if(!e)return null;let n=e.getAttribute(Gn);if(!n)return null;let r=Xn(n);if(!r)return null;let o=Zn(t),i=Jn(o);return{filePath:r.filePath,lineNumber:r.lineNumber,columnNumber:r.columnNumber,componentName:Qn(i)}},ts=t=>{var o,i;let e=[],n=new Set,r=es(t);if(r){let s=`${r.filePath}|${(o=r.componentName)!=null?o:""}`;e.push(r),n.add(s)}for(let s of Qi(t)){let a=`${s.filePath}|${(i=s.componentName)!=null?i:""}`;n.has(a)||(n.add(a),e.push(s))}return e},ns={name:"vue",resolveStack:ts},rs="$$",os=/location:\s*["']([^"']+:\d+:\d+)["']/g,er="/src/",is=".css",ss="?import",as="__SOLID_RUNTIME_MODULES__",Hn=new Map,jn=new Map,ls=t=>{if(t.includes(ss))return!1;let e=new URL(t,window.location.href).pathname;return e.endsWith(is)?!1:e.includes(er)},cs=()=>{if(typeof window=="undefined")return[];let t=performance.getEntriesByType("resource"),e=new Set;for(let n of t)!n.name||!ls(n.name)||e.add(n.name);return Array.from(e)},us=t=>{let e=Hn.get(t);if(e)return e;let n=fetch(t).then(r=>r.ok?r.text():null).catch(()=>null);return Hn.set(t,n),n},ds=()=>{if(typeof window=="undefined")return[];let t=Reflect.get(window,as);return Array.isArray(t)?t:[]},hs=async t=>{for(let e of ds()){let n=e.content.indexOf(t);if(n!==-1)return{moduleUrl:e.url,moduleContent:e.content,handlerSourceIndex:n}}for(let e of cs()){let n=await us(e);if(!n)continue;let r=n.indexOf(t);if(r!==-1)return{moduleUrl:e,moduleContent:n,handlerSourceIndex:r}}return null},ps=(t,e)=>{let n=Math.max(0,e-Fn),r=Math.min(t.length,e+Fn),o=t.slice(n,r),i=[];for(let l of o.matchAll(os)){let d=l[1];if(!d)continue;let u=Xn(d);if(!u||l.index===void 0)continue;let c=n+l.index;i.push({sourceInfo:{filePath:u.filePath,lineNumber:u.lineNumber,columnNumber:u.columnNumber,componentName:null},distance:Math.abs(c-e)})}i.sort((l,d)=>{var h,p;let u=(h=l.sourceInfo.lineNumber)!=null?h:0,c=(p=d.sourceInfo.lineNumber)!=null?p:0;return c!==u?c-u:l.distance-d.distance});let s=new Set,a=[];for(let l of i){let d=`${l.sourceInfo.filePath}:${l.sourceInfo.lineNumber}:${l.sourceInfo.columnNumber}`;s.has(d)||(s.add(d),a.push(l.sourceInfo))}return a},ms=t=>{try{let e=decodeURIComponent(new URL(t,window.location.href).pathname);return e.includes(er)?e.startsWith("/")?e.slice(1):e:null}catch(e){return null}},fs=(t,e)=>{var i;let r=t.slice(0,e).split(`
`),o=(i=r[r.length-1])!=null?i:"";return{lineNumber:r.length,columnNumber:o.length+Ei}},gs=t=>{let e=t;for(;e;){for(let n of Object.getOwnPropertyNames(e)){if(!n.startsWith(rs))continue;let r=Reflect.get(e,n);if(typeof r!="function")continue;let o=String(r).trim();if(!(o.length<Si))return{source:o}}e=e.parentElement}return null},bs=t=>{let e=jn.get(t);if(e)return e;let n=(async()=>{let r=await hs(t);if(!r)return[];let o=ps(r.moduleContent,r.handlerSourceIndex);if(o.length>0)return o;let i=ms(r.moduleUrl);if(!i)return[];let s=fs(r.moduleContent,r.handlerSourceIndex);return[{filePath:i,lineNumber:s.lineNumber,columnNumber:s.columnNumber,componentName:null}]})();return jn.set(t,n),n},vs=t=>{let e=gs(t);return e?bs(e.source):Promise.resolve([])},ys={name:"solid",resolveStack:vs},ws=t=>"tagName"in t&&typeof t.tagName=="string"?t.tagName.toLowerCase():"nodeName"in t&&typeof t.nodeName=="string"?t.nodeName.toLowerCase():"",ks=[Yi,ns,ys],Un=async(t,e)=>{for(let n of e){let o=(await n.resolveStack(t)).filter(i=>i.filePath.length>0);if(o.length>0)return o}return[]},xs=(t={})=>{var s;let e=(s=t.resolvers)!=null?s:ks,n=async a=>{let l=await B.resolveStack(a);if(xt(a)){let d=await Un(a,e);return l.length>0?[...l,...d]:d}return l};return{resolveSource:async a=>{var d;return(d=(await n(a))[0])!=null?d:null},resolveStack:n,resolveComponentName:async a=>{var d,u;let l=await((d=B.resolveComponentName)==null?void 0:d.call(B,a));if(l)return l;if(xt(a)){let h=(u=(await Un(a,e)).find(p=>p.componentName))==null?void 0:u.componentName;return h!=null?h:null}return null},resolveElementInfo:async a=>{var c,h,p,m,g;let l=await n(a),d=(c=l[0])!=null?c:null,u=(g=(m=(h=l.find(f=>f.componentName))==null?void 0:h.componentName)!=null?m:await((p=B.resolveComponentName)==null?void 0:p.call(B,a)))!=null?g:null;return{tagName:ws(a),componentName:u,source:d,stack:l}}}},Re=xs(),pl=Re.resolveSource,ml=Re.resolveStack,fl=Re.resolveComponentName,tr=Re.resolveElementInfo;function St(){return typeof window.Livewire!="undefined"}function Ss(t){let e=t;for(;e&&e!==document.documentElement;){if(e.getAttribute("wire:id"))return e;e=e.parentElement}return null}function nr(t){var s,a,l,d,u;if(!St())return null;let e=Ss(t);if(!e)return null;let n=e.getAttribute("wire:id"),r="Unknown",o,i=e.getAttribute("wire:snapshot");if(i)try{let c=JSON.parse(i);r=(a=(s=c==null?void 0:c.memo)==null?void 0:s.name)!=null?a:"Unknown",o=(u=(l=c==null?void 0:c.memo)==null?void 0:l.path)!=null?u:(d=c==null?void 0:c.memo)==null?void 0:d.name}catch(c){}return{framework:"livewire",component:r,wire_id:n,class_name:o}}function rr(t){return t?!t.includes("node_modules"):!1}function Et(t){var e,n,r;return(r=(e=t.type)==null?void 0:e.__file)!=null?r:(n=t.$options)==null?void 0:n.__file}function Cs(t){var e,n,r,o,i,s,a,l;return(l=(a=(i=(r=(e=t.$options)==null?void 0:e.name)!=null?r:(n=t.$options)==null?void 0:n.__name)!=null?i:(o=t.type)==null?void 0:o.name)!=null?a:(s=t.type)==null?void 0:s.__name)!=null?l:"Anonymous"}function Ts(t){var r;let e=null,n=t;for(;n&&n!==document.documentElement;){let o=(r=n.__vueParentComponent)!=null?r:n.__vue__;if(o){let i=Et(o);if(rr(i))return o;e||(e=o)}n=n.parentElement}if(e!=null&&e.parent){let o=e.parent;for(;o;){let i=Et(o);if(rr(i))return o;o=o.parent}}return e}function Ct(t){let e=Ts(t);if(!e)return null;let n=Cs(e),r={};if(e.props&&Object.assign(r,e.props),e.setupState){for(let[i,s]of Object.entries(e.setupState))if(!i.startsWith("_")&&typeof s!="function")try{r[i]=JSON.parse(JSON.stringify(s))}catch(a){r[i]=String(s)}}let o=Et(e);return{framework:"vue",component:n,source_file:o,component_uid:e.uid!==void 0?String(e.uid):void 0,data:r}}function Ns(t){let e=t;for(;e&&e!==document.documentElement;){if(e.__svelte_meta)return e.__svelte_meta;e=e.parentElement}return null}function Tt(t){var o,i,s,a;let e=Ns(t);if(!e)return null;let n=(i=(o=e.loc)==null?void 0:o.file)!=null?i:"";return{framework:"svelte",component:n&&(a=(s=n.split("/").pop())==null?void 0:s.replace(/\.svelte$/,""))!=null?a:"Unknown",source_file:n||void 0,data:n?{file:n}:void 0}}function _s(t){for(let e of Object.keys(t))if(e.startsWith("__reactFiber$")||e.startsWith("__reactInternalInstance$"))return e;return null}function Ls(t){return t?!t.fileName.includes("node_modules"):!1}function Ms(t){let e=null,n=t;for(;n;){let{type:r}=n,o=null;if(typeof r=="function"&&r.name){let i=r.name;i[0]===i[0].toUpperCase()&&i.length>1&&(o=i)}if(!o&&typeof r=="object"&&r!==null&&r.displayName&&(o=r.displayName),o){let i={name:o,source:n._debugSource};if(Ls(n._debugSource))return i;e||(e=i)}n=n.return}return e!=null?e:{name:"Component"}}function Is(t){var r,o;let e=(o=(r=t.memoizedProps)!=null?r:t.pendingProps)!=null?o:{},n={};for(let[i,s]of Object.entries(e))if(!(i==="children"||typeof s=="function"))try{n[i]=JSON.parse(JSON.stringify(s))}catch(a){n[i]=String(s)}return n}function At(t){let e=t;for(;e&&e!==document.documentElement;){let n=_s(e);if(n){let r=e[n];if(r){let{name:o,source:i}=Ms(r),s=Is(r);return{framework:"react",component:o,source_file:i==null?void 0:i.fileName,source_line:i==null?void 0:i.lineNumber,data:s}}}e=e.parentElement}return null}function Os(){var e;let t=document.getElementById("instruckt-views");if(!t)return[];try{return JSON.parse((e=t.textContent)!=null?e:"[]")}catch(n){return[]}}function or(t){var r;let e=Os();if(e.length===0)return null;let n=e.length>1?(r=e.find(o=>!o.name.startsWith("layouts.")&&!o.name.startsWith("components.")))!=null?r:e[e.length-1]:e[0];return{framework:"blade",component:n.name,source_file:n.file,data:{views:e.map(o=>o.file)}}}function $s(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();let t=crypto.getRandomValues(new Uint8Array(16));t[6]=t[6]&15|64,t[8]=t[8]&63|128;let e=Array.from(t,n=>n.toString(16).padStart(2,"0")).join("");return`${e.slice(0,8)}-${e.slice(8,12)}-${e.slice(12,16)}-${e.slice(16,20)}-${e.slice(20)}`}function _e(){return window.location.pathname}var C=class C{constructor(e){this.toolbar=null;this.highlight=null;this.popup=null;this.markers=null;this.listPanel=null;this.touchAim=null;this.lastPointerType="mouse";this.annotations=[];this.isAnnotating=!1;this.rafId=null;this.pendingMouseTarget=null;this.highlightLocked=!1;this.pollTimer=null;this.initialLoadDone=!1;this.hasBackend=!1;this.boundReposition=()=>{var e;(e=this.markers)==null||e.reposition(this.annotations)};this.boundMouseMove=e=>{this.highlightLocked||(this.pendingMouseTarget=e.target,this.rafId===null&&(this.rafId=requestAnimationFrame(()=>{var n,r;this.rafId=null,!this.highlightLocked&&(this.pendingMouseTarget&&!this.isInstruckt(this.pendingMouseTarget)?(n=this.highlight)==null||n.show(this.pendingMouseTarget):(r=this.highlight)==null||r.hide())})))};this.boundMouseLeave=()=>{var e;this.highlightLocked||(e=this.highlight)==null||e.hide()};this.boundAnnotateBlock=e=>{e instanceof PointerEvent&&(this.lastPointerType=e.pointerType),!this.isInstruckt(e.target)&&(e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation())};this.boundClick=e=>{var o;let n=e.target;if(this.isInstruckt(n))return;e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation();let r=e.pointerType||this.lastPointerType;if(r==="touch"||r==="pen"){(o=this.touchAim)==null||o.tap(n);return}this.openNoteFor(n,e.clientX,e.clientY)};this.config=S({adapters:["livewire","vue","svelte","react","blade"],theme:"auto",position:"bottom-right"},e),this.api=new de(e.endpoint),this.boundKeydown=this.onKeydown.bind(this),this.init()}init(){var n;Oe(this.config.colors),((n=this.config.adapters)!=null?n:[]).includes("livewire")&&St()&&un(!0),this.config.theme!=="auto"&&document.documentElement.setAttribute("data-instruckt-theme",this.config.theme),this.toolbar=new Y(this.config.position,{onToggleAnnotate:r=>{this.setAnnotating(r)},onScreenshot:()=>this.startRegionCapture(),onCopy:()=>this.copyAnnotations(this.activeAnnotations(),!0),onCopyAndClear:()=>this.copyAndClear(),onToggleList:r=>this.setListOpen(r),onClearPage:()=>this.clearPage(),onClearAll:()=>this.clearEverything(),onMinimize:r=>this.onMinimize(r)},this.config.keys,this.config.tools),this.highlight=new q,this.touchAim=this.makeTouchAim(),this.popup=new be,this.markers=new Z(r=>this.onMarkerClick(r)),this.listPanel=this.makeListPanel(),this.toolbar.isMinimized()&&this.markers.setVisible(!1),document.addEventListener("keydown",this.boundKeydown),window.addEventListener("scroll",this.boundReposition,{passive:!0}),window.addEventListener("resize",this.boundReposition,{passive:!0}),document.addEventListener("livewire:navigated",()=>this.reattach()),document.addEventListener("inertia:navigate",()=>this.syncMarkers()),window.addEventListener("popstate",()=>{setTimeout(()=>this.reattach(),0)}),this.loadAnnotations()}makeTouchAim(){return new ye({highlight:e=>{var n,r;e?((n=this.highlight)==null||n.show(e,we(e)),this.highlightLocked=!0):((r=this.highlight)==null||r.hide(),this.highlightLocked=!1)},isOurs:e=>this.isInstruckt(e),onAdd:e=>{let n=e.getBoundingClientRect();this.openNoteFor(e,n.left+n.width/2,n.top+n.height/2)}})}makeToolbarCallbacks(){return{onToggleAnnotate:e=>{this.setAnnotating(e)},onScreenshot:()=>this.startRegionCapture(),onCopy:()=>this.copyAnnotations(this.activeAnnotations(),!0),onCopyAndClear:()=>this.copyAndClear(),onToggleList:e=>this.setListOpen(e),onClearPage:()=>this.clearPage(),onClearAll:()=>this.clearEverything(),onMinimize:e=>this.onMinimize(e)}}makeListPanel(){return new ve({annotations:()=>this.activeAnnotations(),currentPage:()=>_e(),pageOf:e=>this.annotationPageKey(e),screenshotSrc:e=>Ve(e.screenshot,this.config.endpoint),anchor:()=>{var e,n;return(n=(e=this.toolbar)==null?void 0:e.getListAnchor())!=null?n:null},onHover:e=>{var n,r;return(r=this.markers)==null?void 0:r.setHover((n=e==null?void 0:e.id)!=null?n:null)},onCopy:e=>this.copyAnnotations(e,!0),onDelete:e=>this.deleteAnnotations(e),onSave:(e,n)=>this.saveComment(e,n),onGoTo:e=>this.goTo(e),onClose:()=>{var e;return(e=this.toolbar)==null?void 0:e.setListActive(!1)}})}setListOpen(e){var n,r,o;e?(n=this.listPanel)==null||n.open():(r=this.listPanel)==null||r.close(),(o=this.toolbar)==null||o.setListActive(e)}goTo(e){var r;if(this.annotationPageKey(e)!==_e()){window.location.assign(e.url);return}let n=null;try{n=document.querySelector(e.elementPath)}catch(o){}n?n.scrollIntoView({behavior:"smooth",block:"center"}):window.scrollTo({top:Math.max(0,e.y-window.innerHeight/2),behavior:"smooth"}),(r=this.markers)==null||r.pulse(e.id)}reattach(){var i,s,a,l;let e=this.isAnnotating,n=(s=(i=this.listPanel)==null?void 0:i.isOpen())!=null?s:!1,r=(l=(a=this.toolbar)==null?void 0:a.isMinimized())!=null?l:!1;this.isAnnotating&&this.detachAnnotateListeners(),this.isAnnotating=!1,document.querySelectorAll("[data-instruckt]").forEach(d=>d.remove()),this.toolbar=new Y(this.config.position,this.makeToolbarCallbacks(),this.config.keys,this.config.tools),r&&this.toolbar.minimize(),this.markers=new Z(d=>this.onMarkerClick(d)),this.highlight=new q,this.touchAim=this.makeTouchAim(),this.listPanel=this.makeListPanel(),r&&this.markers.setVisible(!1);let o=document.getElementById("instruckt-global");o&&o.remove(),Oe(this.config.colors),this.syncMarkers(),e&&!r&&this.setAnnotating(!0),n&&!r&&this.setListOpen(!0)}onMinimize(e){var n,r,o,i;e?(this.isAnnotating&&this.setAnnotating(!1),this.setListOpen(!1),(n=this.toolbar)==null||n.setAnnotateActive(!1),(r=this.markers)==null||r.setVisible(!1),(o=this.popup)==null||o.destroy()):(i=this.markers)==null||i.setVisible(!0)}static get STORAGE_KEY(){return`instruckt:${window.location.origin}:annotations`}async loadAnnotations(){this.loadFromStorage();try{let e=await this.api.getAnnotations();this.hasBackend=!0;let n=new Set(e.map(o=>o.id)),r=this.annotations.filter(o=>!n.has(o.id));this.annotations=[...e,...r],this.saveToStorage()}catch(e){this.hasBackend=!1}this.initialLoadDone=!0,this.syncMarkers()}saveToStorage(){try{let e=new Map,n=this.annotations.map(r=>{var o;return(o=r.screenshot)!=null&&o.startsWith("data:")?(e.set(r.id,r.screenshot),E(S({},r),{screenshot:`idb:${r.id}`})):r});localStorage.setItem(C.STORAGE_KEY,JSON.stringify(n)),e.size>0&&this.saveScreenshotsToIdb(e)}catch(e){}}loadFromStorage(){try{let e=localStorage.getItem(C.STORAGE_KEY);if(e){this.annotations=JSON.parse(e);let n=this.annotations.filter(r=>{var o;return(o=r.screenshot)==null?void 0:o.startsWith("idb:")});n.length>0&&this.loadScreenshotsFromIdb(n)}}catch(e){}}openIdb(){return new Promise((e,n)=>{let r=indexedDB.open(C.IDB_NAME,1);r.onupgradeneeded=()=>{let o=r.result;o.objectStoreNames.contains(C.IDB_STORE)||o.createObjectStore(C.IDB_STORE)},r.onsuccess=()=>e(r.result),r.onerror=()=>n(r.error)})}async saveScreenshotsToIdb(e){try{let n=await this.openIdb(),o=n.transaction(C.IDB_STORE,"readwrite").objectStore(C.IDB_STORE);for(let[i,s]of e)o.put(s,i);n.close()}catch(n){}}async loadScreenshotsFromIdb(e){try{let n=await this.openIdb(),r=n.transaction(C.IDB_STORE,"readonly"),o=r.objectStore(C.IDB_STORE);for(let i of e){let s=i.screenshot.replace("idb:",""),a=o.get(s);a.onsuccess=()=>{a.result&&(i.screenshot=a.result)}}await new Promise(i=>{r.oncomplete=()=>i()}),n.close(),this.syncMarkers()}catch(n){}}updatePolling(){if(!this.initialLoadDone)return;let e=this.totalActiveCount()>0;e&&!this.pollTimer?this.pollTimer=setInterval(()=>this.pollForChanges(),3e3):!e&&this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}async pollForChanges(){try{let e=await this.api.getAnnotations(),n=!1;for(let r of e){let o=this.annotations.find(i=>i.id===r.id);o&&o.status!==r.status&&(o.status=r.status,o.resolvedAt=r.resolvedAt,o.resolvedBy=r.resolvedBy,n=!0)}n&&this.saveToStorage(),this.syncMarkers()}catch(e){}}syncMarkers(){var r,o,i,s,a;(r=this.markers)==null||r.clear();let e=_e(),n=0;for(let l of this.annotations)l.status==="resolved"||l.status==="dismissed"||this.annotationPageKey(l)===e&&(n++,(o=this.markers)==null||o.upsert(l,n));(i=this.toolbar)==null||i.setAnnotationCount(this.pageAnnotations().length),(s=this.toolbar)==null||s.setTotalCount(this.totalActiveCount()),(a=this.listPanel)==null||a.refresh(),this.updatePolling()}annotationPageKey(e){try{return new URL(e.url).pathname}catch(n){return e.url}}pageAnnotations(){let e=_e();return this.annotations.filter(n=>this.annotationPageKey(n)===e&&n.status!=="resolved"&&n.status!=="dismissed")}activeAnnotations(){return this.annotations.filter(e=>e.status!=="resolved"&&e.status!=="dismissed")}totalActiveCount(){return this.activeAnnotations().length}setAnnotating(e){var n,r;this.isAnnotating=e,(n=this.toolbar)==null||n.setAnnotateActive(e),e?this.attachAnnotateListeners():(this.detachAnnotateListeners(),this.highlightLocked=!1,(r=this.highlight)==null||r.hide(),this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null))}openNoteFor(e,n,r){var c,h;let o=((c=window.getSelection())==null?void 0:c.toString().trim())||void 0,i=We(e),s=Ye(e),a=we(e),l=Ke(e),d=qe(e)||void 0,u=Xe(e);(h=this.highlight)==null||h.show(e),this.highlightLocked=!0,this.detectFramework(e).then(p=>{let m={element:e,elementPath:i,elementName:s,elementLabel:a,cssClasses:l,boundingBox:u,x:n,y:r,selectedText:o,nearbyText:d,framework:p!=null?p:void 0};this.showAnnotationPopup(m)})}showAnnotationPopup(e){var n;(n=this.popup)==null||n.showNew(e,{onSubmit:r=>{var o,i;(o=this.touchAim)==null||o.done(),this.highlightLocked=!1,(i=this.highlight)==null||i.hide(),this.submitAnnotation(e,r.comment,r.screenshot)},onCancel:()=>{var r,o;(r=this.touchAim)==null||r.done(),this.highlightLocked=!1,(o=this.highlight)==null||o.hide()}})}attachAnnotateListeners(){var e;document.addEventListener("mousemove",this.boundMouseMove),document.addEventListener("mouseleave",this.boundMouseLeave);for(let n of["mousedown","pointerdown"])window.addEventListener(n,this.boundAnnotateBlock,!0);window.addEventListener("click",this.boundClick,!0),(e=this.touchAim)==null||e.attach()}detachAnnotateListeners(){var e;document.removeEventListener("mousemove",this.boundMouseMove),document.removeEventListener("mouseleave",this.boundMouseLeave);for(let n of["mousedown","pointerdown"])window.removeEventListener(n,this.boundAnnotateBlock,!0);window.removeEventListener("click",this.boundClick,!0),(e=this.touchAim)==null||e.detach()}isInstruckt(e){return!e||!(e instanceof Element)?!1:e.closest("[data-instruckt]")!==null}async startRegionCapture(){var d;let e=this.isAnnotating;e&&this.setAnnotating(!1);let n=await pn();if(!n){e&&this.setAnnotating(!0);return}let r=await hn(n);if(!r){e&&this.setAnnotating(!0);return}let o=n.x+n.width/2,i=n.y+n.height/2,s=(d=document.elementFromPoint(o,i))!=null?d:document.body,a=await this.detectFramework(s),l={element:s,elementPath:We(s),elementName:Ye(s),elementLabel:we(s),cssClasses:Ke(s),boundingBox:Xe(s),x:o,y:i,nearbyText:qe(s)||void 0,screenshot:r,framework:a!=null?a:void 0};this.showAnnotationPopup(l)}async detectFramework(e){var o,i,s,a,l,d,u;let n=(o=this.config.adapters)!=null?o:[];if(n.includes("livewire")){let c=nr(e);if(c)return c}if(["vue","svelte","react"].some(c=>n.includes(c)))try{let c=await tr(e);if(c.source){let h=c.stack.map(m=>({filePath:m.filePath,lineNumber:m.lineNumber,columnNumber:m.columnNumber,componentName:m.componentName})),p=null;return n.includes("vue")&&(p=Ct(e)),!p&&n.includes("svelte")&&(p=Tt(e)),!p&&n.includes("react")&&(p=At(e)),p?E(S({},p),{component:(i=c.componentName)!=null?i:p.component,source_file:c.source.filePath,source_line:(s=c.source.lineNumber)!=null?s:p.source_line,source_column:(a=c.source.columnNumber)!=null?a:void 0,component_stack:h.length>0?h:void 0}):{framework:"react",component:(l=c.componentName)!=null?l:"Component",source_file:c.source.filePath,source_line:(d=c.source.lineNumber)!=null?d:void 0,source_column:(u=c.source.columnNumber)!=null?u:void 0,component_stack:h.length>0?h:void 0}}}catch(c){}if(n.includes("vue")){let c=Ct(e);if(c)return c}if(n.includes("svelte")){let c=Tt(e);if(c)return c}if(n.includes("react")){let c=At(e);if(c)return c}if(n.includes("blade")){let c=or(e);if(c)return c}return null}async submitAnnotation(e,n,r){var s,a;let o={x:e.x/window.innerWidth*100,y:e.y+window.scrollY,comment:n,element:e.elementName,elementPath:e.elementPath,cssClasses:e.cssClasses,boundingBox:e.boundingBox,selectedText:e.selectedText,nearbyText:e.nearbyText,screenshot:r,intent:"fix",severity:"important",framework:e.framework,url:window.location.href},i;try{i=await this.api.addAnnotation(o)}catch(l){i=E(S({},o),{id:$s(),status:"pending",createdAt:new Date().toISOString()})}this.annotations.push(i),this.saveToStorage(),this.syncMarkers(),(a=(s=this.config).onAnnotationAdd)==null||a.call(s,i),this.copyAnnotations(this.activeAnnotations(),!1)}onMarkerClick(e){var n;(n=this.popup)==null||n.showEdit(e,{onSave:(r,o)=>this.saveComment(r,o),onDelete:r=>this.deleteAnnotations([r])},this.config.endpoint)}async saveComment(e,n){try{let r=await this.api.updateAnnotation(e.id,{comment:n});this.onAnnotationUpdated(r)}catch(r){this.onAnnotationUpdated(E(S({},e),{comment:n,updatedAt:new Date().toISOString()}))}}onAnnotationUpdated(e){let n=this.annotations.findIndex(r=>r.id===e.id);n>=0&&(this.annotations[n]=e),this.saveToStorage(),this.syncMarkers()}async deleteAnnotations(e){if(e.length===0)return;await Promise.all(e.map(r=>this.api.updateAnnotation(r.id,{status:"dismissed"}).catch(()=>{})));let n=new Set(e.map(r=>r.id));this.annotations=this.annotations.filter(r=>!n.has(r.id)),this.saveToStorage(),this.syncMarkers()}clearPage(){return this.deleteAnnotations(this.pageAnnotations())}clearEverything(){return this.deleteAnnotations(this.activeAnnotations())}async copyAndClear(){let e=this.activeAnnotations();if(e.length===0)return!1;let n=await this.copyAnnotations(e,!0);return n&&await this.deleteAnnotations(e),n}onKeydown(e){var i,s,a,l,d,u,c,h,p;if((i=this.toolbar)!=null&&i.isMinimized())return;let n=e.target;if(["INPUT","TEXTAREA","SELECT"].includes(n.tagName)||n.closest('[contenteditable="true"]')||this.isInstruckt(n))return;let r=(s=this.config.keys)!=null?s:{},o=!e.metaKey&&!e.ctrlKey&&!e.altKey;e.key===((a=r.annotate)!=null?a:"a")&&o&&this.setAnnotating(!this.isAnnotating),e.key===((l=r.list)!=null?l:"l")&&o&&this.setListOpen(!((u=(d=this.listPanel)==null?void 0:d.isOpen())!=null&&u)),e.key===((c=r.screenshot)!=null?c:"c")&&o&&this.startRegionCapture(),e.key===((h=r.clearPage)!=null?h:"x")&&o&&this.clearPage(),e.key==="Escape"&&(this.isAnnotating&&this.setAnnotating(!1),(p=this.listPanel)!=null&&p.isOpen()&&this.setListOpen(!1))}async copyAnnotations(e,n){let r=this.exportMarkdown(e);if(window.isSecureContext)try{return await navigator.clipboard.writeText(r),!0}catch(o){return!1}if(!n)return!1;try{let o=document.createElement("textarea");o.value=r,o.readOnly=!0,o.style.cssText="position:fixed;left:-9999px;top:0;font-size:16px",o.setAttribute("data-instruckt","copy"),document.body.appendChild(o),o.select(),o.setSelectionRange(0,r.length);let i=document.execCommand("copy");return o.remove(),i}catch(o){return!1}}exportMarkdown(e=this.activeAnnotations()){let n=e.filter(s=>s.status!=="resolved"&&s.status!=="dismissed");if(n.length===0)return`# UI Feedback

No open annotations.`;let r=new Map;for(let s of n){let a=this.annotationPageKey(s);r.has(a)||r.set(a,[]),r.get(a).push(s)}let o=r.size>1,i=[];o&&(i.push("# UI Feedback"),i.push(""));for(let[s,a]of r){o?i.push(`## ${s}`):i.push(`# UI Feedback: ${s}`),i.push("");let l=o?"###":"##";a.forEach((d,u)=>{var h,p,m,g,f,v;let c=(h=d.framework)!=null&&h.component?` in \`${d.framework.component}\``:"";if(i.push(`${l} ${u+1}. ${d.comment}`),i.push(`- ID: \`${d.id}\``),i.push(`- Element: \`${d.element}\`${c}`),(p=d.framework)!=null&&p.source_file){let b=d.framework.source_file;d.framework.source_line&&(b+=`:${d.framework.source_line}`,d.framework.source_column&&(b+=`:${d.framework.source_column}`)),i.push(`- Source: \`${b}\``)}else(g=(m=d.framework)==null?void 0:m.data)!=null&&g.file&&i.push(`- File: \`${d.framework.data.file}\``);if((f=d.framework)!=null&&f.component_stack&&d.framework.component_stack.length>1){i.push("- Component stack:");for(let b of d.framework.component_stack){let y=b.filePath;b.lineNumber&&(y+=`:${b.lineNumber}`,b.columnNumber&&(y+=`:${b.columnNumber}`));let w=b.componentName?`${b.componentName} `:"";i.push(`  - ${w}\`${y}\``)}}if(d.cssClasses&&i.push(`- Classes: \`${d.cssClasses}\``),d.selectedText?i.push(`- Text: "${d.selectedText}"`):d.nearbyText&&i.push(`- Text: "${d.nearbyText.slice(0,100)}"`),d.screenshot)if(d.screenshot.startsWith("data:"))i.push(`- Screenshot: ![Screenshot](${d.screenshot})`);else{let b=(v=this.config.screenshotPath)!=null?v:"storage/app/_instruckt/",y=this.config.mcp?` \u2014 call \`instruckt.get_screenshot\` with ID \`${d.id}\` to view`:"";i.push(`- Screenshot: \`${b}${d.screenshot}\`${y}`)}i.push("")})}return this.config.mcp&&(i.push("---"),i.push(""),i.push("After making changes, use the `instruckt.resolve` MCP tool to mark each annotation as resolved.")),i.join(`
`).trim()}getAnnotations(){return[...this.annotations]}destroy(){var e,n,r,o,i,s;this.setAnnotating(!1),document.removeEventListener("keydown",this.boundKeydown),window.removeEventListener("scroll",this.boundReposition),window.removeEventListener("resize",this.boundReposition),(e=this.toolbar)==null||e.destroy(),(n=this.highlight)==null||n.destroy(),(r=this.touchAim)==null||r.destroy(),(o=this.popup)==null||o.destroy(),(i=this.markers)==null||i.destroy(),(s=this.listPanel)==null||s.destroy(),this.rafId!==null&&cancelAnimationFrame(this.rafId),this.pollTimer!==null&&clearInterval(this.pollTimer)}};C.IDB_NAME="instruckt",C.IDB_STORE="screenshots";var le=C;function Bs(t){return new le(t)}return dr(Ds);})();
/*! Bundled license information:

bippy/dist/rdt-hook.js:
bippy/dist/install-hook-only.js:
bippy/dist/core.js:
bippy/dist/index.js:
bippy/dist/source.js:
  (**
   * @license bippy
   *
   * Copyright (c) Aiden Bai
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=instruckt.iife.js.map