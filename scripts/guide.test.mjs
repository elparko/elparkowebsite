import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ANSWERS, DOCS, answerReply, answerText, decodeAnswerVectors, embedText, hashText, matchAnswers, reply, search, answerableNow, tokens } from '../lib/guide.mjs';

const embeddings = JSON.parse(readFileSync(new URL('../lib/embeddings.json', import.meta.url), 'utf8'));
const vectors = Object.fromEntries(Object.entries(embeddings.pages).map(([k, v]) => [k, v.vector]));

test('every page has a current embedding (run `npm run embed` if this fails)', () => {
  for (const d of DOCS) {
    const e = embeddings.pages[d.href];
    assert.ok(e, `${d.href} has no embedding`);
    assert.equal(e.hash, hashText(embedText(d)), `${d.href} changed since it was embedded`);
    assert.equal(e.vector.length, 384);
  }
  assert.deepEqual(Object.keys(embeddings.pages).sort(), DOCS.map((d) => d.href).sort());
});

test('a page vector finds its own page first', () => {
  for (const d of DOCS) assert.equal(search(d.title, vectors[d.href], vectors, 1)[0].href, d.href);
});

test('fixed replies need no model', () => {
  assert.equal(reply('hi there', null, vectors).kind, 'hello');
  assert.equal(reply('how do I contact him', null, vectors).kind, 'contact');
  assert.equal(reply("what's he working on lately", null, vectors).kind, 'recent');
  assert.ok(answerableNow('email'));
});

test('words alone answer exact terms and refuse nonsense', () => {
  assert.equal(reply('convert scils files', null, vectors).items[0].href, '/open-slx');
  assert.equal(reply('lean theorem prover', null, vectors).items[0].href, '/proofs-for-the-edit');
  assert.ok(reply('Qwen', null, vectors).items.some((i) => i.href === '/education-not-advice'));
  assert.equal(reply('asdfgh', null, vectors).kind, 'none');
});

test('typos reach the page they meant', () => {
  assert.equal(reply('sauana', null, vectors).items[0].href, '/sauna-build');
  assert.ok(reply('spectromtry', null, vectors).items.some((i) => i.href === '/smile-msi'));
  assert.equal(reply('lipdis', null, vectors).items[0].href, '/smile-msi');
  assert.ok(reply('rhinosinusits', null, vectors).items.some((i) => i.href === '/crswnp-keto-research'));
  assert.equal(reply('voise assistant', null, vectors).items[0].href, '/voice-assistant');
  assert.equal(reply('mirorr', null, vectors).items[0].href, '/mirror');
});

test('a prefix reaches the words it starts', () => {
  assert.ok(reply('spectro', null, vectors).items.some((i) => i.href === '/smile-msi'));
  assert.ok(reply('interp', null, vectors).items.some((i) => i.href === '/proofs-for-the-edit'));
  assert.equal(reply('keto', null, vectors).items[0].href, '/crswnp-keto-research');
});

test('gibberish and short words do not fuzzy-match', () => {
  assert.equal(reply('gardening tips', null, vectors).kind, 'none');
  assert.equal(reply('quantum physics', null, vectors).items[0].href, '/learning-at-the-edge');
  assert.equal(reply('does he have a dog', null, vectors).kind, 'none');
});

test('best pizza in shreveport finds nothing with the model', async (t) => {
  let extract;
  try {
    const { pipeline, env } = await import('../node_modules/@huggingface/transformers/dist/transformers.node.mjs');
    env.allowRemoteModels = false;
    extract = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', { dtype: 'q8' });
  } catch {
    t.skip('MiniLM model is not in the local cache');
    return;
  }
  const qvec = Array.from((await extract('best pizza in shreveport', { pooling: 'mean', normalize: true })).data);
  assert.equal(reply('best pizza in shreveport', qvec, vectors).kind, 'none');
});

test('singular and plural stem alike, and notes is not not', () => {
  assert.deepEqual(tokens('reference'), tokens('references'));
  assert.deepEqual(tokens('site'), tokens('sites'));
  assert.deepEqual(tokens('note'), tokens('notes'));
  assert.notDeepEqual(tokens('notes'), tokens('not'));
  assert.notDeepEqual(tokens('sites'), tokens('sit'));
});

test('contact words reach the contact reply only when they mean reaching Parker', () => {
  for (const q of ['how do I contact him', 'contact', 'email', 'his email', 'get in touch', 'how can I reach Parker']) {
    assert.equal(reply(q, null, vectors).kind, 'contact', q);
  }
  for (const q of ['email triage for patients', 'contact tracing research', 'talk to me about sauna', 'how do I reach the server']) {
    assert.notEqual(reply(q, null, vectors).kind, 'contact', q);
  }
});

test('recent asks reach the recent list only when they ask what is new', () => {
  for (const q of ["what's new", "what's new with Parker?", 'what is new on the site', 'what is he working on', 'what has he done lately', 'latest', 'recent', 'newest']) {
    assert.equal(reply(q, null, vectors).kind, 'recent', q);
  }
  for (const q of ['recent advances in MSI', 'the latest version of qwen', 'working on a steering vector for qwen', 'What example from medicine does the essay use to show new knowledge?']) {
    assert.notEqual(reply(q, null, vectors).kind, 'recent', q);
  }
});

test('CV topics reach the CV by words alone', () => {
  for (const q of ['education', 'where did he go to school', 'what college', 'jobs', 'awards', 'resume', 'medical school']) {
    assert.ok(reply(q, null, vectors).items.some((i) => i.href === '/cv'), q);
  }
});

test('a reply lists the top page’s related pages that it does not already show', () => {
  const r = reply('resume', null, vectors);
  assert.equal(r.items[0].href, '/cv');
  assert.ok(r.related.length > 0 && r.related.length <= 2);
  for (const rel of r.related) assert.ok(!r.items.some((i) => i.href === rel.href));
});

const answerFile = JSON.parse(readFileSync(new URL('../lib/answer-vectors.json', import.meta.url), 'utf8'));
const answerVectors = decodeAnswerVectors(answerFile, (b) => { const u = Buffer.from(b, 'base64'); return u.buffer.slice(u.byteOffset, u.byteOffset + u.length); });
const answered = ANSWERS.filter((a) => a.answer);

test('every written answer has current vectors, real links and plain punctuation (run `npm run embed` if this fails)', () => {
  assert.equal(new Set(ANSWERS.map((a) => a.id)).size, ANSWERS.length, 'answer ids must be unique');
  for (const a of answered) {
    assert.equal(answerFile.entries[a.id]?.hash, hashText(answerText(a)), `${a.id} changed since it was embedded`);
    for (const l of a.links) assert.ok(DOCS.some((d) => d.slug === l || d.href === l), `${a.id} links to unknown page ${l}`);
    assert.ok(!a.answer.includes('—'), `${a.id} uses an em dash`);
  }
});

test('written answers match reworded questions and stay off unrelated ones', async (t) => {
  let extract;
  try {
    const { pipeline, env } = await import('../node_modules/@huggingface/transformers/dist/transformers.node.mjs');
    env.allowRemoteModels = false;
    extract = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', { dtype: 'q8' });
  } catch {
    t.skip('MiniLM model is not in the local cache');
    return;
  }
  const emb = async (q) => Array.from((await extract(q, { pooling: 'mean', normalize: true })).data);
  let total = 0, wrong = 0, found = 0;
  for (const a of answered) for (const q of a.held_out) {
    total++;
    const m = matchAnswers(q, await emb(q), answerVectors);
    if (m.direct && m.direct.id !== a.id) wrong++;
    if (m.direct?.id === a.id || (!m.direct && m.suggest.some((s) => s.id === a.id))) found++;
  }
  assert.ok(wrong / total <= 0.03, `${wrong} of ${total} reworded questions got another entry's answer`);
  assert.ok(found / total >= 0.6, `only ${found} of ${total} reworded questions found their answer`);

  const checks = JSON.parse(readFileSync(new URL('./answer-checks.json', import.meta.url), 'utf8'));
  for (const q of checks.off_topic) assert.equal(matchAnswers(q, await emb(q), answerVectors).direct, null, `"${q}" got a written answer`);
  let near = 0;
  for (const { question } of checks.near_miss) if (matchAnswers(question, await emb(question), answerVectors).direct) near++;
  assert.ok(near / checks.near_miss.length <= 0.15, `${near} of ${checks.near_miss.length} near-miss questions got a written answer`);
});

test('a picked question gets its written answer and links', () => {
  const r = answerReply('medical-school-year');
  assert.equal(r.kind, 'answer');
  assert.ok(r.answer.includes('2029'));
  assert.ok(r.items.some((i) => i.href === '/cv'));
});
