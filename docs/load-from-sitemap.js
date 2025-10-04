// load-from-sitemap.js
async function loadPDFsFromSitemap() {
  const res = await fetch('sitemap.xml');
  const text = await res.text();
  const parser = new DOMParser();
  const xml = parser.parseFromString(text, 'application/xml');
  const urls = Array.from(xml.querySelectorAll('url loc')).map(loc => loc.textContent);

  const select = document.getElementById('pdfSelect');
  const viewer = document.getElementById('pdfViewer');

  urls.forEach((url) => {
    // Da /docs jetzt Root ist, entfernen wir nur den Domain-Teil
    const file = decodeURIComponent(url.split('/One_World/')[1]);
    if (!file.endsWith('.pdf') && !file.endsWith('.PDF')) return;

    const option = document.createElement('option');
    option.value = file;
    option.textContent = file
      .replace(/_/g, ' ')
      .replace('.pdf', '')
      .replace('.PDF', '');
    select.appendChild(option);
  });

  // Standard-PDF
  const defaultFile = '2025_Trillions_Electric_Technocracy.pdf';
  viewer.src = 'web/viewer.html?file=' + encodeURIComponent(defaultFile);
  select.value = defaultFile;

  select.addEventListener('change', () => {
    viewer.src = 'web/viewer.html?file=' + encodeURIComponent(select.value);
  });
}

document.addEventListener('DOMContentLoaded', loadPDFsFromSitemap);
