import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/HomeChat.module.css';
import { ANSWERS, EMBED_DTYPE, EMBED_MODEL, answerReply, answerableNow, decodeAnswerVectors, reply } from '@/lib/guide.mjs';
import EMBEDDINGS from '@/lib/embeddings.json';

// The runtime comes from a CDN when the visitor sends a first question, so the site's own bundle stays small.
// transformers.min.js is the build with onnxruntime inlined; the .web builds import it by bare name and need a bundler.
const RUNTIME = 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.3.2/dist/transformers.min.js';
const loadRuntime = () => import(/* webpackIgnore: true */ RUNTIME);

const VECTORS = Object.fromEntries(Object.entries(EMBEDDINGS.pages).map(([href, p]) => [href, p.vector]));

const isTouch = () => window.matchMedia('(pointer: coarse)').matches;

// Written answers offered under the search before the first question. Picking one needs no model.
const STARTERS = ['who-is-parker', 'triage-what-is-it', 'education-not-advice-plain-words', 'what-is-pereste-health', 'smile-msi-what-is']
  .map((id) => ANSWERS.find((a) => a.id === id))
  .filter((a) => a?.answer)
  .map((a) => ({ id: a.id, question: a.questions[0] }));

const LEAD = {
  hello: 'Hello. Ask about anything on the site and I will point you to the pages that match.',
  contact: 'Email is fastest.',
  recent: 'Newest first:',
  none: 'Nothing on the site matches that. Every page is listed below, and the CV has the rest.',
};

const HOW = {
  answer: 'A written answer. Nothing here is generated.',
  meaning: 'Matched by meaning and by words.',
  words: 'Matched by words only. The search model had not loaded.',
};

function Items({ items, className }) {
  return (
    <ul className={className}>
      {items.map((it) => (
        <li key={it.href}>
          {it.internal
            ? <Link href={it.href}>{it.title}</Link>
            : <a href={it.href}>{it.title}{it.href.startsWith('http') ? ' ↗' : ''}</a>}
          <span>{it.line}</span>
        </li>
      ))}
    </ul>
  );
}

function Reply({ r, onPick }) {
  return (
    <>
      {LEAD[r.kind] && <p className={styles.lead}>{LEAD[r.kind]}</p>}
      {r.kind === 'answer' && (
        <>
          <p className={styles.answering}>Answering: {r.question}</p>
          <p className={styles.answer}>{r.answer}</p>
        </>
      )}
      {r.items.length > 0 && <Items items={r.items} className={styles.items} />}
      {r.related?.length > 0 && (
        <>
          <p className={styles.relatedLead}>Related</p>
          <Items items={r.related} className={`${styles.items} ${styles.related}`} />
        </>
      )}
      {r.suggest?.length > 0 && (
        <>
          <p className={styles.relatedLead}>{r.kind === 'answer' ? 'Other written answers' : 'Questions with written answers'}</p>
          <div className={styles.suggest}>
            {r.suggest.map((s) => (
              <button key={s.id} type="button" onClick={() => onPick(s)}>{s.question}</button>
            ))}
          </div>
        </>
      )}
      {HOW[r.kind] && <p className={styles.how}>{HOW[r.kind]}</p>}
    </>
  );
}

// `onType` receives the text in the search bar before the first question, so the home can narrow its page list.
export default function HomeChat({ onType }) {
  const [q, setQ] = useState('');
  const [log, setLog] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | loading | ready | failed
  const [progress, setProgress] = useState('');
  const extractor = useRef(null);
  const answerVectors = useRef(null);
  const loading = useRef(null);
  const nextId = useRef(0);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  const chatting = log.length > 0;

  // The input moves between the centered bar and the chat window, so focus follows it on a desktop.
  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) inputRef.current?.focus({ preventScroll: true });
  }, [chatting]);

  // A new message, or its first reply, scrolls the conversation, not the page, so the input stays where it is.
  // A reply redone once the model loads does not, so a visitor reading further up is left there.
  const waiting = log.some((m) => !m.r);
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [log.length, waiting]);

  function loadModel() {
    if (loading.current) return loading.current;
    setStatus('loading');
    loading.current = (async () => {
      try {
        const [tf, av] = await Promise.all([loadRuntime(), import('@/lib/answer-vectors.json')]);
        answerVectors.current = decodeAnswerVectors(av.default, (b) => Uint8Array.from(atob(b), (c) => c.charCodeAt(0)).buffer);
        tf.env.allowLocalModels = false;
        const seen = new Map();
        extractor.current = await tf.pipeline('feature-extraction', EMBED_MODEL, {
          dtype: EMBED_DTYPE,
          device: 'wasm',
          progress_callback: (p) => {
            if (p.status !== 'progress' || !p.file) return;
            seen.set(p.file, [p.loaded || 0, p.total || 0]);
            let l = 0, t = 0;
            for (const [a, c] of seen.values()) { l += a; t += c; }
            if (t) setProgress(`${Math.round((l / t) * 100)}%`);
          },
        });
        setStatus('ready');
      } catch (e) {
        console.error(e);
        setStatus('failed');
      }
    })();
    return loading.current;
  }

  async function answer(query) {
    if (!extractor.current && !answerableNow(query)) await loadModel();
    if (!extractor.current) return reply(query, null, VECTORS);
    try {
      const out = await extractor.current(query, { pooling: 'mean', normalize: true });
      return reply(query, out.data, VECTORS, answerVectors.current);
    } catch (e) {
      console.error(e);
      return reply(query, null, VECTORS);
    }
  }

  function pick(s) {
    const id = nextId.current++;
    // A starter picked from the home clears the filter text. A pick inside the chat leaves a half-typed question alone.
    if (!chatting) {
      setQ('');
      onType?.('');
    }
    setLog((l) => [...l, { id, q: s.question, r: answerReply(s.id) }]);
  }

  async function ask(e) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    // On a phone the keyboard closes so the reply has the screen. A failed download is tried again once per question.
    if (isTouch()) inputRef.current?.blur();
    if (status === 'failed') loading.current = null;
    const id = nextId.current++;
    setQ('');
    onType?.('');
    setLog((l) => [...l, { id, q: query, r: null }]);
    const set = (r) => setLog((l) => l.map((m) => (m.id === id ? { ...m, r } : m)));
    const r = await answer(query);
    set(r);
    // A strong word match answers before the model has loaded. Once it loads, the reply is redone with
    // meaning, which is what finds written answers.
    if (r.kind === 'words') {
      await loadModel();
      if (extractor.current) set(await answer(query));
    }
  }

  function onChange(e) {
    setQ(e.target.value);
    // Before the first question, typing only narrows the page list, which needs no model. The model
    // downloads when a question is sent. In the chat window a keystroke starts it early on a desktop.
    if (!chatting) onType?.(e.target.value);
    else if (e.target.value.trim() && status === 'idle' && !isTouch()) loadModel();
  }

  function clear() {
    setQ('');
    setLog([]);
  }

  const statusLine = {
    idle: chatting
      ? 'Your first typed question downloads a 24 MB model to this browser. Nothing you type leaves this page.'
      : 'Typing narrows the pages below. Enter asks a question, which downloads a 24 MB model to this browser. Nothing you type leaves this page.',
    loading: `Loading the search model${progress ? `, ${progress}` : ''}. Nothing you type leaves this page.`,
    ready: 'Search model loaded in your browser. Nothing you type leaves this page.',
    failed: 'The search model could not load here, so replies match words only.',
  }[status];

  const form = (
    <form onSubmit={ask} className={styles.form}>
      <label htmlFor="chat-q" className={styles.hidden}>Search the site</label>
      <input
        id="chat-q"
        ref={inputRef}
        value={q}
        onChange={onChange}
        placeholder={chatting ? 'Ask something else' : 'Search or ask anything'}
        autoComplete="off"
        enterKeyHint={chatting ? 'send' : 'search'}
        className={styles.input}
      />
      <button type="submit" className={styles.send} disabled={!q.trim()} aria-label={chatting ? 'Send' : 'Search'}>
        <span aria-hidden="true">{chatting ? '↑' : '→'}</span>
      </button>
    </form>
  );

  if (!chatting) {
    return (
      <section className={styles.searchHome} aria-label="Search the site">
        {form}
        <div className={`${styles.suggest} ${styles.starters}`}>
          {STARTERS.map((s) => (
            <button key={s.id} type="button" onClick={() => pick(s)}>{s.question}</button>
          ))}
        </div>
        <p className={styles.status}>{statusLine}</p>
      </section>
    );
  }

  return (
    <section className={styles.window} aria-label="Conversation with the site">
      <div className={styles.bar}>
        <span>Search the site</span>
        <button type="button" onClick={clear} className={styles.clear}>New search</button>
      </div>
      <ol ref={scrollRef} className={styles.log} aria-live="polite">
        {log.map((m) => (
          <li key={m.id} className={styles.turn}>
            <p className={styles.you}>{m.q}</p>
            <div className={styles.them}>
              {m.r ? <Reply r={m.r} onPick={pick} /> : <p className={styles.wait}>Looking…</p>}
            </div>
          </li>
        ))}
      </ol>
      <div className={styles.composer}>
        {form}
        <p className={styles.status}>{statusLine}</p>
      </div>
    </section>
  );
}
