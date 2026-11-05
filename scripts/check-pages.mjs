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

const { ANSWERS, DOCS, answerText, embedText, hashText } = await import('../lib/guide.mjs');
const vectors = JSON.parse(readFileSync(new URL('../lib/embeddings.json', import.meta.url), 'utf8')).pages;
const stale = DOCS.filter((d) => vectors[d.href]?.hash !== hashText(embedText(d))).map((d) => d.href);
if (stale.length) {
  console.warn(`The home chat's page vectors are out of date. Run \`npm run embed\`:\n  ${stale.join('\n  ')}`);
}
const answerVectors = JSON.parse(readFileSync(new URL('../lib/answer-vectors.json', import.meta.url), 'utf8')).entries;
const staleAnswers = ANSWERS.filter((a) => a.answer && answerVectors[a.id]?.hash !== hashText(answerText(a))).map((a) => a.id);
if (staleAnswers.length) {
  console.warn(`The home chat's answer vectors are out of date. Run \`npm run embed\`:\n  ${staleAnswers.join('\n  ')}`);
}
