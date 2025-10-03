// load-pdf-list.js
async function loadPDFList() {
  const response = await fetch('pdf-list.json');
  const pdfs = await response.json();
  const select = document.getElementById('pdfSelect');
  const viewer = document.getElementById('pdfViewer');

  pdfs.forEach((name, index) => {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name.replace(/_/g, ' ').replace('.pdf','').replace('.PDF','');
    select.appendChild(option);
  });

  // Default PDF
  viewer.src = 'web/viewer.html?file=' + encodeURIComponent('docs/' + pdfs[0]);
  select.value = pdfs[0];

  select.addEventListener('change', () => {
    viewer.src = 'web/viewer.html?file=' + encodeURIComponent('docs/' + select.value);
  });
}
document.addEventListener('DOMContentLoaded', loadPDFList);
