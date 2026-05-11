#!/usr/bin/env bash
# Build Mira and install it into /Applications.
# Idempotent: also acts as an "update" — pulls latest, rebuilds, replaces
# the existing /Applications/Mira.app. Removes /Applications/Hatch.app
# if found (legacy name).
#
# Usage:
#   bash scripts/install-mira.sh           # build + install from current code
#   bash scripts/install-mira.sh --pull    # also: git pull from origin first
#   bash scripts/install-mira.sh --open    # launch the app after installing
#
# Builds an unsigned arm64 .app. macOS Gatekeeper will warn on first launch —
# right-click → Open, or this script will pre-clear the quarantine xattr.

set -euo pipefail

cd "$(dirname "$0")/.."

DO_PULL=0
DO_OPEN=0
for arg in "$@"; do
  case "$arg" in
    --pull) DO_PULL=1 ;;
    --open) DO_OPEN=1 ;;
    *) echo "Unknown flag: $arg" >&2; exit 1 ;;
  esac
done

APP_DEST="/Applications/Mira.app"
LEGACY_APP="/Applications/Hatch.app"

if [[ $DO_PULL -eq 1 ]]; then
  echo "→ Pulling latest from origin…"
  git pull --ff-only
  echo "→ Installing dependencies…"
  npm install --silent
fi

echo "→ Rebuilding icon from SVG…"
bash scripts/build-icon.sh

echo "→ Building production bundle…"
npm run build --silent

echo "→ Packaging .app for arm64 (this takes ~30s)…"
npx electron-builder --mac --arm64 >/tmp/mira-build.log 2>&1 || {
  echo "electron-builder failed. Tail of /tmp/mira-build.log:" >&2
  tail -40 /tmp/mira-build.log >&2
  exit 1
}

BUILT_APP=$(find release -maxdepth 3 -type d -name "Mira.app" | head -1)
if [[ -z "$BUILT_APP" ]]; then
  echo "Build succeeded but Mira.app not found in release/. Check /tmp/mira-build.log." >&2
  exit 1
fi

echo "→ Installing to $APP_DEST"
# Stop running copies first so we can replace the bundles cleanly.
osascript -e 'quit app "Mira"' 2>/dev/null || true
osascript -e 'quit app "Hatch"' 2>/dev/null || true
sleep 1

# Remove the legacy Hatch.app if present so the user ends up with one assistant.
if [[ -d "$LEGACY_APP" ]]; then
  echo "→ Removing legacy $LEGACY_APP"
  rm -rf "$LEGACY_APP"
fi

rm -rf "$APP_DEST"
cp -R "$BUILT_APP" "$APP_DEST"

# Strip the quarantine xattr so Gatekeeper doesn't block our locally-built app.
xattr -dr com.apple.quarantine "$APP_DEST" 2>/dev/null || true

echo
echo "✔ Mira installed at $APP_DEST"
echo "  Launch from Spotlight (⌘Space → Mira) or Applications."
echo

if [[ $DO_OPEN -eq 1 ]]; then
  echo "→ Launching Mira…"
  open "$APP_DEST"
fi
