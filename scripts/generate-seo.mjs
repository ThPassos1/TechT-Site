import fs from 'node:fs';
import path from 'node:path';

const siteUrl = (process.env.VITE_SITE_URL || 'https://techt-site.vercel.app').replace(/\/$/, '');
const today = new Date().toISOString().slice(0, 10);

const routes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/servicos', changefreq: 'weekly', priority: '0.9' },
  { path: '/portfolio', changefreq: 'weekly', priority: '0.9' },
  { path: '/inteligencia', changefreq: 'weekly', priority: '0.9' },
  { path: '/contato', changefreq: 'weekly', priority: '0.9' },
  { path: '/blog', changefreq: 'weekly', priority: '0.8' },
  { path: '/agencia-marketing-manaus', changefreq: 'monthly', priority: '0.8' },
  { path: '/trafego-pago-manaus', changefreq: 'monthly', priority: '0.8' },
  { path: '/social-media-manaus', changefreq: 'monthly', priority: '0.8' },
  { path: '/automacao-ia-manaus', changefreq: 'monthly', priority: '0.8' },
  { path: '/criacao-sites-manaus', changefreq: 'monthly', priority: '0.8' },
];

const urlTag = (route) => `  <url>
    <loc>${siteUrl}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(urlTag).join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

const publicDir = path.resolve(process.cwd(), 'public');
fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8');
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots, 'utf8');

console.log('SEO files generated for', siteUrl);
