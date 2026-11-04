// The guide's reading list: every page on the site as a small document, and a ranker over them.
// Nothing here needs a model. The in-browser model, when a visitor loads one, only phrases what this ranks.
import { AREAS, EXTERNAL, PAGES, byline } from './pages.mjs';

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
  school: 'medical student lsu',
  lsu: 'medical student shreveport',
  vanderbilt: 'smile msi garcia lab',
  recent: 'latest newest updated',
  latest: 'recent newest updated',
  new: 'recent latest updated',
};

const STOP = new Set('a an the of to in on for and or is are was were be been it this that with what which who how do does did can could should would i you your my me about tell show find where any some something things thing like want looking look see know has have had'.split(' '));

export function tokens(text) {
  const out = [];
  for (const raw of String(text).toLowerCase().replace(/[’']/g, '').split(/[^a-z0-9.+-]+/)) {
    if (!raw || STOP.has(raw)) continue;
    const w = raw.replace(/\.$/, '');
    out.push(stem(w));
    const syn = SYNONYMS[w];
    if (syn) for (const s of syn.split(' ')) out.push(stem(s));
  }
  return out;
}

function stem(w) {
  if (w.length <= 4) return w;
  return w.replace(/(ies)$/, 'y').replace(/(ing|ed|es|s)$/, '');
}

function docOf(p) {
  const logs = (p.log || []).map((e) => e.text).join(' ');
  return {
    slug: p.slug,
    href: p.slug ? `/${p.slug}` : p.href,
    title: p.title,
    area: AREAS[p.area],
    description: p.description,
    updated: p.updated || '',
    created: p.created || '',
    by: p.slug ? byline(p) : 'external site',
    text: [p.title, p.title, p.description, AREAS[p.area], logs, p.slug || ''].join(' '),
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

export function rank(query, n = 3) {
  const q = [...new Set(tokens(query))];
  if (!q.length) return [];
  const scored = DOCS.map((d, i) => {
    let s = 0;
    for (const t of q) {
      const f = tf[i].get(t);
      if (!f) continue;
      const idf = Math.log(1 + (N - df.get(t) + 0.5) / (df.get(t) + 0.5));
      s += idf * (f * (k1 + 1)) / (f + k1 * (1 - b + b * lengths[i] / avg));
    }
    return { doc: d, score: s };
  }).filter((r) => r.score > 0).sort((a, b2) => b2.score - a.score);
  return scored.slice(0, n);
}

const RECENT = /\b(recent|latest|new|newest|lately|now|working on)\b/i;

// A plain answer from the ranking alone, for visitors who do not load the model.
export function plainAnswer(query) {
  if (RECENT.test(query)) {
    const latest = DOCS.filter((d) => d.updated).sort((a, c) => c.updated.localeCompare(a.updated)).slice(0, 3);
    return { text: `The newest work is ${latest[0].title}, updated ${latest[0].updated}. After that, ${latest[1].title} and ${latest[2].title}.`, docs: latest };
  }
  const hits = rank(query, 3);
  if (!hits.length) {
    return { text: 'Nothing on the site matches that. The list on the right is everything, newest first, and the CV has positions, presentations and publications.', docs: DOCS.filter((d) => d.slug === 'cv') };
  }
  const [first, ...rest] = hits.map((h) => h.doc);
  let text = `Start with ${first.title}: ${first.description}`;
  if (rest.length) text += ` Also ${rest.map((d) => d.title).join(' and ')}.`;
  return { text, docs: [first, ...rest] };
}
