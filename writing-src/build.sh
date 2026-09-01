#!/usr/bin/env bash
# Rebuild the double-spaced writing PDFs from the Markdown sources in this folder.
# Requires pandoc + pdflatex.
set -e
cd "$(dirname "$0")"
for f in *.md; do
  pandoc "$f" -o "../public/writing/${f%.md}.pdf" \
    --pdf-engine=pdflatex \
    -V documentclass=article -V fontsize=12pt -V geometry:margin=1in \
    -H header.tex
  echo "built ${f%.md}.pdf"
done
