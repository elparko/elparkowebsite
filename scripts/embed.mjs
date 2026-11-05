// Writes lib/embeddings.json: one unit vector per page, from the same model the browser loads.
import { writeFileSync } from 'node:fs';
import { pipeline } from '@huggingface/transformers';
import { ANSWERS, DOCS, EMBED_DTYPE, EMBED_MODEL, answerText, embedText, hashText } from '../lib/guide.mjs';

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

// Pre-answered questions: one vector per phrasing, each number stored as a signed byte (x * 127) and the
// vector as base64, about a fifth the size of decimals. The browser loads this file only once the model
// has loaded, so it does not add to the page's first load. Entries without an answer are skipped.
const entries = {};
const answered = ANSWERS.filter((a) => a.answer);
for (const a of answered) {
  const vectors = [];
  for (const q of a.questions) {
    const out = await extract(q, { pooling: 'mean', normalize: true });
    vectors.push(Buffer.from(Int8Array.from(out.data, (x) => Math.round(x * 127)).buffer).toString('base64'));
  }
  entries[a.id] = { hash: hashText(answerText(a)), vectors };
}
writeFileSync(new URL('../lib/answer-vectors.json', import.meta.url), JSON.stringify({ model: EMBED_MODEL, dtype: EMBED_DTYPE, scale: 127, entries }) + '\n');
console.log(`Embedded ${answered.length} answers, ${answered.reduce((n, a) => n + a.questions.length, 0)} phrasings.`);
