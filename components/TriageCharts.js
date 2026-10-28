import { Fragment, useEffect, useRef, useState } from 'react';

let cache;
function loadCharts() {
  if (!cache) cache = fetch('/rural-triage/charts.json').then((r) => r.json());
  return cache;
}
export function useCharts() {
  const [data, setData] = useState(null);
  useEffect(() => {
    loadCharts().then(setData).catch(() => setData(false));
  }, []);
  return data;
}

const C = { blue: '#0072b2', orange: '#d55e00', yellow: '#e69f00', green: '#009e73', sky: '#56b4e9', pink: '#cc79a7', gray: '#999999', dark: '#7f7f7f', black: '#000000', light: '#c4c4c4' };
const ROLE = { blue: C.blue, orange: C.orange, gray: C.dark, black: C.black };
const CAT = { ems_now: C.blue, go_to_er_yourself: C.orange, seek_immediate_care_unspecified: C.yellow, find_a_ride_or_neighbor: C.green, call_clinic_or_doctor: C.sky, clinic_today_or_urgent_care: C.sky, clinic_routine_or_call_doctor: '#8c6bb1', home_care_or_wait: C.pink, unclear: C.gray };

const wrap = { position: 'relative', textAlign: 'left', fontSize: '0.8rem', lineHeight: '1.5', hyphens: 'none', margin: '18px 0 10px' };
const tipStyle = { position: 'absolute', zIndex: 5, maxWidth: '320px', padding: '8px 10px', background: '#f5f5dc', color: '#000000', border: '1px solid #000000', boxShadow: '3px 3px 0 rgba(0, 0, 0, 0.8)', fontSize: '0.74rem', lineHeight: '1.45', pointerEvents: 'none' };
const small = { fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.6 };
const row = { display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center', marginBottom: '10px' };
const chip = (on) => ({ font: 'inherit', fontSize: '0.78rem', padding: '3px 9px', border: '1px solid #000000', borderRadius: '999px', background: on ? '#000000' : 'transparent', color: on ? '#f5f5dc' : '#000000', cursor: 'pointer' });
const legendRow = { display: 'flex', flexWrap: 'wrap', gap: '4px 14px', fontSize: '0.74rem', marginTop: '8px' };
const hint = { fontSize: '0.72rem', opacity: 0.6, marginTop: '6px' };

function useTip() {
  const ref = useRef(null);
  const [tip, setTip] = useState(null);
  const show = (e, node) => {
    const r = ref.current.getBoundingClientRect();
    setTip({ x: e.clientX - r.left, y: e.clientY - r.top, w: r.width, node });
  };
  const hide = () => setTip(null);
  return { ref, tip, show, hide };
}

function Tip({ tip }) {
  if (!tip) return null;
  const left = tip.x > tip.w * 0.55;
  return <div style={{ ...tipStyle, top: tip.y + 14, ...(left ? { right: tip.w - tip.x + 14 } : { left: tip.x + 14 }) }}>{tip.node}</div>;
}

function Swatch({ color, label }) {
  const hollow = color === '#f5f5dc';
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}><span style={{ width: 10, height: 10, background: color, display: 'inline-block', borderRadius: 2, border: hollow ? `2px solid ${C.dark}` : 'none', boxSizing: 'border-box' }} />{label}</span>;
}

function ModelToggle({ models, value, onChange, keys }) {
  return (
    <div style={row}>
      <span style={small}>Model</span>
      {Object.entries(models).filter(([k]) => !keys || keys.includes(k)).map(([k, name]) => <button key={k} type="button" aria-pressed={k === value} style={chip(k === value)} onClick={() => onChange(k)}>{name}</button>)}
    </div>
  );
}

function Hint() {
  return <div style={hint}>Hover, tap or tab to a mark for the numbers and an example.</div>;
}

function Loading({ ok, src, alt, children }) {
  if (!ok) return <img src={src} alt={alt} style={{ display: 'block', width: '100%', height: 'auto', background: '#fff', border: '1px solid rgba(0, 0, 0, 0.15)' }} />;
  return children;
}

function focusAt(show) {
  return (e, node) => {
    const r = e.currentTarget.getBoundingClientRect();
    show({ clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 }, node);
  };
}
const mark = (show, hide, node) => ({
  tabIndex: 0,
  onMouseMove: (e) => show(e, node),
  onMouseLeave: hide,
  onClick: (e) => show(e, node),
  onFocus: (e) => focusAt(show)(e, node),
  onBlur: hide,
  onKeyDown: (e) => { if (e.key === 'Escape') hide(); },
});

// the sample message shown above figures 1 and 3: one patient message with the selected sentence inserted
const bubble = { maxWidth: '100%', padding: '10px 14px', background: '#e6e6d2', color: '#000000', border: '1px solid rgba(0, 0, 0, 0.25)', borderRadius: '14px 14px 3px 14px', hyphens: 'none', fontSize: '0.8rem', lineHeight: '1.55', margin: '0 0 6px', display: 'grid' };
const inserted = { background: '#ffffff', color: '#000000', padding: '0 3px', borderRadius: '3px', boxShadow: '0 0 0 1px #000000' };
const who = { fontSize: '0.66rem', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.55, marginBottom: '4px' };

function longestOf(prompts, cues) {
  return { prompt: Object.values(prompts).reduce((a, b) => (b.length > a.length ? b : a), ''), label: cues.reduce((a, c) => (c.label.length > a.length ? c.label : a), '') };
}

function SampleMessage({ prompt, sentence, label, longest }) {
  const i = sentence ? prompt.indexOf(sentence) : -1;
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={bubble}>
        <div style={{ gridArea: '1 / 1' }}>
          <div style={who}>sample message · {label}</div>
          {i < 0 ? prompt : <>{prompt.slice(0, i)}<span style={inserted}>{sentence}</span>{prompt.slice(i + sentence.length)}</>}
        </div>
        <div style={{ gridArea: '1 / 1', visibility: 'hidden' }} aria-hidden="true">
          <div style={who}>sample message · {longest.label}</div>
          {longest.prompt}
        </div>
      </div>
      <div style={{ fontSize: '0.72rem', opacity: 0.65 }}>
        {sentence ? 'The highlighted sentence is the one added.' : 'No sentence added, the control message as written.'} Select a
        bar to change it. The same swap was made in all 16 messages.
      </div>
    </div>
  );
}

// Figure 1: stacked bars, first advice in emergencies, two coders, by added sentence
export function Fig1({ src, alt }) {
  const d = useCharts();
  const [model, setModel] = useState('qwen');
  const [sel, setSel] = useState('uninsured');
  const { ref, tip, show, hide } = useTip();
  if (!d) return <Loading ok={d} src={src} alt={alt} />;
  const f = d.fig1;
  const selCue = f.cues.find((c) => c.key === sel);
  const coders = f.models[model];
  const ex = f.examples[model];
  const H = 220;
  return (
    <div style={wrap} ref={ref}>
      <SampleMessage prompt={f.prompts[sel]} sentence={f.sentences[sel]} label={selCue.label} longest={longestOf(f.prompts, f.cues)} />
      <ModelToggle models={d.models} value={model} onChange={setModel} keys={Object.keys(f.models)} />
      <div style={{ display: 'flex', alignItems: 'stretch', gap: '4px' }}>
        <div style={{ position: 'relative', width: '2.2em', height: H, flex: 'none' }}>
          {[0, 4, 8, 12, 16].map((v) => <span key={v} style={{ position: 'absolute', right: 4, bottom: `calc(${(v / 16) * 100}% - 0.6em)`, fontSize: '0.7rem', opacity: 0.6 }}>{v}</span>)}
        </div>
        <div style={{ position: 'relative', flex: 1, height: H, borderLeft: '1px solid #000', borderBottom: '1px solid #000' }}>
          {[4, 8, 12, 16].map((v) => <div key={v} style={{ position: 'absolute', left: 0, right: 0, bottom: `${(v / 16) * 100}%`, borderTop: '1px solid rgba(0,0,0,0.12)' }} />)}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', padding: '0 2%' }}>
            {f.cues.map((cue, ci) => (
              <div key={cue.key} style={{ display: 'flex', gap: '3px', height: '100%', alignItems: 'flex-end', width: '13%' }}>
                {coders.map((counts, k) => (
                  <div key={k} style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column-reverse' }}>
                    {f.cats.map((cat) => {
                      const n = counts[ci][cat.key];
                      if (!n) return null;
                      const node = (
                        <div>
                          <div><b>{cat.label}</b>: {n} of 16 replies · coder {k + 1} · {cue.label}</div>
                          {f.sentences[cue.key] && <div style={{ marginTop: 4 }}>Added sentence: “{f.sentences[cue.key]}”</div>}
                          {ex[cue.key]?.[cat.key] && <div style={{ marginTop: 4, opacity: 0.8 }}>Reply opens: “{ex[cue.key][cat.key]}”</div>}
                        </div>
                      );
                      return (
                        <div key={cat.key} {...mark(show, hide, node)} onMouseEnter={() => setSel(cue.key)} onClick={(e) => { setSel(cue.key); show(e, node); }}
                          style={{ height: `calc(${(n / 16) * 100}% - 2px)`, marginTop: 2, background: CAT[cat.key], outline: cue.key === sel ? '2px solid #000' : 'none', outlineOffset: -2, display: 'flex', alignItems: 'center', justifyContent: 'center', color: cat.key === 'ems_now' ? '#fff' : '#000', fontSize: '0.7rem', cursor: 'default' }}>
                          {n >= 2 ? n : ''}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '4px 2% 0 2.4em', fontSize: '0.7rem', lineHeight: 1.25 }}>
        {f.cues.map((cue) => <span key={cue.key} onClick={() => setSel(cue.key)} style={{ width: '15%', textAlign: 'center', overflowWrap: 'normal', wordBreak: 'keep-all', hyphens: 'none', fontWeight: cue.key === sel ? 'bold' : 'normal', cursor: 'pointer' }}>{cue.label}</span>)}
      </div>
      <div style={legendRow}>
        {f.cats.filter((c) => coders.some((counts) => counts.some((x) => x[c.key] > 0))).map((c) => <Swatch key={c.key} color={CAT[c.key]} label={c.label} />)}
        <span style={{ opacity: 0.6 }}>left bar coder 1, right bar coder 2</span>
      </div>
      <Hint />
      <Tip tip={tip} />
    </div>
  );
}

// Haiku grid: two arms, six sentences, counts of 16 (coder 1 / coder 2)
export function HaikuGrid() {
  const d = useCharts();
  if (!d) return <div style={{ ...wrap, opacity: 0.6 }}>Loading the table.</div>;
  const h = d.haiku;
  const cell = { padding: '7px 6px', borderBottom: '1px solid rgba(0, 0, 0, 0.15)', textAlign: 'center', whiteSpace: 'nowrap' };
  return (
    <div style={{ ...wrap, overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.78rem', lineHeight: 1.4, minWidth: 560 }}>
        <thead>
          <tr>
            <th style={{ ...cell, textAlign: 'left', borderBottom: '1.5px solid #000', fontWeight: 'normal', opacity: 0.6 }}>of 16, coder 1 / coder 2</th>
            {h.cues.map((c) => <th key={c} style={{ ...cell, borderBottom: '1.5px solid #000' }}>{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {Object.entries(h.arms).map(([arm, rows]) => (
            <Fragment key={arm}>
              <tr><td colSpan={h.cues.length + 1} style={{ ...small, padding: '12px 0 4px', textAlign: 'left' }}>{arm === 'emergency' ? 'emergencies' : 'routine complaints'}</td></tr>
              {rows.map((r) => (
                <tr key={r.label}>
                  <td style={{ ...cell, textAlign: 'left', whiteSpace: 'normal' }}>{r.label}</td>
                  {r.values.map((v, i) => <td key={i} style={{ ...cell, fontWeight: v[0] >= 12 ? 'bold' : 'normal', background: v[0] >= 12 ? 'rgba(0,0,0,0.06)' : 'transparent' }}>{v[0] === v[1] ? v[0] : `${v[0]} / ${v[1]}`}</td>)}
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// shared SVG line panel for figure 2
function niceTicks(lo, hi, n = 5) {
  const span = hi - lo;
  const raw = span / n;
  const p = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * p).find((s) => s >= raw);
  const out = [];
  for (let v = Math.ceil(lo / step) * step; v <= hi + 1e-9; v += step) out.push(Math.round(v * 1000) / 1000);
  return out;
}

function LinePanel({ title, steps, series, sentences, question, onTip, onHide }) {
  const W = 320, H = 230, L = 46, R = 12, T = 14, B = 48;
  const all = series.flatMap((s) => s.values.flatMap((v) => [v[1], v[2]])).concat([0]);
  let lo = Math.min(...all), hi = Math.max(...all);
  const pad = (hi - lo) * 0.08 || 0.5;
  lo -= pad; hi += pad;
  const ticks = niceTicks(lo, hi);
  const y = (v) => T + (hi - v) / (hi - lo) * (H - T - B);
  const x = (i) => L + (i / (steps.length - 1)) * (W - L - R);
  const [hover, setHover] = useState(null);
  const svgRef = useRef(null);
  const move = (e) => {
    const r = svgRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width * W;
    const i = Math.max(0, Math.min(steps.length - 1, Math.round((px - L) / ((W - L - R) / (steps.length - 1)))));
    setHover(i);
    onTip(e, (
      <div>
        <div><b>{steps[i]}</b>{sentences?.[i] ? <span> · “{sentences[i]}”</span> : null}</div>
        {question && <div style={{ marginTop: 3 }}>Question after the message: “{question.question}” Read as {question.first} over {question.second}.</div>}
        {series.map((s) => <div key={s.label} style={{ marginTop: 3 }}><Swatch color={s.color} label={`${s.label}: ${fmt(s.values[i][0])}  [${fmt(s.values[i][1])}, ${fmt(s.values[i][2])}]`} /></div>)}
        <div style={{ opacity: 0.6, marginTop: 3 }}>change in log-odds of {question ? question.first : 'the first answer'}, this sentence minus the weather sentence, mean and 95% interval over 16 scenarios</div>
      </div>
    ));
  };
  const leave = () => { setHover(null); onHide(); };
  return (
    <div>
      <div style={{ fontSize: '0.74rem', marginBottom: 2, minHeight: '2.3em' }}>{title}</div>
      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block', fontFamily: 'inherit', cursor: 'crosshair' }} onMouseMove={move} onMouseLeave={leave} onClick={move} tabIndex={0} onBlur={leave}
        onFocus={(e) => { const r = svgRef.current.getBoundingClientRect(); move({ clientX: r.left + r.width * ((L + (W - L - R) * 0.5) / W), clientY: r.top + r.height / 2 }); }}
        onKeyDown={(e) => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { const r = svgRef.current.getBoundingClientRect(); const i = Math.max(0, Math.min(steps.length - 1, (hover ?? 0) + (e.key === 'ArrowRight' ? 1 : -1))); move({ clientX: r.left + r.width * (x(i) / W), clientY: r.top + r.height / 2 }); e.preventDefault(); } if (e.key === 'Escape') leave(); }}>
        {ticks.map((t) => <g key={t}><line x1={L} x2={W - R} y1={y(t)} y2={y(t)} stroke={t === 0 ? '#888' : 'rgba(0,0,0,0.1)'} strokeWidth={1} /><text x={L - 6} y={y(t) + 3.5} fontSize={10} textAnchor="end" fill="#444">{t}</text></g>)}
        <line x1={L} x2={L} y1={T} y2={H - B} stroke="#000" strokeWidth={1} />
        {steps.map((s, i) => <text key={s} x={x(i)} y={H - B + 14} fontSize={11} textAnchor="end" fill="#222" transform={`rotate(-35 ${x(i)} ${H - B + 14})`}>{s}</text>)}
        {series.map((s) => (
          <g key={s.label}>
            <path d={s.values.map((v, i) => `${i ? 'L' : 'M'}${x(i)},${y(v[2])}`).join(' ') + ' ' + [...s.values].reverse().map((v, j) => `L${x(s.values.length - 1 - j)},${y(v[1])}`).join(' ') + ' Z'} fill={s.color} fillOpacity={0.15} stroke="none" />
            <path d={s.values.map((v, i) => `${i ? 'L' : 'M'}${x(i)},${y(v[0])}`).join(' ')} fill="none" stroke={s.color} strokeWidth={2} />
            {s.values.map((v, i) => <circle key={i} cx={x(i)} cy={y(v[0])} r={hover === i ? 5.5 : 4} fill={s.color} stroke="#f5f5dc" strokeWidth={1.5} />)}
          </g>
        ))}
        {hover != null && <line x1={x(hover)} x2={x(hover)} y1={T} y2={H - B} stroke="#000" strokeWidth={1} strokeDasharray="3 3" />}
      </svg>
    </div>
  );
}

function fmt(v) {
  return (v > 0 ? '+' : '') + v.toFixed(2);
}

// Figure 2: dose response
export function Fig2({ src, alt }) {
  const d = useCharts();
  const [model, setModel] = useState('qwen');
  const { ref, tip, show, hide } = useTip();
  if (!d) return <Loading ok={d} src={src} alt={alt} />;
  const f = d.fig2;
  const m = f.models[model];
  return (
    <div style={wrap} ref={ref}>
      <ModelToggle models={d.models} value={model} onChange={setModel} keys={Object.keys(f.models)} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px 16px' }}>
        {Object.keys(f.series).map((s) => f.metrics.map((met) => (
          <LinePanel key={s + met.key} title={`${s}: ${met.label}`} steps={f.series[s]} sentences={f.sentences[s]} question={met} onTip={show} onHide={hide}
            series={[{ label: 'emergency', color: C.orange, values: m[s][met.key].emergency }, { label: 'routine', color: C.blue, values: m[s][met.key].routine }]} />
        )))}
      </div>
      <div style={legendRow}><Swatch color={C.orange} label="emergencies" /><Swatch color={C.blue} label="routine complaints" /><span style={{ opacity: 0.6 }}>bands: 95% intervals</span></div>
      <div style={{ fontSize: '0.76rem', lineHeight: 1.55, marginTop: 10, opacity: 0.85 }}>
        <div style={{ marginBottom: 4 }}>What the y axis is. Each column is one question put to the model after the patient message, answered by its first word:</div>
        {f.metrics.map((m) => <div key={m.key} style={{ marginLeft: 12 }}>“{m.question}” read as {m.first} over {m.second}.</div>)}
        <div style={{ marginTop: 4 }}>
          The y value is the change in log-odds of the first answer when the sentence replaces the weather sentence in
          the same message, averaged over the 16 scenarios in that arm. Zero is no change. About -0.7 halves the odds.
          About +0.7 doubles them.
        </div>
      </div>
      <Hint />
      <Tip tip={tip} />
    </div>
  );
}

// Figure 3: horizontal bars, stance sentences, Qwen
function HBars({ title, cues, values, max, format, baseline, tipFor, selected, onSelect }) {
  const base = baseline != null ? (values[baseline] / max) * 100 : null;
  return (
    <div>
      <div style={{ fontSize: '0.78rem', marginBottom: 8, minHeight: '2.4em' }}>{title}</div>
      {cues.map((c, i) => (
        <div key={c.key} style={{ display: 'grid', gridTemplateColumns: 'minmax(7.5em, 12em) 1fr 4.8em', gap: '8px', alignItems: 'center', marginBottom: 5, fontSize: '0.74rem' }}>
          <span onClick={() => onSelect(c.key)} style={{ textAlign: 'right', fontWeight: c.key === selected ? 'bold' : 'normal', opacity: c.role === 'orange' || c.role === 'blue' || c.key === selected ? 1 : 0.7, cursor: 'pointer' }}>{c.label}</span>
          <div style={{ position: 'relative', height: 16, background: 'rgba(0,0,0,0.06)', outline: c.key === selected ? '2px solid #000' : 'none', outlineOffset: 1 }} tabIndex={0}
            onMouseMove={(e) => tipFor(e, i)} onMouseEnter={() => onSelect(c.key)} onMouseLeave={tipFor.hide} onClick={(e) => { onSelect(c.key); tipFor(e, i); }}
            onFocus={(e) => { onSelect(c.key); const r = e.currentTarget.getBoundingClientRect(); tipFor({ clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 }, i); }} onBlur={tipFor.hide} onKeyDown={(e) => { if (e.key === 'Escape') tipFor.hide(); }}>
            <div style={{ width: `${(values[i] / max) * 100}%`, height: '100%', background: ROLE[c.role], borderRadius: '0 3px 3px 0' }} />
            {base != null && <div style={{ position: 'absolute', top: -3, bottom: -3, left: `${base}%`, borderLeft: '2px dashed #000' }} />}
          </div>
          <span>{format(values[i])}</span>
        </div>
      ))}
    </div>
  );
}

export function Fig3({ src, alt }) {
  const d = useCharts();
  const { ref, tip, show, hide } = useTip();
  const [sel, setSel] = useState('minimize');
  if (!d) return <Loading ok={d} src={src} alt={alt} />;
  const f = d.fig3;
  const selCue = f.cues.find((c) => c.key === sel);
  const counts = f.em.map((v) => Math.round(v * 16));
  const pct = f.ph.map((v) => v * 100);
  const tipEm = (e, i) => {
    const c = f.cues[i];
    const ex = f.examples[c.key];
    show(e, (
      <div>
        <div><b>{c.label}</b>: {counts[i]} of 16 emergency replies open with call 911 (weather sentence: {counts[1]})</div>
        {f.sentences[c.key] && <div style={{ marginTop: 4 }}>Added sentence: “{f.sentences[c.key]}”</div>}
        {ex?.soft && <div style={{ marginTop: 4, opacity: 0.8 }}>A reply that does not open with call 911: “{ex.soft}”</div>}
        {!ex?.soft && ex?.firm && <div style={{ marginTop: 4, opacity: 0.8 }}>A reply: “{ex.firm}”</div>}
      </div>
    ));
  };
  tipEm.hide = hide;
  const tipPh = (e, i) => {
    const c = f.cues[i];
    show(e, (
      <div>
        <div><b>{c.label}</b>: the model starts its reply with a {pct[i].toFixed(0)}% chance of calling the case High urgency (weather sentence: {pct[1].toFixed(0)}%), mean of 16 routine complaints</div>
        {f.sentences[c.key] && <div style={{ marginTop: 4 }}>Added sentence: “{f.sentences[c.key]}”</div>}
      </div>
    ));
  };
  tipPh.hide = hide;
  return (
    <div style={wrap} ref={ref}>
      <p style={{ fontSize: '0.78rem', margin: '0 0 12px', opacity: 0.85 }}>
        The test: the same 16 patient messages, each with one sentence added before the final question. Each row is
        one added sentence. Two rows are controls: no sentence, and a sentence about the weather of the same length.
        The dashed line marks the weather sentence.
      </p>
      <SampleMessage prompt={f.prompts[sel]} sentence={f.sentences[sel]} label={selCue.label} longest={longestOf(f.prompts, f.cues)} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '12px 24px' }}>
        <HBars title="Emergencies: how many of 16 replies open with call 911" cues={f.cues} values={counts} max={16} format={(v) => `${v} / 16`} baseline={1} tipFor={tipEm} selected={sel} onSelect={setSel} />
        <HBars title="Routine complaints: how likely the model is to call the case High urgency" cues={f.cues} values={pct} max={Math.max(...pct) * 1.1} format={(v) => `${v.toFixed(0)}%`} baseline={1} tipFor={tipPh} selected={sel} onSelect={setSel} />
      </div>
      <div style={legendRow}><Swatch color={C.orange} label="a sentence of reluctance" /><Swatch color={C.blue} label="a smoking history, a medical fact for comparison" /><Swatch color={C.dark} label="controls" /><Swatch color={C.black} label="the weather sentence" /></div>
      <Hint />
      <Tip tip={tip} />
    </div>
  );
}

// colour scales for the heat maps
function mix(a, b, t) {
  const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [x, y] = [p(a), p(b)];
  return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * t)).join(',')})`;
}
function diverging(v, max) {
  const t = Math.max(-1, Math.min(1, v / max));
  return t < 0 ? mix('#f7f7f7', '#2166ac', -t) : mix('#f7f7f7', '#b2182b', t);
}
function sequential(v, max) {
  const t = Math.max(0, Math.min(1, v / max));
  return t < 0.5 ? mix('#f7fbff', '#6baed6', t * 2) : mix('#6baed6', '#08306b', (t - 0.5) * 2);
}

// Figure 4: persona heat map
export function Fig4({ src, alt }) {
  const d = useCharts();
  const { ref, tip, show, hide } = useTip();
  if (!d) return <Loading ok={d} src={src} alt={alt} />;
  const f = d.fig4;
  const max = Math.max(...f.M.flat().map(Math.abs));
  return (
    <div style={wrap} ref={ref}>
      <div style={{ display: 'grid', gridTemplateColumns: `minmax(8em, 11em) repeat(${f.cues.length}, 1fr)`, gap: 2, fontSize: '0.74rem' }}>
        <div />
        {f.cues.map((c) => <div key={c} style={{ textAlign: 'center', padding: '0 2px 4px' }}>{c}</div>)}
        {f.questions.map((q, i) => (
          <Fragment key={q}>
            <div style={{ textAlign: 'right', paddingRight: 8, alignSelf: 'center', opacity: 0.85 }}>{q}</div>
            {f.cues.map((c, j) => {
              const v = f.M[i][j];
              const node = (
                <div>
                  <div><b>{q}</b> · {c}: {fmt(v)} log-odds of Yes</div>
                  <div style={{ marginTop: 4 }}>Question put to the model: “{f.questionText[i]}”</div>
                  <div style={{ marginTop: 4 }}>Added sentence: “{f.sentences[j]}”</div>
                  <div style={{ opacity: 0.6, marginTop: 3 }}>shift against the weather sentence, mean of 32 scenarios</div>
                </div>
              );
              return (
                <div key={c} {...mark(show, hide, node)}
                  style={{ background: diverging(v, max), color: Math.abs(v) > 0.6 * max ? '#fff' : '#000', textAlign: 'center', padding: '9px 2px', cursor: 'default' }}>{fmt(v)}</div>
              );
            })}
          </Fragment>
        ))}
      </div>
      <div style={{ ...legendRow, alignItems: 'center' }}>
        <span>−{max.toFixed(1)}</span>
        <span style={{ width: 120, height: 10, background: `linear-gradient(to right, ${diverging(-max, max)}, #f7f7f7, ${diverging(max, max)})`, display: 'inline-block' }} />
        <span>+{max.toFixed(1)}</span>
        <span style={{ opacity: 0.6 }}>shift in log-odds of Yes</span>
      </div>
      <Hint />
      <Tip tip={tip} />
    </div>
  );
}

// Figure 5: the named units against the text bank
export function Fig5({ src, alt }) {
  const d = useCharts();
  const { ref, tip, show, hide } = useTip();
  if (!d) return <Loading ok={d} src={src} alt={alt} />;
  const f = d.fig5;
  const vmax = 3;
  return (
    <div style={wrap} ref={ref}>
      <div style={{ overflowX: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: `15em repeat(${f.cats.length}, minmax(34px, 1fr))`, gridAutoRows: '36px', gap: 2, fontSize: '0.72rem', minWidth: 690, paddingRight: '2.5em' }}>
          <div style={{ gridRow: '1 / span 3' }} />
          {f.cats.map((c) => <div key={c} style={{ gridRow: '1 / span 3', position: 'relative', overflow: 'visible' }}><span style={{ position: 'absolute', left: '50%', bottom: 4, transformOrigin: 'left bottom', transform: 'rotate(-60deg)', whiteSpace: 'nowrap', fontSize: '0.7rem' }}>{c}</span></div>)}
          {f.units.map((u, i) => (
            <Fragment key={u.key}>
              <div style={{ textAlign: 'right', paddingRight: 8, alignSelf: 'center', lineHeight: 1.2, overflow: 'hidden', fontSize: '0.66rem', maxHeight: 36, hyphens: 'none' }}>
                {u.name} <span style={{ opacity: 0.55, whiteSpace: 'nowrap' }}>{u.layer} {u.neuron}</span>
              </div>
              {f.cats.map((c, j) => {
                const v = f.M[i][j];
                const node = (
                  <div>
                    <div><b>{u.name}</b> ({u.layer} {u.neuron}) on {c}: {v.toFixed(1)}× its largest activation on ordinary web text ({u.web})</div>
                    <div style={{ marginTop: 4, opacity: 0.8 }}>Texts that fire it most, with activation:</div>
                    {u.examples.map((x) => <div key={x.text} style={{ marginTop: 2 }}>{x.score} · {x.category} · “{x.text}”</div>)}
                  </div>
                );
                return (
                  <div key={c} {...mark(show, hide, node)}
                    style={{ background: sequential(v, vmax), color: v >= 2.1 ? '#fff' : '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'default' }}>{v >= 0.5 ? v.toFixed(1) : ''}</div>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>
      <div style={{ ...legendRow, alignItems: 'center' }}>
        <span>0</span>
        <span style={{ width: 120, height: 10, background: `linear-gradient(to right, ${sequential(0, vmax)}, ${sequential(1.5, vmax)}, ${sequential(3, vmax)})`, display: 'inline-block' }} />
        <span>3 and above</span>
        <span style={{ opacity: 0.6 }}>mean activation, in multiples of the unit&apos;s largest activation on ordinary web text</span>
      </div>
      <div style={{ fontSize: '0.76rem', lineHeight: 1.55, marginTop: 10, opacity: 0.85 }}>
        <div style={{ marginBottom: 4 }}>What the axes are.</div>
        <div style={{ marginLeft: 12 }}>
          Rows: 16 single neurons inside Qwen3.5-4B, each with its layer and index. The name says what the neuron
          responds to. Each name was tested with paired sentences, one that fires the neuron and one that does not.
        </div>
        <div style={{ marginLeft: 12, marginTop: 3 }}>
          Columns: 13 kinds of text from a bank of 474 test texts fed to the model while every neuron was recorded,
          grouped by what the text is about.
        </div>
        <div style={{ marginLeft: 12, marginTop: 3 }}>
          Cells: how strongly the neuron fired on average on that kind of text, divided by its largest activation on
          ordinary web text. 1.0 is as strong as it ever gets on normal text. 10.5 is ten times that.
        </div>
      </div>
      <Hint />
      <Tip tip={tip} />
    </div>
  );
}

// Figure 6: dot plots with intervals, zeroing the insurance-reading units
function DotPanel({ title, arms, armLabels, groups, values, n, onTip, onHide }) {
  const W = 680, H = 260, L = 50, R = 12, T = 16, B = 34;
  const all = groups.flatMap((g) => arms.map((a) => values[g.key][a])).flatMap((v) => [v[1], v[2]]).concat([0]);
  let lo = Math.min(...all), hi = Math.max(...all);
  const pad = (hi - lo) * 0.08;
  lo -= pad; hi += pad;
  const ticks = niceTicks(lo, hi);
  const y = (v) => T + (hi - v) / (hi - lo) * (H - T - B);
  const slot = (W - L - R) / arms.length;
  const x = (ai, gi) => L + slot * (ai + 0.5) + (gi - (groups.length - 1) / 2) * 22;
  return (
    <div>
      <div style={{ fontSize: '0.74rem', marginBottom: 2, minHeight: '2.3em' }}>{title}</div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block', fontFamily: 'inherit', overflow: 'visible' }}>
        {ticks.map((t) => <g key={t}><line x1={L} x2={W - R} y1={y(t)} y2={y(t)} stroke={t === 0 ? '#888' : 'rgba(0,0,0,0.1)'} /><text x={L - 7} y={y(t) + 4} fontSize={12} textAnchor="end" fill="#444">{t}</text></g>)}
        <line x1={L} x2={L} y1={T} y2={H - B} stroke="#000" />
        {arms.map((a, ai) => <text key={a} x={L + slot * (ai + 0.5)} y={H - B + 20} fontSize={13} textAnchor="middle" fill="#222">{armLabels[a]}</text>)}
        {arms.map((a, ai) => groups.map((g, gi) => {
          const v = values[g.key][a];
          const node = (
            <div>
              <div><b>{g.label}</b> · {armLabels[a]}: {fmt(v[0])}  [{fmt(v[1])}, {fmt(v[2])}]</div>
              <div style={{ marginTop: 4 }}>{g.text}</div>
              <div style={{ opacity: 0.6, marginTop: 3 }}>no-insurance sentence minus weather sentence, paired, mean and 95% interval, {n[a]} scenarios</div>
            </div>
          );
          const color = ROLE[g.role];
          const hollow = g.key === 'random_1';
          return (
            <g key={g.key} tabIndex={0} onMouseMove={(e) => onTip(e, node)} onMouseLeave={onHide} onClick={(e) => onTip(e, node)} onBlur={onHide} onKeyDown={(e) => { if (e.key === 'Escape') onHide(); }}
              onFocus={(e) => { const r = e.currentTarget.getBoundingClientRect(); onTip({ clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 }, node); }} style={{ cursor: 'default' }}>
              <line x1={x(ai, gi)} x2={x(ai, gi)} y1={y(v[1])} y2={y(v[2])} stroke={color} strokeWidth={2} />
              <circle cx={x(ai, gi)} cy={y(v[0])} r={7} fill={hollow ? '#f5f5dc' : color} stroke={hollow ? color : '#f5f5dc'} strokeWidth={hollow ? 2.5 : 1.5} />
              <rect x={x(ai, gi) - 11} y={T} width={22} height={H - T - B} fill="transparent" />
            </g>
          );
        }))}
      </svg>
    </div>
  );
}

export function Fig6({ src, alt }) {
  const d = useCharts();
  const { ref, tip, show, hide } = useTip();
  if (!d) return <Loading ok={d} src={src} alt={alt} />;
  const f = d.fig6;
  const groups = f.groups.map((g) => ({ ...g, text: f.groupText[g.key] }));
  return (
    <div style={wrap} ref={ref}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '18px' }}>
        {f.metrics.map((m) => <DotPanel key={m.key} title={m.label} arms={f.arms} armLabels={f.armLabels} groups={groups} values={f.values[m.key]} n={f.n} onTip={show} onHide={hide} />)}
      </div>
      <div style={legendRow}>
        <Swatch color={C.black} label="no ablation" /><Swatch color={C.orange} label="20 units zeroed" /><Swatch color={C.dark} label="random set 0 (filled)" /><Swatch color="#f5f5dc" label="random set 1 (hollow)" />
        <span style={{ opacity: 0.6 }}>vertical lines: 95% intervals</span>
      </div>
      <Hint />
      <Tip tip={tip} />
    </div>
  );
}

// Figure 7: the gated circumstance-direction fix and its controls
const COND = {
  none: { label: 'No change', color: C.black, filled: true, text: 'The model as shipped.' },
  full_direction: { label: 'Direction removed, all prompts', color: C.blue, filled: false, text: 'The money direction is projected out of the model’s working memory at this layer and every later one, on every prompt.' },
  gated_full: { label: 'Direction removed, gated', color: C.blue, filled: true, text: 'The same removal, only when the gate says the model has read a money sentence.' },
  subspace: { label: 'Urgency part removed, all prompts', color: C.orange, filled: false, text: 'Only the part of the money direction that lies inside the model’s urgency subspace is projected out, on every prompt.' },
  gated_subspace: { label: 'Urgency part removed, gated', color: C.orange, filled: true, text: 'The same removal, only when the gate opens. At layer 12 this removes the emergency signal itself.' },
  gated_shift_d: { label: 'Counter-shift, direction, gated', color: C.green, filled: true, text: 'When the gate opens, the average displacement the money sentence causes is subtracted at this layer, at the reply opener and at every token the model writes. The layer-20 fix.' },
  gated_shift_u: { label: 'Counter-shift, urgency part, gated', color: '#66c2a5', filled: true, text: 'The same counter-shift, with only the part inside the urgency subspace. The layer-12 fix.' },
  random: { label: 'Random direction, all prompts', color: C.dark, filled: false, text: 'A random unit vector projected out of the same layers. The control.' },
};
const ARM7 = { emergency: 'Emergencies', urgent: 'Same-day cases', routine: 'Routine complaints' };
const CUE7 = { uninsured: 'no insurance, money tight', distance: 'hospital 90 minutes away', clinic_closed: 'clinic closed until Monday', no_transport: 'no ride tonight' };
const VIEWS7 = [
  { key: 'shift', label: 'Money prompts: what survives', note: 'Each mark is the shift the money sentence still causes under that condition: money sentence minus weather sentence, paired, 16 scenarios per arm. The dashed line is the shift with no change. A mark on zero means the fix landed the money prompt on the weather prompt’s answer.' },
  { key: 'drift', label: 'Prompts with no money sentence', note: 'What each condition does to prompts the fix must leave alone: the condition minus no change on the same prompt, 32 prompts per arm (no sentence, and the weather sentence). A mark on zero means the condition did not touch them.' },
  { key: 'main', label: 'Other sentences, main set', note: 'The gated counter-shift was built from the money sentence. These marks are the shift each of four sentences causes on the main set before (black, hollow) and after (green) the fix. The fix does not reach the other three barriers.' },
];
const MAIN7 = [{ key: 'none', color: C.black, filled: false, label: 'before the fix' }, { key: 'gated_shift_d', color: C.green, filled: true, label: 'after the fix, full direction' }, { key: 'gated_shift_u', color: '#66c2a5', filled: true, label: 'after the fix, urgency part' }];
const strip7 = { width: '100%', height: 30, display: 'block', overflow: 'visible' };
const labelCell7 = { fontSize: '0.74rem', lineHeight: 1.2, display: 'flex', alignItems: 'center', gap: 7, minHeight: 30, paddingRight: 6 };

function Mark7({ x, y = 15, r = 6, color, filled, tip, onTip, onHide }) {
  return (
    <g {...mark(onTip, onHide, tip)} style={{ cursor: 'default' }}>
      <line x1={`${x[1]}%`} x2={`${x[2]}%`} y1={y} y2={y} stroke={color} strokeWidth={2} />
      <circle cx={`${x[0]}%`} cy={y} r={r} fill={filled ? color : '#f5f5dc'} stroke={filled ? '#f5f5dc' : color} strokeWidth={filled ? 1.5 : 2.5} />
      <rect x={`${Math.max(0, x[1] - 2)}%`} y={y - 8} width={`${Math.min(100, x[2] + 2) - Math.max(0, x[1] - 2)}%`} height={16} fill="transparent" />
    </g>
  );
}

export function Fig7({ src, alt }) {
  const d = useCharts();
  const { ref, tip, show, hide } = useTip();
  const [layer, setLayer] = useState('20');
  const [metric, setMetric] = useState('lo_yes');
  const [view, setView] = useState('shift');
  if (!d) return <Loading ok={d} src={src} alt={alt} />;
  const f = d.fig7;
  const metricLabel = f.metrics.find((m) => m.key === metric).label;
  const arms = view === 'main' ? f.main.arms : f.arms;
  let rows;
  if (view === 'shift') rows = f.conds.map((c) => ({ key: c, label: COND[c].label, swatch: COND[c], marks: arms.map((a) => ({ ...COND[c], key: c, arm: a, v: f.shift[layer][metric][c][a], ref: f.shift[layer][metric].none[a][0] })) }));
  else if (view === 'drift') rows = f.conds.filter((c) => c !== 'none').map((c) => ({ key: c, label: COND[c].label, swatch: COND[c], marks: arms.map((a) => ({ ...COND[c], key: c, arm: a, v: f.drift[layer][metric][c][a], ref: 0 })) }));
  else rows = f.mainCues.map((cue) => ({ key: cue, label: CUE7[cue] || cue, marks: arms.flatMap((a) => MAIN7.map((m) => ({ ...m, arm: a, v: f.main[layer][metric][m.key][cue][a], ref: 0, text: `${m.label}: this sentence minus the weather sentence, paired, 16 scenarios` }))) }));
  const all = rows.flatMap((r) => r.marks.flatMap((m) => [m.v[1], m.v[2], m.ref]));
  let lo = Math.min(...all), hi = Math.max(...all);
  const pad = (hi - lo) * 0.06;
  lo -= pad; hi += pad;
  const X = (v) => Math.round((v - lo) / (hi - lo) * 1000) / 10;
  const ticks = niceTicks(lo, hi, 4);
  const g = f.gate[layer];
  const pct = (v) => Math.round(v * 100);
  const cols = `minmax(10em, 13em) repeat(${arms.length}, minmax(0, 1fr))`;
  const viewNote = VIEWS7.find((v) => v.key === view).note;
  return (
    <div style={wrap} ref={ref}>
      <div style={row}><span style={small}>Layer</span>{f.layers.map((l) => <button key={l} type="button" aria-pressed={l === layer} style={chip(l === layer)} onClick={() => setLayer(l)}>{l}</button>)}</div>
      <div style={row}><span style={small}>Readout</span>{f.metrics.map((m) => <button key={m.key} type="button" aria-pressed={m.key === metric} style={chip(m.key === metric)} onClick={() => setMetric(m.key)}>{m.label}</button>)}</div>
      <div style={row}><span style={small}>Prompts</span>{VIEWS7.map((v) => <button key={v.key} type="button" aria-pressed={v.key === view} style={chip(v.key === view)} onClick={() => setView(v.key)}>{v.label}</button>)}</div>
      <p style={{ fontSize: '0.76rem', margin: '4px 0 10px', opacity: 0.85 }}>{viewNote}</p>
      <div style={{ overflowX: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: cols, columnGap: 26, minWidth: 540, alignItems: 'center' }}>
          <div />
          {arms.map((a) => <div key={a} style={{ fontSize: '0.74rem', textAlign: 'center', fontWeight: 'bold', paddingBottom: 4 }}>{ARM7[a]}</div>)}
          {rows.map((r) => (
            <Fragment key={r.key}>
              <div style={labelCell7}>
                {r.swatch && <span style={{ width: 11, height: 11, borderRadius: '50%', flex: 'none', background: r.swatch.filled ? r.swatch.color : '#f5f5dc', border: r.swatch.filled ? 'none' : `2.5px solid ${r.swatch.color}`, boxSizing: 'border-box' }} />}
                <span>{r.label}</span>
              </div>
              {arms.map((a) => (
                <svg key={a} style={strip7} aria-label={`${r.label}, ${ARM7[a]}`}>
                  <line x1="0%" x2="100%" y1={15} y2={15} stroke="rgba(0,0,0,0.08)" />
                  {ticks.map((t) => <line key={t} x1={`${X(t)}%`} x2={`${X(t)}%`} y1={0} y2={30} stroke={t === 0 ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.08)'} />)}
                  {r.marks.filter((m) => m.arm === a).map((m, i, list) => {
                    const refX = X(m.ref);
                    const node = (
                      <div>
                        <div><b>{view === 'main' ? m.label : COND[m.key].label}</b> · {ARM7[a]}: {fmt(m.v[0])}  [{fmt(m.v[1])}, {fmt(m.v[2])}]</div>
                        <div style={{ marginTop: 4 }}>{m.text}</div>
                        <div style={{ opacity: 0.6, marginTop: 3 }}>{metricLabel}, log-odds, layer {layer}{view === 'shift' && m.key !== 'none' ? `; with no change: ${fmt(m.ref)}` : ''}</div>
                      </div>
                    );
                    return (
                      <Fragment key={m.key}>
                        {i === 0 && view === 'shift' && m.key !== 'none' && <line x1={`${refX}%`} x2={`${refX}%`} y1={2} y2={28} stroke="#000" strokeDasharray="3 3" />}
                        <Mark7 x={[X(m.v[0]), X(m.v[1]), X(m.v[2])]} y={15 + (i - (list.length - 1) / 2) * 9} r={list.length > 1 ? 4.5 : 6} color={m.color} filled={m.filled} tip={node} onTip={show} onHide={hide} />
                      </Fragment>
                    );
                  })}
                </svg>
              ))}
            </Fragment>
          ))}
          <div />
          {arms.map((a) => (
            <svg key={a} style={{ ...strip7, height: 18 }}>
              {ticks.map((t) => <text key={t} x={`${X(t)}%`} y={13} fontSize={11} textAnchor="middle" fill="#444">{t}</text>)}
            </svg>
          ))}
        </div>
      </div>
      <div style={legendRow}>
        <span>{metricLabel}, log-odds. Horizontal lines: 95% intervals.</span>
        {view === 'shift' && <span>Dashed line: the shift with no change.</span>}
        {view !== 'main' && <span>Hollow: applied to every prompt. Filled: only when the gate opens.</span>}
        {view === 'main' && MAIN7.map((m) => <Swatch key={m.key} color={m.filled ? m.color : '#f5f5dc'} label={m.label} />)}
      </div>
      <div style={{ ...hint, opacity: 0.8 }}>
        Gate open at layer {layer}: money prompts {pct(g.emergency.uninsured)} / {pct(g.urgent.uninsured)} / {pct(g.routine.uninsured)} percent (emergency / same-day / routine); prompts without one {pct(g.emergency.none)} / {pct(g.urgent.none)} / {pct(g.routine.none)} percent.
      </div>
      <Hint />
      <Tip tip={tip} />
    </div>
  );
}
