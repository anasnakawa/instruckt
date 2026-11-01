/* instruckt v0.7.0 | MIT */
"use strict";var Instruckt=(()=>{var ue=Object.defineProperty,io=Object.defineProperties,so=Object.getOwnPropertyDescriptor,ao=Object.getOwnPropertyDescriptors,lo=Object.getOwnPropertyNames,ce=Object.getOwnPropertySymbols;var Le=Object.prototype.hasOwnProperty,_t=Object.prototype.propertyIsEnumerable;var Rt=(t,e,n)=>e in t?ue(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,S=(t,e)=>{for(var n in e||(e={}))Le.call(e,n)&&Rt(t,n,e[n]);if(ce)for(var n of ce(e))_t.call(e,n)&&Rt(t,n,e[n]);return t},E=(t,e)=>io(t,ao(e));var Lt=(t,e)=>{var n={};for(var o in t)Le.call(t,o)&&e.indexOf(o)<0&&(n[o]=t[o]);if(t!=null&&ce)for(var o of ce(t))e.indexOf(o)<0&&_t.call(t,o)&&(n[o]=t[o]);return n};var co=(t,e)=>{for(var n in e)ue(t,n,{get:e[n],enumerable:!0})},uo=(t,e,n,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of lo(e))!Le.call(t,r)&&r!==n&&ue(t,r,{get:()=>e[r],enumerable:!(o=so(e,r))||o.enumerable});return t};var ho=t=>uo(ue({},"__esModule",{value:!0}),t);var Ds={};co(Ds,{Instruckt:()=>le,init:()=>Bs});function po(){let t=document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]+)/);return t?decodeURIComponent(t[1]):""}function Me(){let t={"Content-Type":"application/json",Accept:"application/json","X-Requested-With":"XMLHttpRequest"},e=po();return e&&(t["X-XSRF-TOKEN"]=e),t}function W(t){let e={};for(let[n,o]of Object.entries(t)){let r=n.replace(/_([a-z])/g,(i,s)=>s.toUpperCase());e[r]=Array.isArray(o)?o.map(i=>i&&typeof i=="object"&&!Array.isArray(i)?W(i):i):o&&typeof o=="object"&&!Array.isArray(o)?W(o):o}return e}function Ie(t){let e={};for(let[n,o]of Object.entries(t)){let r=n.replace(/[A-Z]/g,i=>`_${i.toLowerCase()}`);e[r]=o&&typeof o=="object"&&!Array.isArray(o)?Ie(o):o}return e}var de=class{constructor(e){this.endpoint=e}async getAnnotations(){let e=await fetch(`${this.endpoint}/annotations`,{headers:Me()});if(!e.ok)throw new Error(`instruckt: failed to load annotations (${e.status})`);return(await e.json()).map(o=>W(o))}async addAnnotation(e){let n=await fetch(`${this.endpoint}/annotations`,{method:"POST",headers:Me(),body:JSON.stringify(Ie(e))});if(!n.ok)throw new Error(`instruckt: failed to add annotation (${n.status})`);return W(await n.json())}async updateAnnotation(e,n){let o=await fetch(`${this.endpoint}/annotations/${e}`,{method:"PATCH",headers:Me(),body:JSON.stringify(Ie(n))});if(!o.ok)throw new Error(`instruckt: failed to update annotation (${o.status})`);return W(await o.json())}};var mo=`
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
`,fo=`
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
`:"",n=document.createElement("style");n.id="instruckt-global",n.textContent=e+mo+fo,document.head.appendChild(n)}var Pt=`
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
`;var T={annotate:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>',list:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/></svg>',copyClear:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v4"/><path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"/><rect x="8" y="2" width="8" height="4" rx="1"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="21" y1="15" x2="15" y2="21"/></svg>',copy:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',check:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',clear:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',minimize:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="7 13 12 18 17 13"/><line x1="12" y1="6" x2="12" y2="18"/></svg>',screenshot:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',logo:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>'},R=class R{constructor(e,n,o,r,i){this.position=e;this.callbacks=n;this.fabBadge=null;this.doneBtn=null;this.errorNote=null;this.annotateActive=!1;this.listActive=!1;this.minimized=!1;this.totalCount=0;this.dragging=!1;this.dragOffset={x:0,y:0};this.dragStart={x:0,y:0};this.dragMoved=!1;this.keys=o!=null?o:{},this.tools=r!=null?r:{},this.options=i!=null?i:{},this.build(),this.setupDrag()}show(e){return this.tools[e]!==!1}build(){var m,g,f,v,k,y,w;this.host=document.createElement("div"),this.host.setAttribute("data-instruckt","toolbar"),this.shadow=this.host.attachShadow({mode:"open"});let e=document.createElement("style");e.textContent=It,this.shadow.appendChild(e),this.toolbarEl=document.createElement("div"),this.toolbarEl.className="toolbar";let n=document.createElement("div");n.className="drag-handle",n.setAttribute("aria-label","Drag to reposition toolbar"),n.innerHTML=`<svg width="16" height="6" viewBox="0 0 16 6" fill="currentColor">
      <circle cx="4" cy="1.5" r="1.2"/><circle cx="8" cy="1.5" r="1.2"/><circle cx="12" cy="1.5" r="1.2"/>
      <circle cx="4" cy="4.5" r="1.2"/><circle cx="8" cy="4.5" r="1.2"/><circle cx="12" cy="4.5" r="1.2"/>
    </svg>`,this.toolbarEl.appendChild(n);let o=this.keys;this.annotateBtn=this.makeBtn(T.annotate,`Annotate elements (${((m=o.annotate)!=null?m:"A").toUpperCase()})`,()=>{let b=!this.annotateActive;this.setAnnotateActive(b),this.callbacks.onToggleAnnotate(b)}),this.listBtn=this.makeBtn(T.list,`All notes (${((g=o.list)!=null?g:"L").toUpperCase()})`,()=>{let b=!this.listActive;this.setListActive(b),this.callbacks.onToggleList(b)});let r=this.makeBtn(T.screenshot,`Screenshot region (${((f=o.screenshot)!=null?f:"C").toUpperCase()})`,()=>{this.callbacks.onScreenshot()});this.copyBtn=this.makeBtn(T.copy,"Copy all notes",async()=>{await this.callbacks.onCopy()&&this.flashDone(this.copyBtn,T.copy)}),this.copyClearBtn=this.makeBtn(T.copyClear,"Copy all notes, then clear them",async()=>{await this.callbacks.onCopyAndClear()&&this.flashDone(this.copyClearBtn,T.copyClear)});let i=document.createElement("div");i.className="clear-wrap";let s=this.makeBtn(T.clear,`Clear this page (${((v=o.clearPage)!=null?v:"X").toUpperCase()})`,()=>{var b,x;(x=(b=this.callbacks).onClearPage)==null||x.call(b)});s.classList.add("danger-btn");let a=this.makeBtn('<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>',"Delete all instructions.",()=>{var b,x;return(x=(b=this.callbacks).onClearAll)==null?void 0:x.call(b)});a.classList.add("danger-btn","clear-all-btn"),i.appendChild(s),i.appendChild(a);let l=this.makeBtn(T.minimize,"Minimize toolbar",()=>{this.setMinimized(!0)});l.classList.add("minimize-btn");let d=()=>{let b=document.createElement("div");return b.className="divider",b},c=[],u=b=>{c.length>0&&c.push(d()),c.push(b)};this.show("annotate")&&u(this.annotateBtn),this.show("screenshot")&&u(r),this.show("list")&&u(this.listBtn),this.show("copy")&&u(this.copyBtn),this.show("copy_clear")&&u(this.copyClearBtn),(this.show("clear_page")||this.show("clear_all"))&&u(i),this.show("minimize")&&u(l),this.toolbarEl.append(...c),this.shadow.appendChild(this.toolbarEl),this.fab=document.createElement("button"),this.fab.className="fab",this.fab.title="Open instruckt toolbar",this.fab.setAttribute("aria-label","Open instruckt toolbar"),this.fab.innerHTML=T.logo,this.fab.style.display="none",this.fab.addEventListener("click",b=>{b.stopPropagation(),!this.dragMoved&&this.setMinimized(!1)}),this.shadow.appendChild(this.fab);let h=this.options.doneAction;h&&(this.doneBtn=document.createElement("button"),this.doneBtn.className="done-btn",this.doneBtn.title=(k=h.title)!=null?k:h.label,this.doneBtn.setAttribute("aria-label",(y=h.title)!=null?y:h.label),this.doneBtn.textContent=h.label,this.doneBtn.addEventListener("click",b=>{b.stopPropagation(),!this.dragMoved&&window.location.assign(h.href)}),this.shadow.appendChild(this.doneBtn),this.host.classList.add("ik-stack")),this.host.addEventListener("click",b=>b.stopPropagation()),this.host.addEventListener("mousedown",b=>b.stopPropagation()),this.host.addEventListener("pointerdown",b=>b.stopPropagation()),this.applyPosition(),this.loadSavedPosition(),((w=document.getElementById("instruckt-root"))!=null?w:document.body).appendChild(this.host),this.startMinimized()&&this.minimize(),this.keepOnScreen(),window.addEventListener("resize",()=>this.keepOnScreen(),{passive:!0})}startMinimized(){if(this.options.startMinimized!==void 0)return this.options.startMinimized;try{let e=localStorage.getItem(R.MINIMIZED_KEY);if(e!==null)return e==="1"}catch(e){}return window.matchMedia("(max-width: 639px), (max-height: 499px)").matches}keepOnScreen(){let e=this.host.getBoundingClientRect();if(e.width===0)return;let n=8,o=window.innerWidth,r=window.innerHeight;if(e.left>=n&&e.top>=n&&e.right<=o-n&&e.bottom<=r-n)return;let i=Math.max(n,Math.min(e.left,o-e.width-n)),s=Math.max(n,Math.min(e.top,r-e.height-n));Object.assign(this.host.style,{left:`${i}px`,bottom:`${r-s-e.height}px`,top:"auto",right:"auto"})}flashDone(e,n){var o;(o=e.querySelector("svg"))==null||o.remove(),e.insertAdjacentHTML("afterbegin",T.check),setTimeout(()=>{var r;(r=e.querySelector("svg"))==null||r.remove(),e.insertAdjacentHTML("afterbegin",n)},1200)}makeBtn(e,n,o){let r=document.createElement("button");return r.className="btn",r.setAttribute("data-tooltip",n),r.setAttribute("aria-label",n),r.innerHTML=e,r.addEventListener("click",i=>{i.stopPropagation(),o()}),r}applyPosition(){let e="16px";Object.assign(this.host.style,{position:"fixed",zIndex:"2147483646",bottom:this.position.includes("bottom")?e:"auto",top:this.position.includes("top")?e:"auto",right:this.position.includes("right")?e:"auto",left:this.position.includes("left")?e:"auto"})}savePosition(){let{left:e,right:n,top:o,bottom:r}=this.host.style;try{localStorage.setItem(R.POSITION_KEY,JSON.stringify({left:e,right:n,top:o,bottom:r}))}catch(i){}}loadSavedPosition(){try{let e=localStorage.getItem(R.POSITION_KEY);if(!e)return;let{left:n,right:o,top:r,bottom:i}=JSON.parse(e);Object.assign(this.host.style,{left:n,right:o,top:r,bottom:i})}catch(e){}}setupDrag(){this.shadow.addEventListener("pointerdown",n=>{let o=n,r=o.target;if(r.closest(".btn, .error-note"))return;this.dragging=!0,this.dragMoved=!1;let i=this.host.getBoundingClientRect();this.dragOffset={x:o.clientX-i.left,y:o.clientY-i.top},this.dragStart={x:o.clientX,y:o.clientY},r.closest(".fab")||o.preventDefault()}),document.addEventListener("pointermove",n=>{this.dragging&&(!this.dragMoved&&Math.hypot(n.clientX-this.dragStart.x,n.clientY-this.dragStart.y)<5||(this.dragMoved=!0,Object.assign(this.host.style,{left:`${n.clientX-this.dragOffset.x}px`,bottom:`${window.innerHeight-(n.clientY-this.dragOffset.y)-this.host.offsetHeight}px`,top:"auto",right:"auto"})))});let e=()=>{this.dragging&&(this.dragging=!1,this.dragMoved&&(this.keepOnScreen(),this.savePosition(),setTimeout(()=>{this.dragMoved=!1},0)))};document.addEventListener("pointerup",e),document.addEventListener("pointercancel",e)}setMinimized(e){var n,o;this.minimized=e;try{localStorage.setItem(R.MINIMIZED_KEY,e?"1":"0")}catch(r){}this.toolbarEl.style.display=e?"none":"",this.fab.style.display=e?"":"none",this.updateFabBadge(),(o=(n=this.callbacks).onMinimize)==null||o.call(n,e),requestAnimationFrame(()=>this.keepOnScreen())}updateFabBadge(){var e;this.totalCount>0&&this.minimized?(this.fabBadge||(this.fabBadge=document.createElement("span"),this.fabBadge.className="fab-badge",this.fab.appendChild(this.fabBadge)),this.fabBadge.textContent=this.totalCount>99?"99+":String(this.totalCount)):((e=this.fabBadge)==null||e.remove(),this.fabBadge=null)}isMinimized(){return this.minimized}minimize(){this.minimized=!0,this.toolbarEl.style.display="none",this.fab.style.display="",this.updateFabBadge()}setAnnotateActive(e){this.annotateActive=e,this.annotateBtn.classList.toggle("active",e),document.body.classList.toggle("ik-annotating",e)}setListActive(e){this.listActive=e,this.listBtn.classList.toggle("active",e)}getListAnchor(){return{bar:this.host.getBoundingClientRect(),button:this.listBtn.getBoundingClientRect()}}setMode(e){this.setAnnotateActive(e==="annotating")}setAnnotationCount(e){let n=this.annotateBtn.querySelector(".badge");e>0?(n||(n=document.createElement("span"),n.className="badge",this.annotateBtn.appendChild(n)),n.textContent=e>99?"99+":String(e)):n==null||n.remove()}setTotalCount(e){this.totalCount=e,this.updateFabBadge(),this.doneBtn&&this.options.doneAction&&(this.doneBtn.textContent=e>0?`${this.options.doneAction.label} (${e>99?"99+":e})`:this.options.doneAction.label);let n=this.listBtn.querySelector(".badge");e>0?(n||(n=document.createElement("span"),n.className="badge badge-total",this.listBtn.appendChild(n)),n.textContent=e>99?"99+":String(e)):n==null||n.remove()}setError(e){var n;if(!e){(n=this.errorNote)==null||n.remove(),this.errorNote=null,this.doneBtn||this.host.classList.remove("ik-stack");return}this.host.classList.add("ik-stack"),this.errorNote||(this.errorNote=document.createElement("button"),this.errorNote.className="error-note",this.errorNote.setAttribute("role","alert"),this.errorNote.addEventListener("click",o=>{var r,i;o.stopPropagation(),(i=(r=this.callbacks).onRetry)==null||i.call(r)}),this.shadow.appendChild(this.errorNote)),this.errorNote.textContent=e}destroy(){this.host.remove(),document.body.classList.remove("ik-annotating")}};R.MINIMIZED_KEY="instruckt:toolbar-min",R.POSITION_KEY="instruckt:toolbar-pos";var q=R;var Y=class{constructor(){var n;this.el=document.createElement("div"),Object.assign(this.el.style,{position:"fixed",pointerEvents:"none",zIndex:"2147483644",border:"2px solid rgba(99,102,241,0.7)",background:"rgba(99,102,241,0.1)",borderRadius:"3px",transition:"all 0.06s ease",display:"none"}),this.el.setAttribute("data-instruckt","highlight"),this.label=document.createElement("div"),Object.assign(this.label.style,{position:"absolute",left:"-2px",maxWidth:"min(320px, 90vw)",padding:"2px 6px",borderRadius:"4px",background:"rgb(99,102,241)",color:"#fff",font:"500 11px/16px ui-monospace, SFMono-Regular, Menlo, monospace",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",display:"none"}),this.el.appendChild(this.label),((n=document.getElementById("instruckt-root"))!=null?n:document.body).appendChild(this.el)}show(e,n){let o=e.getBoundingClientRect();if(o.width===0&&o.height===0){this.hide();return}if(Object.assign(this.el.style,{display:"block",left:`${o.left}px`,top:`${o.top}px`,width:`${o.width}px`,height:`${o.height}px`}),n){this.label.textContent=n;let r=o.top>22;Object.assign(this.label.style,{display:"block",top:r?"-22px":"2px",left:r?"-2px":"2px"})}else this.label.style.display="none"}hide(){this.el.style.display="none"}destroy(){this.el.remove()}};function go(t,e){return t[13]=1,t[14]=e>>8,t[15]=e&255,t[16]=e>>8,t[17]=e&255,t}var Ut=112,zt=72,Vt=89,Wt=115,Fe;function bo(){let t=new Int32Array(256);for(let e=0;e<256;e++){let n=e;for(let o=0;o<8;o++)n=n&1?3988292384^n>>>1:n>>>1;t[e]=n}return t}function vo(t){let e=-1;Fe||(Fe=bo());for(let n=0;n<t.length;n++)e=Fe[(e^t[n])&255]^e>>>8;return e^-1}function yo(t){let e=t.length-1;for(let n=e;n>=4;n--)if(t[n-4]===9&&t[n-3]===Ut&&t[n-2]===zt&&t[n-1]===Vt&&t[n]===Wt)return n-3;return 0}function wo(t,e,n=!1){let o=new Uint8Array(13);e*=39.3701,o[0]=Ut,o[1]=zt,o[2]=Vt,o[3]=Wt,o[4]=e>>>24,o[5]=e>>>16,o[6]=e>>>8,o[7]=e&255,o[8]=o[4],o[9]=o[5],o[10]=o[6],o[11]=o[7],o[12]=1;let r=vo(o),i=new Uint8Array(4);if(i[0]=r>>>24,i[1]=r>>>16,i[2]=r>>>8,i[3]=r&255,n){let s=yo(t);return t.set(o,s),t.set(i,s+13),t}else{let s=new Uint8Array(4);s[0]=0,s[1]=0,s[2]=0,s[3]=9;let a=new Uint8Array(54);return a.set(t,0),a.set(s,33),a.set(o,37),a.set(i,50),a}}var ko="AAlwSFlz",xo="AAAJcEhZ",So="AAAACXBI";function Eo(t){let e=t.indexOf(ko);return e===-1&&(e=t.indexOf(xo)),e===-1&&(e=t.indexOf(So)),e}var qt="[modern-screenshot]",_=typeof window!="undefined",Co=_&&"Worker"in window,To=_&&"atob"in window,Ao=_&&"btoa"in window,jt,De=_?(jt=window.navigator)==null?void 0:jt.userAgent:"",Yt=De.includes("Chrome"),he=De.includes("AppleWebKit")&&!Yt,He=De.includes("Firefox"),No=t=>t&&"__CONTEXT__"in t,Ro=t=>t.constructor.name==="CSSFontFaceRule",_o=t=>t.constructor.name==="CSSImportRule",Lo=t=>t.constructor.name==="CSSLayerBlockRule",A=t=>t.nodeType===1,J=t=>typeof t.className=="object",Kt=t=>t.tagName==="image",Mo=t=>t.tagName==="use",K=t=>A(t)&&typeof t.style!="undefined"&&!J(t),Io=t=>t.nodeType===8,Po=t=>t.nodeType===3,U=t=>t.tagName==="IMG",pe=t=>t.tagName==="VIDEO",Oo=t=>t.tagName==="CANVAS",Fo=t=>t.tagName==="TEXTAREA",$o=t=>t.tagName==="INPUT",Bo=t=>t.tagName==="STYLE",Do=t=>t.tagName==="SCRIPT",Ho=t=>t.tagName==="SELECT",jo=t=>t.tagName==="SLOT",Uo=t=>t.tagName==="IFRAME",zo=(...t)=>console.warn(qt,...t);function Vo(t){var n;let e=(n=t==null?void 0:t.createElement)==null?void 0:n.call(t,"canvas");return e&&(e.height=e.width=1),!!e&&"toDataURL"in e&&!!e.toDataURL("image/webp").includes("image/webp")}var $e=t=>t.startsWith("data:");function Xt(t,e){if(t.match(/^[a-z]+:\/\//i))return t;if(_&&t.match(/^\/\//))return window.location.protocol+t;if(t.match(/^[a-z]+:/i)||!_)return t;let n=me().implementation.createHTMLDocument(),o=n.createElement("base"),r=n.createElement("a");return n.head.appendChild(o),n.body.appendChild(r),e&&(o.href=e),r.href=t,r.href}function me(t){var e;return(e=t&&A(t)?t==null?void 0:t.ownerDocument:t)!=null?e:window.document}var fe="http://www.w3.org/2000/svg";function Wo(t,e,n){let o=me(n).createElementNS(fe,"svg");return o.setAttributeNS(null,"width",t.toString()),o.setAttributeNS(null,"height",e.toString()),o.setAttributeNS(null,"viewBox",`0 0 ${t} ${e}`),o}function qo(t,e){let n=new XMLSerializer().serializeToString(t);return e&&(n=n.replace(/[\u0000-\u0008\v\f\u000E-\u001F\uD800-\uDFFF\uFFFE\uFFFF]/gu,"")),`data:image/svg+xml;charset=utf-8,${encodeURIComponent(n)}`}function Yo(t,e){return new Promise((n,o)=>{let r=new FileReader;r.onload=()=>n(r.result),r.onerror=()=>o(r.error),r.onabort=()=>o(new Error(`Failed read blob to ${e}`)),e==="dataUrl"?r.readAsDataURL(t):e==="arrayBuffer"&&r.readAsArrayBuffer(t)})}var Ko=t=>Yo(t,"dataUrl");function j(t,e){let n=me(e).createElement("img");return n.decoding="sync",n.loading="eager",n.src=t,n}function X(t,e){return new Promise(n=>{let{timeout:o,ownerDocument:r,onError:i,onWarn:s}=e!=null?e:{},a=typeof t=="string"?j(t,me(r)):t,l=null,d=null;function c(){n(a),l&&clearTimeout(l),d==null||d()}if(o&&(l=setTimeout(c,o)),pe(a)){let u=a.currentSrc||a.src;if(!u)return a.poster?X(a.poster,e).then(n):c();if(a.readyState>=2)return c();let h=c,p=m=>{s==null||s("Failed video load",u,m),i==null||i(m),c()};d=()=>{a.removeEventListener("loadeddata",h),a.removeEventListener("error",p)},a.addEventListener("loadeddata",h,{once:!0}),a.addEventListener("error",p,{once:!0})}else{let u=Kt(a)?a.href.baseVal:a.currentSrc||a.src;if(!u)return c();let h=async()=>{if(U(a)&&"decode"in a)try{await a.decode()}catch(m){s==null||s("Failed to decode image, trying to render anyway",a.dataset.originalSrc||u,m)}c()},p=m=>{s==null||s("Failed image load",a.dataset.originalSrc||u,m),c()};if(U(a)&&a.complete)return h();d=()=>{a.removeEventListener("load",h),a.removeEventListener("error",p)},a.addEventListener("load",h,{once:!0}),a.addEventListener("error",p,{once:!0})}})}async function Xo(t,e){K(t)&&(U(t)||pe(t)?await X(t,e):await Promise.all(["img","video"].flatMap(n=>Array.from(t.querySelectorAll(n)).map(o=>X(o,e)))))}var Gt=(function(){let e=0,n=()=>`0000${(Math.random()*36**4<<0).toString(36)}`.slice(-4);return()=>(e+=1,`u${n()}${e}`)})();function Jt(t){return t==null?void 0:t.split(",").map(e=>e.trim().replace(/"|'/g,"").toLowerCase()).filter(Boolean)}var Ot=0;function Go(t){let e=`${qt}[#${Ot}]`;return Ot++,{time:n=>t&&console.time(`${e} ${n}`),timeEnd:n=>t&&console.timeEnd(`${e} ${n}`),warn:(...n)=>t&&zo(...n)}}function Jo(t){return{cache:t?"no-cache":"force-cache"}}async function ge(t,e){return No(t)?t:Zo(t,E(S({},e),{autoDestruct:!0}))}async function Zo(t,e){var p,m,g,f,v;let{scale:n=1,workerUrl:o,workerNumber:r=1}=e||{},i=!!(e!=null&&e.debug),s=(p=e==null?void 0:e.features)!=null?p:!0,a=(m=t.ownerDocument)!=null?m:_?window.document:void 0,l=(f=(g=t.ownerDocument)==null?void 0:g.defaultView)!=null?f:_?window:void 0,d=new Map,c=E(S({width:0,height:0,quality:1,type:"image/png",scale:n,backgroundColor:null,style:null,filter:null,maximumCanvasSize:0,timeout:3e4,progress:null,debug:i,fetch:S({requestInit:Jo((v=e==null?void 0:e.fetch)==null?void 0:v.bypassingCache),placeholderImage:"data:image/png;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",bypassingCache:!1},e==null?void 0:e.fetch),fetchFn:null,font:{},drawImageInterval:100,workerUrl:null,workerNumber:r,onCloneEachNode:null,onCloneNode:null,onEmbedNode:null,onCreateForeignObjectSvg:null,includeStyleProperties:null,autoDestruct:!1},e),{__CONTEXT__:!0,log:Go(i),node:t,ownerDocument:a,ownerWindow:l,dpi:n===1?null:96*n,svgStyleElement:Zt(a),svgDefsElement:a==null?void 0:a.createElementNS(fe,"defs"),svgStyles:new Map,defaultComputedStyles:new Map,workers:[...Array.from({length:Co&&o&&r?r:0})].map(()=>{try{let k=new Worker(o);return k.onmessage=async y=>{var x,I,P,Nt;let{url:w,result:b}=y.data;b?(I=(x=d.get(w))==null?void 0:x.resolve)==null||I.call(x,b):(Nt=(P=d.get(w))==null?void 0:P.reject)==null||Nt.call(P,new Error(`Error receiving message from worker: ${w}`))},k.onmessageerror=y=>{var b,x;let{url:w}=y.data;(x=(b=d.get(w))==null?void 0:b.reject)==null||x.call(b,new Error(`Error receiving message from worker: ${w}`))},k}catch(k){return c.log.warn("Failed to new Worker",k),null}}).filter(Boolean),fontFamilies:new Map,fontCssTexts:new Map,acceptOfImage:`${[Vo(a)&&"image/webp","image/svg+xml","image/*","*/*"].filter(Boolean).join(",")};q=0.8`,requests:d,drawImageCount:0,tasks:[],features:s,isEnable:k=>{var y,w;return k==="restoreScrollPosition"?typeof s=="boolean"?!1:(y=s[k])!=null?y:!1:typeof s=="boolean"?s:(w=s[k])!=null?w:!0},shadowRoots:[]});c.log.time("wait until load"),await Xo(t,{timeout:c.timeout,onWarn:c.log.warn}),c.log.timeEnd("wait until load");let{width:u,height:h}=Qo(t,c);return c.width=u,c.height=h,c}function Zt(t){if(!t)return;let e=t.createElement("style"),n=e.ownerDocument.createTextNode(`
.______background-clip--text {
  background-clip: text;
  -webkit-background-clip: text;
}
`);return e.appendChild(n),e}function Qo(t,e){let{width:n,height:o}=e;if(A(t)&&(!n||!o)){let r=t.getBoundingClientRect();n=n||r.width||Number(t.getAttribute("width"))||0,o=o||r.height||Number(t.getAttribute("height"))||0}return{width:n,height:o}}async function er(t,e){let{log:n,timeout:o,drawImageCount:r,drawImageInterval:i}=e;n.time("image to canvas");let s=await X(t,{timeout:o,onWarn:e.log.warn}),{canvas:a,context2d:l}=tr(t.ownerDocument,e),d=()=>{try{l==null||l.drawImage(s,0,0,a.width,a.height)}catch(c){e.log.warn("Failed to drawImage",c)}};if(d(),e.isEnable("fixSvgXmlDecode"))for(let c=0;c<r;c++)await new Promise(u=>{setTimeout(()=>{l==null||l.clearRect(0,0,a.width,a.height),d(),u()},c+i)});return e.drawImageCount=0,n.timeEnd("image to canvas"),a}function tr(t,e){let{width:n,height:o,scale:r,backgroundColor:i,maximumCanvasSize:s}=e,a=t.createElement("canvas");a.width=Math.floor(n*r),a.height=Math.floor(o*r),a.style.width=`${n}px`,a.style.height=`${o}px`,s&&(a.width>s||a.height>s)&&(a.width>s&&a.height>s?a.width>a.height?(a.height*=s/a.width,a.width=s):(a.width*=s/a.height,a.height=s):a.width>s?(a.height*=s/a.width,a.width=s):(a.width*=s/a.height,a.height=s));let l=a.getContext("2d");return l&&i&&(l.fillStyle=i,l.fillRect(0,0,a.width,a.height)),{canvas:a,context2d:l}}function Qt(t,e){if(t.ownerDocument)try{let i=t.toDataURL();if(i!=="data:,")return j(i,t.ownerDocument)}catch(i){e.log.warn("Failed to clone canvas",i)}let n=t.cloneNode(!1),o=t.getContext("2d"),r=n.getContext("2d");try{return o&&r&&r.putImageData(o.getImageData(0,0,t.width,t.height),0,0),n}catch(i){e.log.warn("Failed to clone canvas",i)}return n}function nr(t,e){var n;try{if((n=t==null?void 0:t.contentDocument)!=null&&n.body)return je(t.contentDocument.body,e)}catch(o){e.log.warn("Failed to clone iframe",o)}return t.cloneNode(!1)}function or(t){let e=t.cloneNode(!1);return t.currentSrc&&t.currentSrc!==t.src&&(e.src=t.currentSrc,e.srcset=""),e.loading==="lazy"&&(e.loading="eager"),e}async function rr(t,e){if(t.ownerDocument&&!t.currentSrc&&t.poster)return j(t.poster,t.ownerDocument);let n=t.cloneNode(!1);n.crossOrigin="anonymous",t.currentSrc&&t.currentSrc!==t.src&&(n.src=t.currentSrc);let o=n.ownerDocument;if(o){let r=!0;if(await X(n,{onError:()=>r=!1,onWarn:e.log.warn}),!r)return t.poster?j(t.poster,t.ownerDocument):n;n.currentTime=t.currentTime,await new Promise(s=>{n.addEventListener("seeked",s,{once:!0})});let i=o.createElement("canvas");i.width=t.offsetWidth,i.height=t.offsetHeight;try{let s=i.getContext("2d");s&&s.drawImage(n,0,0,i.width,i.height)}catch(s){return e.log.warn("Failed to clone video",s),t.poster?j(t.poster,t.ownerDocument):n}return Qt(i,e)}return n}function ir(t,e){return Oo(t)?Qt(t,e):Uo(t)?nr(t,e):U(t)?or(t):pe(t)?rr(t,e):t.cloneNode(!1)}function sr(t){let e=t.sandbox;if(!e){let{ownerDocument:n}=t;try{n&&(e=n.createElement("iframe"),e.id=`__SANDBOX__${Gt()}`,e.width="0",e.height="0",e.style.visibility="hidden",e.style.position="fixed",n.body.appendChild(e),e.srcdoc='<!DOCTYPE html><meta charset="UTF-8"><title></title><body>',t.sandbox=e)}catch(o){t.log.warn("Failed to getSandBox",o)}}return e}var ar=["width","height","-webkit-text-fill-color"],lr=["stroke","fill"];function en(t,e,n){let{defaultComputedStyles:o}=n,r=t.nodeName.toLowerCase(),i=J(t)&&r!=="svg",s=i?lr.map(g=>[g,t.getAttribute(g)]).filter(([,g])=>g!==null):[],a=[i&&"svg",r,s.map((g,f)=>`${g}=${f}`).join(","),e].filter(Boolean).join(":");if(o.has(a))return o.get(a);let l=sr(n),d=l==null?void 0:l.contentWindow;if(!d)return new Map;let c=d==null?void 0:d.document,u,h;i?(u=c.createElementNS(fe,"svg"),h=u.ownerDocument.createElementNS(u.namespaceURI,r),s.forEach(([g,f])=>{h.setAttributeNS(null,g,f)}),u.appendChild(h)):u=h=c.createElement(r),h.textContent=" ",c.body.appendChild(u);let p=d.getComputedStyle(h,e),m=new Map;for(let g=p.length,f=0;f<g;f++){let v=p.item(f);ar.includes(v)||m.set(v,p.getPropertyValue(v))}return c.body.removeChild(u),o.set(a,m),m}function tn(t,e,n){var a;let o=new Map,r=[],i=new Map;if(n)for(let l of n)s(l);else for(let l=t.length,d=0;d<l;d++){let c=t.item(d);s(c)}for(let l=r.length,d=0;d<l;d++)(a=i.get(r[d]))==null||a.forEach((c,u)=>o.set(u,c));function s(l){let d=t.getPropertyValue(l),c=t.getPropertyPriority(l),u=l.lastIndexOf("-"),h=u>-1?l.substring(0,u):void 0;if(h){let p=i.get(h);p||(p=new Map,i.set(h,p)),p.set(l,[d,c])}e.get(l)===d&&!c||(h?r.push(h):o.set(l,[d,c]))}return o}function cr(t,e,n,o){var u,h,p,m;let{ownerWindow:r,includeStyleProperties:i,currentParentNodeStyle:s}=o,a=e.style,l=r.getComputedStyle(t),d=en(t,null,o);s==null||s.forEach((g,f)=>{d.delete(f)});let c=tn(l,d,i);c.delete("transition-property"),c.delete("all"),c.delete("d"),c.delete("content"),n&&(c.delete("margin-top"),c.delete("margin-right"),c.delete("margin-bottom"),c.delete("margin-left"),c.delete("margin-block-start"),c.delete("margin-block-end"),c.delete("margin-inline-start"),c.delete("margin-inline-end"),c.set("box-sizing",["border-box",""])),((u=c.get("background-clip"))==null?void 0:u[0])==="text"&&e.classList.add("______background-clip--text"),Yt&&(c.has("font-kerning")||c.set("font-kerning",["normal",""]),(((h=c.get("overflow-x"))==null?void 0:h[0])==="hidden"||((p=c.get("overflow-y"))==null?void 0:p[0])==="hidden")&&((m=c.get("text-overflow"))==null?void 0:m[0])==="ellipsis"&&t.scrollWidth===t.clientWidth&&c.set("text-overflow",["clip",""]));for(let g=a.length,f=0;f<g;f++)a.removeProperty(a.item(f));return c.forEach(([g,f],v)=>{a.setProperty(v,g,f)}),c}function ur(t,e){(Fo(t)||$o(t)||Ho(t))&&e.setAttribute("value",t.value)}var dr=["::before","::after"],hr=["::-webkit-scrollbar","::-webkit-scrollbar-button","::-webkit-scrollbar-thumb","::-webkit-scrollbar-track","::-webkit-scrollbar-track-piece","::-webkit-scrollbar-corner","::-webkit-resizer"];function pr(t,e,n,o,r){let{ownerWindow:i,svgStyleElement:s,svgStyles:a,currentNodeStyle:l}=o;if(!s||!i)return;function d(c){var y;let u=i.getComputedStyle(t,c),h=u.getPropertyValue("content");if(!h||h==="none")return;r==null||r(h),h=h.replace(/(')|(")|(counter\(.+\))/g,"");let p=[Gt()],m=en(t,c,o);l==null||l.forEach((w,b)=>{m.delete(b)});let g=tn(u,m,o.includeStyleProperties);g.delete("content"),g.delete("-webkit-locale"),((y=g.get("background-clip"))==null?void 0:y[0])==="text"&&e.classList.add("______background-clip--text");let f=[`content: '${h}';`];if(g.forEach(([w,b],x)=>{f.push(`${x}: ${w}${b?" !important":""};`)}),f.length===1)return;try{e.className=[e.className,...p].join(" ")}catch(w){o.log.warn("Failed to copyPseudoClass",w);return}let v=f.join(`
  `),k=a.get(v);k||(k=[],a.set(v,k)),k.push(`.${p[0]}${c}`)}dr.forEach(d),n&&hr.forEach(d)}var Ft=new Set(["symbol"]);async function $t(t,e,n,o,r){if(A(n)&&(Bo(n)||Do(n))||o.filter&&!o.filter(n))return;Ft.has(e.nodeName)||Ft.has(n.nodeName)?o.currentParentNodeStyle=void 0:o.currentParentNodeStyle=o.currentNodeStyle;let i=await je(n,o,!1,r);o.isEnable("restoreScrollPosition")&&mr(t,i),e.appendChild(i)}async function Bt(t,e,n,o){var i;let r=t.firstChild;A(t)&&t.shadowRoot&&(r=(i=t.shadowRoot)==null?void 0:i.firstChild,n.shadowRoots.push(t.shadowRoot));for(let s=r;s;s=s.nextSibling)if(!Io(s))if(A(s)&&jo(s)&&typeof s.assignedNodes=="function"){let a=s.assignedNodes();for(let l=0;l<a.length;l++)await $t(t,e,a[l],n,o)}else await $t(t,e,s,n,o)}function mr(t,e){if(!K(t)||!K(e))return;let{scrollTop:n,scrollLeft:o}=t;if(!n&&!o)return;let{transform:r}=e.style,i=new DOMMatrix(r),{a:s,b:a,c:l,d}=i;i.a=1,i.b=0,i.c=0,i.d=1,i.translateSelf(-o,-n),i.a=s,i.b=a,i.c=l,i.d=d,e.style.transform=i.toString()}function fr(t,e){let{backgroundColor:n,width:o,height:r,style:i}=e,s=t.style;if(n&&s.setProperty("background-color",n,"important"),o&&s.setProperty("width",`${o}px`,"important"),r&&s.setProperty("height",`${r}px`,"important"),i)for(let a in i)s[a]=i[a]}var gr=/^[\w-:]+$/;async function je(t,e,n=!1,o){var d,c,u,h;let{ownerDocument:r,ownerWindow:i,fontFamilies:s,onCloneEachNode:a}=e;if(r&&Po(t))return o&&/\S/.test(t.data)&&o(t.data),r.createTextNode(t.data);if(r&&i&&A(t)&&(K(t)||J(t))){let p=await ir(t,e);if(e.isEnable("removeAbnormalAttributes")){let y=p.getAttributeNames();for(let w=y.length,b=0;b<w;b++){let x=y[b];gr.test(x)||p.removeAttribute(x)}}let m=e.currentNodeStyle=cr(t,p,n,e);n&&fr(p,e);let g=!1;if(e.isEnable("copyScrollbar")){let y=[(d=m.get("overflow-x"))==null?void 0:d[0],(c=m.get("overflow-y"))==null?void 0:c[0]];g=y.includes("scroll")||(y.includes("auto")||y.includes("overlay"))&&(t.scrollHeight>t.clientHeight||t.scrollWidth>t.clientWidth)}let f=(u=m.get("text-transform"))==null?void 0:u[0],v=Jt((h=m.get("font-family"))==null?void 0:h[0]),k=v?y=>{f==="uppercase"?y=y.toUpperCase():f==="lowercase"?y=y.toLowerCase():f==="capitalize"&&(y=y[0].toUpperCase()+y.substring(1)),v.forEach(w=>{let b=s.get(w);b||s.set(w,b=new Set),y.split("").forEach(x=>b.add(x))})}:void 0;return pr(t,p,g,e,k),ur(t,p),pe(t)||await Bt(t,p,e,k),await(a==null?void 0:a(p)),p}let l=t.cloneNode(!1);return await Bt(t,l,e),await(a==null?void 0:a(l)),l}function br(t){if(t.ownerDocument=void 0,t.ownerWindow=void 0,t.svgStyleElement=void 0,t.svgDefsElement=void 0,t.svgStyles.clear(),t.defaultComputedStyles.clear(),t.sandbox){try{t.sandbox.remove()}catch(e){t.log.warn("Failed to destroyContext",e)}t.sandbox=void 0}t.workers=[],t.fontFamilies.clear(),t.fontCssTexts.clear(),t.requests.clear(),t.tasks=[],t.shadowRoots=[]}function vr(t){let a=t,{url:e,timeout:n,responseType:o}=a,r=Lt(a,["url","timeout","responseType"]),i=new AbortController,s=n?setTimeout(()=>i.abort(),n):void 0;return fetch(e,S({signal:i.signal},r)).then(l=>{if(!l.ok)throw new Error("Failed fetch, not 2xx response",{cause:l});switch(o){case"arrayBuffer":return l.arrayBuffer();case"dataUrl":return l.blob().then(Ko);default:return l.text()}}).finally(()=>clearTimeout(s))}function G(t,e){let{url:n,requestType:o="text",responseType:r="text",imageDom:i}=e,s=n,{timeout:a,acceptOfImage:l,requests:d,fetchFn:c,fetch:{requestInit:u,bypassingCache:h,placeholderImage:p},font:m,workers:g,fontFamilies:f}=t;o==="image"&&(he||He)&&t.drawImageCount++;let v=d.get(n);if(!v){h&&h instanceof RegExp&&h.test(s)&&(s+=(/\?/.test(s)?"&":"?")+new Date().getTime());let k=o.startsWith("font")&&m&&m.minify,y=new Set;k&&o.split(";")[1].split(",").forEach(I=>{f.has(I)&&f.get(I).forEach(P=>y.add(P))});let w=k&&y.size,b=S({url:s,timeout:a,responseType:w?"arrayBuffer":r,headers:o==="image"?{accept:l}:void 0},u);v={type:o,resolve:void 0,reject:void 0,response:null},v.response=(async()=>{if(c&&o==="image"){let x=await c(n);if(x)return x}return!he&&n.startsWith("http")&&g.length?new Promise((x,I)=>{g[d.size&g.length-1].postMessage(S({rawUrl:n},b)),v.resolve=x,v.reject=I}):vr(b)})().catch(x=>{if(d.delete(n),o==="image"&&p)return t.log.warn("Failed to fetch image base64, trying to use placeholder image",s),typeof p=="string"?p:p(i);throw x}),d.set(n,v)}return v.response}async function nn(t,e,n,o){if(!on(t))return t;for(let[r,i]of yr(t,e))try{let s=await G(n,{url:i,requestType:o?"image":"text",responseType:"dataUrl"});t=t.replace(wr(r),`$1${s}$3`)}catch(s){n.log.warn("Failed to fetch css data url",r,s)}return t}function on(t){return/url\((['"]?)([^'"]+?)\1\)/.test(t)}var rn=/url\((['"]?)([^'"]+?)\1\)/g;function yr(t,e){let n=[];return t.replace(rn,(o,r,i)=>(n.push([i,Xt(i,e)]),o)),n.filter(([o])=>!$e(o))}function wr(t){let e=t.replace(/([.*+?^${}()|\[\]\/\\])/g,"\\$1");return new RegExp(`(url\\(['"]?)(${e})(['"]?\\))`,"g")}var kr=["background-image","border-image-source","-webkit-border-image","-webkit-mask-image","list-style-image"];function xr(t,e){return kr.map(n=>{let o=t.getPropertyValue(n);return!o||o==="none"?null:((he||He)&&e.drawImageCount++,nn(o,null,e,!0).then(r=>{!r||o===r||t.setProperty(n,r,t.getPropertyPriority(n))}))}).filter(Boolean)}function Sr(t,e){if(U(t)){let n=t.currentSrc||t.src;if(!$e(n))return[G(e,{url:n,imageDom:t,requestType:"image",responseType:"dataUrl"}).then(o=>{o&&(t.srcset="",t.dataset.originalSrc=n,t.src=o||"")})];(he||He)&&e.drawImageCount++}else if(J(t)&&!$e(t.href.baseVal)){let n=t.href.baseVal;return[G(e,{url:n,imageDom:t,requestType:"image",responseType:"dataUrl"}).then(o=>{o&&(t.dataset.originalSrc=n,t.href.baseVal=o||"")})]}return[]}function Er(t,e){var a;let{ownerDocument:n,svgDefsElement:o}=e,r=(a=t.getAttribute("href"))!=null?a:t.getAttribute("xlink:href");if(!r)return[];let[i,s]=r.split("#");if(s){let l=`#${s}`,d=e.shadowRoots.reduce((c,u)=>c!=null?c:u.querySelector(`svg ${l}`),n==null?void 0:n.querySelector(`svg ${l}`));if(i&&t.setAttribute("href",l),o!=null&&o.querySelector(l))return[];if(d)return o==null||o.appendChild(d.cloneNode(!0)),[];if(i)return[G(e,{url:i,responseType:"text"}).then(c=>{o==null||o.insertAdjacentHTML("beforeend",c)})]}return[]}function sn(t,e){let{tasks:n}=e;A(t)&&((U(t)||Kt(t))&&n.push(...Sr(t,e)),Mo(t)&&n.push(...Er(t,e))),K(t)&&n.push(...xr(t.style,e)),t.childNodes.forEach(o=>{sn(o,e)})}async function Cr(t,e){let{ownerDocument:n,svgStyleElement:o,fontFamilies:r,fontCssTexts:i,tasks:s,font:a}=e;if(!(!n||!o||!r.size))if(a&&a.cssText){let l=Ht(a.cssText,e);o.appendChild(n.createTextNode(`${l}
`))}else{let l=Array.from(n.styleSheets).filter(c=>{try{return"cssRules"in c&&!!c.cssRules.length}catch(u){return e.log.warn(`Error while reading CSS rules from ${c.href}`,u),!1}});await Promise.all(l.flatMap(c=>Array.from(c.cssRules).map(async(u,h)=>{if(_o(u)){let p=h+1,m=u.href,g="";try{g=await G(e,{url:m,requestType:"text",responseType:"text"})}catch(v){e.log.warn(`Error fetch remote css import from ${m}`,v)}let f=g.replace(rn,(v,k,y)=>v.replace(y,Xt(y,m)));for(let v of Ar(f))try{c.insertRule(v,v.startsWith("@import")?p+=1:c.cssRules.length)}catch(k){e.log.warn("Error inserting rule from remote css import",{rule:v,error:k})}}})));let d=[];l.forEach(c=>{Be(c.cssRules,d)}),d.filter(c=>{var u;return Ro(c)&&on(c.style.getPropertyValue("src"))&&((u=Jt(c.style.getPropertyValue("font-family")))==null?void 0:u.some(h=>r.has(h)))}).forEach(c=>{let u=c,h=i.get(u.cssText);h?o.appendChild(n.createTextNode(`${h}
`)):s.push(nn(u.cssText,u.parentStyleSheet?u.parentStyleSheet.href:null,e).then(p=>{p=Ht(p,e),i.set(u.cssText,p),o.appendChild(n.createTextNode(`${p}
`))}))})}}var Tr=/(\/\*[\s\S]*?\*\/)/g,Dt=/((@.*?keyframes [\s\S]*?){([\s\S]*?}\s*?)})/gi;function Ar(t){if(t==null)return[];let e=[],n=t.replace(Tr,"");for(;;){let i=Dt.exec(n);if(!i)break;e.push(i[0])}n=n.replace(Dt,"");let o=/@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi,r=new RegExp("((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})","gi");for(;;){let i=o.exec(n);if(i)r.lastIndex=o.lastIndex;else if(i=r.exec(n),i)o.lastIndex=r.lastIndex;else break;e.push(i[0])}return e}var Nr=/url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g,Rr=/src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;function Ht(t,e){let{font:n}=e,o=n?n==null?void 0:n.preferredFormat:void 0;return o?t.replace(Rr,r=>{for(;;){let[i,,s]=Nr.exec(r)||[];if(!s)return"";if(s===o)return`src: ${i};`}}):t}function Be(t,e=[]){for(let n of Array.from(t))Lo(n)?e.push(...Be(n.cssRules)):"cssRules"in n?Be(n.cssRules,e):e.push(n);return e}async function _r(t,e){let n=await ge(t,e);if(A(n.node)&&J(n.node))return n.node;let{ownerDocument:o,log:r,tasks:i,svgStyleElement:s,svgDefsElement:a,svgStyles:l,font:d,progress:c,autoDestruct:u,onCloneNode:h,onEmbedNode:p,onCreateForeignObjectSvg:m}=n;r.time("clone node");let g=await je(n.node,n,!0);if(s&&o){let w="";l.forEach((b,x)=>{w+=`${b.join(`,
`)} {
  ${x}
}
`}),s.appendChild(o.createTextNode(w))}r.timeEnd("clone node"),await(h==null?void 0:h(g)),d!==!1&&A(g)&&(r.time("embed web font"),await Cr(g,n),r.timeEnd("embed web font")),r.time("embed node"),sn(g,n);let f=i.length,v=0,k=async()=>{for(;;){let w=i.pop();if(!w)break;try{await w}catch(b){n.log.warn("Failed to run task",b)}c==null||c(++v,f)}};c==null||c(v,f),await Promise.all([...Array.from({length:4})].map(k)),r.timeEnd("embed node"),await(p==null?void 0:p(g));let y=Lr(g,n);return a&&y.insertBefore(a,y.children[0]),s&&y.insertBefore(s,y.children[0]),u&&br(n),await(m==null?void 0:m(y)),y}function Lr(t,e){let{width:n,height:o}=e,r=Wo(n,o,t.ownerDocument),i=r.ownerDocument.createElementNS(r.namespaceURI,"foreignObject");return i.setAttributeNS(null,"x","0%"),i.setAttributeNS(null,"y","0%"),i.setAttributeNS(null,"width","100%"),i.setAttributeNS(null,"height","100%"),i.append(t),r.appendChild(i),r}async function Mr(t,e){var s;let n=await ge(t,e),o=await _r(n),r=qo(o,n.isEnable("removeControlCharacter"));n.autoDestruct||(n.svgStyleElement=Zt(n.ownerDocument),n.svgDefsElement=(s=n.ownerDocument)==null?void 0:s.createElementNS(fe,"defs"),n.svgStyles.clear());let i=j(r,o.ownerDocument);return await er(i,n)}async function Ir(t,e){let n=await ge(t,e),{log:o,quality:r,type:i,dpi:s}=n,a=await Mr(n);o.time("canvas to data url");let l=a.toDataURL(i,r);if(["image/png","image/jpeg"].includes(i)&&s&&To&&Ao){let[d,c]=l.split(","),u=0,h=!1;if(i==="image/png"){let y=Eo(c);y>=0?(u=Math.ceil((y+28)/3)*4,h=!0):u=33/3*4}else i==="image/jpeg"&&(u=18/3*4);let p=c.substring(0,u),m=c.substring(u),g=window.atob(p),f=new Uint8Array(g.length);for(let y=0;y<f.length;y++)f[y]=g.charCodeAt(y);let v=i==="image/png"?wo(f,s,h):go(f,s),k=window.btoa(String.fromCharCode(...v));l=[d,",",k,m].join("")}return o.timeEnd("canvas to data url"),l}async function Ue(t,e){return Ir(await ge(t,E(S({},e),{type:"image/png"})))}function an(t){var e;return!((e=t.getAttribute)!=null&&e.call(t,"data-instruckt"))}var O=null;async function ln(){return O&&O.active||(O=await navigator.mediaDevices.getDisplayMedia({video:{displaySurface:"browser"},preferCurrentTab:!0}),O.getVideoTracks()[0].addEventListener("ended",()=>{O=null})),O}async function Pr(t){let e=document.createElement("video");e.srcObject=t,e.muted=!0,await e.play(),await new Promise(o=>requestAnimationFrame(()=>requestAnimationFrame(o)));let n=await createImageBitmap(e);return e.pause(),e.srcObject=null,n}function cn(t,e){return Pr(t).then(n=>{let o=window.devicePixelRatio||1,r=document.createElement("canvas");return r.width=e.width*o,r.height=e.height*o,r.getContext("2d").drawImage(n,e.x*o,e.y*o,e.width*o,e.height*o,0,0,r.width,r.height),n.close(),r.toDataURL("image/png")})}var ze=!1;function un(t){ze=t}async function dn(t){if(!ze)try{let e=await Ue(t,{scale:2,filter:an});if(e)return e}catch(e){}try{let e=await ln();return await cn(e,t.getBoundingClientRect())}catch(e){return console.warn("[instruckt] captureElement failed:",e),null}}async function hn(t){if(!ze)try{let e=await Ue(document.body,{scale:2,filter:an});if(e)return await Or(e,t)}catch(e){}try{let e=await ln();return await cn(e,t)}catch(e){return console.warn("[instruckt] captureRegion failed:",e),null}}function Or(t,e){return new Promise((n,o)=>{let r=new Image;r.onload=()=>{let s=document.createElement("canvas");s.width=e.width*2,s.height=e.height*2,s.getContext("2d").drawImage(r,e.x*2,e.y*2,e.width*2,e.height*2,0,0,e.width*2,e.height*2),n(s.toDataURL("image/png"))},r.onerror=o,r.src=t})}function pn(){return new Promise(t=>{let e=document.createElement("div");Object.assign(e.style,{position:"fixed",inset:"0",zIndex:"2147483647",cursor:"crosshair",background:"rgba(0,0,0,0.1)",touchAction:"none"}),e.setAttribute("data-instruckt","region-select");let n=document.createElement("div");Object.assign(n.style,{position:"fixed",border:"2px dashed #6366f1",background:"rgba(99,102,241,0.08)",borderRadius:"4px",display:"none",pointerEvents:"none"}),e.appendChild(n);let o=0,r=0,i=!1,s=h=>{e.setPointerCapture(h.pointerId),o=h.clientX,r=h.clientY,i=!0,n.style.display="block",l(h)},a=h=>{i&&l(h)},l=h=>{let p=Math.min(o,h.clientX),m=Math.min(r,h.clientY),g=Math.abs(h.clientX-o),f=Math.abs(h.clientY-r);Object.assign(n.style,{left:`${p}px`,top:`${m}px`,width:`${g}px`,height:`${f}px`})},d=h=>{if(!i)return;i=!1;let p=Math.min(o,h.clientX),m=Math.min(r,h.clientY),g=Math.abs(h.clientX-o),f=Math.abs(h.clientY-r);u(),g<10||f<10?t(null):t(new DOMRect(p,m,g,f))},c=h=>{h.key==="Escape"&&(u(),t(null))},u=()=>{e.remove(),document.removeEventListener("keydown",c,!0)};e.addEventListener("pointerdown",s),e.addEventListener("pointermove",a),e.addEventListener("pointerup",d),e.addEventListener("pointercancel",()=>{u(),t(null)}),document.addEventListener("keydown",c,!0),document.body.appendChild(e)})}function Ve(t,e){return t?t.startsWith("data:")?t:`${e!=null?e:"/instruckt"}/${t}`:null}function L(t){return String(t!=null?t:"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}var be=class{constructor(){this.host=null;this.shadow=null;this.boundOutside=e=>{this.host&&!this.host.contains(e.target)&&this.destroy()}}showNew(e,n){var m,g;this.destroy(),this.host=document.createElement("div"),this.host.setAttribute("data-instruckt","popup"),this.stopHostPropagation(this.host),this.shadow=this.host.attachShadow({mode:"open"});let o=document.createElement("style");o.textContent=Pe,this.shadow.appendChild(o);let r=document.createElement("div");r.className="popup";let i=e.framework?`<div class="fw-badge">${L(e.framework.component)}</div>`:"",s=e.selectedText?`<div class="selected-text">"${L(e.selectedText.slice(0,80))}"</div>`:"",a=!!e.screenshot;r.innerHTML=`
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
    `;let l=(m=e.screenshot)!=null?m:null,d=r.querySelector("textarea"),c=r.querySelector('[data-action="submit"]'),u=r.querySelector(".screenshot-slot"),h=()=>{c.disabled=!l&&d.value.trim().length===0},p=()=>{let f=u.querySelector('[data-action="capture"]');f==null||f.addEventListener("click",async()=>{f.textContent="Capturing...";let k=await dn(e.element);k?(l=k,u.innerHTML=`<div class="screenshot-preview"><img src="${k}" alt="Screenshot" /><button class="screenshot-remove" title="Remove screenshot">\u2715</button></div>`,d.placeholder="Add a note (optional)",p(),h()):(f.textContent="Capture failed",setTimeout(()=>{f.parentElement&&(f.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg> Capture screenshot')},1500))});let v=u.querySelector(".screenshot-remove");v==null||v.addEventListener("click",()=>{l=null,u.innerHTML='<button class="btn-capture" data-action="capture"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg> Capture screenshot</button>',d.placeholder="What needs to change here?",p(),h()})};p(),d.addEventListener("input",h),d.addEventListener("keydown",f=>{f.stopPropagation(),f.key==="Enter"&&!f.shiftKey&&(f.preventDefault(),c.disabled||c.click()),f.key==="Escape"&&(n.onCancel(),this.destroy())}),r.querySelector('[data-action="cancel"]').addEventListener("click",()=>{n.onCancel(),this.destroy()}),r.querySelector(".close-btn").addEventListener("click",()=>{n.onCancel(),this.destroy()}),c.addEventListener("click",async()=>{var k;let f=d.value.trim();if(!f&&!l)return;let v=n.onSubmit({comment:f||"(screenshot)",screenshot:l!=null?l:void 0});if(v instanceof Promise){let y=this.host;c.disabled=!0,c.textContent="Saving...",(k=r.querySelector(".save-error"))==null||k.remove();let w=await v;if(this.host!==y)return;if(!w){c.textContent="Add note",h();let b=document.createElement("div");b.className="save-error",b.setAttribute("role","alert"),b.textContent="Not saved. Check your connection and try again.",r.querySelector(".actions").before(b);return}}this.destroy()}),this.shadow.appendChild(r),((g=document.getElementById("instruckt-root"))!=null?g:document.body).appendChild(this.host),this.positionHost(e.x,e.y),this.setupOutsideClick(),d.focus()}showEdit(e,n,o){var f;this.destroy(),this.host=document.createElement("div"),this.host.setAttribute("data-instruckt","popup"),this.stopHostPropagation(this.host),this.shadow=this.host.attachShadow({mode:"open"});let r=document.createElement("style");r.textContent=Pe,this.shadow.appendChild(r);let i=document.createElement("div");i.className="popup";let s=e.framework?`<div class="fw-badge">${L(e.framework.component)}</div>`:"",a=Ve(e.screenshot,o),l=a?`<div class="screenshot-preview screenshot-slot"><img src="${a}" alt="Screenshot" /><button class="screenshot-remove" title="Remove screenshot">\u2715</button></div>`:"",d=e.comment==="(screenshot)"?"":e.comment;i.innerHTML=`
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
    `,i.querySelector(".close-btn").addEventListener("click",()=>this.destroy());let c=i.querySelector(".screenshot-remove");c==null||c.addEventListener("click",()=>{n.onSave(e,e.comment);let v=i.querySelector(".screenshot-slot");v&&v.remove()});let u=i.querySelector("textarea"),h=i.querySelector('[data-action="save"]'),p=i.querySelector('[data-action="delete"]');u.addEventListener("keydown",v=>{v.stopPropagation(),v.key==="Enter"&&!v.shiftKey&&(v.preventDefault(),h.click()),v.key==="Escape"&&this.destroy()}),h.addEventListener("click",()=>{let v=u.value.trim();v&&(n.onSave(e,v),this.destroy())}),p.addEventListener("click",()=>{n.onDelete(e),this.destroy()}),this.shadow.appendChild(i),((f=document.getElementById("instruckt-root"))!=null?f:document.body).appendChild(this.host);let m=e.x/100*window.innerWidth,g=e.y-window.scrollY;this.positionHost(m,g),this.setupOutsideClick(),u.focus(),u.setSelectionRange(u.value.length,u.value.length)}stopHostPropagation(e){for(let n of["click","mousedown","pointerdown","keydown","keyup","keypress","submit"])e.addEventListener(n,o=>o.stopPropagation())}positionHost(e,n){if(this.host){this.host.setAttribute("popover","manual");try{this.host.showPopover()}catch(o){}Object.assign(this.host.style,{position:"fixed",zIndex:"2147483647",left:"-9999px",top:"0"}),requestAnimationFrame(()=>{var d,c;if(!this.host)return;let o=360,r=(c=(d=this.host.querySelector(".popup"))==null?void 0:d.getBoundingClientRect().height)!=null?c:300,i=window.innerWidth,s=window.innerHeight,a=Math.max(10,Math.min(e+10,i-o)),l=Math.max(10,Math.min(n+10,s-r-10));Object.assign(this.host.style,{left:`${a}px`,top:`${l}px`})})}}setupOutsideClick(){setTimeout(()=>document.addEventListener("mousedown",this.boundOutside),0)}destroy(){var e;(e=this.host)==null||e.remove(),this.host=null,this.shadow=null,document.removeEventListener("mousedown",this.boundOutside)}};var Z=class{constructor(e){this.onClick=e;this.markers=new Map;var o;this.container=document.createElement("div"),Object.assign(this.container.style,{position:"fixed",inset:"0",pointerEvents:"none",zIndex:"2147483645"}),this.container.setAttribute("data-instruckt","markers"),((o=document.getElementById("instruckt-root"))!=null?o:document.body).appendChild(this.container)}upsert(e,n){let o=this.markers.get(e.id);if(o){this.updateStyle(o.el,e);return}let r=document.createElement("div"),i=e.screenshot?" has-screenshot":"";r.className=`ik-marker ${this.statusClass(e.status)}${i}`,r.textContent=String(n),r.title=e.comment==="(screenshot)"?"Screenshot":e.comment.slice(0,60),r.style.pointerEvents="all",r.style.left=`${e.x/100*window.innerWidth}px`,r.style.top=`${e.y-window.scrollY}px`,r.addEventListener("click",s=>{s.stopPropagation(),this.onClick(e)}),this.container.appendChild(r),this.markers.set(e.id,{el:r,annotationId:e.id})}update(e){let n=this.markers.get(e.id);n&&this.updateStyle(n.el,e)}updateStyle(e,n){let o=n.screenshot?" has-screenshot":"";e.className=`ik-marker ${this.statusClass(n.status)}${o}`,e.title=n.comment==="(screenshot)"?"Screenshot":n.comment.slice(0,60)}statusClass(e){return e==="resolved"?"resolved":e==="dismissed"?"dismissed":""}reposition(e){e.forEach(n=>{let o=this.markers.get(n.id);o&&(o.el.style.left=`${n.x/100*window.innerWidth}px`,o.el.style.top=`${n.y-window.scrollY}px`)})}setHover(e){for(let{el:n,annotationId:o}of this.markers.values())n.classList.toggle("ik-hover",o===e);this.container.classList.toggle("ik-has-hover",e!==null&&this.markers.has(e))}pulse(e){var o;let n=(o=this.markers.get(e))==null?void 0:o.el;n&&(n.classList.remove("ik-pulse"),n.offsetWidth,n.classList.add("ik-pulse"),setTimeout(()=>n.classList.remove("ik-pulse"),1600))}remove(e){let n=this.markers.get(e);n&&(n.el.remove(),this.markers.delete(e))}setVisible(e){this.container.style.display=e?"":"none"}clear(){for(let{el:e}of this.markers.values())e.remove();this.markers.clear()}destroy(){this.container.remove(),this.markers.clear()}};var z={close:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>',goto:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>',copy:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',edit:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>',trash:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',check:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'};function F(t){return String(t!=null?t:"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Fr(t){let e=Math.max(0,(Date.now()-new Date(t).getTime())/1e3);return e<60?"just now":e<3600?`${Math.floor(e/60)}m ago`:e<86400?`${Math.floor(e/3600)}h ago`:`${Math.floor(e/86400)}d ago`}var ve=class{constructor(e){this.cb=e;this.host=null;this.shadow=null;this.scope="all";this.selected=new Set;this.editingId=null;this.draft="";this.confirmDelete=!1;this.confirmTimer=null;this.hoverId=null;this.dragged=null;this.drag=null;this.boundPosition=()=>this.position()}isOpen(){return this.host!==null}open(){var o;if(this.host)return;this.host=document.createElement("div"),this.host.setAttribute("data-instruckt","list");for(let r of["click","mousedown","pointerdown","keydown","keyup","keypress","submit"])this.host.addEventListener(r,i=>i.stopPropagation());this.shadow=this.host.attachShadow({mode:"open"});let e=document.createElement("style");e.textContent=Pt,this.shadow.appendChild(e);let n=document.createElement("div");n.className="panel",this.shadow.appendChild(n),n.addEventListener("click",r=>this.onClick(r)),n.addEventListener("change",r=>this.onChange(r)),n.addEventListener("input",r=>this.onInput(r)),n.addEventListener("keydown",r=>this.onKeydown(r)),n.addEventListener("mouseover",r=>this.onHover(r)),n.addEventListener("mouseleave",()=>this.setHover(null)),n.addEventListener("pointerdown",r=>this.onDragStart(r)),n.addEventListener("pointermove",r=>this.onDragMove(r)),n.addEventListener("pointerup",()=>{this.drag=null}),n.addEventListener("pointercancel",()=>{this.drag=null}),((o=document.getElementById("instruckt-root"))!=null?o:document.body).appendChild(this.host),window.addEventListener("resize",this.boundPosition,{passive:!0}),this.render(),this.position()}close(){this.host&&(this.host.remove(),this.host=null,this.shadow=null,this.editingId=null,this.dragged=null,this.drag=null,this.setHover(null),this.resetConfirm(),window.removeEventListener("resize",this.boundPosition))}refresh(){this.host&&(this.render(),this.position())}destroy(){this.close()}all(){return this.cb.annotations()}shown(){if(this.scope==="all")return this.all();let e=this.cb.currentPage();return this.all().filter(n=>this.cb.pageOf(n)===e)}targets(){let e=this.shown(),n=e.filter(o=>this.selected.has(o.id));return n.length>0?n:e}byId(e){return e?this.all().find(n=>n.id===e):void 0}render(){var k,y;let e=(k=this.shadow)==null?void 0:k.querySelector(".panel");if(!e)return;let n=this.all(),o=this.cb.currentPage(),r=n.filter(w=>this.cb.pageOf(w)===o).length,i=this.shown(),s=new Set(i.map(w=>w.id));for(let w of this.selected)s.has(w)||this.selected.delete(w);this.editingId&&!s.has(this.editingId)&&(this.editingId=null);let a=this.selected.size,l=i.length>0&&a===i.length,d=a>0?`${a} selected`:"Select all",c=a>0?`Copy ${a}`:"Copy all",u=this.confirmDelete?"Sure? Click again":a>0?`Delete ${a}`:"Delete all",h=new Map,p=new Map;for(let w of n){let b=this.cb.pageOf(w),x=((y=p.get(b))!=null?y:0)+1;p.set(b,x),h.set(w.id,x)}let m=new Map;for(let w of i){let b=this.cb.pageOf(w);m.has(b)||m.set(b,[]),m.get(b).push(w)}let g=[...m.keys()].sort((w,b)=>w===o?-1:b===o?1:0),f=i.length===0?`<div class="empty">${n.length===0?"No notes yet.<br>Press <kbd>A</kbd> and click any element to add one.":"No notes on this page."}</div>`:g.map(w=>`
        <div class="group">
          <div class="group-head"><span class="path" title="${F(w)}">${F(w)}</span>${w===o?'<span class="here">this page</span>':""}</div>
          ${m.get(w).map(b=>{var x;return this.renderItem(b,(x=h.get(b.id))!=null?x:0)}).join("")}
        </div>`).join("");e.innerHTML=`
      <div class="head" title="Drag to move">
        <div class="title">Notes <span class="count">${n.length}</span></div>
        <button class="icon-btn" data-action="close" title="Close (Esc)" aria-label="Close">${z.close}</button>
      </div>
      <div class="tabs" role="tablist">
        <button class="tab ${this.scope==="all"?"on":""}" data-action="scope" data-scope="all" role="tab">All pages <span>${n.length}</span></button>
        <button class="tab ${this.scope==="page"?"on":""}" data-action="scope" data-scope="page" role="tab">This page <span>${r}</span></button>
      </div>
      ${i.length>0?`
      <div class="bulk">
        <label class="sel-all"><input type="checkbox" data-action="select-all" ${l?"checked":""} />${d}</label>
        <div class="bulk-actions">
          <button class="btn" data-action="copy-bulk">${c}</button>
          <button class="btn danger ${this.confirmDelete?"confirm":""}" data-action="delete-bulk">${u}</button>
        </div>
      </div>`:""}
      <div class="list">${f}</div>
    `;let v=e.querySelector('[data-action="select-all"]');if(v&&(v.indeterminate=a>0&&!l),this.editingId){let w=e.querySelector("textarea");w&&(w.focus(),w.setSelectionRange(w.value.length,w.value.length))}}renderItem(e,n){var a,l;let o=this.editingId===e.id,r=this.cb.screenshotSrc(e),i=e.comment==="(screenshot)"?"<em>Screenshot only</em>":F(e.comment),s=o?`<textarea rows="3" data-id="${e.id}">${F(this.draft)}</textarea>
         <div class="edit-actions">
           <button class="btn" data-action="cancel-edit">Cancel</button>
           <button class="btn primary" data-action="save" data-id="${e.id}">Save</button>
         </div>`:`<div class="comment">${i}</div>`;return`
      <div class="item ${this.selected.has(e.id)?"sel":""}" data-id="${e.id}">
        <input type="checkbox" data-action="select" data-id="${e.id}" ${this.selected.has(e.id)?"checked":""} aria-label="Select note ${n}" />
        <span class="num ${e.screenshot?"shot":""}">${n}</span>
        <div class="main">
          ${s}
          <div class="meta"><span class="el" title="${F(e.elementPath)}">${F((l=(a=e.framework)==null?void 0:a.component)!=null?l:e.element)}</span><span>${Fr(e.createdAt)}</span></div>
          ${r&&!o?`<img class="thumb" src="${F(r)}" alt="Screenshot" data-action="goto" data-id="${e.id}" />`:""}
        </div>
        ${o?"":`<div class="row-actions">
          <button class="icon-btn" data-action="goto" data-id="${e.id}" title="Show on page" aria-label="Show on page">${z.goto}</button>
          <button class="icon-btn" data-action="copy" data-id="${e.id}" title="Copy" aria-label="Copy">${z.copy}</button>
          <button class="icon-btn" data-action="edit" data-id="${e.id}" title="Edit" aria-label="Edit">${z.edit}</button>
          <button class="icon-btn danger" data-action="delete" data-id="${e.id}" title="Delete" aria-label="Delete">${z.trash}</button>
        </div>`}
      </div>`}position(){if(!this.host)return;let e=window.innerWidth,n=window.innerHeight,o=10,r=16,i=this.host.offsetHeight;if(this.dragged){let c=this.host.offsetWidth,u=Math.max(r-c+80,Math.min(this.dragged.left,e-80)),h=Math.max(0,Math.min(this.dragged.top,n-40));Object.assign(this.host.style,{left:`${u}px`,top:`${h}px`,right:"auto"});return}let s=this.cb.anchor(),a=Math.min(380,e-2*r),l=e-r-a,d=r;if(s){let c=s.bar.left-o-r,u=e-s.bar.right-o-r;c>=280&&c>=u?(a=Math.min(380,c),l=s.bar.left-o-a):u>=280&&(a=Math.min(380,u),l=s.bar.right+o),d=Math.max(r,Math.min(s.button.top-10,n-r-i))}Object.assign(this.host.style,{position:"fixed",zIndex:"2147483646",width:`${a}px`,left:`${l}px`,top:`${d}px`,right:"auto"})}onDragStart(e){let n=e.target;if(!n.closest(".head")||n.closest("button")||!this.host)return;let o=this.host.getBoundingClientRect();this.drag={dx:e.clientX-o.left,dy:e.clientY-o.top},n.closest(".head").setPointerCapture(e.pointerId),e.preventDefault()}onDragMove(e){this.drag&&(this.dragged={left:e.clientX-this.drag.dx,top:e.clientY-this.drag.dy},this.position())}onHover(e){var o;let n=e.target.closest(".item");this.setHover((o=n==null?void 0:n.dataset.id)!=null?o:null)}setHover(e){var n;e!==this.hoverId&&(this.hoverId=e,this.cb.onHover((n=this.byId(e!=null?e:void 0))!=null?n:null))}async onClick(e){let n=e.target.closest("[data-action]");if(!n||n instanceof HTMLInputElement)return;let o=n.dataset.action,r=this.byId(n.dataset.id);switch(o!=="delete-bulk"&&this.resetConfirm(),o){case"close":this.close(),this.cb.onClose();break;case"scope":this.scope=n.dataset.scope==="page"?"page":"all",this.selected.clear(),this.render();break;case"copy-bulk":await this.cb.onCopy(this.targets())&&this.flash(n,"Copied");break;case"delete-bulk":if(!this.confirmDelete){this.confirmDelete=!0,this.confirmTimer=setTimeout(()=>{this.resetConfirm(),this.render()},3e3),this.render();return}this.resetConfirm(),await this.cb.onDelete(this.targets()),this.selected.clear(),this.render();break;case"goto":r&&this.cb.onGoTo(r);break;case"copy":r&&await this.cb.onCopy([r])&&this.flash(n,z.check);break;case"edit":if(!r)return;this.editingId=r.id,this.draft=r.comment==="(screenshot)"?"":r.comment,this.render();break;case"cancel-edit":this.editingId=null,this.render();break;case"save":await this.save();break;case"delete":if(!r)return;this.selected.delete(r.id),await this.cb.onDelete([r]);break}}onChange(e){let n=e.target;if(n.dataset.action==="select-all"){let o=this.shown();n.checked?o.forEach(r=>this.selected.add(r.id)):this.selected.clear()}else if(n.dataset.action==="select"&&n.dataset.id)n.checked?this.selected.add(n.dataset.id):this.selected.delete(n.dataset.id);else return;this.resetConfirm(),this.render()}onInput(e){let n=e.target;n.tagName==="TEXTAREA"&&(this.draft=n.value)}onKeydown(e){e.target.tagName==="TEXTAREA"&&e.key==="Enter"&&!e.shiftKey?(e.preventDefault(),this.save()):e.key==="Escape"&&(this.editingId?(this.editingId=null,this.render()):(this.close(),this.cb.onClose()))}async save(){var o;let e=this.byId((o=this.editingId)!=null?o:void 0),n=this.draft.trim();!e||!n||(this.editingId=null,await this.cb.onSave(e,n),this.render())}resetConfirm(){this.confirmDelete=!1,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}flash(e,n){let o=e.innerHTML;e.innerHTML=n,e.classList.add("done"),setTimeout(()=>{e.innerHTML=o,e.classList.remove("done")},1200)}};var $r=280,Br=48,Dr=8,Hr='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>',ye=class{constructor(e){this.cb=e;this.aimed=null;this.holdTimer=null;this.holding=!1;this.start={x:0,y:0};this.suppressUntil=0;this.raf=0;this.onTouchStart=e=>{if(e.touches.length!==1||this.cb.isOurs(e.target)){this.cancelHold();return}let n=e.touches[0];this.start={x:n.clientX,y:n.clientY},this.cancelHold(),this.holdTimer=setTimeout(()=>{this.holdTimer=null,this.holding=!0,this.hideBar(),this.moveRing(this.start.x,this.start.y)},$r)};this.onTouchMove=e=>{let n=e.touches[0];if(n){if(this.holding){e.preventDefault(),this.moveRing(n.clientX,n.clientY);return}this.holdTimer&&Math.hypot(n.clientX-this.start.x,n.clientY-this.start.y)>Dr&&this.cancelHold()}};this.onTouchEnd=()=>{this.holdTimer&&this.cancelHold(),this.holding&&(this.holding=!1,this.ring.hidden=!0,this.suppressUntil=Date.now()+450,this.aimed&&this.placeBar())};this.onContextMenu=e=>{(this.holding||this.holdTimer||this.aimed)&&e.preventDefault()};this.onScroll=()=>{this.aimed&&(cancelAnimationFrame(this.raf),this.raf=requestAnimationFrame(()=>{this.aimed&&(this.cb.highlight(this.aimed),this.bar.hidden||this.placeBar())}))};var r;this.host=document.createElement("div"),this.host.setAttribute("data-instruckt","aim"),Object.assign(this.host.style,{position:"fixed",inset:"0",zIndex:"2147483646",pointerEvents:"none"});let n=this.host.attachShadow({mode:"open"}),o=document.createElement("style");o.textContent=Mt,n.appendChild(o),this.bar=document.createElement("div"),this.bar.className="bar",this.bar.hidden=!0,this.bar.innerHTML=`<button type="button" class="x" aria-label="Stop aiming">${Hr}</button><button type="button" class="add">Add note</button>`,this.bar.querySelector(".x").addEventListener("click",i=>{i.stopPropagation(),this.clear()}),this.bar.querySelector(".add").addEventListener("click",i=>{i.stopPropagation();let s=this.aimed;s&&(this.hideBar(),this.cb.onAdd(s))}),n.appendChild(this.bar),this.ring=document.createElement("div"),this.ring.className="ring",this.ring.hidden=!0,n.appendChild(this.ring);for(let i of["click","mousedown","pointerdown","touchstart"])this.host.addEventListener(i,s=>s.stopPropagation());((r=document.getElementById("instruckt-root"))!=null?r:document.body).appendChild(this.host)}attach(){window.addEventListener("touchstart",this.onTouchStart,{capture:!0,passive:!0}),window.addEventListener("touchmove",this.onTouchMove,{capture:!0,passive:!1}),window.addEventListener("touchend",this.onTouchEnd,!0),window.addEventListener("touchcancel",this.onTouchEnd,!0),window.addEventListener("contextmenu",this.onContextMenu,!0),window.addEventListener("scroll",this.onScroll,{passive:!0}),window.addEventListener("resize",this.onScroll,{passive:!0})}detach(){window.removeEventListener("touchstart",this.onTouchStart,!0),window.removeEventListener("touchmove",this.onTouchMove,!0),window.removeEventListener("touchend",this.onTouchEnd,!0),window.removeEventListener("touchcancel",this.onTouchEnd,!0),window.removeEventListener("contextmenu",this.onContextMenu,!0),window.removeEventListener("scroll",this.onScroll),window.removeEventListener("resize",this.onScroll),this.cancelHold(),this.clear()}getAimed(){return this.aimed}tap(e){if(!(Date.now()<this.suppressUntil)){if(this.aimed&&this.aimed.contains(e)){let n=this.aimed;this.hideBar(),this.cb.onAdd(n);return}this.aim(e)}}aim(e){this.aimed=e,this.cb.highlight(e),this.placeBar()}clear(){this.aimed=null,this.hideBar(),this.cb.highlight(null)}done(){this.aimed=null,this.hideBar()}destroy(){this.detach(),this.host.remove()}cancelHold(){this.holdTimer&&clearTimeout(this.holdTimer),this.holdTimer=null}moveRing(e,n){let o=n-Br;this.ring.hidden=!1,this.ring.style.left=`${e}px`,this.ring.style.top=`${o}px`;let r=document.elementFromPoint(e,o);!r||this.cb.isOurs(r)||r===document.documentElement||r===document.body||r!==this.aimed&&(this.aimed=r,this.cb.highlight(r))}placeBar(){if(!this.aimed||this.holding)return;this.bar.hidden=!1;let e=this.aimed.getBoundingClientRect(),n=window.innerWidth,o=window.innerHeight,r=8,i=this.bar.offsetWidth,s=this.bar.offsetHeight,a=e.bottom+10;a+s>o-r&&(a=e.top-s-34),a<r&&(a=o-s-16);let l=Math.max(r,Math.min(e.left+e.width/2-i/2,n-i-r));this.bar.style.left=`${l}px`,this.bar.style.top=`${a}px`}hideBar(){this.bar.hidden=!0}};function We(t){if(t.id)return`#${CSS.escape(t.id)}`;let e=[],n=t;for(;n&&n!==document.documentElement;){let o=n.tagName.toLowerCase(),r=n.parentElement;if(!r){e.unshift(o);break}let i=Array.from(n.classList).filter(a=>!a.match(/^(hover|focus|active|visited|is-|has-)/)).slice(0,3);if(i.length>0){let a=`${o}.${i.map(CSS.escape).join(".")}`;if(r.querySelectorAll(a).length===1){e.unshift(a);break}}let s=Array.from(r.children).filter(a=>a.tagName===n.tagName);if(s.length===1)e.unshift(o);else{let a=s.indexOf(n)+1;e.unshift(`${o}:nth-of-type(${a})`)}n=r}return e.join(" > ")}function qe(t){let e=t.tagName.toLowerCase(),n=t.getAttribute("wire:model")||t.getAttribute("wire:click");if(n)return`${e}[wire:${n.split(".")[0]}]`;if(t.id)return`${e}#${t.id}`;let o=t.classList[0];return o?`${e}.${o}`:e}function we(t){let e=t.tagName.toLowerCase(),n=(t.textContent||"").trim().replace(/\s+/g," ").slice(0,40),o=[];t.id&&o.push(`id="${t.id}"`);let r=t.getAttribute("role");r&&o.push(`role="${r}"`);let i=t.getAttribute("wire:model")||t.getAttribute("wire:click");i&&o.push(`wire:${t.hasAttribute("wire:model")?"model":"click"}="${i}"`);let s=o.length?" "+o.join(" "):"",a=`<${e}${s}>`;return n?`${a} ${n}`:a}function Ye(t){return(t.textContent||"").trim().replace(/\s+/g," ").slice(0,120)}function Ke(t){return Array.from(t.classList).filter(e=>!e.match(/^(instruckt-)/)).join(" ")}function Xe(t){let e=t.getBoundingClientRect();return{x:e.left+window.scrollX,y:e.top+window.scrollY,width:e.width,height:e.height}}var Ge="0.5.32",Se=`bippy-${Ge}`,mn=Object.defineProperty,jr=Object.prototype.hasOwnProperty,Q=()=>{},fn=t=>{try{Function.prototype.toString.call(t).indexOf("^_^")>-1&&setTimeout(()=>{throw Error("React is running in production mode, but dead code elimination has not been applied. Read how to correctly configure React for production: https://reactjs.org/link/perf-use-production-build")})}catch(e){}},Ee=(t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>!!(t&&"getFiberRoots"in t),gn=!1,ke,ee=(t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>gn?!0:(t&&typeof t.inject=="function"&&(ke=t.inject.toString()),!!(ke!=null&&ke.includes("(injected)"))),xe=new Set,M=new Set,Je=t=>{let e=new Map,n=0,o={_instrumentationIsActive:!1,_instrumentationSource:Se,checkDCE:fn,hasUnsupportedRendererAttached:!1,inject(r){let i=++n;return e.set(i,r),M.add(r),o._instrumentationIsActive||(o._instrumentationIsActive=!0,xe.forEach(s=>s())),i},on:Q,onCommitFiberRoot:Q,onCommitFiberUnmount:Q,onPostCommitFiberRoot:Q,renderers:e,supportsFiber:!0,supportsFlight:!0};try{mn(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__",{configurable:!0,enumerable:!0,get(){return o},set(s){if(s&&typeof s=="object"){let a=o.renderers;o=s,a.size>0&&(a.forEach((l,d)=>{M.add(l),s.renderers.set(d,l)}),te(t))}}});let r=window.hasOwnProperty,i=!1;mn(window,"hasOwnProperty",{configurable:!0,value:function(...s){try{if(!i&&s[0]==="__REACT_DEVTOOLS_GLOBAL_HOOK__")return globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__=void 0,i=!0,-0}catch(a){}return r.apply(this,s)},writable:!0})}catch(r){te(t)}return o},te=t=>{t&&xe.add(t);try{let e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!e)return;if(!e._instrumentationSource){e.checkDCE=fn,e.supportsFiber=!0,e.supportsFlight=!0,e.hasUnsupportedRendererAttached=!1,e._instrumentationSource=Se,e._instrumentationIsActive=!1;let n=Ee(e);if(n||(e.on=Q),e.renderers.size){e._instrumentationIsActive=!0,xe.forEach(i=>i());return}let o=e.inject,r=ee(e);r&&!n&&(gn=!0,e.inject({scheduleRefresh(){}})&&(e._instrumentationIsActive=!0)),e.inject=i=>{let s=o(i);return M.add(i),r&&e.renderers.set(s,i),e._instrumentationIsActive=!0,xe.forEach(a=>a()),s}}(e.renderers.size||e._instrumentationIsActive||ee())&&(t==null||t())}catch(e){}},Ze=()=>jr.call(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__"),ne=t=>Ze()?(te(t),globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__):Je(t),Qe=()=>{var t,e;return!!(typeof window<"u"&&((t=window.document)!=null&&t.createElement||((e=window.navigator)==null?void 0:e.product)==="ReactNative"))},Ce=()=>{try{Qe()&&ne()}catch(t){}};Ce();var et=0,tt=1;var nt=5;var ot=11,rt=13;var it=15,st=16;var at=19;var lt=26,ct=27,ut=28,dt=30;var ht=t=>{switch(t.tag){case 1:case 11:case 0:case 14:case 15:return!0;default:return!1}};function oe(t,e,n=!1){if(!t)return null;let o=e(t);if(o instanceof Promise)return(async()=>{if(await o===!0)return t;let i=n?t.return:t.child;for(;i;){let s=await mt(i,e,n);if(s)return s;i=n?null:i.sibling}return null})();if(o===!0)return t;let r=n?t.return:t.child;for(;r;){let i=pt(r,e,n);if(i)return i;r=n?null:r.sibling}return null}var pt=(t,e,n=!1)=>{if(!t)return null;if(e(t)===!0)return t;let o=n?t.return:t.child;for(;o;){let r=pt(o,e,n);if(r)return r;o=n?null:o.sibling}return null},mt=async(t,e,n=!1)=>{if(!t)return null;if(await e(t)===!0)return t;let o=n?t.return:t.child;for(;o;){let r=await mt(o,e,n);if(r)return r;o=n?null:o.sibling}return null};var ft=t=>{let e=t;return typeof e=="function"?e:typeof e=="object"&&e?ft(e.type||e.render):null},$=t=>{let e=t;if(typeof e=="string")return e;if(typeof e!="function"&&!(typeof e=="object"&&e))return null;let n=e.displayName||e.name||null;if(n)return n;let o=ft(e);return o&&(o.displayName||o.name)||null};var re=()=>{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;return!!(t!=null&&t._instrumentationIsActive)||Ee(t)||ee(t)};var V=t=>{var n,o,r,i;let e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(e!=null&&e.renderers)for(let s of e.renderers.values())try{let a=(n=s.findFiberByHostInstance)==null?void 0:n.call(s,t);if(a)return a}catch(a){}if(typeof t=="object"&&t){if("_reactRootContainer"in t)return(i=(r=(o=t._reactRootContainer)==null?void 0:o._internalRoot)==null?void 0:r.current)==null?void 0:i.child;for(let s in t)if(s.startsWith("__reactContainer$")||s.startsWith("__reactInternalInstance$")||s.startsWith("__reactFiber"))return t[s]||null}return null},Ur=Error();var bn=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,zr=["rsc://","file:///","webpack://","webpack-internal://","node:","turbopack://","metro://","/app-pages-browser/","/(app-pages-browser)/"],Vr=["<anonymous>","eval",""],Tn=/\.(jsx|tsx|ts|js)$/,Wr=/(\.min|bundle|chunk|vendor|vendors|runtime|polyfill|polyfills)\.(js|mjs|cjs)$|(chunk|bundle|vendor|vendors|runtime|polyfill|polyfills|framework|app|main|index)[-_.][A-Za-z0-9_-]{4,}\.(js|mjs|cjs)$|[\da-f]{8,}\.(js|mjs|cjs)$|[-_.][\da-f]{20,}\.(js|mjs|cjs)$|\/dist\/|\/build\/|\/.next\/|\/out\/|\/node_modules\/|\.webpack\.|\.vite\.|\.turbopack\./i,qr=/^\?[\w~.-]+(?:=[^&#]*)?(?:&[\w~.-]+(?:=[^&#]*)?)*$/,An="(at Server)",Yr=/(^|@)\S+:\d+/,Nn=/^\s*at .*(\S+:\d+|\(native\))/m,Kr=/^(eval@)?(\[native code\])?$/;var Ae=(t,e)=>{if((e==null?void 0:e.includeInElement)!==!1){let n=t.split(`
`),o=[];for(let r of n)if(/^\s*at\s+/.test(r)){let i=vn(r,void 0)[0];i&&o.push(i)}else if(/^\s*in\s+/.test(r)){let i=r.replace(/^\s*in\s+/,"").replace(/\s*\(at .*\)$/,"");o.push({functionName:i,source:r})}else if(r.match(Yr)){let i=yn(r,void 0)[0];i&&o.push(i)}return vt(o,e)}return t.match(Nn)?vn(t,e):yn(t,e)},Rn=t=>{if(!t.includes(":"))return[t,void 0,void 0];let e=t.startsWith("(")&&/:\d+\)$/.test(t)?t.slice(1,-1):t,n=/(.+?)(?::(\d+))?(?::(\d+))?$/.exec(e);return n?[n[1],n[2]||void 0,n[3]||void 0]:[e,void 0,void 0]},vt=(t,e)=>e&&e.slice!=null?Array.isArray(e.slice)?t.slice(e.slice[0],e.slice[1]):t.slice(0,e.slice):t;var vn=(t,e)=>vt(t.split(`
`).filter(n=>!!n.match(Nn)),e).map(n=>{let o=n;o.includes("(eval ")&&(o=o.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));let r=o.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),i=r.match(/ (\(.+\)$)/);r=i?r.replace(i[0],""):r;let s=Rn(i?i[1]:r);return{functionName:i&&r||void 0,fileName:["eval","<anonymous>"].includes(s[0])?void 0:s[0],lineNumber:s[1]?+s[1]:void 0,columnNumber:s[2]?+s[2]:void 0,source:o}});var yn=(t,e)=>vt(t.split(`
`).filter(n=>!n.match(Kr)),e).map(n=>{let o=n;if(o.includes(" > eval")&&(o=o.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),!o.includes("@")&&!o.includes(":"))return{functionName:o};{let r=/(([^\n\r"\u2028\u2029]*".[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*(?:@[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*)*(?:[\n\r\u2028\u2029][^@]*)?)?[^@]*)@/,i=o.match(r),s=i&&i[1]?i[1]:void 0,a=Rn(o.replace(r,""));return{functionName:s,fileName:a[0],lineNumber:a[1]?+a[1]:void 0,columnNumber:a[2]?+a[2]:void 0,source:o}}});var Xr=44,wn="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Gr=new Uint8Array(64),_n=new Uint8Array(128);for(let t=0;t<wn.length;t++){let e=wn.charCodeAt(t);Gr[t]=e,_n[e]=t}function ie(t,e){let n=0,o=0,r=0;do r=_n[t.next()],n|=(r&31)<<o,o+=5;while(r&32);let i=n&1;return n>>>=1,i&&(n=-2147483648|-n),e+n}function kn(t,e){return t.pos>=e?!1:t.peek()!==Xr}var Jr=class{constructor(t){this.pos=0,this.buffer=t}next(){return this.buffer.charCodeAt(this.pos++)}peek(){return this.buffer.charCodeAt(this.pos)}indexOf(t){let{buffer:e,pos:n}=this,o=e.indexOf(t,n);return o===-1?e.length:o}};function Ln(t){let{length:e}=t,n=new Jr(t),o=[],r=0,i=0,s=0,a=0,l=0;do{let d=n.indexOf(";"),c=[],u=!0,h=0;for(r=0;n.pos<d;){let p;r=ie(n,r),r<h&&(u=!1),h=r,kn(n,d)?(i=ie(n,i),s=ie(n,s),a=ie(n,a),kn(n,d)?(l=ie(n,l),p=[r,i,s,a,l]):p=[r,i,s,a]):p=[r],c.push(p),n.pos++}u||Zr(c),o.push(c),n.pos=d+1}while(n.pos<=e);return o}function Zr(t){t.sort(Qr)}function Qr(t,e){return t[0]-e[0]}var Mn=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,ei=/^data:application\/json[^,]+base64,/,ti=/(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^*]+?)[ \t]*(?:\*\/)[ \t]*$)/,In=typeof WeakRef<"u",se=new Map,Te=new Map,ni=t=>In&&t instanceof WeakRef,xn=(t,e,n,o)=>{if(n<0||n>=t.length)return null;let r=t[n];if(!r||r.length===0)return null;let i=null;for(let c of r)if(c[0]<=o)i=c;else break;if(!i||i.length<4)return null;let[,s,a,l]=i;if(s===void 0||a===void 0||l===void 0)return null;let d=e[s];return d?{columnNumber:l,fileName:d,lineNumber:a+1}:null},oi=(t,e,n)=>{if(t.sections){let o=null;for(let s of t.sections)if(e>s.offset.line||e===s.offset.line&&n>=s.offset.column)o=s;else break;if(!o)return null;let r=e-o.offset.line,i=e===o.offset.line?n-o.offset.column:n;return xn(o.map.mappings,o.map.sources,r,i)}return xn(t.mappings,t.sources,e-1,n)},ri=(t,e)=>{let n=e.split(`
`),o;for(let i=n.length-1;i>=0&&!o;i--){let s=n[i].match(ti);s&&(o=s[1]||s[2])}if(!o)return null;let r=Mn.test(o);if(!(ei.test(o)||r||o.startsWith("/"))){let i=t.split("/");i[i.length-1]=o,o=i.join("/")}return o},ii=t=>({file:t.file,mappings:Ln(t.mappings),names:t.names,sourceRoot:t.sourceRoot,sources:t.sources,sourcesContent:t.sourcesContent,version:3}),si=t=>{let e=t.sections.map(({map:o,offset:r})=>({map:E(S({},o),{mappings:Ln(o.mappings)}),offset:r})),n=new Set;for(let o of e)for(let r of o.map.sources)n.add(r);return{file:t.file,mappings:[],names:[],sections:e,sourceRoot:void 0,sources:Array.from(n),sourcesContent:void 0,version:3}},Sn=t=>{if(!t)return!1;let e=t.trim();if(!e)return!1;let n=e.match(Mn);if(!n)return!0;let o=n[0].toLowerCase();return o==="http:"||o==="https:"},ai=async(t,e=fetch)=>{if(!Sn(t))return null;let n;try{let r=await e(t);if(!r.ok)return null;n=await r.text()}catch(r){return null}if(!n)return null;let o=ri(t,n);if(!o||!Sn(o))return null;try{let r=await e(o);if(!r.ok)return null;let i=await r.json();return"sections"in i?si(i):ii(i)}catch(r){return null}},li=async(t,e=!0,n)=>{if(e&&se.has(t)){let i=se.get(t);if(i==null)return null;if(ni(i)){let s=i.deref();if(s)return s;se.delete(t)}else return i}if(e&&Te.has(t))return Te.get(t);let o=ai(t,n);e&&Te.set(t,o);let r=await o;return e&&Te.delete(t),e&&(r===null?se.set(t,null):se.set(t,In?new WeakRef(r):r)),r},ci=async(t,e=!0,n)=>await Promise.all(t.map(async o=>{if(!o.fileName)return o;let r=await li(o.fileName,e,n);if(!r||typeof o.lineNumber!="number"||typeof o.columnNumber!="number")return o;let i=oi(r,o.lineNumber,o.columnNumber);return i?E(S({},o),{source:i.fileName&&o.source?o.source.replace(o.fileName,i.fileName):o.source,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,isSymbolicated:!0}):o})),yt=t=>{var e;return t._debugStack instanceof Error&&typeof((e=t._debugStack)==null?void 0:e.stack)=="string"},ui=()=>{let t=ne();for(let e of[...Array.from(M),...Array.from(t.renderers.values())]){let n=e.currentDispatcherRef;if(n&&typeof n=="object")return"H"in n?n.H:n.current}return null},En=t=>{for(let e of M){let n=e.currentDispatcherRef;n&&typeof n=="object"&&("H"in n?n.H=t:n.current=t)}},N=t=>`
    in ${t}`,di=(t,e)=>{let n=N(t);return e&&(n+=` (at ${e})`),n},gt=!1,bt=(t,e)=>{var a;if(!t||gt)return"";let n=Error.prepareStackTrace;Error.prepareStackTrace=void 0,gt=!0;let o=ui();En(null);let r=console.error,i=console.warn;console.error=()=>{},console.warn=()=>{};try{let l={DetermineComponentFrameRoot(){let u;try{if(e){let h=function(){throw Error()};if(Object.defineProperty(h.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(h,[])}catch(p){u=p}Reflect.construct(t,[],h)}else{try{h.call()}catch(p){u=p}t.call(h.prototype)}}else{try{throw Error()}catch(p){u=p}let h=t();h&&typeof h.catch=="function"&&h.catch(()=>{})}}catch(h){if(h instanceof Error&&u instanceof Error&&typeof h.stack=="string")return[h.stack,u.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot",(a=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name"))!=null&&a.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});let[d,c]=l.DetermineComponentFrameRoot();if(d&&c){let u=d.split(`
`),h=c.split(`
`),p=0,m=0;for(;p<u.length&&!u[p].includes("DetermineComponentFrameRoot");)p++;for(;m<h.length&&!h[m].includes("DetermineComponentFrameRoot");)m++;if(p===u.length||m===h.length)for(p=u.length-1,m=h.length-1;p>=1&&m>=0&&u[p]!==h[m];)m--;for(;p>=1&&m>=0;p--,m--)if(u[p]!==h[m]){if(p!==1||m!==1)do if(p--,m--,m<0||u[p]!==h[m]){let g=`
${u[p].replace(" at new "," at ")}`,f=$(t);return f&&g.includes("<anonymous>")&&(g=g.replace("<anonymous>",f)),g}while(p>=1&&m>=0);break}}}finally{gt=!1,Error.prepareStackTrace=n,En(o),console.error=r,console.warn=i}let s=t?$(t):"";return s?N(s):""},hi=(t,e)=>{let n=t.tag,o="";switch(n){case ut:o=N("Activity");break;case tt:o=bt(t.type,!0);break;case ot:o=bt(t.type.render,!1);break;case et:case it:o=bt(t.type,!1);break;case nt:case lt:case ct:o=N(t.type);break;case st:o=N("Lazy");break;case rt:o=t.child!==e&&e!==null?N("Suspense Fallback"):N("Suspense");break;case at:o=N("SuspenseList");break;case dt:o=N("ViewTransition");break;default:return""}return o},pi=t=>{try{let e="",n=t,o=null;do{e+=hi(n,o);let r=n._debugInfo;if(r&&Array.isArray(r))for(let i=r.length-1;i>=0;i--){let s=r[i];typeof s.name=="string"&&(e+=di(s.name,s.env))}o=n,n=n.return}while(n);return e}catch(e){return e instanceof Error?`
Error generating stack: ${e.message}
${e.stack}`:""}},wt=t=>{let e=Error.prepareStackTrace;Error.prepareStackTrace=void 0;let n=t;if(!n)return"";Error.prepareStackTrace=e,n.startsWith(`Error: react-stack-top-frame
`)&&(n=n.slice(29));let o=n.indexOf(`
`);if(o!==-1&&(n=n.slice(o+1)),o=Math.max(n.indexOf("react_stack_bottom_frame"),n.indexOf("react-stack-bottom-frame")),o!==-1&&(o=n.lastIndexOf(`
`,o)),o!==-1)n=n.slice(0,o);else return"";return n},mi=t=>{var e;return!!((e=t.fileName)!=null&&e.startsWith("rsc://")&&t.functionName)},fi=(t,e)=>t.fileName===e.fileName&&t.lineNumber===e.lineNumber&&t.columnNumber===e.columnNumber,gi=t=>{var n;let e=new Map;for(let o of t)for(let r of o.stackFrames){if(!mi(r))continue;let i=r.functionName,s=(n=e.get(i))!=null?n:[];s.some(a=>fi(a,r))||(s.push(r),e.set(i,s))}return e},bi=(t,e,n)=>{var s,a;if(!t.functionName)return E(S({},t),{isServer:!0});let o=e.get(t.functionName);if(!o||o.length===0)return E(S({},t),{isServer:!0});let r=(s=n.get(t.functionName))!=null?s:0,i=o[r%o.length];return n.set(t.functionName,r+1),E(S({},t),{isServer:!0,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,source:(a=t.source)==null?void 0:a.replace(An,`(${i.fileName}:${i.lineNumber}:${i.columnNumber})`)})},vi=t=>{let e=[];return oe(t,n=>{var r;if(!yt(n))return;let o=typeof n.type=="string"?n.type:$(n.type)||"<anonymous>";e.push({componentName:o,stackFrames:Ae(wt((r=n._debugStack)==null?void 0:r.stack))})},!0),e},Pn=async(t,e=!0,n)=>{let o=vi(t),r=Ae(pi(t)),i=gi(o),s=new Map;return ci(r.map(a=>{var l,d;return(d=(l=a.source)==null?void 0:l.includes(An))!=null&&d?bi(a,i,s):a}).filter((a,l,d)=>{if(l===0)return!0;let c=d[l-1];return a.functionName!==c.functionName}),e,n)};var Cn=t=>t.split("/").filter(Boolean).length,yi=t=>{var e;return(e=t.split("/").filter(Boolean)[0])!=null?e:null},wi=t=>{let e=t.indexOf("/",1);if(e===-1||Cn(t.slice(0,e))!==1)return t;let n=t.slice(e);if(!Tn.test(n)||Cn(n)<2)return t;let o=yi(n);return!o||o.startsWith("@")||o.length>4?t:n},kt=t=>{if(!t||Vr.some(i=>i===t))return"";let e=t,n=e.startsWith("http://")||e.startsWith("https://");if(n)try{e=new URL(e).pathname}catch(i){}if(n&&(e=wi(e)),e.startsWith("about://React/")){let i=e.slice(14),s=i.indexOf("/"),a=i.indexOf(":");e=s!==-1&&(a===-1||s<a)?i.slice(s+1):i}let o=!0;for(;o;){o=!1;for(let i of zr)if(e.startsWith(i)){e=e.slice(i.length),i==="file:///"&&(e=`/${e.replace(/^\/+/,"")}`),o=!0;break}}if(bn.test(e)){let i=e.match(bn);i&&(e=e.slice(i[0].length))}if(e.startsWith("//")){let i=e.indexOf("/",2);e=i===-1?"":e.slice(i)}let r=e.indexOf("?");if(r!==-1){let i=e.slice(r);qr.test(i)&&(e=e.slice(0,r))}return e},On=t=>{let e=kt(t);return!(!e||!Tn.test(e)||Wr.test(e))};var ki=5e3,xi=4e3,Fn=xi/2,Si=3,zn=1,Ei=1;var Ci=1,xt=t=>typeof Element!="undefined"&&t instanceof Element,Ti=["_","$","motion.","styled.","chakra.","ark.","Primitive.","Slot."],Ai=new Set(["InnerLayoutRouter","RedirectErrorBoundary","RedirectBoundary","HTTPAccessFallbackErrorBoundary","HTTPAccessFallbackBoundary","LoadingBoundary","ErrorBoundary","InnerScrollAndFocusHandler","ScrollAndFocusHandler","RenderFromTemplateContext","OuterLayoutRouter","body","html","DevRootHTTPAccessFallbackBoundary","AppDevOverlayErrorBoundary","AppDevOverlay","HotReload","Router","ErrorBoundaryHandler","AppRouter","ServerRoot","SegmentStateProvider","RootErrorBoundary","LoadableComponent","MotionDOMComponent"]),Ni=new Set(["Suspense","Fragment","StrictMode","Profiler","SuspenseList"]),ae,Ri=t=>(t&&(ae=void 0),ae!=null||(ae=typeof document!="undefined"&&!!(document.getElementById("__NEXT_DATA__")||document.querySelector("nextjs-portal"))),ae),Vn=t=>Ai.has(t)||Ni.has(t)?!0:Ti.some(e=>t.startsWith(e)),Wn=t=>!(t.length<=Ci||Vn(t)||t[0]!==t[0].toUpperCase()||t.includes("Provider")||t.includes("Context")),_i=t=>!(!t||Vn(t)||t==="SlotClone"||t==="Slot"),qn=["about://React/","rsc://React/"],Li=t=>qn.some(e=>t.startsWith(e)),Mi=t=>{for(let e of qn){if(!t.startsWith(e))continue;let n=t.indexOf("/",e.length),o=t.lastIndexOf("?");if(n>-1&&o>-1)return decodeURI(t.slice(n+1,o))}return t},Ii=async t=>{var i,s,a,l,d,c;let e=[],n=[];for(let u=0;u<t.length;u++){let h=t[u];!h.isServer||!h.fileName||(e.push(u),n.push({file:Mi(h.fileName),methodName:(i=h.functionName)!=null?i:"<unknown>",line1:(s=h.lineNumber)!=null?s:null,column1:(a=h.columnNumber)!=null?a:null,arguments:[]}))}if(n.length===0)return t;let o=new AbortController,r=setTimeout(()=>o.abort(),ki);try{let u=await fetch("/__nextjs_original-stack-frames",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({frames:n,isServer:!0,isEdgeServer:!1,isAppDirectory:!0}),signal:o.signal});if(!u.ok)return t;let h=await u.json(),p=[...t];for(let m=0;m<e.length;m++){let g=h[m];if((g==null?void 0:g.status)!=="fulfilled")continue;let f=(l=g.value)==null?void 0:l.originalStackFrame;if(!(f!=null&&f.file)||f.ignored)continue;let v=e[m];p[v]=E(S({},t[v]),{fileName:f.file,lineNumber:(d=f.line1)!=null?d:void 0,columnNumber:(c=f.column1)!=null?c:void 0,isSymbolicated:!0})}return p}catch(u){return t}finally{clearTimeout(r)}},Pi=t=>{let e=new Map;return oe(t,n=>{if(!yt(n))return!1;let o=wt(n._debugStack.stack);if(!o)return!1;for(let r of Ae(o))!r.functionName||!r.fileName||Li(r.fileName)&&(e.has(r.functionName)||e.set(r.functionName,E(S({},r),{isServer:!0})));return!1},!0),e},Oi=(t,e)=>{if(!e.some(r=>r.isServer&&!r.fileName&&r.functionName))return e;let o=Pi(t);return o.size===0?e:e.map(r=>{if(!r.isServer||r.fileName||!r.functionName)return r;let i=o.get(r.functionName);return i?E(S({},r),{fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber}):r})},Yn=t=>{if(!re()||V(t))return t;if(xt(t)){let e=t.parentElement;for(;e;){if(V(e))return e;e=e.parentElement}}return t},$n=new WeakMap,Fi=async t=>{try{let e=V(t);if(!e)return null;let n=await Pn(e);if(Ri()){let o=Oi(e,n);return Ii(o)}return n}catch(e){return null}},Kn=t=>{if(!re())return Promise.resolve([]);let e=Yn(t),n=$n.get(e);if(n)return n;let o=Fi(e);return $n.set(e,o),o},$i=t=>{var e;if(!t||t.length===0)return null;for(let n of t)if(n.fileName&&On(n.fileName))return{filePath:kt(n.fileName),lineNumber:(e=n.lineNumber)!=null?e:null,columnNumber:null,componentName:n.functionName&&Wn(n.functionName)?n.functionName:null};return null},Bi=async t=>{let e=await Kn(t),n=$i(e);return n?[n]:[]},Di=async t=>{if(!re())return null;let e=await Kn(t);if(e){for(let i of e)if(i.functionName&&Wn(i.functionName))return i.functionName}let n=Yn(t),o=V(n);if(!o)return null;let r=o.return;for(;r;){if(ht(r)){let i=$(r.type);if(i&&_i(i))return i}r=r.return}return null},B={name:"react",resolveStack:Bi,resolveComponentName:Di},H=t=>typeof t=="object"&&t!==null&&!Array.isArray(t),D=t=>typeof t=="string"?t:null,Ne=t=>typeof t=="number"&&Number.isFinite(t)?t:null,Hi="__svelte_meta",ji=t=>{let e=t;for(;e;){let n=Reflect.get(e,Hi);if(H(n))return n;e=e.parentElement}return null},Ui=t=>{let e=t.loc;if(!H(e))return null;let n=D(e.file),o=Ne(e.line),r=Ne(e.column);return!n||o===null||r===null?null:{filePath:n,lineNumber:o,columnNumber:r+zn}},zi=t=>{let e=t.parent;for(;H(e);){let n=D(e.componentTag);if(n)return n;e=e.parent}return null},Vi=t=>{let e=[],n=t.parent;for(;H(n);){let o=D(n.file),r=Ne(n.line),i=Ne(n.column),s=D(n.componentTag);o&&r!==null&&i!==null&&e.push({filePath:o,lineNumber:r,columnNumber:i+zn,componentName:s}),n=n.parent}return e},Wi=t=>{var i,s;let e=ji(t);if(!e)return[];let n=Ui(e);if(!n)return[];let o=[{filePath:n.filePath,lineNumber:n.lineNumber,columnNumber:n.columnNumber,componentName:zi(e)}],r=new Set([`${n.filePath}:${n.lineNumber}:${n.columnNumber}`]);for(let a of Vi(e)){let l=`${a.filePath}:${(i=a.lineNumber)!=null?i:""}:${(s=a.columnNumber)!=null?s:""}`;r.has(l)||(r.add(l),o.push(a))}return o},qi={name:"svelte",resolveStack:Wi},Bn=":",Dn=t=>{let e=Number.parseInt(t,10);return Number.isNaN(e)||e<1?null:e},Xn=t=>{let e=t.lastIndexOf(Bn);if(e===-1)return null;let n=t.lastIndexOf(Bn,e-1);if(n===-1)return null;let o=t.slice(0,n);if(!o)return null;let r=t.slice(n+1,e),i=t.slice(e+1),s=Dn(r),a=Dn(i);return s===null||a===null?null:{filePath:o,lineNumber:s,columnNumber:a}},Gn="data-v-inspector",Yi=`[${Gn}]`,Ki="__vueParentComponent",Jn=t=>{if(!t)return null;let e=t.type;return H(e)?e:null},Xi=t=>{let e=Reflect.get(t,Ki);return H(e)?e:null},Zn=t=>{let e=t;for(;e;){let n=Xi(e);if(n)return n;e=e.parentElement}return null},Qn=t=>{var e;return t?(e=D(t.__name))!=null?e:D(t.name):null},Gi=t=>t?D(t.__file):null,Ji=t=>{if(!t)return null;let e=Reflect.get(t,"parent");return H(e)?e:null},Zi=t=>{let e=[],n=Zn(t);for(;n;)e.push(n),n=Ji(n);return e},Qi=t=>Zi(t).map(e=>{let n=Jn(e),o=Gi(n);return o?{filePath:o,lineNumber:null,columnNumber:null,componentName:Qn(n)}:null}).filter(e=>!!e),es=t=>{let e=t.closest(Yi);if(!e)return null;let n=e.getAttribute(Gn);if(!n)return null;let o=Xn(n);if(!o)return null;let r=Zn(t),i=Jn(r);return{filePath:o.filePath,lineNumber:o.lineNumber,columnNumber:o.columnNumber,componentName:Qn(i)}},ts=t=>{var r,i;let e=[],n=new Set,o=es(t);if(o){let s=`${o.filePath}|${(r=o.componentName)!=null?r:""}`;e.push(o),n.add(s)}for(let s of Qi(t)){let a=`${s.filePath}|${(i=s.componentName)!=null?i:""}`;n.has(a)||(n.add(a),e.push(s))}return e},ns={name:"vue",resolveStack:ts},os="$$",rs=/location:\s*["']([^"']+:\d+:\d+)["']/g,eo="/src/",is=".css",ss="?import",as="__SOLID_RUNTIME_MODULES__",Hn=new Map,jn=new Map,ls=t=>{if(t.includes(ss))return!1;let e=new URL(t,window.location.href).pathname;return e.endsWith(is)?!1:e.includes(eo)},cs=()=>{if(typeof window=="undefined")return[];let t=performance.getEntriesByType("resource"),e=new Set;for(let n of t)!n.name||!ls(n.name)||e.add(n.name);return Array.from(e)},us=t=>{let e=Hn.get(t);if(e)return e;let n=fetch(t).then(o=>o.ok?o.text():null).catch(()=>null);return Hn.set(t,n),n},ds=()=>{if(typeof window=="undefined")return[];let t=Reflect.get(window,as);return Array.isArray(t)?t:[]},hs=async t=>{for(let e of ds()){let n=e.content.indexOf(t);if(n!==-1)return{moduleUrl:e.url,moduleContent:e.content,handlerSourceIndex:n}}for(let e of cs()){let n=await us(e);if(!n)continue;let o=n.indexOf(t);if(o!==-1)return{moduleUrl:e,moduleContent:n,handlerSourceIndex:o}}return null},ps=(t,e)=>{let n=Math.max(0,e-Fn),o=Math.min(t.length,e+Fn),r=t.slice(n,o),i=[];for(let l of r.matchAll(rs)){let d=l[1];if(!d)continue;let c=Xn(d);if(!c||l.index===void 0)continue;let u=n+l.index;i.push({sourceInfo:{filePath:c.filePath,lineNumber:c.lineNumber,columnNumber:c.columnNumber,componentName:null},distance:Math.abs(u-e)})}i.sort((l,d)=>{var h,p;let c=(h=l.sourceInfo.lineNumber)!=null?h:0,u=(p=d.sourceInfo.lineNumber)!=null?p:0;return u!==c?u-c:l.distance-d.distance});let s=new Set,a=[];for(let l of i){let d=`${l.sourceInfo.filePath}:${l.sourceInfo.lineNumber}:${l.sourceInfo.columnNumber}`;s.has(d)||(s.add(d),a.push(l.sourceInfo))}return a},ms=t=>{try{let e=decodeURIComponent(new URL(t,window.location.href).pathname);return e.includes(eo)?e.startsWith("/")?e.slice(1):e:null}catch(e){return null}},fs=(t,e)=>{var i;let o=t.slice(0,e).split(`
`),r=(i=o[o.length-1])!=null?i:"";return{lineNumber:o.length,columnNumber:r.length+Ei}},gs=t=>{let e=t;for(;e;){for(let n of Object.getOwnPropertyNames(e)){if(!n.startsWith(os))continue;let o=Reflect.get(e,n);if(typeof o!="function")continue;let r=String(o).trim();if(!(r.length<Si))return{source:r}}e=e.parentElement}return null},bs=t=>{let e=jn.get(t);if(e)return e;let n=(async()=>{let o=await hs(t);if(!o)return[];let r=ps(o.moduleContent,o.handlerSourceIndex);if(r.length>0)return r;let i=ms(o.moduleUrl);if(!i)return[];let s=fs(o.moduleContent,o.handlerSourceIndex);return[{filePath:i,lineNumber:s.lineNumber,columnNumber:s.columnNumber,componentName:null}]})();return jn.set(t,n),n},vs=t=>{let e=gs(t);return e?bs(e.source):Promise.resolve([])},ys={name:"solid",resolveStack:vs},ws=t=>"tagName"in t&&typeof t.tagName=="string"?t.tagName.toLowerCase():"nodeName"in t&&typeof t.nodeName=="string"?t.nodeName.toLowerCase():"",ks=[qi,ns,ys],Un=async(t,e)=>{for(let n of e){let r=(await n.resolveStack(t)).filter(i=>i.filePath.length>0);if(r.length>0)return r}return[]},xs=(t={})=>{var s;let e=(s=t.resolvers)!=null?s:ks,n=async a=>{let l=await B.resolveStack(a);if(xt(a)){let d=await Un(a,e);return l.length>0?[...l,...d]:d}return l};return{resolveSource:async a=>{var d;return(d=(await n(a))[0])!=null?d:null},resolveStack:n,resolveComponentName:async a=>{var d,c;let l=await((d=B.resolveComponentName)==null?void 0:d.call(B,a));if(l)return l;if(xt(a)){let h=(c=(await Un(a,e)).find(p=>p.componentName))==null?void 0:c.componentName;return h!=null?h:null}return null},resolveElementInfo:async a=>{var u,h,p,m,g;let l=await n(a),d=(u=l[0])!=null?u:null,c=(g=(m=(h=l.find(f=>f.componentName))==null?void 0:h.componentName)!=null?m:await((p=B.resolveComponentName)==null?void 0:p.call(B,a)))!=null?g:null;return{tagName:ws(a),componentName:c,source:d,stack:l}}}},Re=xs(),pl=Re.resolveSource,ml=Re.resolveStack,fl=Re.resolveComponentName,to=Re.resolveElementInfo;function St(){return typeof window.Livewire!="undefined"}function Ss(t){let e=t;for(;e&&e!==document.documentElement;){if(e.getAttribute("wire:id"))return e;e=e.parentElement}return null}function no(t){var s,a,l,d,c;if(!St())return null;let e=Ss(t);if(!e)return null;let n=e.getAttribute("wire:id"),o="Unknown",r,i=e.getAttribute("wire:snapshot");if(i)try{let u=JSON.parse(i);o=(a=(s=u==null?void 0:u.memo)==null?void 0:s.name)!=null?a:"Unknown",r=(c=(l=u==null?void 0:u.memo)==null?void 0:l.path)!=null?c:(d=u==null?void 0:u.memo)==null?void 0:d.name}catch(u){}return{framework:"livewire",component:o,wire_id:n,class_name:r}}function oo(t){return t?!t.includes("node_modules"):!1}function Et(t){var e,n,o;return(o=(e=t.type)==null?void 0:e.__file)!=null?o:(n=t.$options)==null?void 0:n.__file}function Cs(t){var e,n,o,r,i,s,a,l;return(l=(a=(i=(o=(e=t.$options)==null?void 0:e.name)!=null?o:(n=t.$options)==null?void 0:n.__name)!=null?i:(r=t.type)==null?void 0:r.name)!=null?a:(s=t.type)==null?void 0:s.__name)!=null?l:"Anonymous"}function Ts(t){var o;let e=null,n=t;for(;n&&n!==document.documentElement;){let r=(o=n.__vueParentComponent)!=null?o:n.__vue__;if(r){let i=Et(r);if(oo(i))return r;e||(e=r)}n=n.parentElement}if(e!=null&&e.parent){let r=e.parent;for(;r;){let i=Et(r);if(oo(i))return r;r=r.parent}}return e}function Ct(t){let e=Ts(t);if(!e)return null;let n=Cs(e),o={};if(e.props&&Object.assign(o,e.props),e.setupState){for(let[i,s]of Object.entries(e.setupState))if(!i.startsWith("_")&&typeof s!="function")try{o[i]=JSON.parse(JSON.stringify(s))}catch(a){o[i]=String(s)}}let r=Et(e);return{framework:"vue",component:n,source_file:r,component_uid:e.uid!==void 0?String(e.uid):void 0,data:o}}function Ns(t){let e=t;for(;e&&e!==document.documentElement;){if(e.__svelte_meta)return e.__svelte_meta;e=e.parentElement}return null}function Tt(t){var r,i,s,a;let e=Ns(t);if(!e)return null;let n=(i=(r=e.loc)==null?void 0:r.file)!=null?i:"";return{framework:"svelte",component:n&&(a=(s=n.split("/").pop())==null?void 0:s.replace(/\.svelte$/,""))!=null?a:"Unknown",source_file:n||void 0,data:n?{file:n}:void 0}}function _s(t){for(let e of Object.keys(t))if(e.startsWith("__reactFiber$")||e.startsWith("__reactInternalInstance$"))return e;return null}function Ls(t){return t?!t.fileName.includes("node_modules"):!1}function Ms(t){let e=null,n=t;for(;n;){let{type:o}=n,r=null;if(typeof o=="function"&&o.name){let i=o.name;i[0]===i[0].toUpperCase()&&i.length>1&&(r=i)}if(!r&&typeof o=="object"&&o!==null&&o.displayName&&(r=o.displayName),r){let i={name:r,source:n._debugSource};if(Ls(n._debugSource))return i;e||(e=i)}n=n.return}return e!=null?e:{name:"Component"}}function Is(t){var o,r;let e=(r=(o=t.memoizedProps)!=null?o:t.pendingProps)!=null?r:{},n={};for(let[i,s]of Object.entries(e))if(!(i==="children"||typeof s=="function"))try{n[i]=JSON.parse(JSON.stringify(s))}catch(a){n[i]=String(s)}return n}function At(t){let e=t;for(;e&&e!==document.documentElement;){let n=_s(e);if(n){let o=e[n];if(o){let{name:r,source:i}=Ms(o),s=Is(o);return{framework:"react",component:r,source_file:i==null?void 0:i.fileName,source_line:i==null?void 0:i.lineNumber,data:s}}}e=e.parentElement}return null}function Os(){var e;let t=document.getElementById("instruckt-views");if(!t)return[];try{return JSON.parse((e=t.textContent)!=null?e:"[]")}catch(n){return[]}}function ro(t){var o;let e=Os();if(e.length===0)return null;let n=e.length>1?(o=e.find(r=>!r.name.startsWith("layouts.")&&!r.name.startsWith("components.")))!=null?o:e[e.length-1]:e[0];return{framework:"blade",component:n.name,source_file:n.file,data:{views:e.map(r=>r.file)}}}function $s(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();let t=crypto.getRandomValues(new Uint8Array(16));t[6]=t[6]&15|64,t[8]=t[8]&63|128;let e=Array.from(t,n=>n.toString(16).padStart(2,"0")).join("");return`${e.slice(0,8)}-${e.slice(8,12)}-${e.slice(12,16)}-${e.slice(16,20)}-${e.slice(20)}`}function _e(){return window.location.pathname}var C=class C{constructor(e){this.toolbar=null;this.highlight=null;this.popup=null;this.markers=null;this.listPanel=null;this.touchAim=null;this.lastPointerType="mouse";this.annotations=[];this.isAnnotating=!1;this.rafId=null;this.pendingMouseTarget=null;this.highlightLocked=!1;this.pollTimer=null;this.initialLoadDone=!1;this.hasBackend=!1;this.boundReposition=()=>{var e;(e=this.markers)==null||e.reposition(this.annotations)};this.boundMouseMove=e=>{this.highlightLocked||(this.pendingMouseTarget=e.target,this.rafId===null&&(this.rafId=requestAnimationFrame(()=>{var n,o;this.rafId=null,!this.highlightLocked&&(this.pendingMouseTarget&&!this.isInstruckt(this.pendingMouseTarget)?(n=this.highlight)==null||n.show(this.pendingMouseTarget):(o=this.highlight)==null||o.hide())})))};this.boundMouseLeave=()=>{var e;this.highlightLocked||(e=this.highlight)==null||e.hide()};this.boundAnnotateBlock=e=>{e instanceof PointerEvent&&(this.lastPointerType=e.pointerType),!this.isInstruckt(e.target)&&(e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation())};this.boundClick=e=>{var o;let n=e.target;if(!this.isInstruckt(n)){if(e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation(),this.lastPointerType==="touch"||this.lastPointerType==="pen"){(o=this.touchAim)==null||o.tap(n);return}this.openNoteFor(n,e.clientX,e.clientY)}};this.config=S({adapters:["livewire","vue","svelte","react","blade"],theme:"auto",position:"bottom-right"},e),this.api=new de(e.endpoint),this.boundKeydown=this.onKeydown.bind(this),this.init()}init(){var n;Oe(this.config.colors),((n=this.config.adapters)!=null?n:[]).includes("livewire")&&St()&&un(!0),this.config.theme!=="auto"&&document.documentElement.setAttribute("data-instruckt-theme",this.config.theme),this.toolbar=new q(this.config.position,{onToggleAnnotate:o=>{this.setAnnotating(o)},onScreenshot:()=>this.startRegionCapture(),onCopy:()=>this.copyAnnotations(this.activeAnnotations(),!0),onCopyAndClear:()=>this.copyAndClear(),onToggleList:o=>this.setListOpen(o),onClearPage:()=>this.clearPage(),onClearAll:()=>this.clearEverything(),onMinimize:o=>this.onMinimize(o),onRetry:()=>{this.reload()}},this.config.keys,this.config.tools,this.toolbarOptions()),this.highlight=new Y,this.touchAim=this.makeTouchAim(),this.popup=new be,this.markers=new Z(o=>this.onMarkerClick(o)),this.listPanel=this.makeListPanel(),this.toolbar.isMinimized()&&this.markers.setVisible(!1),document.addEventListener("keydown",this.boundKeydown),window.addEventListener("scroll",this.boundReposition,{passive:!0}),window.addEventListener("resize",this.boundReposition,{passive:!0}),document.addEventListener("livewire:navigated",()=>this.reattach()),document.addEventListener("inertia:navigate",()=>this.syncMarkers()),window.addEventListener("popstate",()=>{setTimeout(()=>this.reattach(),0)}),this.loadAnnotations()}makeTouchAim(){return new ye({highlight:e=>{var n,o;e?((n=this.highlight)==null||n.show(e,we(e)),this.highlightLocked=!0):((o=this.highlight)==null||o.hide(),this.highlightLocked=!1)},isOurs:e=>this.isInstruckt(e),onAdd:e=>{let n=e.getBoundingClientRect();this.openNoteFor(e,n.left+n.width/2,n.top+n.height/2)}})}makeToolbarCallbacks(){return{onToggleAnnotate:e=>{this.setAnnotating(e)},onScreenshot:()=>this.startRegionCapture(),onCopy:()=>this.copyAnnotations(this.activeAnnotations(),!0),onCopyAndClear:()=>this.copyAndClear(),onToggleList:e=>this.setListOpen(e),onClearPage:()=>this.clearPage(),onClearAll:()=>this.clearEverything(),onMinimize:e=>this.onMinimize(e),onRetry:()=>{this.reload()}}}toolbarOptions(){return{doneAction:this.config.doneAction,startMinimized:this.config.startMinimized}}get local(){return this.config.localFallback!==!1}makeListPanel(){return new ve({annotations:()=>this.activeAnnotations(),currentPage:()=>_e(),pageOf:e=>this.annotationPageKey(e),screenshotSrc:e=>Ve(e.screenshot,this.config.endpoint),anchor:()=>{var e,n;return(n=(e=this.toolbar)==null?void 0:e.getListAnchor())!=null?n:null},onHover:e=>{var n,o;return(o=this.markers)==null?void 0:o.setHover((n=e==null?void 0:e.id)!=null?n:null)},onCopy:e=>this.copyAnnotations(e,!0),onDelete:e=>this.deleteAnnotations(e),onSave:(e,n)=>this.saveComment(e,n),onGoTo:e=>this.goTo(e),onClose:()=>{var e;return(e=this.toolbar)==null?void 0:e.setListActive(!1)}})}setListOpen(e){var n,o,r;e?(n=this.listPanel)==null||n.open():(o=this.listPanel)==null||o.close(),(r=this.toolbar)==null||r.setListActive(e)}goTo(e){var o;if(this.annotationPageKey(e)!==_e()){window.location.assign(e.url);return}let n=null;try{n=document.querySelector(e.elementPath)}catch(r){}n?n.scrollIntoView({behavior:"smooth",block:"center"}):window.scrollTo({top:Math.max(0,e.y-window.innerHeight/2),behavior:"smooth"}),(o=this.markers)==null||o.pulse(e.id)}reattach(){var i,s,a,l;let e=this.isAnnotating,n=(s=(i=this.listPanel)==null?void 0:i.isOpen())!=null?s:!1,o=(l=(a=this.toolbar)==null?void 0:a.isMinimized())!=null?l:!1;this.isAnnotating&&this.detachAnnotateListeners(),this.isAnnotating=!1,document.querySelectorAll("[data-instruckt]").forEach(d=>d.remove()),this.toolbar=new q(this.config.position,this.makeToolbarCallbacks(),this.config.keys,this.config.tools,this.toolbarOptions()),o&&this.toolbar.minimize(),this.markers=new Z(d=>this.onMarkerClick(d)),this.highlight=new Y,this.touchAim=this.makeTouchAim(),this.listPanel=this.makeListPanel(),o&&this.markers.setVisible(!1);let r=document.getElementById("instruckt-global");r&&r.remove(),Oe(this.config.colors),this.syncMarkers(),e&&!o&&this.setAnnotating(!0),n&&!o&&this.setListOpen(!0)}onMinimize(e){var n,o,r,i;e?(this.isAnnotating&&this.setAnnotating(!1),this.setListOpen(!1),(n=this.toolbar)==null||n.setAnnotateActive(!1),(o=this.markers)==null||o.setVisible(!1),(r=this.popup)==null||r.destroy()):(i=this.markers)==null||i.setVisible(!0)}static get STORAGE_KEY(){return`instruckt:${window.location.origin}:annotations`}async loadAnnotations(){var e,n,o,r;this.loadFromStorage();try{let i=await this.api.getAnnotations();if(this.hasBackend=!0,(e=this.toolbar)==null||e.setError(null),this.local){let s=new Set(i.map(l=>l.id)),a=this.annotations.filter(l=>!s.has(l.id));this.annotations=[...i,...a],this.saveToStorage()}else this.annotations=i}catch(i){this.hasBackend=!1,(o=(n=this.config).onError)==null||o.call(n,"load",i),this.local||(r=this.toolbar)==null||r.setError("Notes not loaded. Tap to try again.")}this.initialLoadDone=!0,this.syncMarkers()}saveToStorage(){if(this.local)try{let e=new Map,n=this.annotations.map(o=>{var r;return(r=o.screenshot)!=null&&r.startsWith("data:")?(e.set(o.id,o.screenshot),E(S({},o),{screenshot:`idb:${o.id}`})):o});localStorage.setItem(C.STORAGE_KEY,JSON.stringify(n)),e.size>0&&this.saveScreenshotsToIdb(e)}catch(e){}}loadFromStorage(){if(this.local)try{let e=localStorage.getItem(C.STORAGE_KEY);if(e){this.annotations=JSON.parse(e);let n=this.annotations.filter(o=>{var r;return(r=o.screenshot)==null?void 0:r.startsWith("idb:")});n.length>0&&this.loadScreenshotsFromIdb(n)}}catch(e){}}openIdb(){return new Promise((e,n)=>{let o=indexedDB.open(C.IDB_NAME,1);o.onupgradeneeded=()=>{let r=o.result;r.objectStoreNames.contains(C.IDB_STORE)||r.createObjectStore(C.IDB_STORE)},o.onsuccess=()=>e(o.result),o.onerror=()=>n(o.error)})}async saveScreenshotsToIdb(e){try{let n=await this.openIdb(),r=n.transaction(C.IDB_STORE,"readwrite").objectStore(C.IDB_STORE);for(let[i,s]of e)r.put(s,i);n.close()}catch(n){}}async loadScreenshotsFromIdb(e){try{let n=await this.openIdb(),o=n.transaction(C.IDB_STORE,"readonly"),r=o.objectStore(C.IDB_STORE);for(let i of e){let s=i.screenshot.replace("idb:",""),a=r.get(s);a.onsuccess=()=>{a.result&&(i.screenshot=a.result)}}await new Promise(i=>{o.oncomplete=()=>i()}),n.close(),this.syncMarkers()}catch(n){}}updatePolling(){if(!this.initialLoadDone||this.config.poll===!1)return;let e=this.totalActiveCount()>0;e&&!this.pollTimer?this.pollTimer=setInterval(()=>this.pollForChanges(),3e3):!e&&this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}async pollForChanges(){try{let e=await this.api.getAnnotations(),n=!1;for(let o of e){let r=this.annotations.find(i=>i.id===o.id);r&&r.status!==o.status&&(r.status=o.status,r.resolvedAt=o.resolvedAt,r.resolvedBy=o.resolvedBy,n=!0)}n&&this.saveToStorage(),this.syncMarkers()}catch(e){}}syncMarkers(){var o,r,i,s,a;(o=this.markers)==null||o.clear();let e=_e(),n=0;for(let l of this.annotations)l.status==="resolved"||l.status==="dismissed"||this.annotationPageKey(l)===e&&(n++,(r=this.markers)==null||r.upsert(l,n));(i=this.toolbar)==null||i.setAnnotationCount(this.pageAnnotations().length),(s=this.toolbar)==null||s.setTotalCount(this.totalActiveCount()),(a=this.listPanel)==null||a.refresh(),this.updatePolling()}annotationPageKey(e){try{return new URL(e.url).pathname}catch(n){return e.url}}pageAnnotations(){let e=_e();return this.annotations.filter(n=>this.annotationPageKey(n)===e&&n.status!=="resolved"&&n.status!=="dismissed")}activeAnnotations(){return this.annotations.filter(e=>e.status!=="resolved"&&e.status!=="dismissed")}totalActiveCount(){return this.activeAnnotations().length}setAnnotating(e){var n,o;this.isAnnotating=e,(n=this.toolbar)==null||n.setAnnotateActive(e),e?this.attachAnnotateListeners():(this.detachAnnotateListeners(),this.highlightLocked=!1,(o=this.highlight)==null||o.hide(),this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null))}openNoteFor(e,n,o){var u,h;let r=((u=window.getSelection())==null?void 0:u.toString().trim())||void 0,i=We(e),s=qe(e),a=we(e),l=Ke(e),d=Ye(e)||void 0,c=Xe(e);(h=this.highlight)==null||h.show(e),this.highlightLocked=!0,this.detectFramework(e).then(p=>{let m={element:e,elementPath:i,elementName:s,elementLabel:a,cssClasses:l,boundingBox:c,x:n,y:o,selectedText:r,nearbyText:d,framework:p!=null?p:void 0};this.showAnnotationPopup(m)})}showAnnotationPopup(e){var n;(n=this.popup)==null||n.showNew(e,{onSubmit:o=>{let r=()=>{var i,s;(i=this.touchAim)==null||i.done(),this.highlightLocked=!1,(s=this.highlight)==null||s.hide()};if(!this.local)return this.submitAnnotation(e,o.comment,o.screenshot).then(i=>(i&&r(),i));r(),this.submitAnnotation(e,o.comment,o.screenshot)},onCancel:()=>{var o,r;(o=this.touchAim)==null||o.done(),this.highlightLocked=!1,(r=this.highlight)==null||r.hide()}})}attachAnnotateListeners(){var e;document.addEventListener("mousemove",this.boundMouseMove),document.addEventListener("mouseleave",this.boundMouseLeave);for(let n of["mousedown","pointerdown"])window.addEventListener(n,this.boundAnnotateBlock,!0);window.addEventListener("click",this.boundClick,!0),(e=this.touchAim)==null||e.attach()}detachAnnotateListeners(){var e;document.removeEventListener("mousemove",this.boundMouseMove),document.removeEventListener("mouseleave",this.boundMouseLeave);for(let n of["mousedown","pointerdown"])window.removeEventListener(n,this.boundAnnotateBlock,!0);window.removeEventListener("click",this.boundClick,!0),(e=this.touchAim)==null||e.detach()}isInstruckt(e){return!e||!(e instanceof Element)?!1:e.closest("[data-instruckt]")!==null}async startRegionCapture(){var d;let e=this.isAnnotating;e&&this.setAnnotating(!1);let n=await pn();if(!n){e&&this.setAnnotating(!0);return}let o=await hn(n);if(!o){e&&this.setAnnotating(!0);return}let r=n.x+n.width/2,i=n.y+n.height/2,s=(d=document.elementFromPoint(r,i))!=null?d:document.body,a=await this.detectFramework(s),l={element:s,elementPath:We(s),elementName:qe(s),elementLabel:we(s),cssClasses:Ke(s),boundingBox:Xe(s),x:r,y:i,nearbyText:Ye(s)||void 0,screenshot:o,framework:a!=null?a:void 0};this.showAnnotationPopup(l)}async detectFramework(e){var r,i,s,a,l,d,c;let n=(r=this.config.adapters)!=null?r:[];if(n.includes("livewire")){let u=no(e);if(u)return u}if(["vue","svelte","react"].some(u=>n.includes(u)))try{let u=await to(e);if(u.source){let h=u.stack.map(m=>({filePath:m.filePath,lineNumber:m.lineNumber,columnNumber:m.columnNumber,componentName:m.componentName})),p=null;return n.includes("vue")&&(p=Ct(e)),!p&&n.includes("svelte")&&(p=Tt(e)),!p&&n.includes("react")&&(p=At(e)),p?E(S({},p),{component:(i=u.componentName)!=null?i:p.component,source_file:u.source.filePath,source_line:(s=u.source.lineNumber)!=null?s:p.source_line,source_column:(a=u.source.columnNumber)!=null?a:void 0,component_stack:h.length>0?h:void 0}):{framework:"react",component:(l=u.componentName)!=null?l:"Component",source_file:u.source.filePath,source_line:(d=u.source.lineNumber)!=null?d:void 0,source_column:(c=u.source.columnNumber)!=null?c:void 0,component_stack:h.length>0?h:void 0}}}catch(u){}if(n.includes("vue")){let u=Ct(e);if(u)return u}if(n.includes("svelte")){let u=Tt(e);if(u)return u}if(n.includes("react")){let u=At(e);if(u)return u}if(n.includes("blade")){let u=ro(e);if(u)return u}return null}async submitAnnotation(e,n,o){var s,a,l,d;let r={x:e.x/window.innerWidth*100,y:e.y+window.scrollY,comment:n,element:e.elementName,elementPath:e.elementPath,cssClasses:e.cssClasses,boundingBox:e.boundingBox,selectedText:e.selectedText,nearbyText:e.nearbyText,screenshot:o,intent:"fix",severity:"important",framework:e.framework,url:window.location.href},i;try{i=await this.api.addAnnotation(r)}catch(c){if((a=(s=this.config).onError)==null||a.call(s,"add",c),!this.local)return!1;i=E(S({},r),{id:$s(),status:"pending",createdAt:new Date().toISOString()})}return this.annotations.push(i),this.saveToStorage(),this.syncMarkers(),(d=(l=this.config).onAnnotationAdd)==null||d.call(l,i),this.config.autoCopy!==!1&&this.copyAnnotations(this.activeAnnotations(),!1),!0}onMarkerClick(e){var n;(n=this.popup)==null||n.showEdit(e,{onSave:(o,r)=>this.saveComment(o,r),onDelete:o=>this.deleteAnnotations([o])},this.config.endpoint)}async saveComment(e,n){var o,r;try{let i=await this.api.updateAnnotation(e.id,{comment:n});this.onAnnotationUpdated(i)}catch(i){(r=(o=this.config).onError)==null||r.call(o,"update",i),this.local&&this.onAnnotationUpdated(E(S({},e),{comment:n,updatedAt:new Date().toISOString()}))}}onAnnotationUpdated(e){let n=this.annotations.findIndex(o=>o.id===e.id);n>=0&&(this.annotations[n]=e),this.saveToStorage(),this.syncMarkers()}async deleteAnnotations(e){if(e.length===0)return;let n=new Set;await Promise.all(e.map(r=>this.api.updateAnnotation(r.id,{status:"dismissed"}).catch(i=>{var s,a;(a=(s=this.config).onError)==null||a.call(s,"update",i),this.local||n.add(r.id)})));let o=new Set(e.filter(r=>!n.has(r.id)).map(r=>r.id));this.annotations=this.annotations.filter(r=>!o.has(r.id)),this.saveToStorage(),this.syncMarkers()}clearPage(){return this.deleteAnnotations(this.pageAnnotations())}clearEverything(){return this.deleteAnnotations(this.activeAnnotations())}async copyAndClear(){let e=this.activeAnnotations();if(e.length===0)return!1;let n=await this.copyAnnotations(e,!0);return n&&await this.deleteAnnotations(e),n}onKeydown(e){var i,s,a,l,d,c,u,h,p;if((i=this.toolbar)!=null&&i.isMinimized())return;let n=e.target;if(["INPUT","TEXTAREA","SELECT"].includes(n.tagName)||n.closest('[contenteditable="true"]')||this.isInstruckt(n))return;let o=(s=this.config.keys)!=null?s:{},r=!e.metaKey&&!e.ctrlKey&&!e.altKey;e.key===((a=o.annotate)!=null?a:"a")&&r&&this.setAnnotating(!this.isAnnotating),e.key===((l=o.list)!=null?l:"l")&&r&&this.setListOpen(!((c=(d=this.listPanel)==null?void 0:d.isOpen())!=null&&c)),e.key===((u=o.screenshot)!=null?u:"c")&&r&&this.startRegionCapture(),e.key===((h=o.clearPage)!=null?h:"x")&&r&&this.clearPage(),e.key==="Escape"&&(this.isAnnotating&&this.setAnnotating(!1),(p=this.listPanel)!=null&&p.isOpen()&&this.setListOpen(!1))}async copyAnnotations(e,n){let o=this.exportMarkdown(e);if(window.isSecureContext)try{return await navigator.clipboard.writeText(o),!0}catch(r){return!1}if(!n)return!1;try{let r=document.createElement("textarea");r.value=o,r.readOnly=!0,r.style.cssText="position:fixed;left:-9999px;top:0;font-size:16px",r.setAttribute("data-instruckt","copy"),document.body.appendChild(r),r.select(),r.setSelectionRange(0,o.length);let i=document.execCommand("copy");return r.remove(),i}catch(r){return!1}}exportMarkdown(e=this.activeAnnotations()){let n=e.filter(s=>s.status!=="resolved"&&s.status!=="dismissed");if(n.length===0)return`# UI Feedback

No open annotations.`;let o=new Map;for(let s of n){let a=this.annotationPageKey(s);o.has(a)||o.set(a,[]),o.get(a).push(s)}let r=o.size>1,i=[];r&&(i.push("# UI Feedback"),i.push(""));for(let[s,a]of o){r?i.push(`## ${s}`):i.push(`# UI Feedback: ${s}`),i.push("");let l=r?"###":"##";a.forEach((d,c)=>{var h,p,m,g,f,v;let u=(h=d.framework)!=null&&h.component?` in \`${d.framework.component}\``:"";if(i.push(`${l} ${c+1}. ${d.comment}`),i.push(`- ID: \`${d.id}\``),i.push(`- Element: \`${d.element}\`${u}`),(p=d.framework)!=null&&p.source_file){let k=d.framework.source_file;d.framework.source_line&&(k+=`:${d.framework.source_line}`,d.framework.source_column&&(k+=`:${d.framework.source_column}`)),i.push(`- Source: \`${k}\``)}else(g=(m=d.framework)==null?void 0:m.data)!=null&&g.file&&i.push(`- File: \`${d.framework.data.file}\``);if((f=d.framework)!=null&&f.component_stack&&d.framework.component_stack.length>1){i.push("- Component stack:");for(let k of d.framework.component_stack){let y=k.filePath;k.lineNumber&&(y+=`:${k.lineNumber}`,k.columnNumber&&(y+=`:${k.columnNumber}`));let w=k.componentName?`${k.componentName} `:"";i.push(`  - ${w}\`${y}\``)}}if(d.cssClasses&&i.push(`- Classes: \`${d.cssClasses}\``),d.selectedText?i.push(`- Text: "${d.selectedText}"`):d.nearbyText&&i.push(`- Text: "${d.nearbyText.slice(0,100)}"`),d.screenshot)if(d.screenshot.startsWith("data:"))i.push(`- Screenshot: ![Screenshot](${d.screenshot})`);else{let k=(v=this.config.screenshotPath)!=null?v:"storage/app/_instruckt/",y=this.config.mcp?` \u2014 call \`instruckt.get_screenshot\` with ID \`${d.id}\` to view`:"";i.push(`- Screenshot: \`${k}${d.screenshot}\`${y}`)}i.push("")})}return this.config.mcp&&(i.push("---"),i.push(""),i.push("After making changes, use the `instruckt.resolve` MCP tool to mark each annotation as resolved.")),i.join(`
`).trim()}getAnnotations(){return[...this.annotations]}reload(){return this.loadAnnotations()}pageChanged(){var e,n,o,r;(e=this.popup)==null||e.destroy(),(n=this.touchAim)==null||n.done(),this.highlightLocked=!1,(o=this.highlight)==null||o.hide(),(r=this.listPanel)!=null&&r.isOpen()&&this.setListOpen(!1),this.syncMarkers()}destroy(){var e,n,o,r,i,s;this.setAnnotating(!1),document.removeEventListener("keydown",this.boundKeydown),window.removeEventListener("scroll",this.boundReposition),window.removeEventListener("resize",this.boundReposition),(e=this.toolbar)==null||e.destroy(),(n=this.highlight)==null||n.destroy(),(o=this.touchAim)==null||o.destroy(),(r=this.popup)==null||r.destroy(),(i=this.markers)==null||i.destroy(),(s=this.listPanel)==null||s.destroy(),this.rafId!==null&&cancelAnimationFrame(this.rafId),this.pollTimer!==null&&clearInterval(this.pollTimer)}};C.IDB_NAME="instruckt",C.IDB_STORE="screenshots";var le=C;function Bs(t){return new le(t)}return ho(Ds);})();
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