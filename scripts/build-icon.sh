#!/usr/bin/env bash
# Build resources/icon.icns from resources/icon.svg.
# Requires: rsvg-convert (brew install librsvg) and iconutil (built into macOS).
set -euo pipefail

cd "$(dirname "$0")/.."

if ! command -v rsvg-convert >/dev/null 2>&1; then
  echo "rsvg-convert not found. Install with: brew install librsvg" >&2
  exit 1
fi

SVG="resources/icon.svg"
ICONSET="resources/icon.iconset"
OUT="resources/icon.icns"

if [[ ! -f "$SVG" ]]; then
  echo "Missing $SVG" >&2
  exit 1
fi

rm -rf "$ICONSET"
mkdir -p "$ICONSET"

# Apple's iconset requires both @1x and @2x for each "logical" size.
render() {
  local size="$1"
  local name="$2"
  rsvg-convert -w "$size" -h "$size" "$SVG" -o "$ICONSET/$name"
}

render 16    icon_16x16.png
render 32    icon_16x16@2x.png
render 32    icon_32x32.png
render 64    icon_32x32@2x.png
render 128   icon_128x128.png
render 256   icon_128x128@2x.png
render 256   icon_256x256.png
render 512   icon_256x256@2x.png
render 512   icon_512x512.png
render 1024  icon_512x512@2x.png

iconutil -c icns -o "$OUT" "$ICONSET"
rm -rf "$ICONSET"

echo "Built $OUT"
