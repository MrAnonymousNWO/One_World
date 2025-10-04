// load-pdf-list.js
async function loadPDFList() {
  const response = await fetch('pdf-list.json');
  const pdfs = await response.json();

  const select = document.getElementById('pdfSelect');
  const viewer = document.getElementById('pdfViewer');

  pdfs.forEach((name) => {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name
      .replace(/_/g, ' ')
      .replace(/\.pdf$/i, '');
    select.appendChild(option);
  });

  // Standard-PDF laden
  const defaultFile = pdfs[0];
  viewer.src = 'web/viewer.html?file=' + encodeURIComponent(defaultFile);
  select.value = defaultFile;

  // Umschalten bei Auswahl
  select.addEventListener('change', () => {
    viewer.src = 'web/viewer.html?file=' + encodeURIComponent(select.value);
  });
}

document.addEventListener('DOMContentLoaded', loadPDFList);
