#!/usr/bin/env bash
# Regenerate all raster PWA icons from the SVG source files.
# Requires: rsvg-convert (librsvg) and ImageMagick (`convert`).
set -euo pipefail

cd "$(dirname "$0")/.."
mkdir -p public/icons

rsvg-convert -w 192 -h 192 public/icons/icon.svg -o public/icons/icon-192.png
rsvg-convert -w 512 -h 512 public/icons/icon.svg -o public/icons/icon-512.png
rsvg-convert -w 192 -h 192 public/icons/icon-maskable.svg -o public/icons/icon-maskable-192.png
rsvg-convert -w 512 -h 512 public/icons/icon-maskable.svg -o public/icons/icon-maskable-512.png
rsvg-convert -w 180 -h 180 public/icons/icon.svg -o public/icons/apple-touch-icon.png
rsvg-convert -w 48 -h 48 public/icons/icon.svg -o /tmp/imasjid-favicon-48.png
convert /tmp/imasjid-favicon-48.png -define icon:auto-resize=48,32,16 public/favicon.ico
rm -f /tmp/imasjid-favicon-48.png

echo "Icons written to public/icons and public/favicon.ico"
