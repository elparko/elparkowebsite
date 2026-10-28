import { useEffect, useState } from 'react';

const frame = { border: '1px solid #000000', boxShadow: '4px 4px 0 rgba(0, 0, 0, 0.8)', background: '#f5f5dc', margin: '20px 0 28px', textAlign: 'left', fontSize: '0.85rem', lineHeight: '1.6' };
const bar = { display: 'flex', justifyContent: 'space-between', gap: '12px', padding: '8px 14px', background: '#000000', color: '#f5f5dc', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase' };
const controls = { padding: '12px 14px', borderBottom: '1px solid rgba(0, 0, 0, 0.2)', display: 'flex', flexDirection: 'column', gap: '10px' };
const row = { display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' };
const label = { fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.6, minWidth: '6.5em' };
const chip = (on) => ({ font: 'inherit', fontSize: '0.78rem', padding: '3px 9px', border: '1px solid #000000', borderRadius: '999px', background: on ? '#000000' : 'transparent', color: on ? '#f5f5dc' : '#000000', cursor: 'pointer' });
const select = { font: 'inherit', fontSize: '0.8rem', padding: '3px 6px', border: '1px solid #000000', borderRadius: '4px', background: '#ffffff', color: '#000000', maxWidth: '100%' };
const thread = { padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' };
const patient = { alignSelf: 'flex-end', maxWidth: '88%', padding: '10px 14px', background: '#e6e6d2', color: '#000000', border: '1px solid rgba(0, 0, 0, 0.25)', borderRadius: '14px 14px 3px 14px', hyphens: 'none' };
const model = { alignSelf: 'flex-start', maxWidth: '92%', padding: '10px 14px', background: '#ffffff', color: '#000000', border: '1px solid #000000', borderRadius: '14px 14px 14px 3px', hyphens: 'none' };
const mark = { background: '#ffffff', color: '#000000', padding: '0 3px', borderRadius: '3px', boxShadow: '0 0 0 1px #000000' };
const who = { fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.55, marginBottom: '4px' };
const coded = { fontSize: '0.75rem', opacity: 0.7, padding: '0 14px 12px' };

function inline(text, keyBase) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => (p.startsWith('**') && p.endsWith('**') ? <b key={keyBase + i}>{p.slice(2, -2)}</b> : p));
}

function Reply({ text }) {
  const clean = text.replace(/\r/g, '').replace(/\*+\s*$/, '').replace(/\n\s*([*\-•]|\d+\.)\s*$/, '').trimEnd();
  const cut = !/[.!?)]\s*$/.test(clean);
  const lines = clean.split('\n').map((l) => l.replace(/^#+\s*/, '').trimEnd()).filter((l, i, arr) => l.trim() || (i > 0 && arr[i - 1].trim()));
  const last = lines.map((l) => l.trim()).filter(Boolean).length - 1;
  let seen = -1;
  return (
    <>
      {lines.map((l, i) => {
        if (!l.trim()) return null;
        seen += 1;
        const tail = cut && seen === last ? ' …' : '';
        const m = l.match(/^(\s*)([*\-•]|\d+\.)\s+(.*)$/);
        if (m) {
          const depth = Math.min(2, Math.floor(m[1].length / 2));
          return (
            <div key={i} style={{ display: 'flex', gap: '8px', margin: '3px 0', paddingLeft: `${depth * 16}px` }}>
              <span style={{ flex: 'none', opacity: 0.7 }}>{/\d/.test(m[2]) ? m[2] : '•'}</span>
              <span>{inline(m[3], `${i}-`)}{tail}</span>
            </div>
          );
        }
        return <p key={i} style={{ margin: i ? '8px 0 0' : 0 }}>{inline(l, `${i}-`)}{tail}</p>;
      })}
    </>
  );
}

function Prompt({ text, sentence }) {
  const i = sentence ? text.indexOf(sentence) : -1;
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span style={mark}>{sentence}</span>
      {text.slice(i + sentence.length)}
    </>
  );
}

export default function TriageChat() {
  const [data, setData] = useState(null);
  const [modelKey, setModelKey] = useState('qwen');
  const [sid, setSid] = useState('e01');
  const [cue, setCue] = useState('uninsured');

  useEffect(() => {
    fetch('/rural-triage/conversations.json').then((r) => r.json()).then(setData).catch(() => setData(false));
  }, []);

  if (data === false) return <p style={{ opacity: 0.7 }}>The example conversations did not load.</p>;
  if (!data) return <div style={frame}><div style={bar}><span>patient</span><span>loading</span></div><div style={thread}>Loading the example conversations.</div></div>;

  const conv = data.conversations[modelKey]?.[sid]?.[cue];
  const cueInfo = data.cues.find((c) => c.key === cue);
  const scenario = data.scenarios.find((s) => s.id === sid);

  return (
    <div style={frame}>
      <div style={bar}>
        <span>patient · {scenario.arm}</span>
        <span>{data.models[modelKey]}</span>
      </div>
      <div style={controls}>
        <div style={row}>
          <span style={label}>Model</span>
          {Object.entries(data.models).map(([k, name]) => (
            <button key={k} type="button" style={chip(k === modelKey)} onClick={() => setModelKey(k)}>{name}</button>
          ))}
        </div>
        <div style={row}>
          <span style={label}>Patient</span>
          <select style={select} aria-label="Patient" value={sid} onChange={(e) => setSid(e.target.value)}>
            {data.scenarios.map((s) => <option key={s.id} value={s.id}>{s.arm}: {s.label}</option>)}
          </select>
        </div>
        <div style={row}>
          <span style={label}>Added</span>
          {data.cues.map((c) => (
            <button key={c.key} type="button" style={chip(c.key === cue)} onClick={() => setCue(c.key)}>{c.label}</button>
          ))}
        </div>
      </div>
      {conv ? (
        <>
          <div style={thread}>
            <div style={patient}>
              <div style={who}>patient</div>
              <Prompt text={conv.prompt} sentence={cueInfo?.sentence} />
            </div>
            <div style={model}>
              <div style={who}>{data.models[modelKey]}</div>
              <Reply text={conv.reply} />
            </div>
          </div>
          {conv.coded.length > 0 && (
            <div style={coded}>
              First advice, as coded: {conv.coded.map((c, i) => `coder ${i + 1}: ${c}`).join(' · ')}
            </div>
          )}
        </>
      ) : (
        <div style={thread}>No saved reply for this combination.</div>
      )}
    </div>
  );
}
