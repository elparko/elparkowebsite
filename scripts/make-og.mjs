import { mkdirSync, readFileSync } from 'node:fs';
import { extname } from 'node:path';
import { chromium } from 'playwright-core';
import { AREAS, HOME, PAGES } from '../lib/pages.mjs';

const pub = (p) => new URL(`../public${p}`, import.meta.url);
const dataUri = (p) => {
  const type = { '.jpeg': 'image/jpeg', '.jpg': 'image/jpeg', '.png': 'image/png', '.ttf': 'font/ttf' }[extname(p).toLowerCase()];
  return `data:${type};base64,${readFileSync(pub(p)).toString('base64')}`;
};
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

function card({ title, description, kicker, footer, image }) {
  return `<!doctype html><html><head><style>
    @font-face { font-family: JBM; src: url(${dataUri('/fonts/JetBrainsMono-Regular.ttf')}); }
    * { margin: 0; box-sizing: border-box; }
    body { width: 1200px; height: 630px; display: flex; background: #f5f5dc; color: #000; font-family: JBM, monospace; }
    .text { flex: 1; padding: 64px; display: flex; flex-direction: column; }
    .kicker { font-size: 24px; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.6; }
    h1 { font-size: ${title.length > 24 ? 60 : 76}px; line-height: 1.1; margin-top: 28px; font-weight: 700; }
    p { font-size: 28px; line-height: 1.45; margin-top: 28px; }
    .footer { margin-top: auto; font-size: 22px; opacity: 0.7; border-top: 2px solid #000; padding-top: 20px; }
    .img { width: 470px; background: #000 url(${image ? dataUri(image) : ''}) center / cover; }
  </style></head><body>
    <div class="text">
      <div class="kicker">${esc(kicker)}</div>
      <h1>${esc(title)}</h1>
      <p>${esc(description)}</p>
      <div class="footer">${esc(footer)}</div>
    </div>
    ${image ? '<div class="img"></div>' : ''}
  </body></html>`;
}

const cards = [
  { slug: HOME.slug, title: HOME.title, description: HOME.description, kicker: 'elparko.com', footer: '@parker5smith' },
  ...PAGES.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    kicker: `${AREAS[p.area]} · ${p.status.replace('-', ' ')}`,
    footer: `elparko.com/${p.slug}`,
    image: p.image,
  })),
];

const only = process.argv.slice(2);
mkdirSync(pub('/og'), { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const c of cards) {
  if (only.length && !only.includes(c.slug)) continue;
  await page.setContent(card(c));
  await page.screenshot({ path: pub(`/og/${c.slug}.png`).pathname });
  console.log(`public/og/${c.slug}.png`);
}
await browser.close();
