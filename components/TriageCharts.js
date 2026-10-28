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
        bar to change it. We made the same swap in all 16 messages.
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
                          <div><b>{cat.label}</b>: {n} of 16 replies · reader {k + 1} · {cue.label}</div>
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
        <span style={{ opacity: 0.6 }}>left bar reader 1, right bar reader 2</span>
      </div>
      <Hint />
      <Tip tip={tip} />
    </div>
  );
}

// Haiku grid: two arms, six sentences, counts of 16 (reader 1 / reader 2)
export function HaikuGrid() {
  const d = useCharts();
  if (!d) return <div style={{ ...wrap, opacity: 0.6 }}>Loading the table.</div>;
  const h = d.haiku;
  const cell = { padding: '7px 6px', borderBottom: '1px solid rgba(0, 0, 0, 0.15)', textAlign: 'center', whiteSpace: 'nowrap' };
  return (
    <div className="scrollX" style={{ ...wrap, overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.78rem', lineHeight: 1.4, minWidth: 560 }}>
        <thead>
          <tr>
            <th style={{ ...cell, textAlign: 'left', borderBottom: '1.5px solid #000', fontWeight: 'normal', opacity: 0.6 }}>of 16, reader 1 / reader 2</th>
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
        <div style={{ marginBottom: 4 }}>What the y axis is. Each column is one question that we ask the model after the patient message. The model answers with its first word:</div>
        {f.metrics.map((m) => <div key={m.key} style={{ marginLeft: 12 }}>“{m.question}” read as {m.first} over {m.second}.</div>)}
        <div style={{ marginTop: 4 }}>
          The y value is the change in log-odds of the first answer when the sentence replaces the weather sentence in
          the same message. It is the mean over the 16 scenarios in that group of cases. Zero is no change. About -0.7 halves the odds.
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
        <div><b>{c.label}</b>: after a fixed opening, the next word is High with a {pct[i].toFixed(0)}% chance (weather sentence: {pct[1].toFixed(0)}%), mean of 16 routine complaints</div>
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
        <HBars title="Routine complaints: chance that the first word of the reply is High urgency" cues={f.cues} values={pct} max={Math.max(...pct) * 1.1} format={(v) => `${v.toFixed(0)}%`} baseline={1} tipFor={tipPh} selected={sel} onSelect={setSel} />
      </div>
      <div style={legendRow}><Swatch color={C.orange} label="a sentence of reluctance" /><Swatch color={C.blue} label="a fact about past smoking, for comparison" /><Swatch color={C.dark} label="controls" /><Swatch color={C.black} label="the weather sentence" /></div>
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
                  <div style={{ opacity: 0.6, marginTop: 3 }}>change against the weather sentence, mean of 32 scenarios</div>
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
        <span style={{ opacity: 0.6 }}>change in log-odds of Yes</span>
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
      <div className="scrollX" style={{ overflowX: 'auto' }}>
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
                    <div><b>{u.name}</b> ({u.layer} {u.neuron}) on {c}: {v.toFixed(1)}× its largest activity on ordinary web text ({u.web})</div>
                    <div style={{ marginTop: 4, opacity: 0.8 }}>Texts that fire it most, with their activity:</div>
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
        <span style={{ opacity: 0.6 }}>mean activity, in multiples of the unit&apos;s largest activity on ordinary web text</span>
      </div>
      <div style={{ fontSize: '0.76rem', lineHeight: 1.55, marginTop: 10, opacity: 0.85 }}>
        <div style={{ marginBottom: 4 }}>What the axes are.</div>
        <div style={{ marginLeft: 12 }}>
          Rows: 16 single units (neurons) inside Qwen3.5-4B, each with its layer and unit number. The name says what the
          unit responds to. We tested each name with paired sentences, one that fires the unit and one that does not.
        </div>
        <div style={{ marginLeft: 12, marginTop: 3 }}>
          Columns: 13 kinds of text from a bank of 474 test texts, grouped by what the text is about. We fed the texts
          to the model and recorded every unit.
        </div>
        <div style={{ marginLeft: 12, marginTop: 3 }}>
          Cells: how strongly the unit fired on average on that kind of text, divided by its largest activity on
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
        <Swatch color={C.black} label="no units switched off" /><Swatch color={C.orange} label="20 units switched off" /><Swatch color={C.dark} label="random set A (filled)" /><Swatch color="#f5f5dc" label="random set B (hollow)" />
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
  full_direction: { label: 'Direction removed, all messages', color: C.blue, filled: false, text: 'We remove the no-insurance direction from the model’s internal state at this layer and every later one, on every message.' },
  gated_full: { label: 'Direction removed, with the switch', color: C.blue, filled: true, text: 'The same removal, only when the switch says the model has read a no-insurance sentence.' },
  subspace: { label: 'Urgency part removed, all messages', color: C.orange, filled: false, text: 'We remove only the part of the no-insurance direction that lies inside the model’s urgency subspace, on every message.' },
  gated_subspace: { label: 'Urgency part removed, with the switch', color: C.orange, filled: true, text: 'The same removal, only when the switch is on. At layer 12 this removes the emergency signal itself.' },
  gated_shift_d: { label: 'Subtract the push, full direction, with the switch', color: C.green, filled: true, text: 'When the switch is on, the fix subtracts the average push that the no-insurance sentence causes. It subtracts at this layer, at the start of the reply, and at every word the model writes. The layer-20 fix.' },
  gated_shift_u: { label: 'Subtract the push, urgency part, with the switch', color: '#66c2a5', filled: true, text: 'The same subtraction, with only the part inside the urgency subspace. The layer-12 fix.' },
  random: { label: 'Random direction, all messages', color: C.dark, filled: false, text: 'A random direction removed from the same layers. The control.' },
};
const ARM7 = { emergency: 'Emergencies', urgent: 'Same-day cases', routine: 'Routine complaints' };
const CUE7 = { uninsured: 'no insurance', distance: 'hospital 90 minutes away', clinic_closed: 'clinic closed until Monday', no_transport: 'no ride tonight' };
const VIEWS7 = [
  { key: 'shift', label: 'No-insurance messages: what survives', note: 'Each mark is the change that the no-insurance sentence still causes under that condition. It is the no-insurance sentence minus the weather sentence, paired, over 16 scenarios per group of cases. The dashed line is the change with no fix. A mark on zero means the fix landed the no-insurance message on the weather message’s answer.' },
  { key: 'drift', label: 'Messages with no such sentence', note: 'This view shows what each condition does to messages that the fix must leave alone. Each value is the condition minus no fix on the same message, over 32 messages per group of cases (no extra sentence, and the weather sentence). A mark on zero means the condition did not touch them.' },
  { key: 'main', label: 'Other sentences, main set', note: 'We built the fix with the switch from the no-insurance sentence. These marks are the change each of four sentences causes on the main set before (black, hollow) and after (green) the fix. The fix does not repair the other three sentences.' },
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
      <div style={row}><span style={small}>Model&apos;s answer</span>{f.metrics.map((m) => <button key={m.key} type="button" aria-pressed={m.key === metric} style={chip(m.key === metric)} onClick={() => setMetric(m.key)}>{m.label}</button>)}</div>
      <div style={row}><span style={small}>Messages</span>{VIEWS7.map((v) => <button key={v.key} type="button" aria-pressed={v.key === view} style={chip(v.key === view)} onClick={() => setView(v.key)}>{v.label}</button>)}</div>
      <p style={{ fontSize: '0.76rem', margin: '4px 0 10px', opacity: 0.85 }}>{viewNote}</p>
      <div className="scrollX" style={{ overflowX: 'auto' }}>
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
        {view === 'shift' && <span>Dashed line: the change with no fix.</span>}
        {view !== 'main' && <span>Black: no fix. Hollow: applied to every message. Filled: only when the switch is on.</span>}
        {view === 'main' && MAIN7.map((m) => <Swatch key={m.key} color={m.filled ? m.color : '#f5f5dc'} label={m.label} />)}
      </div>
      <div style={{ ...hint, opacity: 0.8 }}>
        Switch on at layer {layer}: no-insurance messages {pct(g.emergency.uninsured)} / {pct(g.urgent.uninsured)} / {pct(g.routine.uninsured)} percent (emergency / same-day / routine); messages without one {pct(g.emergency.none)} / {pct(g.urgent.none)} / {pct(g.routine.none)} percent.
      </div>
      <Hint />
      <Tip tip={tip} />
    </div>
  );
}

// Figure 8: the family-by-arm map, 25 families of life facts against matched weather sentences
const ARM8 = { emergency: 'Emergencies', urgent: 'Same-day cases', routine: 'Routine complaints' };
const ARM8_SHORT = { emergency: 'Emergency', urgent: 'Same-day', routine: 'Routine' };
const GROUP8 = { circumstance: C.black, raise: C.green, identity: C.orange, anchor: C.blue };
const GROUP8_LABEL = { circumstance: 'circumstance', raise: 'should raise the advice', identity: 'identity only', anchor: 'the no-insurance sentence' };

function Sentences8({ fam }) {
  return fam.sentences.map((s) => (
    <div key={s.cue} style={{ marginTop: 4 }}>
      <div>“{s.cue}”</div>
      <div style={{ opacity: 0.6 }}>against “{s.filler}” ({s.tokens} word pieces each)</div>
    </div>
  ));
}

function GroupDots8() {
  return (
    <div style={legendRow}>
      {Object.keys(GROUP8).map((g) => (
        <span key={g} style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 8, height: 8, borderRadius: 4, background: GROUP8[g], display: 'inline-block' }} />{GROUP8_LABEL[g]}
        </span>
      ))}
    </div>
  );
}

export function Fig8({ src, alt }) {
  const d = useCharts();
  const { ref, tip, show, hide } = useTip();
  const [readout, setReadout] = useState('ems2');
  if (!d) return <Loading ok={d} src={src} alt={alt} />;
  const f = d.fig8;
  const label = f.readouts.find((r) => r.key === readout).label;
  const max = Math.max(...f.families.flatMap((fam) => f.arms.map((a) => Math.abs(f.map[readout][fam.key][a][0]))));
  return (
    <div style={wrap} ref={ref}>
      <div style={row}>
        <span style={small}>Model&apos;s answer</span>
        {f.readouts.map((r) => <button key={r.key} type="button" aria-pressed={r.key === readout} style={chip(r.key === readout)} onClick={() => setReadout(r.key)}>{r.label}</button>)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `minmax(9em, 14em) repeat(${f.arms.length}, minmax(0, 1fr))`, gap: 2, fontSize: '0.72rem' }}>
        <div />
        {f.arms.map((a) => <div key={a} style={{ textAlign: 'center', padding: '0 2px 4px', lineHeight: 1.2 }}>{ARM8_SHORT[a]}</div>)}
        {f.families.map((fam) => (
          <Fragment key={fam.key}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingRight: 6, lineHeight: 1.15, hyphens: 'none', fontWeight: fam.group === 'anchor' ? 'bold' : 'normal' }}>
              <span style={{ width: 8, height: 8, borderRadius: 4, background: GROUP8[fam.group], flex: 'none' }} />
              <span>{fam.label}</span>
            </div>
            {f.arms.map((a) => {
              const [v, lo, hi] = f.map[readout][fam.key][a];
              const node = (
                <div>
                  <div><b>{fam.label}</b> · {fam.groupLabel} · {ARM8[a].toLowerCase()}</div>
                  <div style={{ marginTop: 3 }}>{label}: {fmt(v)} log-odds [{fmt(lo)}, {fmt(hi)}], {fam.pairs} paired messages</div>
                  <Sentences8 fam={fam} />
                </div>
              );
              return (
                <div key={a} {...mark(show, hide, node)}
                  style={{ background: diverging(v, max), color: Math.abs(v) > 0.6 * max ? '#fff' : '#000', textAlign: 'center', padding: '6px 2px', cursor: 'default' }}>{fmt(v)}</div>
              );
            })}
          </Fragment>
        ))}
      </div>
      <div style={{ ...legendRow, alignItems: 'center' }}>
        <span>−{max.toFixed(1)}</span>
        <span style={{ width: 120, height: 10, background: `linear-gradient(to right, ${diverging(-max, max)}, #f7f7f7, ${diverging(max, max)})`, display: 'inline-block' }} />
        <span>+{max.toFixed(1)}</span>
        <span style={{ opacity: 0.6 }}>{label}, change in log-odds. Red: more likely to give that answer. Blue: less likely.</span>
      </div>
      <GroupDots8 />
      <div style={{ fontSize: '0.76rem', lineHeight: 1.55, marginTop: 10, opacity: 0.85 }}>
        <div style={{ marginBottom: 4 }}>What the axes are.</div>
        <div style={{ marginLeft: 12 }}>
          Rows: 25 families of sentences about the patient&apos;s life, in the order of the routine &quot;call 911&quot;
          change, largest first. Fifteen circumstance families have two sentences each; the others have one.
        </div>
        <div style={{ marginLeft: 12, marginTop: 3 }}>Columns: the three groups of 16 cases, by how sick the patient is.</div>
        <div style={{ marginLeft: 12, marginTop: 3 }}>
          Cells: the model&apos;s lean with the sentence minus its lean with a weather sentence of the same length at the
          same place in the message, paired over the scenarios of that group.
        </div>
      </div>
      <Hint />
      <Tip tip={tip} />
    </div>
  );
}

// Table 5: ten families from the map, four readings each
export function BreadthTable({ keys }) {
  const d = useCharts();
  if (!d) return <div style={{ ...wrap, opacity: 0.6 }}>Loading the table.</div>;
  const f = d.fig8;
  const byKey = Object.fromEntries(f.families.map((x) => [x.key, x]));
  const cols = [['ems2', 'routine', 'routine, call 911'], ['urgency2', 'routine', "routine, lean toward 'High' urgency"], ['ems2', 'emergency', 'emergency, call 911'], ['ride2', 'emergency', "emergency, 'Ambulance' over driving"]];
  const cell = { padding: '7px 6px', borderBottom: '1px solid rgba(0, 0, 0, 0.15)', textAlign: 'center', whiteSpace: 'nowrap', verticalAlign: 'top' };
  return (
    <div className="scrollX" style={{ ...wrap, overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.78rem', lineHeight: 1.4, minWidth: 560 }}>
        <thead>
          <tr>
            <th style={{ ...cell, textAlign: 'left', borderBottom: '1.5px solid #000', fontWeight: 'normal', opacity: 0.6 }}>change, log-odds [95% interval]</th>
            {cols.map((c) => <th key={c[2]} style={{ ...cell, borderBottom: '1.5px solid #000', whiteSpace: 'normal', fontWeight: 'normal' }}>{c[2]}</th>)}
          </tr>
        </thead>
        <tbody>
          {keys.map((k) => {
            const fam = byKey[k];
            return (
              <tr key={k}>
                <td style={{ ...cell, textAlign: 'left', whiteSpace: 'normal', fontWeight: fam.group === 'anchor' ? 'bold' : 'normal' }}>
                  <span style={{ width: 8, height: 8, borderRadius: 4, background: GROUP8[fam.group], display: 'inline-block', marginRight: 6 }} />{fam.label}
                </td>
                {cols.map((c) => {
                  const [v, lo, hi] = f.map[c[0]][k][c[1]];
                  const off = lo > 0 || hi < 0;
                  return (
                    <td key={c[2]} style={{ ...cell, fontWeight: off && Math.abs(v) >= 1 ? 'bold' : 'normal' }}>
                      {fmt(v)}
                      <div style={{ fontSize: '0.68rem', opacity: 0.55 }}>[{fmt(lo)}, {fmt(hi)}]</div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <GroupDots8 />
    </div>
  );
}

// Figure 9: the direction atlas, each family's direction against the money direction, and between families
function Bar9({ top, width, color }) {
  return <div style={{ position: 'absolute', left: 0, top, height: 6, width: `${Math.max(0, width) * 100}%`, background: color }} />;
}

export function Fig9({ src, alt }) {
  const d = useCharts();
  const { ref, tip, show, hide } = useTip();
  const [layer, setLayer] = useState('20');
  const [view, setView] = useState('money');
  if (!d) return <Loading ok={d} src={src} alt={alt} />;
  const f = d.fig8;
  const fams = [...f.families].sort((a, b) => f.atlas[b.key][layer].cos - f.atlas[a.key][layer].cos);
  const idx = Object.fromEntries(f.cosine[layer].families.map((k, i) => [k, i]));
  const M = f.cosine[layer].matrix;
  const track = { position: 'relative', height: 18, alignSelf: 'center', background: 'linear-gradient(to right, rgba(0,0,0,0.15) 1px, transparent 1px) 0 0 / 50% 100% repeat-x', borderRight: '1px solid rgba(0,0,0,0.15)', cursor: 'default' };
  return (
    <div style={wrap} ref={ref}>
      <div style={row}>
        <span style={small}>View</span>
        <button type="button" aria-pressed={view === 'money'} style={chip(view === 'money')} onClick={() => setView('money')}>Against the no-insurance direction</button>
        <button type="button" aria-pressed={view === 'between'} style={chip(view === 'between')} onClick={() => setView('between')}>Between families</button>
        <span style={{ ...small, marginLeft: 8 }}>Layer</span>
        {f.layers.map((L) => <button key={L} type="button" aria-pressed={L === layer} style={chip(L === layer)} onClick={() => setLayer(L)}>{L}</button>)}
      </div>
      {view === 'money' ? (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(7.5em, 14em) minmax(0, 1fr) 3.8em 3.8em', gap: '3px 8px', fontSize: '0.72rem' }}>
            <div />
            <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.6 }}><span>0</span><span>0.5</span><span>1</span></div>
            <div style={{ textAlign: 'right', color: C.blue }}>cosine</div>
            <div style={{ textAlign: 'right', color: C.orange }}>part</div>
            {fams.map((fam) => {
              const a = f.atlas[fam.key][layer];
              const node = (
                <div>
                  <div><b>{fam.label}</b> · {fam.groupLabel} · layer {layer}</div>
                  <div style={{ marginTop: 3 }}>cosine with the no-insurance direction {a.cos.toFixed(2)}; part inside the urgency subspace {a.part.toFixed(2)}; length {a.norm.toFixed(2)}</div>
                  <Sentences8 fam={fam} />
                </div>
              );
              return (
                <Fragment key={fam.key}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingRight: 2, lineHeight: 1.15, hyphens: 'none', fontWeight: fam.group === 'anchor' ? 'bold' : 'normal' }}>
                    <span style={{ width: 8, height: 8, borderRadius: 4, background: GROUP8[fam.group], flex: 'none' }} />
                    <span>{fam.label}</span>
                  </div>
                  <div style={track} {...mark(show, hide, node)}>
                    <Bar9 top={2} width={a.cos} color={C.blue} />
                    <Bar9 top={10} width={a.part} color={C.orange} />
                  </div>
                  <div style={{ textAlign: 'right', alignSelf: 'center' }}>{a.cos.toFixed(2)}</div>
                  <div style={{ textAlign: 'right', alignSelf: 'center' }}>{a.part.toFixed(2)}</div>
                </Fragment>
              );
            })}
          </div>
          <div style={legendRow}>
            <Swatch color={C.blue} label="cosine with the no-insurance direction: 1 is the same direction, 0 is at right angles" />
            <Swatch color={C.orange} label="part of the direction's length inside the urgency subspace (the directions the model uses to rate urgency)" />
          </div>
          <GroupDots8 />
          <div style={{ fontSize: '0.76rem', lineHeight: 1.55, marginTop: 10, opacity: 0.85 }}>
            <div style={{ marginBottom: 4 }}>What the bars are.</div>
            <div style={{ marginLeft: 12 }}>
              Each family&apos;s direction is the average difference that its sentence makes to the model&apos;s internal
              state at the start of the reply. We compare it with its matched weather sentence, over 48 scenarios.
            </div>
            <div style={{ marginLeft: 12, marginTop: 3 }}>
              Rows are in the order of the cosine at the chosen layer. The no-insurance sentence sits at 1 by definition.
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="scrollX" style={{ overflowX: 'auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: `12em repeat(${f.families.length}, minmax(18px, 1fr))`, gridAutoRows: '18px', gap: 1, fontSize: '0.64rem', minWidth: 600, paddingRight: '2.5em' }}>
              <div style={{ gridRow: '1 / span 6' }} />
              {f.families.map((fam) => <div key={fam.key} style={{ gridRow: '1 / span 6', position: 'relative', overflow: 'visible' }}><span style={{ position: 'absolute', left: '50%', bottom: 2, transformOrigin: 'left bottom', transform: 'rotate(-60deg)', whiteSpace: 'nowrap' }}>{fam.label}</span></div>)}
              {f.families.map((a) => (
                <Fragment key={a.key}>
                  <div style={{ textAlign: 'right', paddingRight: 6, alignSelf: 'center', whiteSpace: 'nowrap' }}>{a.label}</div>
                  {f.families.map((b) => {
                    const v = M[idx[a.key]][idx[b.key]];
                    const node = <div><b>{a.label}</b> and <b>{b.label}</b>, layer {layer}: cosine {v.toFixed(2)}</div>;
                    return <div key={b.key} {...mark(show, hide, node)} style={{ background: sequential(v, 1), cursor: 'default' }} />;
                  })}
                </Fragment>
              ))}
            </div>
          </div>
          <div style={{ ...legendRow, alignItems: 'center' }}>
            <span>0</span>
            <span style={{ width: 120, height: 10, background: `linear-gradient(to right, ${sequential(0, 1)}, ${sequential(0.5, 1)}, ${sequential(1, 1)})`, display: 'inline-block' }} />
            <span>1</span>
            <span style={{ opacity: 0.6 }}>cosine between the two family directions at layer {layer}; median {f.medianCos[layer].toFixed(2)}</span>
          </div>
        </>
      )}
      <Hint />
      <Tip tip={tip} />
    </div>
  );
}

// Figure 10: the same sentence in three places
const POS10 = { before: { label: 'Before the question', short: 'before the question', color: C.blue }, start: { label: 'First sentence', short: 'first sentence of the message', color: C.orange }, prior: { label: 'Earlier chat turn, acknowledged', short: 'an earlier turn, acknowledged', color: C.green } };
const ARM10 = { emergency: 'Emergencies', routine: 'Routine complaints' };
const AGAINST10 = [{ key: 'filler', label: 'the weather sentence in the same place' }, { key: 'none', label: 'the message with no added sentence' }];
const miniBubble = { padding: '7px 10px', background: '#e6e6d2', border: '1px solid rgba(0, 0, 0, 0.25)', borderRadius: '12px 12px 3px 12px', fontSize: '0.7rem', lineHeight: 1.45, hyphens: 'none', marginBottom: 5 };
const miniReply = { ...miniBubble, background: '#ffffff', borderRadius: '12px 12px 12px 3px' };

function Positions10({ s, cue }) {
  const sent = s.sentences[cue];
  const hl = <span style={inserted}>{sent}</span>;
  const head = (k) => <div style={{ ...who, color: POS10[k].color, opacity: 1, marginBottom: 6 }}><span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 4, background: POS10[k].color, marginRight: 6 }} />{POS10[k].label}</div>;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '10px 14px', marginBottom: 12 }}>
      <div>{head('before')}<div style={miniBubble}>{s.body} {hl} {s.question}</div></div>
      <div>{head('start')}<div style={miniBubble}>{hl} {s.body} {s.question}</div></div>
      <div>{head('prior')}<div style={miniBubble}>{hl}</div><div style={miniReply}>{s.ack}</div><div style={miniBubble}>{s.body} {s.question}</div></div>
    </div>
  );
}

export function Fig10({ src, alt }) {
  const d = useCharts();
  const { ref, tip, show, hide } = useTip();
  const [readout, setReadout] = useState('ems2');
  const [against, setAgainst] = useState('filler');
  const [cue, setCue] = useState('no_transport');
  if (!d) return <Loading ok={d} src={src} alt={alt} />;
  const f = d.fig10;
  const label = f.readouts.find((r) => r.key === readout).label;
  const table = f[against][readout];
  const cues = against === 'none' ? ['filler', ...f.cues] : f.cues;
  const all = cues.flatMap((c) => f.arms.flatMap((a) => f.positions.flatMap((p) => table[a][c][p.key].slice(1))));
  let lo = Math.min(0, ...all), hi = Math.max(0, ...all);
  const pad = (hi - lo) * 0.06;
  lo -= pad; hi += pad;
  const X = (v) => Math.round((v - lo) / (hi - lo) * 1000) / 10;
  const ticks = niceTicks(lo, hi, 4);
  return (
    <div style={wrap} ref={ref}>
      <div style={row}><span style={small}>Sentence</span>{f.cues.map((c) => <button key={c} type="button" aria-pressed={c === cue} style={chip(c === cue)} onClick={() => setCue(c)}>{f.sample.cueLabels[c]}</button>)}</div>
      <Positions10 s={{ ...f.sample, ack: f.ack }} cue={cue} />
      <div style={{ fontSize: '0.72rem', opacity: 0.65, marginBottom: 12 }}>
        One patient message ({f.sample.label}) with the selected sentence in each of the three places. We made the same move in
        all 32 messages. In the third shape the weather sentence is also a prior turn, so the pair stays matched.
      </div>
      <div style={row}><span style={small}>Model&apos;s answer</span>{f.readouts.map((r) => <button key={r.key} type="button" aria-pressed={r.key === readout} style={chip(r.key === readout)} onClick={() => setReadout(r.key)}>{r.label}</button>)}</div>
      <div style={row}><span style={small}>Against</span>{AGAINST10.map((v) => <button key={v.key} type="button" aria-pressed={v.key === against} style={chip(v.key === against)} onClick={() => setAgainst(v.key)}>{v.label}</button>)}</div>
      <div className="scrollX" style={{ overflowX: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: `minmax(9em, 12em) repeat(${f.arms.length}, minmax(0, 1fr))`, columnGap: 26, minWidth: 480, alignItems: 'center' }}>
          <div />
          {f.arms.map((a) => <div key={a} style={{ fontSize: '0.74rem', textAlign: 'center', fontWeight: 'bold', paddingBottom: 4 }}>{ARM10[a]}</div>)}
          {cues.map((c) => (
            <Fragment key={c}>
              <div style={{ ...labelCell7, fontWeight: c === cue ? 'bold' : 'normal' }}><span>{c === 'filler' ? 'weather sentence' : f.sample.cueLabels[c]}</span></div>
              {f.arms.map((a) => (
                <svg key={a} style={{ ...strip7, height: 40 }} aria-label={`${c}, ${ARM10[a]}`}>
                  <line x1="0%" x2="100%" y1={20} y2={20} stroke="rgba(0,0,0,0.08)" />
                  {ticks.map((t) => <line key={t} x1={`${X(t)}%`} x2={`${X(t)}%`} y1={0} y2={40} stroke={t === 0 ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.08)'} />)}
                  {f.positions.map((p, i) => {
                    const v = table[a][c][p.key];
                    const node = (
                      <div>
                        <div><b>{c === 'filler' ? 'weather sentence' : f.sample.cueLabels[c]}</b>, {POS10[p.key].short} · {ARM10[a].toLowerCase()}: {fmt(v[0])} [{fmt(v[1])}, {fmt(v[2])}]</div>
                        <div style={{ marginTop: 4 }}>“{c === 'filler' ? f.sample.sentences.filler : f.sample.sentences[c]}”</div>
                        <div style={{ opacity: 0.6, marginTop: 3 }}>{label}, log-odds, against {AGAINST10.find((x) => x.key === against).label}, paired over {f.n} scenarios</div>
                      </div>
                    );
                    return <Mark7 key={p.key} x={[X(v[0]), X(v[1]), X(v[2])]} y={20 + (i - 1) * 10} r={4.5} color={POS10[p.key].color} filled tip={node} onTip={show} onHide={hide} />;
                  })}
                </svg>
              ))}
            </Fragment>
          ))}
          <div />
          {f.arms.map((a) => (
            <svg key={a} style={{ ...strip7, height: 18 }}>
              {ticks.map((t) => <text key={t} x={`${X(t)}%`} y={13} fontSize={11} textAnchor="middle" fill="#444">{t}</text>)}
            </svg>
          ))}
        </div>
      </div>
      <div style={legendRow}>
        {f.positions.map((p) => <Swatch key={p.key} color={POS10[p.key].color} label={POS10[p.key].label.toLowerCase()} />)}
        <span>{label}, log-odds. Horizontal lines: 95% intervals. Dark line: no change.</span>
      </div>
      <div style={{ fontSize: '0.76rem', lineHeight: 1.55, marginTop: 10, opacity: 0.85 }}>
        <div style={{ marginBottom: 4 }}>What the axes are.</div>
        <div style={{ marginLeft: 12 }}>Rows: the four barrier sentences{against === 'none' ? ', and the weather sentence' : ''}. Columns: the two groups of cases, 16 scenarios each.</div>
        <div style={{ marginLeft: 12, marginTop: 3 }}>
          Marks: the model&apos;s lean with the sentence minus its lean against {AGAINST10.find((x) => x.key === against).label}, one mark per
          place the sentence sits. Right of the dark line raises the lean toward the named answer.
        </div>
      </div>
      <Hint />
      <Tip tip={tip} />
    </div>
  );
}

// Table 6: eight readings by position
export function OrderTable({ rows }) {
  const d = useCharts();
  if (!d) return <div style={{ ...wrap, opacity: 0.6 }}>Loading the table.</div>;
  const f = d.fig10;
  const cell = { padding: '7px 6px', borderBottom: '1px solid rgba(0, 0, 0, 0.15)', textAlign: 'center', whiteSpace: 'nowrap', verticalAlign: 'top' };
  return (
    <div className="scrollX" style={{ ...wrap, overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.78rem', lineHeight: 1.4, minWidth: 560 }}>
        <thead>
          <tr>
            <th style={{ ...cell, textAlign: 'left', borderBottom: '1.5px solid #000', fontWeight: 'normal', opacity: 0.6, whiteSpace: 'normal' }}>change, log-odds [95% interval]</th>
            {f.positions.map((p) => <th key={p.key} style={{ ...cell, borderBottom: '1.5px solid #000', whiteSpace: 'normal', fontWeight: 'normal', color: POS10[p.key].color }}>{POS10[p.key].label.toLowerCase()}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <td style={{ ...cell, textAlign: 'left', whiteSpace: 'normal' }}>{r.label}</td>
              {f.positions.map((p) => {
                const [v, lo, hi] = f[r.against][r.readout][r.arm][r.cue][p.key];
                const off = lo > 0 || hi < 0;
                return (
                  <td key={p.key} style={{ ...cell, fontWeight: off && Math.abs(v) >= 0.5 ? 'bold' : 'normal' }}>
                    {fmt(v)}
                    <div style={{ fontSize: '0.68rem', opacity: 0.55 }}>[{fmt(lo)}, {fmt(hi)}]</div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Figure 11: message realism, the same sentence under typing errors, lower case and a longer message
const TR11 = { clean: { color: C.black, short: 'clean text' }, typos: { color: C.blue, short: 'typos' }, lower: { color: C.orange, short: 'lower case, no punctuation' }, long: { color: C.green, short: 'two sentences of daily detail first' } };
const VIEWS11 = [{ key: 'effect', label: 'The sentence, under each transform' }, { key: 'alone', label: 'The writing alone, no sentence' }];

function Samples11({ s, cue }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px 14px', marginBottom: 12 }}>
      {Object.keys(TR11).map((k) => {
        const r = s.runs[k];
        return (
          <div key={k}>
            <div style={{ ...who, color: TR11[k].color, opacity: 1, marginBottom: 6 }}><span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 4, background: TR11[k].color, marginRight: 6 }} />{TR11[k].short}</div>
            <div style={miniBubble}>{r.body} <span style={inserted}>{r.sentences[cue]}</span> {r.question}</div>
          </div>
        );
      })}
    </div>
  );
}

export function Fig11({ src, alt }) {
  const d = useCharts();
  const { ref, tip, show, hide } = useTip();
  const [readout, setReadout] = useState('ems2');
  const [view, setView] = useState('effect');
  const [cue, setCue] = useState('no_transport');
  if (!d) return <Loading ok={d} src={src} alt={alt} />;
  const f = d.fig11;
  const label = f.readouts.find((r) => r.key === readout).label;
  const keys = view === 'effect' ? Object.keys(TR11) : Object.keys(TR11).slice(1);
  const rows = view === 'effect'
    ? f.cues.map((c) => ({ key: c, label: f.sample.cueLabels[c], get: (a, k) => f.effect[readout][a][c][k] }))
    : f.readouts.map((r) => ({ key: r.key, label: r.label, get: (a, k) => f.alone[r.key][a][k] }));
  const all = rows.flatMap((r) => f.arms.flatMap((a) => keys.flatMap((k) => r.get(a, k).slice(1))));
  let lo = Math.min(0, ...all), hi = Math.max(0, ...all);
  const pad = (hi - lo) * 0.06;
  lo -= pad; hi += pad;
  const X = (v) => Math.round((v - lo) / (hi - lo) * 1000) / 10;
  const ticks = niceTicks(lo, hi, 4);
  const rowH = view === 'effect' ? 48 : 40;
  return (
    <div style={wrap} ref={ref}>
      <div style={row}><span style={small}>Sentence</span>{f.cues.map((c) => <button key={c} type="button" aria-pressed={c === cue} style={chip(c === cue)} onClick={() => setCue(c)}>{f.sample.cueLabels[c]}</button>)}</div>
      <Samples11 s={f.sample} cue={cue} />
      <div style={{ fontSize: '0.72rem', opacity: 0.65, marginBottom: 12 }}>
        One patient message ({f.sample.label}) with the selected sentence, as the four runs saw it. Typos by rule, one word
        in twelve, in the message and the sentence. Lower case removes every punctuation mark. The daily-detail sentences come
        from a pool of twelve, chosen per scenario. We made the same change in all 32 messages.
      </div>
      <div style={row}><span style={small}>Show</span>{VIEWS11.map((v) => <button key={v.key} type="button" aria-pressed={v.key === view} style={chip(v.key === view)} onClick={() => setView(v.key)}>{v.label}</button>)}</div>
      {view === 'effect' && <div style={row}><span style={small}>Model&apos;s answer</span>{f.readouts.map((r) => <button key={r.key} type="button" aria-pressed={r.key === readout} style={chip(r.key === readout)} onClick={() => setReadout(r.key)}>{r.label}</button>)}</div>}
      <div className="scrollX" style={{ overflowX: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: `minmax(9em, 12em) repeat(${f.arms.length}, minmax(0, 1fr))`, columnGap: 26, minWidth: 480, alignItems: 'center' }}>
          <div />
          {f.arms.map((a) => <div key={a} style={{ fontSize: '0.74rem', textAlign: 'center', fontWeight: 'bold', paddingBottom: 4 }}>{ARM10[a]}</div>)}
          {rows.map((r) => (
            <Fragment key={r.key}>
              <div style={{ ...labelCell7, fontWeight: view === 'effect' && r.key === cue ? 'bold' : 'normal' }}><span>{r.label}</span></div>
              {f.arms.map((a) => (
                <svg key={a} style={{ ...strip7, height: rowH }} aria-label={`${r.label}, ${ARM10[a]}`}>
                  <line x1="0%" x2="100%" y1={rowH / 2} y2={rowH / 2} stroke="rgba(0,0,0,0.08)" />
                  {ticks.map((t) => <line key={t} x1={`${X(t)}%`} x2={`${X(t)}%`} y1={0} y2={rowH} stroke={t === 0 ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.08)'} />)}
                  {keys.map((k, i) => {
                    const v = r.get(a, k);
                    const ch = view === 'effect' && k !== 'clean' ? f.change[readout][a][r.key][k] : null;
                    const node = (
                      <div>
                        <div><b>{r.label}</b>, {TR11[k].short} · {ARM10[a].toLowerCase()}: {fmt(v[0])} [{fmt(v[1])}, {fmt(v[2])}]</div>
                        {view === 'effect' ? (
                          <>
                            <div style={{ marginTop: 4 }}>“{f.sample.runs[k].sentences[r.key]}”</div>
                            {ch && <div style={{ marginTop: 3 }}>Change against clean text: {fmt(ch[0])} [{fmt(ch[1])}, {fmt(ch[2])}], paired by scenario.</div>}
                            <div style={{ opacity: 0.6, marginTop: 3 }}>{label}, log-odds, the sentence minus the weather sentence in the same run, paired over {f.n} scenarios</div>
                          </>
                        ) : (
                          <>
                            <div style={{ marginTop: 4 }}>“{f.sample.runs[k].body}”</div>
                            <div style={{ opacity: 0.6, marginTop: 3 }}>the message with no added sentence, transformed minus clean, paired over {f.n} scenarios; clean level {fmt(f.level[r.key][a])}</div>
                          </>
                        )}
                      </div>
                    );
                    return <Mark7 key={k} x={[X(v[0]), X(v[1]), X(v[2])]} y={rowH / 2 + (i - (keys.length - 1) / 2) * 10} r={4.5} color={TR11[k].color} filled tip={node} onTip={show} onHide={hide} />;
                  })}
                </svg>
              ))}
            </Fragment>
          ))}
          <div />
          {f.arms.map((a) => (
            <svg key={a} style={{ ...strip7, height: 18 }}>
              {ticks.map((t) => <text key={t} x={`${X(t)}%`} y={13} fontSize={11} textAnchor="middle" fill="#444">{t}</text>)}
            </svg>
          ))}
        </div>
      </div>
      <div style={legendRow}>
        {keys.map((k) => <Swatch key={k} color={TR11[k].color} label={TR11[k].short} />)}
        <span>{view === 'effect' ? label : 'Each answer'}, log-odds. Horizontal lines: 95% intervals. Dark line: no change.</span>
      </div>
      {view === 'effect' && (
        <div style={{ ...hint, opacity: 0.8 }}>
          Mean size of the sentence effect over the eight cells (two groups of cases by four sentences): {Object.keys(TR11).map((k) => `${TR11[k].short} ${f.meanAbs[readout][k].toFixed(2)}`).join('; ')}.
        </div>
      )}
      <div style={{ fontSize: '0.76rem', lineHeight: 1.55, marginTop: 10, opacity: 0.85 }}>
        <div style={{ marginBottom: 4 }}>What the axes are.</div>
        {view === 'effect' ? (
          <>
            <div style={{ marginLeft: 12 }}>Rows: the four barrier sentences. Columns: the two groups of cases, 16 scenarios each.</div>
            <div style={{ marginLeft: 12, marginTop: 3 }}>Marks: the model&apos;s lean with the sentence minus its lean with the weather sentence, both in the same run, one mark per run.</div>
          </>
        ) : (
          <>
            <div style={{ marginLeft: 12 }}>Rows: the three answers. Columns: the two groups of cases, 16 scenarios each.</div>
            <div style={{ marginLeft: 12, marginTop: 3 }}>Marks: the message with no added sentence after the transform minus the same message typed cleanly. Right of the dark line reads as more urgent.</div>
          </>
        )}
      </div>
      <Hint />
      <Tip tip={tip} />
    </div>
  );
}

// Table 7: what the writing does on its own
export function RealismTable({ rows }) {
  const d = useCharts();
  if (!d) return <div style={{ ...wrap, opacity: 0.6 }}>Loading the table.</div>;
  const f = d.fig11;
  const keys = Object.keys(TR11).slice(1);
  const cell = { padding: '7px 6px', borderBottom: '1px solid rgba(0, 0, 0, 0.15)', textAlign: 'center', whiteSpace: 'nowrap', verticalAlign: 'top' };
  return (
    <div className="scrollX" style={{ ...wrap, overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.78rem', lineHeight: 1.4, minWidth: 560 }}>
        <thead>
          <tr>
            <th style={{ ...cell, textAlign: 'left', borderBottom: '1.5px solid #000', fontWeight: 'normal', opacity: 0.6, whiteSpace: 'normal' }}>no added sentence; change, log-odds [95% interval]</th>
            <th style={{ ...cell, borderBottom: '1.5px solid #000', fontWeight: 'normal', whiteSpace: 'normal' }}>clean level</th>
            {keys.map((k) => <th key={k} style={{ ...cell, borderBottom: '1.5px solid #000', whiteSpace: 'normal', fontWeight: 'normal', color: TR11[k].color }}>{TR11[k].short}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <td style={{ ...cell, textAlign: 'left', whiteSpace: 'normal' }}>{r.label}</td>
              <td style={{ ...cell, opacity: 0.7 }}>{fmt(f.level[r.readout][r.arm])}</td>
              {keys.map((k) => {
                const [v, lo, hi] = f.alone[r.readout][r.arm][k];
                const off = lo > 0 || hi < 0;
                return (
                  <td key={k} style={{ ...cell, fontWeight: off && Math.abs(v) >= 0.5 ? 'bold' : 'normal' }}>
                    {fmt(v)}
                    <div style={{ fontSize: '0.68rem', opacity: 0.55 }}>[{fmt(lo)}, {fmt(hi)}]</div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Figure 12: the four main sentences on six chronic conditions
const ARM12 = { emergency: 'Emergency cases', urgent: 'Same-day cases', routine: 'Routine questions' };
const CUE12 = { distance: 'hospital 90 minutes away', clinic_closed: 'clinic closed until Monday', no_transport: 'no ride tonight', uninsured: 'no insurance' };
const CUE12_SHORT = { distance: '90 min away', clinic_closed: 'clinic closed', no_transport: 'no ride', uninsured: 'no insurance' };

export function Fig12({ src, alt }) {
  const d = useCharts();
  const { ref, tip, show, hide } = useTip();
  const [readout, setReadout] = useState('ems2');
  const [arm, setArm] = useState('emergency');
  if (!d) return <Loading ok={d} src={src} alt={alt} />;
  const f = d.fig12;
  const label = f.readouts.find((r) => r.key === readout).label;
  const vals = f.conditions.flatMap((c) => f.cues.map((q) => Math.abs(f.cell[readout][c.key][arm][q])));
  const max = Math.max(...vals, ...f.cues.map((q) => Math.abs(f.pooled[readout][arm][q][0])));
  const cellStyle = (v) => ({ background: diverging(v, max), color: Math.abs(v) > 0.6 * max ? '#fff' : '#000', textAlign: 'center', padding: '8px 2px', cursor: 'default' });
  return (
    <div style={wrap} ref={ref}>
      <div style={row}><span style={small}>Model&apos;s answer</span>{f.readouts.map((r) => <button key={r.key} type="button" aria-pressed={r.key === readout} style={chip(r.key === readout)} onClick={() => setReadout(r.key)}>{r.label}</button>)}</div>
      <div style={row}><span style={small}>Cases</span>{f.arms.map((a) => <button key={a} type="button" aria-pressed={a === arm} style={chip(a === arm)} onClick={() => setArm(a)}>{ARM12[a]}</button>)}</div>
      <div style={{ display: 'grid', gridTemplateColumns: `minmax(7.5em, 10em) repeat(${f.cues.length}, minmax(0, 1fr))`, gap: 2, fontSize: '0.72rem' }}>
        <div />
        {f.cues.map((q) => <div key={q} style={{ textAlign: 'center', padding: '0 2px 4px', lineHeight: 1.2 }}>{CUE12_SHORT[q]}</div>)}
        {f.conditions.map((c) => {
          const s = c.scenarios[arm];
          return (
            <Fragment key={c.key}>
              <div style={{ alignSelf: 'center', lineHeight: 1.15, paddingRight: 6, hyphens: 'none' }}>{c.label}</div>
              {f.cues.map((q) => {
                const v = f.cell[readout][c.key][arm][q];
                const node = (
                  <div>
                    <div><b>{c.label}</b>, {ARM12[arm].toLowerCase()} · {CUE12[q]}: {fmt(v)} log-odds</div>
                    <div style={{ marginTop: 4 }}>“{s.body} <span style={inserted}>{d.fig10.sample.sentences[q]}</span> {s.question}”</div>
                    <div style={{ opacity: 0.6, marginTop: 3 }}>{label}: with the weather sentence {fmt(f.level[readout][c.key][arm])}, one scenario, no interval</div>
                  </div>
                );
                return <div key={q} {...mark(show, hide, node)} style={cellStyle(v)}>{fmt(v)}</div>;
              })}
            </Fragment>
          );
        })}
        <div style={{ alignSelf: 'center', lineHeight: 1.15, paddingRight: 6, fontWeight: 'bold', borderTop: '1.5px solid #000', paddingTop: 4, marginTop: 2 }}>pooled, six conditions</div>
        {f.cues.map((q) => {
          const [v, lo, hi] = f.pooled[readout][arm][q];
          const node = <div><div><b>Pooled over the six conditions</b>, {ARM12[arm].toLowerCase()} · {CUE12[q]}: {fmt(v)} [{fmt(lo)}, {fmt(hi)}]</div><div style={{ opacity: 0.6, marginTop: 3 }}>{label}, mean and 95% interval from resampling the six conditions</div></div>;
          return <div key={q} {...mark(show, hide, node)} style={{ ...cellStyle(v), fontWeight: 'bold', marginTop: 2 }}>{fmt(v)}</div>;
        })}
      </div>
      <div style={{ ...legendRow, alignItems: 'center' }}>
        <span>−{max.toFixed(1)}</span>
        <span style={{ width: 120, height: 10, background: `linear-gradient(to right, ${diverging(-max, max)}, #f7f7f7, ${diverging(max, max)})`, display: 'inline-block' }} />
        <span>+{max.toFixed(1)}</span>
        <span style={{ opacity: 0.6 }}>{label}, the sentence minus the weather sentence, log-odds. Red raises the lean toward the named answer, blue lowers it.</span>
      </div>
      <div style={{ fontSize: '0.76rem', lineHeight: 1.55, marginTop: 10, opacity: 0.85 }}>
        <div style={{ marginBottom: 4 }}>What the axes are.</div>
        <div style={{ marginLeft: 12 }}>Rows: six chronic conditions, one scenario each per group of cases, and the mean over the six. Columns: the four barrier sentences.</div>
        <div style={{ marginLeft: 12, marginTop: 3 }}>Cells: the model&apos;s lean with the sentence minus its lean with the weather sentence on the same scenario. One scenario per cell, so a cell has no interval; the pooled row has one.</div>
      </div>
      <Hint />
      <Tip tip={tip} />
    </div>
  );
}

// Table 8: six conditions and the pooled row, three readings
export function ConditionTable({ cols }) {
  const d = useCharts();
  if (!d) return <div style={{ ...wrap, opacity: 0.6 }}>Loading the table.</div>;
  const f = d.fig12;
  const cell = { padding: '7px 6px', borderBottom: '1px solid rgba(0, 0, 0, 0.15)', textAlign: 'center', whiteSpace: 'nowrap', verticalAlign: 'top' };
  return (
    <div className="scrollX" style={{ ...wrap, overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.78rem', lineHeight: 1.4, minWidth: 520 }}>
        <thead>
          <tr>
            <th style={{ ...cell, textAlign: 'left', borderBottom: '1.5px solid #000', fontWeight: 'normal', opacity: 0.6, whiteSpace: 'normal' }}>change, log-odds</th>
            {cols.map((c) => <th key={c.label} style={{ ...cell, borderBottom: '1.5px solid #000', whiteSpace: 'normal', fontWeight: 'normal' }}>{c.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {f.conditions.map((c) => (
            <tr key={c.key}>
              <td style={{ ...cell, textAlign: 'left', whiteSpace: 'normal' }}>{c.label}</td>
              {cols.map((x) => { const v = f.cell[x.readout][c.key][x.arm][x.cue]; return <td key={x.label} style={{ ...cell, fontWeight: Math.abs(v) >= 1 ? 'bold' : 'normal' }}>{fmt(v)}</td>; })}
            </tr>
          ))}
          <tr>
            <td style={{ ...cell, textAlign: 'left', whiteSpace: 'normal', fontWeight: 'bold', borderTop: '1.5px solid #000' }}>pooled, six conditions</td>
            {cols.map((x) => { const [v, lo, hi] = f.pooled[x.readout][x.arm][x.cue]; return <td key={x.label} style={{ ...cell, fontWeight: 'bold', borderTop: '1.5px solid #000' }}>{fmt(v)}<div style={{ fontSize: '0.68rem', opacity: 0.55, fontWeight: 'normal' }}>[{fmt(lo)}, {fmt(hi)}]</div></td>; })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// the coded replies for the six condition emergencies
export function ConditionReplies() {
  const d = useCharts();
  if (!d) return <div style={{ ...wrap, opacity: 0.6 }}>Loading the table.</div>;
  const r = d.fig12.replies;
  const names = { none: 'no sentence', filler: 'weather', distance: 'hospital 90 min', clinic_closed: 'clinic closed', no_transport: 'no ride', uninsured: 'no insurance' };
  const cell = { padding: '7px 6px', borderBottom: '1px solid rgba(0, 0, 0, 0.15)', textAlign: 'center', whiteSpace: 'nowrap' };
  return (
    <div className="scrollX" style={{ ...wrap, overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.78rem', lineHeight: 1.4, minWidth: 560 }}>
        <thead>
          <tr>
            <th style={{ ...cell, textAlign: 'left', borderBottom: '1.5px solid #000', fontWeight: 'normal', opacity: 0.6 }}>of {r.n}, reader 1 / reader 2</th>
            {r.cues.map((c) => <th key={c} style={{ ...cell, borderBottom: '1.5px solid #000', fontWeight: 'normal' }}>{names[c]}</th>)}
          </tr>
        </thead>
        <tbody>
          {r.rows.map((x) => (
            <tr key={x.label}>
              <td style={{ ...cell, textAlign: 'left', whiteSpace: 'normal' }}>{x.label}</td>
              {x.values.map((v, i) => <td key={i} style={{ ...cell, fontWeight: v[0] >= r.n ? 'bold' : 'normal', background: v[0] >= r.n ? 'rgba(0,0,0,0.06)' : 'transparent' }}>{v[0] === v[1] ? v[0] : `${v[0]} / ${v[1]}`}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Table 5b: the coded replies for the three largest-shift breadth families
export function BreadthReplies() {
  const d = useCharts();
  if (!d) return <div style={{ ...wrap, opacity: 0.6 }}>Loading the table.</div>;
  const r = d.fig8.replies;
  const cell = { padding: '7px 6px', borderBottom: '1px solid rgba(0, 0, 0, 0.15)', textAlign: 'center', whiteSpace: 'nowrap' };
  return (
    <div className="scrollX" style={{ ...wrap, overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.78rem', lineHeight: 1.4, minWidth: 720 }}>
        <thead>
          <tr>
            <th style={{ ...cell, textAlign: 'left', borderBottom: '1.5px solid #000', fontWeight: 'normal', opacity: 0.6 }}>of {r.n}, reader 1 / reader 2</th>
            {r.cues.map((c) => <th key={c.key} style={{ ...cell, borderBottom: '1.5px solid #000', fontWeight: 'normal', whiteSpace: 'normal', fontSize: '0.72rem', lineHeight: 1.25 }}>{c.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {r.rows.map((x) => (
            <tr key={x.label}>
              <td style={{ ...cell, textAlign: 'left', whiteSpace: 'normal' }}>{x.label}</td>
              {x.values.map((v, i) => <td key={i} style={{ ...cell, fontWeight: v[0] >= r.n ? 'bold' : 'normal', background: v[0] >= r.n ? 'rgba(0,0,0,0.06)' : 'transparent' }}>{v[0] === v[1] ? v[0] : `${v[0]} / ${v[1]}`}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Figure 13: the fine-tuned fix, replies that open with call 911, per set and model
const MODEL13 = { base: C.dark, system: C.orange, lora: C.blue };
const GOOD13 = { emergency: 'a higher share is good', routine: 'a higher share is a false alarm', urgent: 'a higher share is a false alarm' };
function round13(x) {
  const f = Math.floor(x);
  if (x - f !== 0.5) return Math.round(x);
  return f % 2 === 0 ? f : f + 1;
}
function totals13(m) {
  return [0, 1].map((k) => Object.values(m.perCue).reduce((a, v) => a + v[k], 0));
}
function count13(m) {
  return `${round13(m.count)} of ${m.of}`;
}
export function Fig13({ src, alt }) {
  const d = useCharts();
  const [sel, setSel] = useState('main_emergency');
  const { ref, tip, show, hide } = useTip();
  if (!d) return <Loading ok={d} src={src} alt={alt} />;
  const f = d.fig13;
  const set = f.sets.find((x) => x.key === sel);
  const models = f.models.filter((m) => set.models[m.key]);
  return (
    <div style={wrap} ref={ref}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(9em, 14em) minmax(0, 1fr)', gap: '4px 10px', fontSize: '0.74rem', alignItems: 'center' }}>
        <div style={{ gridColumn: '1 / -1', opacity: 0.6 }}>Share of replies that open with “call 911”, mean of two readers</div>
        <div />
        <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.6 }}><span>0%</span><span>50%</span><span>100%</span></div>
        {f.sets.map((x) => (
          <Fragment key={x.key}>
            <div onClick={() => setSel(x.key)} style={{ cursor: 'pointer', lineHeight: 1.2, hyphens: 'none', fontWeight: x.key === sel ? 'bold' : 'normal', paddingRight: 4 }}>
              <div>{x.label}</div>
              <div style={{ opacity: 0.6, fontWeight: 'normal' }}>{GOOD13[x.arm]}</div>
            </div>
            <div onClick={() => setSel(x.key)} style={{ display: 'grid', gap: 2, cursor: 'pointer', padding: '2px 0', borderLeft: '1px solid #000', background: 'linear-gradient(to right, rgba(0,0,0,0.15) 1px, transparent 1px) 0 0 / 50% 100% repeat-x', borderRight: '1px solid rgba(0,0,0,0.15)' }}>
              {f.models.map((m) => {
                const v = x.models[m.key];
                if (!v) {
                  return <div key={m.key} {...mark(show, hide, <div>{m.label}: not run on this set</div>)} style={{ height: 14, fontSize: '0.66rem', opacity: 0.55, paddingLeft: 4, lineHeight: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>not run</div>;
                }
                const node = (
                  <div>
                    <div><b>{m.label}</b> · {x.label}</div>
                    <div style={{ marginTop: 3 }}>{count13(v)} replies open with “call 911”, mean of two readers ({(v.share * 100).toFixed(0)} percent): reader 1 {totals13(v)[0]}, reader 2 {totals13(v)[1]}. In this set, {GOOD13[x.arm]}.</div>
                  </div>
                );
                return (
                  <div key={m.key} {...mark(show, hide, node)} style={{ height: 14, position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, top: 1, height: 12, width: `${v.share * 100}%`, background: MODEL13[m.key], outline: x.key === sel ? '1px solid #000' : 'none' }} />
                    {v.share > 0.7
                      ? <span style={{ position: 'absolute', right: `calc(${100 - v.share * 100}% + 4px)`, top: 0, fontSize: '0.66rem', lineHeight: '14px', whiteSpace: 'nowrap', color: '#fff' }}>{count13(v)}</span>
                      : <span style={{ position: 'absolute', left: `calc(${v.share * 100}% + 4px)`, top: 0, fontSize: '0.66rem', lineHeight: '14px', whiteSpace: 'nowrap', color: '#000' }}>{count13(v)}</span>}
                  </div>
                );
              })}
            </div>
          </Fragment>
        ))}
      </div>
      <div style={legendRow}>
        {f.models.map((m) => <Swatch key={m.key} color={MODEL13[m.key]} label={m.label} />)}
      </div>
      <div style={{ fontSize: '0.76rem', lineHeight: 1.55, marginTop: 10, opacity: 0.85 }}>
        <div style={{ marginBottom: 4 }}>What the bars are. Each bar is the share of replies in that set whose first concrete advice is “call 911 now”, mean of two readers. Select a set to see the count under each sentence.</div>
      </div>
      <div style={{ ...small, marginTop: 12 }}>{set.label}, by sentence (reader 1 / reader 2, of {set.per})</div>
      <div className="scrollX" style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.74rem', lineHeight: 1.35, minWidth: 420, marginTop: 4 }}>
          <thead>
            <tr>
              <th style={{ padding: '5px 6px', textAlign: 'left', borderBottom: '1.5px solid #000', fontWeight: 'normal', opacity: 0.6 }}>model</th>
              {set.cues.map((q) => {
                const node = <div><div><b>{f.cueLabels[q]}</b></div>{f.sentences[q] ? <div style={{ marginTop: 3 }}>“{f.sentences[q]}”</div> : <div style={{ marginTop: 3, opacity: 0.6 }}>the message as written</div>}</div>;
                return <th key={q} {...mark(show, hide, node)} style={{ padding: '5px 4px', textAlign: 'center', borderBottom: '1.5px solid #000', fontWeight: 'normal', fontSize: '0.68rem', lineHeight: 1.2, cursor: 'default' }}>{f.cueLabels[q]}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {models.map((m) => (
              <tr key={m.key}>
                <td style={{ padding: '6px', borderBottom: '1px solid rgba(0,0,0,0.15)', whiteSpace: 'nowrap' }}><Swatch color={MODEL13[m.key]} label={m.label} /></td>
                {set.cues.map((q) => {
                  const v = set.models[m.key].perCue[q];
                  const full = v[0] >= set.per && v[1] >= set.per;
                  return <td key={q} style={{ padding: '6px 4px', borderBottom: '1px solid rgba(0,0,0,0.15)', textAlign: 'center', whiteSpace: 'nowrap', fontWeight: full ? 'bold' : 'normal', background: full ? 'rgba(0,0,0,0.06)' : 'transparent' }}>{v[0] === v[1] ? v[0] : `${v[0]} / ${v[1]}`}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Hint />
      <Tip tip={tip} />
    </div>
  );
}

// Table 10: the fine-tuned fix, benefit rows then harm rows
export function LoraTable() {
  const d = useCharts();
  if (!d) return <div style={{ ...wrap, opacity: 0.6 }}>Loading the table.</div>;
  const f = d.fig13;
  const cell = { padding: '7px 6px', borderBottom: '1px solid rgba(0, 0, 0, 0.15)', textAlign: 'center', whiteSpace: 'nowrap' };
  return (
    <div className="scrollX" style={{ ...wrap, overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.78rem', lineHeight: 1.4, minWidth: 560 }}>
        <thead>
          <tr>
            <th style={{ ...cell, textAlign: 'left', borderBottom: '1.5px solid #000', fontWeight: 'normal', opacity: 0.6, whiteSpace: 'normal' }}>set and cases; replies that open with “call 911”</th>
            {f.models.map((m) => <th key={m.key} style={{ ...cell, borderBottom: '1.5px solid #000', fontWeight: 'normal', whiteSpace: 'normal', fontSize: '0.72rem', lineHeight: 1.25 }}>{m.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {f.sets.map((x, i) => (
            <Fragment key={x.key}>
              {(i === 0 || i === 2) && <tr><td colSpan={4} style={{ ...small, padding: '12px 0 4px', textAlign: 'left' }}>{i === 0 ? 'benefit: emergency cases, a higher share is good' : 'harm: routine and same-day cases, a higher share is a false alarm'}</td></tr>}
              <tr>
                <td style={{ ...cell, textAlign: 'left', whiteSpace: 'normal' }}>{x.label}</td>
                {f.models.map((m) => {
                  const v = x.models[m.key];
                  return <td key={m.key} style={{ ...cell, opacity: v ? 1 : 0.55, whiteSpace: v ? 'nowrap' : 'normal', fontSize: v ? 'inherit' : '0.7rem' }}>{v ? <>{count13(v)}<div style={{ fontSize: '0.68rem', opacity: 0.55 }}>{totals13(v)[0] === totals13(v)[1] ? 'both readers' : `readers ${totals13(v)[0]} / ${totals13(v)[1]}`}</div></> : 'not run'}</td>;
                })}
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Figure 14: the replication set, each sentence's change on the original set and on 32 new scenarios
const SET14 = { original: { label: 'original set', color: C.dark, filled: false }, replication: { label: '32 new scenarios', color: C.blue, filled: true } };
export function Fig14({ src, alt }) {
  const d = useCharts();
  const [panel, setPanel] = useState('em_ems2');
  const [cue, setCue] = useState('no_transport');
  const { ref, tip, show, hide } = useTip();
  if (!d) return <Loading ok={d} src={src} alt={alt} />;
  const f = d.fig14;
  const p = f.panels.find((x) => x.key === panel);
  const s = f.sample[p.arm];
  const vals = f.values[panel];
  const all = f.cues.flatMap((c) => ['original', 'replication'].flatMap((k) => vals[c.key][k].slice(1)));
  const [lo, hi] = [Math.min(0, ...all) - 0.2, Math.max(0, ...all) + 0.2];
  const X = (v) => ((v - lo) / (hi - lo)) * 100;
  const ticks = niceTicks(lo, hi);
  return (
    <div style={wrap} ref={ref}>
      <div style={row}><span style={small}>Sentence</span>{f.cues.map((c) => <button key={c.key} type="button" aria-pressed={c.key === cue} style={chip(c.key === cue)} onClick={() => setCue(c.key)}>{c.label}</button>)}</div>
      <div style={{ marginBottom: 12 }}>
        <div style={who}>sample message, new set · {s.label}</div>
        <div style={bubble}>{s.body} <span style={inserted}>{f.sentences[cue]}</span> {s.question}</div>
        <div style={{ fontSize: '0.72rem', opacity: 0.65, marginTop: 4 }}>The highlighted sentence is the one added, in the same place in all 16 {p.arm} messages of the new set. The weather sentence takes the same place in the control message.</div>
      </div>
      <div style={row}><span style={small}>Cases and answer</span>{f.panels.map((x) => <button key={x.key} type="button" aria-pressed={x.key === panel} style={chip(x.key === panel)} onClick={() => setPanel(x.key)}>{x.label}</button>)}</div>
      <div className="scrollX" style={{ overflowX: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(9em, 12em) minmax(0, 1fr)', columnGap: 16, minWidth: 420, alignItems: 'center' }}>
          <div />
          <div style={{ fontSize: '0.7rem', opacity: 0.6, position: 'relative', height: 14 }}>
            {ticks.map((t) => <span key={t} style={{ position: 'absolute', left: `${X(t)}%`, transform: 'translateX(-50%)' }}>{fmt(t)}</span>)}
          </div>
          {f.cues.map((c) => (
            <Fragment key={c.key}>
              <div style={{ ...labelCell7, fontWeight: c.key === cue ? 'bold' : 'normal', cursor: 'pointer' }} onClick={() => setCue(c.key)}><span>{c.label}</span></div>
              <svg viewBox="0 0 100 34" preserveAspectRatio="none" style={{ ...strip7, height: 34 }} onClick={() => setCue(c.key)}>
                <line x1={`${X(0)}%`} x2={`${X(0)}%`} y1={2} y2={32} stroke="#000" strokeWidth={1} />
                {['original', 'replication'].map((k, i) => {
                  const v = vals[c.key][k];
                  const node = (
                    <div>
                      <div><b>{c.label}</b>, {SET14[k].label}{k === 'original' ? ` (${c.originalSet})` : ''}: {fmt(v[0])} [{fmt(v[1])}, {fmt(v[2])}]</div>
                      <div style={{ marginTop: 4 }}>“{c.sentence}”</div>
                      <div style={{ opacity: 0.6, marginTop: 3 }}>{p.label}, log-odds; the sentence minus a weather sentence of the same length, 16 scenarios. {p.harm === 'below' ? 'Below zero is harm.' : 'Above zero is a false alarm.'}</div>
                    </div>
                  );
                  return <Mark7 key={k} x={v.map(X)} y={10 + i * 14} r={5} color={SET14[k].color} filled={SET14[k].filled} tip={node} onTip={show} onHide={hide} />;
                })}
              </svg>
            </Fragment>
          ))}
        </div>
      </div>
      <div style={legendRow}>
        <Swatch color="#f5f5dc" label={`hollow grey: ${SET14.original.label}`} /><Swatch color={C.blue} label={`blue: ${SET14.replication.label}`} />
        <span>{p.label}, log-odds. Horizontal lines: 95% intervals. Dark line: no change.</span>
      </div>
      <div style={{ fontSize: '0.76rem', lineHeight: 1.55, marginTop: 10, opacity: 0.85 }}>
        <div style={{ marginBottom: 4 }}>What the marks are.</div>
        <div style={{ marginLeft: 12 }}>Rows: the seven extra sentences. Each row has two marks: the change on the set where the sentence was first tested (hollow grey), and the change on the 32 new scenarios (blue).</div>
        <div style={{ marginLeft: 12, marginTop: 3 }}>Each mark is the change in the model&apos;s lean toward the chosen answer, in log-odds: the sentence minus a weather sentence of the same length, paired over 16 scenarios. {p.harm === 'below' ? 'On these emergency cases, a mark below zero is harm.' : 'On these routine cases, a mark above zero is a false alarm.'}</div>
        <div style={{ marginLeft: 12, marginTop: 3 }}>Of the {f.repeat.of} changes that had an interval off zero on the original sets, {f.repeat.n} repeat on the new set with the same sign and an interval off zero.</div>
      </div>
      <Hint />
      <Tip tip={tip} />
    </div>
  );
}

// Table 11: the replication set, four columns with intervals
export function RepTable() {
  const d = useCharts();
  if (!d) return <div style={{ ...wrap, opacity: 0.6 }}>Loading the table.</div>;
  const f = d.fig14;
  const cols = [['em_ems2', 'original', "Emergency, 'call 911': original set"], ['em_ems2', 'replication', "Emergency, 'call 911': new set"], ['ro_urgency2', 'original', "Routine, 'High' urgency: original set"], ['ro_urgency2', 'replication', "Routine, 'High' urgency: new set"]];
  const cell = { padding: '7px 6px', borderBottom: '1px solid rgba(0, 0, 0, 0.15)', textAlign: 'center', whiteSpace: 'nowrap' };
  return (
    <div className="scrollX" style={{ ...wrap, overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.78rem', lineHeight: 1.4, minWidth: 560 }}>
        <thead>
          <tr>
            <th style={{ ...cell, textAlign: 'left', borderBottom: '1.5px solid #000', fontWeight: 'normal', opacity: 0.6, whiteSpace: 'normal' }}>sentence; change, log-odds [95% interval]</th>
            {cols.map((x) => <th key={x[2]} style={{ ...cell, borderBottom: '1.5px solid #000', fontWeight: 'normal', whiteSpace: 'normal', fontSize: '0.72rem', lineHeight: 1.25 }}>{x[2]}</th>)}
          </tr>
        </thead>
        <tbody>
          {f.cues.map((c) => (
            <tr key={c.key}>
              <td style={{ ...cell, textAlign: 'left', whiteSpace: 'normal' }}>{c.label}</td>
              {cols.map((x) => {
                const [v, lo, hi] = f.values[x[0]][c.key][x[1]];
                const off = lo > 0 || hi < 0;
                return <td key={x[2]} style={{ ...cell, fontWeight: off && Math.abs(v) >= 1 ? 'bold' : 'normal' }}>{fmt(v)}<div style={{ fontSize: '0.68rem', opacity: 0.55, fontWeight: 'normal' }}>[{fmt(lo)}, {fmt(hi)}]</div></td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Table 11b: first advice in the replication replies, emergency and routine, nine sentences
export function RepReplies() {
  const d = useCharts();
  if (!d) return <div style={{ ...wrap, opacity: 0.6 }}>Loading the table.</div>;
  const f = d.fig14;
  const cell = { padding: '6px 5px', borderBottom: '1px solid rgba(0, 0, 0, 0.15)', textAlign: 'center', whiteSpace: 'nowrap' };
  return (
    <div className="scrollX" style={{ ...wrap, overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.76rem', lineHeight: 1.35, minWidth: 760 }}>
        <thead>
          <tr>
            <th style={{ ...cell, textAlign: 'left', borderBottom: '1.5px solid #000', fontWeight: 'normal', opacity: 0.6 }}>of 16, reader 1 / reader 2</th>
            {f.replies.emergency.cues.map((c) => <th key={c} style={{ ...cell, borderBottom: '1.5px solid #000', fontWeight: 'normal', whiteSpace: 'normal', fontSize: '0.7rem', lineHeight: 1.2 }}>{f.cueLabels[c]}</th>)}
          </tr>
        </thead>
        <tbody>
          {['emergency', 'routine'].map((part) => (
            <Fragment key={part}>
              <tr><td colSpan={f.replies[part].cues.length + 1} style={{ ...small, padding: '12px 0 4px', textAlign: 'left' }}>{part === 'emergency' ? 'emergency cases, 16 new scenarios' : 'routine complaints, 16 new scenarios'} · reader agreement (kappa) {f.replies[part].kappa.toFixed(2)}</td></tr>
              {f.replies[part].rows.map((r) => (
                <tr key={r.label}>
                  <td style={{ ...cell, textAlign: 'left', whiteSpace: 'normal' }}>{r.label}</td>
                  {r.values.map((v, i) => <td key={i} style={cell}>{v[0] === v[1] ? v[0] : `${v[0]} / ${v[1]}`}</td>)}
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Table 12: the self-reliance sentence's direction removed at layer 12, at layer 20, and a random direction
export function SelfDirTable() {
  const d = useCharts();
  if (!d) return <div style={{ ...wrap, opacity: 0.6 }}>Loading the table.</div>;
  const t = d.tab12;
  const cell = { padding: '7px 6px', borderBottom: '1px solid rgba(0, 0, 0, 0.15)', textAlign: 'center', whiteSpace: 'nowrap' };
  return (
    <div className="scrollX" style={{ ...wrap, overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.78rem', lineHeight: 1.4, minWidth: 560 }}>
        <thead>
          <tr>
            <th style={{ ...cell, textAlign: 'left', borderBottom: '1.5px solid #000', fontWeight: 'normal', opacity: 0.6, whiteSpace: 'normal' }}>cases and answer; change, log-odds</th>
            {t.conds.map((c) => <th key={c} style={{ ...cell, borderBottom: '1.5px solid #000', fontWeight: 'normal', whiteSpace: 'normal', fontSize: '0.72rem', lineHeight: 1.25 }}>{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {t.rows.map((r) => (
            <tr key={r.label}>
              <td style={{ ...cell, textAlign: 'left', whiteSpace: 'normal' }}>{r.label}</td>
              {r.values.map((v, i) => <td key={i} style={{ ...cell, fontWeight: r.label.startsWith('Emergency cases: lean toward ‘Ambulance') || (r.label.includes('Ambulance') && r.label.startsWith('Emergency')) ? 'bold' : 'normal' }}>{fmt(v)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Table 13: the chronic-care text bank, what the candidate units single out
export function BankTable() {
  const d = useCharts();
  if (!d) return <div style={{ ...wrap, opacity: 0.6 }}>Loading the table.</div>;
  const b = d.bank;
  const cell = { padding: '7px 6px', borderBottom: '1px solid rgba(0, 0, 0, 0.15)', textAlign: 'left', whiteSpace: 'normal' };
  return (
    <div className="scrollX" style={{ ...wrap, overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.78rem', lineHeight: 1.4, minWidth: 480 }}>
        <thead>
          <tr>
            <th style={{ ...cell, borderBottom: '1.5px solid #000', fontWeight: 'normal', opacity: 0.6 }}>kind of text</th>
            <th style={{ ...cell, borderBottom: '1.5px solid #000', fontWeight: 'normal', opacity: 0.6, textAlign: 'center' }}>units that single it out (of {b.n})</th>
            <th style={{ ...cell, borderBottom: '1.5px solid #000', fontWeight: 'normal', opacity: 0.6 }}>strongest unit: how many times more active on that kind than on the next kind</th>
          </tr>
        </thead>
        <tbody>
          {b.kinds.map((k) => (
            <tr key={k.key}>
              <td style={cell}>{k.label}</td>
              <td style={{ ...cell, textAlign: 'center', fontWeight: k.count >= 7 ? 'bold' : 'normal' }}>{k.count}</td>
              <td style={cell}>{k.top ? `${k.top.unit.replace(/^L(\d+)N(\d+)$/, 'layer $1, unit $2')}: ${k.top.sel.toFixed(1)} times` : 'none'}</td>
            </tr>
          ))}
          <tr>
            <td style={cell}>any one condition (type 2 diabetes, COPD, heart failure, kidney disease, obesity or high blood pressure)</td>
            <td style={{ ...cell, textAlign: 'center' }}>{b.byCondition}</td>
            <td style={cell}>{b.conditionTop.unit.replace(/^L(\d+)N(\d+)$/, 'layer $1, unit $2')} on {b.conditionTop.top === 'copd' ? 'COPD' : b.conditionTop.top}: {b.conditionTop.selectivity.toFixed(1)} times</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// Table 14: control sentences that state no barrier, first advice in the 16 main emergencies, with the next-word change
export function ControlTable() {
  const d = useCharts();
  const { ref, tip, show, hide } = useTip();
  if (!d) return <div style={{ ...wrap, opacity: 0.6 }}>Loading the table.</div>;
  const t = d.tab14;
  const cell = { padding: '7px 6px', borderBottom: '1px solid rgba(0, 0, 0, 0.15)', textAlign: 'center', whiteSpace: 'nowrap' };
  return (
    <div className="scrollX" style={{ ...wrap, overflowX: 'auto' }} ref={ref}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.78rem', lineHeight: 1.4, minWidth: 560 }}>
        <thead>
          <tr>
            <th style={{ ...cell, textAlign: 'left', borderBottom: '1.5px solid #000', fontWeight: 'normal', opacity: 0.6, whiteSpace: 'normal' }}>extra sentence (hover for its wording)</th>
            <th style={{ ...cell, borderBottom: '1.5px solid #000', fontWeight: 'normal', whiteSpace: 'normal', fontSize: '0.72rem', lineHeight: 1.25 }}>“call 911” first, of {t.n} (reader 1 / reader 2)</th>
            <th style={{ ...cell, borderBottom: '1.5px solid #000', fontWeight: 'normal', whiteSpace: 'normal', fontSize: '0.72rem', lineHeight: 1.25 }}>change in the lean toward “Yes, call 911”, log-odds [95% interval]</th>
          </tr>
        </thead>
        <tbody>
          {t.rows.map((r) => {
            const moved = Math.max(...r.counts) <= 11;
            const node = <div><div><b>{r.label}</b></div>{r.sentence ? <div style={{ marginTop: 3 }}>“{r.sentence}”</div> : <div style={{ marginTop: 3, opacity: 0.6 }}>the message as written</div>}<div style={{ opacity: 0.6, marginTop: 3 }}>{t.n - Math.min(...r.counts)} to {t.n - Math.max(...r.counts)} of {t.n} replies open with something other than call 911.</div></div>;
            return (
              <tr key={r.key} {...mark(show, hide, node)} style={{ cursor: 'default', background: moved ? 'rgba(0,0,0,0.06)' : 'transparent' }}>
                <td style={{ ...cell, textAlign: 'left', whiteSpace: 'normal', fontWeight: moved ? 'bold' : 'normal' }}>{r.label}</td>
                <td style={{ ...cell, fontWeight: moved ? 'bold' : 'normal' }}>{r.counts[0] === r.counts[1] ? r.counts[0] : `${r.counts[0]} / ${r.counts[1]}`}</td>
                <td style={{ ...cell, fontWeight: r.change && r.change[2] < 0 && Math.abs(r.change[0]) >= 0.5 ? 'bold' : 'normal' }}>{r.change ? <>{fmt(r.change[0])}<div style={{ fontSize: '0.68rem', opacity: 0.55, fontWeight: 'normal' }}>[{fmt(r.change[1])}, {fmt(r.change[2])}]</div></> : <span style={{ opacity: 0.5 }}>reference</span>}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Hint />
      <Tip tip={tip} />
    </div>
  );
}

// Table 15: the Gemma rerun with the wider answer-word list
export function GemmaRerunTable() {
  const d = useCharts();
  if (!d) return <div style={{ ...wrap, opacity: 0.6 }}>Loading the table.</div>;
  const t = d.tab15;
  const cell = { padding: '7px 6px', borderBottom: '1px solid rgba(0, 0, 0, 0.15)', textAlign: 'center', whiteSpace: 'nowrap' };
  return (
    <div className="scrollX" style={{ ...wrap, overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.78rem', lineHeight: 1.4, minWidth: 600 }}>
        <thead>
          <tr>
            <th style={{ ...cell, textAlign: 'left', borderBottom: '1.5px solid #000', fontWeight: 'normal', opacity: 0.6, whiteSpace: 'normal' }}>cases, sentence; change, log-odds</th>
            {t.head.slice(1).map((h) => <th key={h} style={{ ...cell, borderBottom: '1.5px solid #000', fontWeight: 'normal', whiteSpace: 'normal', fontSize: '0.72rem', lineHeight: 1.25 }}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {t.rows.map((r, i) => (
            <Fragment key={r.label}>
              {(i === 0 || i === 4) && <tr><td colSpan={5} style={{ ...small, padding: '12px 0 4px', textAlign: 'left' }}>{i === 0 ? 'emergency cases: below zero is harm' : 'routine cases: above zero is a false alarm'}</td></tr>}
              <tr>
                <td style={{ ...cell, textAlign: 'left', whiteSpace: 'normal' }}>{r.label}</td>
                {r.values.map((v, j) => <td key={j} style={{ ...cell, fontWeight: Math.abs(v) >= 2 ? 'bold' : 'normal', opacity: j === 3 ? 0.8 : 1 }}>{fmt(v)}</td>)}
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Figure 15 and Table 16: the softer system line against the base model and the first system line
const MODEL15 = { base: C.dark, system: C.orange, soft: C.green };
const MEASURE15 = { emergency: 'say “call 911” first', routine: 'are sent to the emergency room or 911 first', urgent: 'are sent to the emergency room or 911 first' };
export function Fig15({ src, alt }) {
  const d = useCharts();
  const [sel, setSel] = useState('main_emergency');
  const { ref, tip, show, hide } = useTip();
  if (!d) return <Loading ok={d} src={src} alt={alt} />;
  const f = d.fig15;
  const set = f.sets.find((x) => x.key === sel);
  const models = f.models.filter((m) => set.models[m.key]);
  return (
    <div style={wrap} ref={ref}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(9em, 14em) minmax(0, 1fr)', gap: '4px 10px', fontSize: '0.74rem', alignItems: 'center' }}>
        <div style={{ gridColumn: '1 / -1', opacity: 0.6 }}>Share of replies, mean of two readers, every sentence pooled</div>
        <div />
        <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.6 }}><span>0%</span><span>50%</span><span>100%</span></div>
        {f.sets.map((x) => (
          <Fragment key={x.key}>
            <div onClick={() => setSel(x.key)} style={{ cursor: 'pointer', lineHeight: 1.2, hyphens: 'none', fontWeight: x.key === sel ? 'bold' : 'normal', paddingRight: 4 }}>
              <div>{x.label}</div>
              <div style={{ opacity: 0.6, fontWeight: 'normal' }}>replies that {MEASURE15[x.arm]}; {GOOD13[x.arm]}</div>
            </div>
            <div onClick={() => setSel(x.key)} style={{ display: 'grid', gap: 2, cursor: 'pointer', padding: '2px 0', borderLeft: '1px solid #000', background: 'linear-gradient(to right, rgba(0,0,0,0.15) 1px, transparent 1px) 0 0 / 50% 100% repeat-x', borderRight: '1px solid rgba(0,0,0,0.15)' }}>
              {f.models.map((m) => {
                const v = x.models[m.key];
                if (!v) {
                  return <div key={m.key} {...mark(show, hide, <div>{m.label}: the readers did not code this set</div>)} style={{ height: 14, fontSize: '0.66rem', opacity: 0.55, paddingLeft: 4, lineHeight: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>not coded</div>;
                }
                const node = (
                  <div>
                    <div><b>{m.label}</b> · {x.label}</div>
                    <div style={{ marginTop: 3 }}>{count13(v)} replies {MEASURE15[x.arm]}, mean of two readers ({(v.share * 100).toFixed(0)} percent): reader 1 {totals13(v)[0]}, reader 2 {totals13(v)[1]}. In this set, {GOOD13[x.arm]}.</div>
                  </div>
                );
                return (
                  <div key={m.key} {...mark(show, hide, node)} style={{ height: 14, position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, top: 1, height: 12, width: `${v.share * 100}%`, background: MODEL15[m.key], outline: x.key === sel ? '1px solid #000' : 'none' }} />
                    {v.share > 0.7
                      ? <span style={{ position: 'absolute', right: `calc(${100 - v.share * 100}% + 4px)`, top: 0, fontSize: '0.66rem', lineHeight: '14px', whiteSpace: 'nowrap', color: '#fff' }}>{count13(v)}</span>
                      : <span style={{ position: 'absolute', left: `calc(${v.share * 100}% + 4px)`, top: 0, fontSize: '0.66rem', lineHeight: '14px', whiteSpace: 'nowrap', color: '#000' }}>{count13(v)}</span>}
                  </div>
                );
              })}
            </div>
          </Fragment>
        ))}
      </div>
      <div style={legendRow}>
        {f.models.map((m) => <Swatch key={m.key} color={MODEL15[m.key]} label={m.label} />)}
      </div>
      <div style={{ fontSize: '0.76rem', lineHeight: 1.55, marginTop: 10, opacity: 0.85 }}>
        <div style={{ marginBottom: 4 }}>What the bars are. In the two emergency sets, each bar is the share of replies whose first concrete advice is “call 911 now”. In the routine and same-day sets, each bar is the share of replies whose first concrete advice sends the patient to the emergency room by any means, ambulance or not. Select a set to see the count under each sentence.</div>
      </div>
      <div style={{ ...small, marginTop: 12 }}>{set.label}, replies that {MEASURE15[set.arm]}, by sentence (reader 1 / reader 2, of {set.per})</div>
      <div className="scrollX" style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.74rem', lineHeight: 1.35, minWidth: 420, marginTop: 4 }}>
          <thead>
            <tr>
              <th style={{ padding: '5px 6px', textAlign: 'left', borderBottom: '1.5px solid #000', fontWeight: 'normal', opacity: 0.6 }}>model</th>
              {set.cues.map((q) => {
                const node = <div><div><b>{f.cueLabels[q]}</b></div>{f.sentences[q] ? <div style={{ marginTop: 3 }}>“{f.sentences[q]}”</div> : <div style={{ marginTop: 3, opacity: 0.6 }}>the message as written</div>}</div>;
                return <th key={q} {...mark(show, hide, node)} style={{ padding: '5px 4px', textAlign: 'center', borderBottom: '1.5px solid #000', fontWeight: 'normal', fontSize: '0.68rem', lineHeight: 1.2, cursor: 'default' }}>{f.cueLabels[q]}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {models.map((m) => (
              <tr key={m.key}>
                <td style={{ padding: '6px', borderBottom: '1px solid rgba(0,0,0,0.15)', whiteSpace: 'nowrap' }}><Swatch color={MODEL15[m.key]} label={m.label} /></td>
                {set.cues.map((q) => {
                  const v = set.models[m.key].perCue[q];
                  const full = set.arm === 'emergency' ? v[0] >= set.per && v[1] >= set.per : v[0] === 0 && v[1] === 0;
                  return <td key={q} style={{ padding: '6px 4px', borderBottom: '1px solid rgba(0,0,0,0.15)', textAlign: 'center', whiteSpace: 'nowrap', fontWeight: full ? 'bold' : 'normal', background: full ? 'rgba(0,0,0,0.06)' : 'transparent' }}>{v[0] === v[1] ? v[0] : `${v[0]} / ${v[1]}`}</td>;
                })}
              </tr>
            ))}
            {models.length < f.models.length && (
              <tr><td colSpan={set.cues.length + 1} style={{ padding: '6px', fontSize: '0.7rem', opacity: 0.6 }}>{f.models.filter((m) => !set.models[m.key]).map((m) => m.label).join(', ')}: the readers did not code this set.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <div style={{ fontSize: '0.72rem', opacity: 0.65, marginTop: 8 }}>Shaded cells: every reply in the cell gives the best answer for that set (16 of 16 “call 911” on emergencies; 0 of 16 sent to the emergency room on routine and same-day cases).</div>
      <Hint />
      <Tip tip={tip} />
    </div>
  );
}

// Table 16: counts by first advice for the three models
export function SoftTable() {
  const d = useCharts();
  if (!d) return <div style={{ ...wrap, opacity: 0.6 }}>Loading the table.</div>;
  const t = d.fig15.tab16;
  const cell = { padding: '7px 6px', borderBottom: '1px solid rgba(0, 0, 0, 0.15)', textAlign: 'center', whiteSpace: 'nowrap' };
  return (
    <div className="scrollX" style={{ ...wrap, overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.78rem', lineHeight: 1.4, minWidth: 560 }}>
        <thead>
          <tr>
            {t.header.map((h, i) => <th key={h} style={{ ...cell, textAlign: i ? 'center' : 'left', borderBottom: '1.5px solid #000', fontWeight: 'normal', opacity: i ? 1 : 0.6, whiteSpace: 'normal', fontSize: i ? '0.72rem' : 'inherit', lineHeight: 1.25 }}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {t.rows.map((r, i) => (
            <Fragment key={r[0]}>
              {(i === 0 || i === 3) && <tr><td colSpan={4} style={{ ...small, padding: '12px 0 4px', textAlign: 'left' }}>{i === 0 ? 'benefit: emergency cases, a higher count is good' : 'harm: routine and same-day cases, a higher count is a false alarm'}</td></tr>}
              <tr>
                <td style={{ ...cell, textAlign: 'left', whiteSpace: 'normal' }}>{r[0]}</td>
                {r.slice(1).map((v, j) => <td key={j} style={{ ...cell, opacity: /^\d+$/.test(v) ? 1 : 0.55, fontSize: /^\d+$/.test(v) ? 'inherit' : '0.7rem', fontWeight: j === 2 ? 'bold' : 'normal' }}>{v}</td>)}
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
