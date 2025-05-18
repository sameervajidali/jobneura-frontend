// scripts/generate-sitemap.js
import fs from 'fs';
import globby from 'globby';

(async () => {
  const pages = await globby(['src/pages/**/*.jsx', '!src/pages/_*.jsx']);
  const urls = pages.map(p => {
    const path = p
      .replace('src/pages', '')
      .replace(/\.jsx$/, '')
      .replace('/index', '');
    return `https://jobneura.tech${path}`;
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map(u => `<url><loc>${u}</loc></url>`).join('')}
  </urlset>`;
  fs.writeFileSync('public/sitemap.xml', xml);
})();
