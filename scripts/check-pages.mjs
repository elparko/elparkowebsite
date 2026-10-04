import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { HOME, PAGES, slugFromHref } from '../lib/pages.mjs';

const missing = [HOME, ...PAGES]
  .map((p) => `public/og/${p.slug}.png`)
  .filter((f) => !existsSync(new URL(`../${f}`, import.meta.url)));
if (missing.length) {
  console.error(`Missing X preview images. Run \`npm run og\`:\n  ${missing.join('\n  ')}`);
  process.exit(1);
}

const backlinks = Object.fromEntries(PAGES.map((p) => [p.slug, []]));

for (const { slug } of PAGES) {
  const source = readFileSync(new URL(`../pages/${slug}.js`, import.meta.url), 'utf8');
  for (const [, href] of source.matchAll(/href=["'](\/[^"']*)["']/g)) {
    const target = slugFromHref(href);
    if (target && target !== slug && !backlinks[target].includes(slug)) {
      backlinks[target].push(slug);
    }
  }
}

writeFileSync(new URL('../lib/backlinks.json', import.meta.url), JSON.stringify(backlinks, null, 2) + '\n');
