// The home chat's reading list: every page on the site as a small document, and two rankers over it.
// BM25 works on words and needs nothing loaded. The embedding ranker works on meaning: page vectors are
// written at build time by `npm run embed`, and the browser only embeds the visitor's question.
import { AREAS, EXTERNAL, PAGES, byline } from './pages.mjs';
import { ANSWERS } from './answers.mjs';

export { ANSWERS };

export const EMBED_MODEL = 'Xenova/all-MiniLM-L6-v2';
export const EMBED_DTYPE = 'q8';

const SYNONYMS = {
  llm: 'chat model language',
  llms: 'chat model language',
  ai: 'model artificial intelligence',
  model: 'chat',
  models: 'chat model',
  paper: 'research note',
  papers: 'research note',
  publication: 'research publications cv',
  publications: 'research cv',
  resume: 'cv positions presentations publications',
  'curriculum': 'cv',
  spec: 'spectrometry',
  'mass-spec': 'mass spectrometry imaging',
  msi: 'mass spectrometry imaging',
  maldi: 'mass spectrometry imaging',
  lipid: 'lipids mass spectrometry',
  ent: 'otolaryngology nasal sinus',
  otolaryngology: 'ent nasal sinus olfaction',
  sinus: 'rhinosinusitis nasal polyps',
  polyps: 'rhinosinusitis nasal',
  smell: 'olfaction olfactory',
  keto: 'ketogenic diet',
  diet: 'ketogenic',
  mice: 'mouse model',
  house: 'home mirror voice assistant lamps thermostat',
  home: 'house mirror voice assistant',
  smart: 'house voice assistant mirror',
  raspberry: 'pi mirror',
  wood: 'sauna build hand',
  built: 'build builds',
  make: 'build builds',
  made: 'build builds',
  art: 'artwork mohs map',
  painting: 'artwork mohs map',
  drawing: 'artwork mohs map',
  read: 'books reading book log',
  reading: 'books book log',
  books: 'book log reading',
  essay: 'writing',
  essays: 'writing',
  safety: 'emergency advice triage guardrail',
  triage: 'emergency advice rural',
  emergency: 'triage 911 advice',
  interpretability: 'direction residual stream layer edit',
  steering: 'direction residual stream edit push',
  lean: 'proofs theorems',
  proof: 'proofs theorems lean',
  theorem: 'proofs theorems lean',
  math: 'proofs theorems lean',
  startup: 'venture founder pereste health',
  company: 'venture founder pereste health',
  founder: 'pereste health venture',
  literacy: 'health literacy pereste education',
  patients: 'patient health literacy',
  code: 'software github',
  software: 'code tools',
  open: 'open source github',
  github: 'open source code software',
  contact: 'email x github',
  hire: 'cv contact email',
  school: 'education medical student lsu',
  schools: 'education',
  education: 'school degree',
  college: 'education university school',
  university: 'education college school',
  degree: 'education',
  studied: 'education',
  job: 'jobs work experience positions',
  jobs: 'work experience positions',
  experience: 'positions work',
  award: 'awards presentations',
  awards: 'presentations',
  talk: 'talks presentations',
  talks: 'presentations',
  background: 'cv education experience',
  lsu: 'medical student shreveport',
  vanderbilt: 'smile msi garcia lab',
  recent: 'latest newest updated',
  latest: 'recent newest updated',
  new: 'recent latest updated',
};

const STOP = new Set('a an the of to in on for and or is are was were be been it this that with what which who how do does did can could should would i you your my me about tell show find where any some something things thing like want looking look see know has have had'.split(' '));

// Each word of the text with its raw form and its stemmed forms: the word, its parts (so "qwen" finds
// qwen3.5-4b), and, when asked, its synonyms.
function words(text, synonyms) {
  const out = [];
  for (const raw of String(text).toLowerCase().replace(/[’']/g, '').split(/[^a-z0-9.+-]+/)) {
    if (!raw || STOP.has(raw)) continue;
    const w = raw.replace(/\.$/, '');
    const forms = [stem(w)];
    const parts = w.split(/[.+-]+|(?<=[a-z])(?=\d)|(?<=\d)(?=[a-z])/);
    if (parts.length > 1) for (const part of parts) if (part.length > 1 && !STOP.has(part)) forms.push(stem(part));
    if (synonyms && SYNONYMS[w]) for (const s of SYNONYMS[w].split(' ')) forms.push(stem(s));
    out.push({ raw: w, forms });
  }
  return out;
}

export const tokens = (text) => words(text, true).flatMap((w) => w.forms);

// Singular and plural stem to the same form: "reference" and "references", "note" and "notes" (but not "not").
// Words of four letters or fewer stay as they are, and "-ing" or "-ed" comes off only when at least four letters remain.
function stem(w) {
  if (w.length <= 4) return w;
  if (/ies$/.test(w)) return w.slice(0, -3) + 'y';
  let s = w;
  if (/(ss|x|z|ch|sh)es$/.test(s)) s = s.slice(0, -2);
  else if (!/(ss|us|is)$/.test(s)) s = s.replace(/s$/, '');
  const base = s.replace(/(ing|ed)$/, '');
  return base.length >= 4 ? base : s;
}

function docOf(p) {
  const logs = (p.log || []).map((e) => e.text).join(' ');
  return {
    slug: p.slug,
    href: p.slug ? `/${p.slug}` : p.href,
    title: p.title,
    area: AREAS[p.area],
    description: p.description,
    topics: p.topics || '',
    related: p.related || [],
    updated: p.updated || '',
    created: p.created || '',
    by: p.slug ? byline(p) : 'external site',
    text: [p.title, p.title, p.description, p.topics || '', AREAS[p.area], logs, p.slug || ''].join(' '),
  };
}

export const DOCS = [...PAGES, ...EXTERNAL].map(docOf);

// BM25 over the small corpus.
const k1 = 1.4, b = 0.6;
const tf = DOCS.map((d) => {
  const m = new Map();
  for (const t of tokens(d.text)) m.set(t, (m.get(t) || 0) + 1);
  return m;
});
const lengths = tf.map((m) => [...m.values()].reduce((a, c) => a + c, 0));
const avg = lengths.reduce((a, c) => a + c, 0) / lengths.length;
const df = new Map();
for (const m of tf) for (const t of m.keys()) df.set(t, (df.get(t) || 0) + 1);
const N = DOCS.length;
// A vocabulary word maps to the terms it scores with. A synonym key scores with its synonyms, so "interp"
// reaches the pages about interpretability even where that word is not on any page.
const VOCAB = new Map();
for (const t of df.keys()) if (/^[a-z]{4,}$/.test(t)) VOCAB.set(t, [t]);
for (const [key, syn] of Object.entries(SYNONYMS)) {
  if (/^[a-z]{4,}$/.test(key)) VOCAB.set(key, [...(VOCAB.get(key) || []), ...syn.split(' ').map(stem)]);
}

const bm25 = (t, i) => {
  const f = tf[i].get(t);
  if (!f) return 0;
  const idf = Math.log(1 + (N - df.get(t) + 0.5) / (df.get(t) + 0.5));
  return idf * (f * (k1 + 1)) / (f + k1 * (1 - b + b * lengths[i] / avg));
};

// Damerau-Levenshtein distance, optimal string alignment form: an insert, delete, replace, or swap of two
// neighboring letters each cost 1.
function distance(a, c) {
  const d = [];
  for (let i = 0; i <= a.length; i++) d.push([i]);
  for (let j = 1; j <= c.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= c.length; j++) {
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === c[j - 1] ? 0 : 1));
      if (i > 1 && j > 1 && a[i - 1] === c[j - 2] && a[i - 2] === c[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
  }
  return d[a.length][c.length];
}

// One edit for a 4 to 7 letter word, two for 8 or more, none under 4. The first letter must match, which keeps
// "best" from matching "test" and keeps gibberish out.
const maxEdits = (n) => (n < 4 ? 0 : n < 8 ? 1 : 2);
const PREFIX_WEIGHT = 0.7, TYPO_WEIGHT = 0.8, TYPO2_WEIGHT = 0.6;

// The vocabulary words a typed word may mean, each with a weight below an exact hit: near misses (the
// stemmed form and the form without a final "s" also count, so "lipdis" reaches "lipid"), and longer words
// the typed word is the start of.
function guesses(raw) {
  if (raw.length < 4 || !/^[a-z]+$/.test(raw)) return [];
  const limit = maxEdits(raw.length);
  const variants = [...new Set([raw, stem(raw), raw.replace(/s$/, '')])];
  const found = [];
  for (const [term, terms] of VOCAB) {
    let weight = term.length > raw.length && term.startsWith(raw) ? PREFIX_WEIGHT : 0;
    if (limit && term[0] === raw[0] && Math.abs(term.length - raw.length) <= limit) {
      const d = Math.min(...variants.map((v) => distance(v, term)));
      if (d <= limit) weight = Math.max(weight, d === 1 ? TYPO_WEIGHT : TYPO2_WEIGHT);
    }
    if (weight) found.push({ terms, weight });
  }
  return found;
}

// A word with no exact hit anywhere scores through its guesses, and the best guess counts for the word.
export function rank(query, n = 3) {
  const groups = words(query, true);
  const exact = [...new Set(groups.flatMap((g) => g.forms.filter((f) => df.has(f))))];
  const typed = groups.filter((g) => !g.forms.some((f) => df.has(f))).map((g) => guesses(g.raw)).filter((g) => g.length);
  if (!exact.length && !typed.length) return [];
  const scored = DOCS.map((d, i) => {
    let s = exact.reduce((acc, t) => acc + bm25(t, i), 0);
    for (const guess of typed) {
      s += Math.max(...guess.map(({ terms, weight }) => weight * terms.reduce((acc, t) => acc + bm25(t, i), 0)));
    }
    return { doc: d, score: s };
  }).filter((r) => r.score > 0).sort((a, b2) => b2.score - a.score);
  return scored.slice(0, n);
}

// The text each page is embedded from. The build script and the staleness check both use this.
export const embedText = (d) => `${d.title}. ${d.description}${d.topics ? ` ${d.topics}.` : ''}`;

export function hashText(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return (h >>> 0).toString(16);
}

const dot = (a, b) => {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
};

// The text each answer's vectors come from, for the staleness check.
export const answerText = (a) => a.questions.join('\n');

// A pre-written answer shows by itself only when three things hold: the question is close in meaning to one
// of its phrasings, the question's own words (Parker's name and pronouns aside) mostly appear in the entry,
// and no other entry is about as close. The word rule keeps "How tall is Parker?" off "Who is Parker
// Smith?". Otherwise up to three entries are offered as questions the visitor can pick.
const MIN_ANSWER = 0.55;
const MIN_ANSWER_WORDS = 0.75;
const ANSWER_MARGIN = 0.02;
const MIN_SUGGEST = 0.5;

const ANSWER_SKIP = new Set(['parker', 'parkers', 'smith', 'he', 'his', 'him', 'you', 'your', 'yours', 'site', 'website', 'does', 'did', 'has', 'is', 'are']);
const answerBags = Object.fromEntries(ANSWERS.map((a) => [a.id, new Set(tokens([...a.questions, a.answer].join(' ')))]));

function answerWords(query, id) {
  const ws = String(query).toLowerCase().replace(/[’']s\b/g, '').split(/[^a-z0-9.+-]+/)
    .filter((w) => w && !ANSWER_SKIP.has(w)).map((w) => tokens(w)).filter((f) => f.length);
  return ws.length ? ws.filter((f) => f.some((t) => answerBags[id].has(t))).length / ws.length : 0;
}

// Turns lib/answer-vectors.json into { id: [vector, ...] }. Each vector is base64 of signed bytes.
export function decodeAnswerVectors(file, fromBase64) {
  return Object.fromEntries(Object.entries(file.entries).map(([id, e]) => [id, e.vectors.map((b) => {
    const bytes = new Int8Array(fromBase64(b));
    return Float32Array.from(bytes, (x) => x / file.scale);
  })]));
}

// `answerVectors` maps an answer's id to one unit vector per phrasing. Returns the direct answer, if any,
// and the entries worth offering.
export function matchAnswers(query, qvec, answerVectors) {
  if (!qvec || !answerVectors) return { direct: null, suggest: [] };
  const scored = ANSWERS
    .filter((a) => a.answer && answerVectors[a.id])
    .map((a) => ({ entry: a, score: Math.max(...answerVectors[a.id].map((v) => dot(qvec, v))) }))
    .sort((a, b) => b.score - a.score);
  const sure = scored.filter((r) => r.score >= MIN_ANSWER && answerWords(query, r.entry.id) >= MIN_ANSWER_WORDS);
  let direct = null;
  if (sure.length && scored[0].score - sure[0].score <= 0.08 && (!sure[1] || sure[0].score - sure[1].score >= ANSWER_MARGIN)) direct = sure[0];
  const suggest = scored.filter((r) => r.score >= MIN_SUGGEST && r !== direct).slice(0, 3).map((r) => r.entry);
  return { direct: direct && direct.entry, suggest };
}

// Below these, a page does not count as a match. Measured on MiniLM: unrelated questions score under
// 0.16 against every page, and a single word that happens to appear in a page scores under 6 in BM25.
const MIN_COSINE = 0.2;
const MIN_BM25 = 6;

// The share of the question's own words (synonyms aside) that appear in a page. A typed word with a close
// guess in the page counts too.
function coverage(query, doc) {
  const ws = words(query, false);
  const m = tf[DOCS.indexOf(doc)];
  const hit = (w) => w.forms.some((f) => m.has(f))
    || (!w.forms.some((f) => df.has(f)) && guesses(w.raw).some(({ terms }) => terms.some((t) => m.has(t))));
  return ws.length ? ws.filter(hit).length / ws.length : 0;
}

// A word match counts when it scores high, or when the top page holds most of the question's words.
// The second rule lets a rare name like "Qwen" through and keeps "best pizza in shreveport" out.
function wordsMatch(query, top, withModel) {
  if (!top) return false;
  if (top.score >= (withModel ? MIN_BM25 : MIN_BM25 / 2)) return true;
  return top.score >= 1.5 && coverage(query, top.doc) >= 0.5;
}

// Pages from both rankers, ordered by reciprocal rank fusion, so neither ranker's scale has to be tuned
// against the other. `vectors` maps a page's href to its unit vector; `qvec` is the question's unit vector.
export function search(query, qvec, vectors, n = 3) {
  const words = rank(query, DOCS.length);
  const byWords = new Map(words.map((r, i) => [r.doc.href, { rank: i, score: r.score }]));
  const meaning = qvec
    ? DOCS.filter((d) => vectors[d.href]).map((d) => ({ doc: d, score: dot(qvec, vectors[d.href]) })).sort((a, c) => c.score - a.score)
    : [];
  const byMeaning = new Map(meaning.map((r, i) => [r.doc.href, { rank: i, score: r.score }]));

  const topCos = meaning.length ? meaning[0].score : 0;
  const topBm = words.length ? words[0].score : 0;
  const byWordsSure = wordsMatch(query, words[0], Boolean(qvec));
  if (topCos < MIN_COSINE && !byWordsSure) return [];

  const K = 5;
  return DOCS
    .map((d) => {
      const w = byWords.get(d.href);
      const m = byMeaning.get(d.href);
      const keep = (m && m.score >= Math.max(MIN_COSINE, topCos - 0.2)) || (byWordsSure && w && w.score >= topBm * 0.4);
      if (!keep) return null;
      return { doc: d, score: (w ? 1 / (K + w.rank) : 0) + (m ? 1 / (K + m.rank) : 0) };
    })
    .filter(Boolean)
    .sort((a, c) => c.score - a.score)
    .slice(0, n)
    .map((r) => r.doc);
}

// True when the reply can go out before the embedding model has loaded: a fixed reply, or a strong word match.
// Anything weaker waits the second or two for the model, which orders the pages better.
export const answerableNow = (query) => {
  const kind = reply(query, null, {}).kind;
  return kind === 'hello' || kind === 'contact' || kind === 'recent' || (rank(query, 1)[0]?.score || 0) >= MIN_BM25;
};

// A recency word alone, or a question about what is new. A topic question such as "recent advances in MSI" is not.
const RECENT = /^\s*(the )?(latest|recent|recently|newest|new|lately|news|new stuff|new things)\s*[?!.]*\s*$|\bwhat\b.*\b(new|lately|recently|working on|up to|done)\b/i;
// A contact word alone, or aimed at a person ("contact him", "reach Parker"). "contact tracing" and "reach the server" are not.
const CONTACT = /^\s*((his|her|the|your|parker['’]?s)\s+)?(contact( info| details)?|e-?mail( address)?|address|get in touch|reach out)\s*[?!.]*\s*$|\b(get in touch|(contact|e-?mail|email|reach|message) (him|her|parker|me|you))\b/i;
const HELLO = /^\s*(hi|hello|hey|yo|sup|howdy|good (morning|afternoon|evening))\b[\s!.,?]*(there|parker)?[\s!.,?]*$/i;

export const CONTACTS = [
  { title: 'Email', href: 'mailto:pjs002@lsuhs.edu', line: 'pjs002@lsuhs.edu' },
  { title: 'GitHub', href: 'https://github.com/elparko', line: 'Code for most of the projects here.' },
  { title: 'X', href: 'https://x.com/parker5smith', line: '@parker5smith' },
];

const item = (d) => ({ title: d.title, href: d.href, line: d.description, internal: Boolean(d.slug) });

// Up to two pages the top match links to that the reply does not already show.
function relatedTo(hits, n = 2) {
  const shown = new Set(hits.map((d) => d.slug));
  return hits[0].related.filter((slug) => !shown.has(slug)).slice(0, n)
    .map((slug) => DOCS.find((d) => d.slug === slug)).filter(Boolean);
}

const linked = (ref) => DOCS.find((d) => d.slug === ref || d.href === ref);

// The chat's reply: a pre-written answer when one matches, and a list of pages, each with its own
// description. Nothing is generated.
export function reply(query, qvec, vectors, answerVectors) {
  if (HELLO.test(query)) return { kind: 'hello', items: [] };
  if (CONTACT.test(query)) return { kind: 'contact', items: CONTACTS };
  if (RECENT.test(query)) {
    const latest = DOCS.filter((d) => d.updated).sort((a, c) => c.updated.localeCompare(a.updated)).slice(0, 3);
    return { kind: 'recent', items: latest.map(item) };
  }
  const { direct, suggest } = matchAnswers(query, qvec, answerVectors);
  const offer = suggest.map((a) => ({ id: a.id, question: a.questions[0] }));
  if (direct) return { ...answerReply(direct.id), related: search(query, qvec, vectors).filter((d) => !direct.links.some((l) => linked(l)?.href === d.href)).slice(0, 2).map(item), suggest: offer };
  const hits = search(query, qvec, vectors);
  if (!hits.length) return { kind: 'none', items: DOCS.filter((d) => d.slug === 'cv').map(item), suggest: offer };
  return { kind: qvec ? 'meaning' : 'words', items: hits.map(item), related: relatedTo(hits).map(item), suggest: offer };
}

// The reply for one pre-written answer, by id: when it matched directly, or when the visitor picked it.
export function answerReply(id) {
  const a = ANSWERS.find((x) => x.id === id);
  return { kind: 'answer', id, question: a.questions[0], answer: a.answer, items: a.links.map(linked).filter(Boolean).map(item), related: [], suggest: [] };
}
