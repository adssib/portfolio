#!/usr/bin/env bash
# Compile cv/cv.tex -> public/cv.pdf so the "View CV" button has something to serve.
# Usage: ./scripts/build-cv.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/cv/cv.tex"
OUT_DIR="$ROOT/cv/build"
PUBLIC="$ROOT/public/cv.pdf"

if ! command -v pdflatex >/dev/null 2>&1; then
  echo "pdflatex not found. On Debian/Ubuntu/WSL: sudo apt install texlive-latex-extra texlive-fonts-extra"
  exit 1
fi

mkdir -p "$OUT_DIR"
# Two passes so refs/toc settle.
pdflatex -interaction=nonstopmode -halt-on-error -output-directory="$OUT_DIR" "$SRC" >/dev/null
pdflatex -interaction=nonstopmode -halt-on-error -output-directory="$OUT_DIR" "$SRC" >/dev/null

cp "$OUT_DIR/cv.pdf" "$PUBLIC"
echo "✓ cv.pdf -> $PUBLIC"
