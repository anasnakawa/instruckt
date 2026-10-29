#!/usr/bin/env bash
# Release a new version of this fork: bump, build, commit dist/, tag, push.
# Consumers install from the tag: "instruckt": "github:anasnakawa/instruckt#v<version>".
# Usage: scripts/release.sh <version>   (for example 0.5.1)
set -euo pipefail
cd "$(dirname "$0")/.."

version="${1:?usage: scripts/release.sh <version>}"
if [[ -n "$(git status --porcelain -- src package.json tsup.config.ts tsconfig*.json)" ]]; then
  echo "Commit your source changes first." >&2
  exit 1
fi

npm version "$version" --no-git-tag-version >/dev/null
npm run check
git add package.json package-lock.json dist
git commit -m "release v$version"
git tag "v$version"
git push origin HEAD "v$version"

echo
echo "Released v$version. In Teamna, set both apps/desk-web and apps/desk-api to:"
echo "  \"instruckt\": \"github:anasnakawa/instruckt#v$version\""
echo "then run: bun install"
