// Writes lib/embeddings.json: one unit vector per page, from the same model the browser loads.
import { writeFileSync } from 'node:fs';
import { pipeline } from '@huggingface/transformers';
import { DOCS, EMBED_DTYPE, EMBED_MODEL, embedText, hashText } from '../lib/guide.mjs';

const extract = await pipeline('feature-extraction', EMBED_MODEL, { dtype: EMBED_DTYPE });

const pages = {};
for (const d of DOCS) {
  const text = embedText(d);
  const out = await extract(text, { pooling: 'mean', normalize: true });
  pages[d.href] = { hash: hashText(text), vector: Array.from(out.data, (x) => Math.round(x * 1e4) / 1e4) };
}

const file = new URL('../lib/embeddings.json', import.meta.url);
writeFileSync(file, JSON.stringify({ model: EMBED_MODEL, dtype: EMBED_DTYPE, pages }) + '\n');
console.log(`Embedded ${DOCS.length} pages with ${EMBED_MODEL} (${EMBED_DTYPE}).`);
