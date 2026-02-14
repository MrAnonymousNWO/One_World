#!/usr/bin/env bash
set -e

TEMPLATE="docs/wiki_encyclopedia.html"
EXTENSIONS="md mediawiki creole org rst textile pod rdoc txt adoc"

for ext in $EXTENSIONS; do
  shopt -s nullglob
  for file in wiki_temp/*.$ext; do
    base="${file##*/}"
    base="${base%.$ext}"
    output="docs/wiki_encyclopedia/${base}.html"

    case "$ext" in
      adoc) asciidoctor -o temp.html "$file" ;;
      md) pandoc "$file" -f markdown -t html -o temp.html ;;
      mediawiki) pandoc "$file" -f mediawiki -t html -o temp.html ;;
      creole) pandoc "$file" -f creole -t html -o temp.html ;;
      org) pandoc "$file" -f org -t html -o temp.html ;;
      rst) pandoc "$file" -f rst -t html -o temp.html ;;
      textile) pandoc "$file" -f textile -t html -o temp.html ;;
      pod) pandoc "$file" -f pod -t html -o temp.html ;;
      rdoc) pandoc "$file" -f rdoc -t html -o temp.html ;;
      txt) pandoc "$file" -f markdown -t html -o temp.html ;;
    esac

    awk -v content="$(cat temp.html)" '
      /<!-- WORKFLOW WILL INSERT WIKI ARTICLE CONTENT HERE -->/ {
        print content
        next
      }
      { print }
    ' "$TEMPLATE" > "$output"
  done
  shopt -u nullglob
done
