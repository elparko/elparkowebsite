import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/Guide.module.css';
import { DOCS, plainAnswer, rank } from '@/lib/guide.mjs';

// A small model that lives in the visitor's browser and shows them around.
// Without it, the guide still answers from a ranking over the site's pages. With it, the same
// ranking is handed to the model as the only things it may talk about, and it writes the answer.
const MODEL = 'HuggingFaceTB/SmolLM2-360M-Instruct';
// The runtime is fetched from a CDN only when a visitor asks for the model, so the site's own bundle stays small.
const RUNTIME = 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.3.2/dist/transformers.web.min.js';
const loadRuntime = () => import(/* webpackIgnore: true */ RUNTIME);
const MODEL_SIZE = 'about 270 MB';
const SETTING = 'guide-model';

const SYSTEM = `You are the guide on Parker Smith's personal website. Parker is a medical student at LSU Health Shreveport and the founder of Pereste Health. He does research, writes software, and builds things.
Answer the visitor in two or three short plain sentences. Recommend only pages from the list given to you, by their exact titles. Do not invent pages, facts, dates or links. If the list does not answer the question, say so and point to the CV.`;

function pagesForPrompt(docs) {
  return docs.map((d) => `- ${d.title} (${d.area}): ${d.description}`).join('\n');
}

export default function Guide() {
  const [q, setQ] = useState('');
  const [answer, setAnswer] = useState(null);
  const [status, setStatus] = useState(null); // null | 'loading' | 'ready' | 'thinking' | 'failed'
  const [progress, setProgress] = useState('');
  const [wanted, setWanted] = useState(false);
  const pipe = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    try { if (localStorage.getItem(SETTING) === 'on') setWanted(true); } catch {}
  }, []);

  useEffect(() => {
    if (wanted && !pipe.current && status !== 'loading' && status !== 'failed') loadModel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wanted]);

  async function loadModel() {
    setStatus('loading');
    setProgress('starting');
    try {
      const tf = await loadRuntime();
      tf.env.allowLocalModels = false;
      const device = typeof navigator !== 'undefined' && navigator.gpu ? 'webgpu' : 'wasm';
      const seen = new Map();
      pipe.current = await tf.pipeline('text-generation', MODEL, {
        dtype: 'q4f16',
        device,
        progress_callback: (p) => {
          if (p.status === 'progress' && p.file) {
            seen.set(p.file, [p.loaded || 0, p.total || 0]);
            let l = 0, t = 0;
            for (const [a, c] of seen.values()) { l += a; t += c; }
            if (t) setProgress(`${Math.round((l / t) * 100)}% of ${Math.round(t / 1e6)} MB`);
          } else if (p.status === 'ready') {
            setProgress('');
          }
        },
      });
      pipe.current.device = device;
      setStatus('ready');
      try { localStorage.setItem(SETTING, 'on'); } catch {}
    } catch (e) {
      console.error(e);
      setStatus('failed');
      setProgress(String(e && e.message ? e.message : e).slice(0, 140));
    }
  }

  function forget() {
    setWanted(false);
    setStatus(null);
    pipe.current = null;
    try { localStorage.removeItem(SETTING); } catch {}
  }

  async function ask(e) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    const plain = plainAnswer(query);
    if (!pipe.current || status !== 'ready') {
      setAnswer({ text: plain.text, docs: plain.docs, by: 'ranking' });
      return;
    }
    const hits = rank(query, 4).map((h) => h.doc);
    const docs = hits.length ? hits : plain.docs;
    setStatus('thinking');
    setAnswer({ text: '', docs, by: 'model' });
    try {
      const { TextStreamer } = await loadRuntime();
      const messages = [
        { role: 'system', content: `${SYSTEM}\n\nPages that match the question:\n${pagesForPrompt(docs)}` },
        { role: 'user', content: query },
      ];
      let out = '';
      const streamer = new TextStreamer(pipe.current.tokenizer, {
        skip_prompt: true,
        skip_special_tokens: true,
        callback_function: (t) => { out += t; setAnswer({ text: out, docs, by: 'model' }); },
      });
      await pipe.current(messages, { max_new_tokens: 110, do_sample: false, repetition_penalty: 1.15, streamer });
      if (!out.trim()) setAnswer({ text: plain.text, docs: plain.docs, by: 'ranking' });
    } catch (err) {
      console.error(err);
      setAnswer({ text: plain.text, docs: plain.docs, by: 'ranking' });
    } finally {
      setStatus('ready');
    }
  }

  const modelLine = (() => {
    if (status === 'loading') return <span>Loading the model, {progress || 'starting'}.</span>;
    if (status === 'failed') return <span>The model could not load here ({progress}). Answers come from the page list instead.</span>;
    if (status === 'ready' || status === 'thinking') return <span>A {MODEL.split('/')[1]} model is answering on your {pipe.current && pipe.current.device === 'webgpu' ? 'GPU' : 'CPU'}. <button type="button" className={styles.linkButton} onClick={forget}>Turn it off</button></span>;
    return <span>Answers come from the page list. <button type="button" className={styles.linkButton} onClick={() => setWanted(true)}>Let a small model answer instead</button>, {MODEL_SIZE}, downloaded once and run on your device. Nothing you type leaves your browser.</span>;
  })();

  return (
    <section className={styles.guide} aria-label="Guide">
      <form onSubmit={ask} className={styles.form}>
        <label htmlFor="guide-q" className={styles.label}>Ask where to look</label>
        <div className={styles.inputRow}>
          <input
            id="guide-q"
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="mass spec, the sauna, what's newest"
            autoComplete="off"
            className={styles.input}
          />
          <button type="submit" className={styles.go} disabled={status === 'thinking'}>Go</button>
        </div>
      </form>

      {answer && (
        <div className={styles.answer} aria-live="polite">
          <p className={answer.by === 'model' ? styles.modelText : undefined}>
            {answer.text || (status === 'thinking' ? '…' : '')}
          </p>
          <ul className={styles.docs}>
            {answer.docs.slice(0, 3).map((d) => (
              <li key={d.href}>
                {d.slug ? <Link href={d.href}>{d.title}</Link> : <a href={d.href}>{d.title} ↗</a>}
                <span> · {d.area}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className={styles.modelLine}>{modelLine}</p>
    </section>
  );
}

export { DOCS };
