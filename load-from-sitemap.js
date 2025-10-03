// load-from-sitemap.js
async function loadPDFsFromSitemap() {
  const res = await fetch('sitemap.xml');
  const text = await res.text();
  const parser = new DOMParser();
  const xml = parser.parseFromString(text, 'application/xml');
  const urls = Array.from(xml.querySelectorAll('url loc')).map(loc => loc.textContent);
  const select = document.getElementById('pdfSelect');
  const viewer = document.getElementById('pdfViewer');

  urls.forEach((url, idx) => {
    const file = decodeURIComponent(url.split('/docs/')[1]);
    const option = document.createElement('option');
    option.value = file;
    option.textContent = file.replace(/_/g, ' ').replace('.pdf','').replace('.PDF','');
    select.appendChild(option);
  });

  // Default PDF
  const defaultFile = "World-Sold-Non-fiction-Succession-Deed.pdf";
  viewer.src = 'web/viewer.html?file=' + encodeURIComponent('docs/' + defaultFile);
  select.value = defaultFile;

  select.addEventListener('change', () => {
    viewer.src = 'web/viewer.html?file=' + encodeURIComponent('docs/' + select.value);
  });
}
document.addEventListener('DOMContentLoaded', loadPDFsFromSitemap);
