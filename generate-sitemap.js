// generate-sitemap.js
import { writeFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const domain = "https://jobneura.tech";

const routes = [
  "/", "/quizzes", "/jobs", "/blogs", "/profile", "/login", "/register", "/about", "/contact"
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `
  <url>
    <loc>${domain}${route}</loc>
    <priority>${route === "/" ? "1.00" : "0.80"}</priority>
  </url>`).join("")}
</urlset>`;

writeFileSync(join(__dirname, "public", "sitemap.xml"), sitemap.trim());

console.log("✅ sitemap.xml generated at /public/sitemap.xml");
