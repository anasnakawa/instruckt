# Fork notes

This is Anas Nakawa's fork of [joshcirre/instruckt](https://github.com/joshcirre/instruckt), forked on 2026-10-29 from upstream `main` at `6f5e911` (published upstream as 0.4.32). It is the feedback toolbar used in Teamna (Desk web and the marketing site), and all improvements to the tool are made here, never inside the Teamna repo.

## How Teamna gets it

There is no npm publish. `dist/` is committed and every release is a git tag. Teamna depends on the tag:

```json
"instruckt": "github:anasnakawa/instruckt#v0.5.0"
```

in `apps/desk-web/package.json` and `apps/desk-api/package.json` (the API serves `dist/instruckt.iife.js` to the marketing site).

## Release flow

1. Change `src/`, run `npm run check`, commit.
2. `scripts/release.sh <next-version>` bumps the version, builds, commits `dist/`, tags `v<version>` and pushes.
3. In a Teamna worktree, bump both `package.json` entries to the new tag, `bun install`, run the Instruckt tests (`apps/desk-web/src/lib/instruckt.test.ts`, `apps/desk-api/tests/site-analytics.test.ts`), open a PR.

## Live development against Teamna

To see changes at once on local Desk without a release:

1. Here: `npm run dev` (tsup watch, rebuilds `dist/`).
2. In the Teamna worktree: replace `node_modules/instruckt` with a symlink to this folder (`ln -sfn ~/development/instruckt node_modules/instruckt`). Vite does not pre-bundle a linked package, so a rebuild reloads the page.
3. `bun install` in Teamna puts the released copy back.

## Upstream

`upstream` remote is `joshcirre/instruckt`. To pull upstream fixes: `git fetch upstream && git merge upstream/main`, then rebuild and release.

## Changes from upstream

- 0.5.0: typecheck fix in `src/ui/screenshot.ts` (the screenshot filter takes a `Node`, as `modern-screenshot` now types it). `dist/` is committed.
- Unreleased: Freeze removed (button, `F` key, `keys.freeze`, `tools.freeze`). New "Copy all notes, then clear them" button (clears only if the copy worked; `tools.copy_clear`). New "All notes" panel (`L` key, `tools.list`): all pages or this page, select and select all, copy or delete the selection (or everything), edit in place, show on page (scrolls and rings the marker, or opens the note's page). The panel opens beside the list button and can be dragged by its header; hovering a note enlarges its marker on the page and fades the others. Our own UI keeps normal cursors in annotate mode (crosshair only on page elements). Phones and tablets: touch drag for the toolbar, the round button and the region screenshot (pointer events); starts minimized on a small screen and remembers the choice (`instruckt:toolbar-min`); a position saved on a wider screen is pulled back into view; no hover tooltips on touch; note ids no longer need `crypto.randomUUID` (missing on plain http, which is how a phone opens a dev server); the copy fallback works on iOS Safari.

- 0.7.0 (for The Spot Village feedback, all opt-in, no default changed): `autoCopy: false` stops the copy after each note; `poll: false` never starts the 3-second poll (a database that must sleep); `localFallback: false` makes the backend the only store (no localStorage / IndexedDB notes, a failed save keeps the popup open with "Not saved...", a failed first load shows a retry note under the toolbar); `doneAction` adds a text button with the open note count under the toolbar and the round button; `startMinimized` forces the start state; `onError(op, err)` reports failed backend calls. New instance methods `reload()` and `pageChanged()`.

Live dev note: Vite watches only the workspace, so the local-only config adds a plugin that watches `dist/` here and reloads the page.
