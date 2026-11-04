import { Fragment, useEffect, useRef, useState } from 'react';

let cache;
function loadCharts() {
  if (!cache) cache = fetch('/education-not-advice/charts.json').then((r) => r.json());
  return cache;
}
export function useEdu() {
  const [data, setData] = useState(null);
  useEffect(() => {
    loadCharts().then(setData).catch(() => setData(false));
  }, []);
  return data;
}

const C = { blue: '#0072b2', orange: '#d55e00', yellow: '#e69f00', green: '#009e73', sky: '#56b4e9', pink: '#cc79a7', gray: '#999999', dark: '#7f7f7f', black: '#000000' };
export const COND = { none: C.dark, gated_shift_L16_a1: C.blue, gated_random_L16_a1: C.sky, removal_L16_a1: C.orange, 'gated_shift_L16_a0.5': C.sky, gated_shift_L16_a2: C.black, gated_shift_L16_a1_s30: C.yellow, gated_shift_L16_a1_s60: C.orange, gated_shift_L16_a1_prefill: C.green };
const STANCE = { education_only: C.green, individualized_advice: C.pink, emergency_redirect: C.blue, refusal_only: C.yellow, unclear: C.gray };
const STANCE_LABEL = { education_only: 'education only', individualized_advice: 'individualized advice', emergency_redirect: 'emergency redirect', refusal_only: 'refusal only', unclear: 'unclear' };
const READOUT = { none: C.dark, removal: C.orange, removal_unguarded: '#a04000', random: C.sky, emergency_removal: C.yellow, gated_shift: C.blue };

const wrap = { position: 'relative', textAlign: 'left', fontSize: '0.8rem', lineHeight: '1.5', hyphens: 'none', margin: '18px 0 10px' };
const tipStyle = { position: 'absolute', zIndex: 5, maxWidth: '320px', padding: '8px 10px', background: '#f5f5dc', color: '#000000', border: '1px solid #000000', boxShadow: '3px 3px 0 rgba(0, 0, 0, 0.8)', fontSize: '0.74rem', lineHeight: '1.45', pointerEvents: 'none' };
const small = { fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.6 };
const row = { display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center', marginBottom: '10px' };
const chip = (on) => ({ font: 'inherit', fontSize: '0.78rem', padding: '3px 9px', border: '1px solid #000000', borderRadius: '999px', background: on ? '#000000' : 'transparent', color: on ? '#f5f5dc' : '#000000', cursor: 'pointer' });
const legendRow = { display: 'flex', flexWrap: 'wrap', gap: '4px 14px', fontSize: '0.74rem', marginTop: '8px' };
const hint = { fontSize: '0.72rem', opacity: 0.6, marginTop: '6px' };
const th = { padding: '5px 6px', textAlign: 'left', borderBottom: '1.5px solid #000', fontWeight: 'normal', opacity: 0.6, fontSize: '0.68rem', lineHeight: 1.2 };
const td = { padding: '6px', borderBottom: '1px solid rgba(0,0,0,0.15)', whiteSpace: 'nowrap' };

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
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}><span style={{ width: 10, height: 10, background: color, display: 'inline-block', borderRadius: 2 }} />{label}</span>;
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
function Hint() {
  return <div style={hint}>Hover, tap or tab to a mark for the numbers.</div>;
}
function Loading({ ok, src, alt, children }) {
  if (ok === false) return <img src={src} alt={alt} style={{ display: 'block', width: '100%', height: 'auto', background: '#fff', border: '1px solid rgba(0, 0, 0, 0.15)' }} />;
  if (!ok) return <div style={{ ...wrap, opacity: 0.6 }}>Loading the numbers.</div>;
  return children;
}

function StackedBar({ parts, n, height = 14, outline, show, hide, node }) {
  let x = 0;
  return (
    <div {...mark(show, hide, node)} style={{ height, position: 'relative', outline: outline ? '1px solid #000' : 'none' }}>
      {parts.map(([key, v]) => {
        const w = (v / n) * 100;
        const el = <div key={key} style={{ position: 'absolute', left: `${x}%`, top: 1, height: height - 2, width: `${w}%`, background: STANCE[key] }} />;
        x += w;
        return el;
      })}
    </div>
  );
}

const gridStyle = { display: 'grid', gridTemplateColumns: 'minmax(9em, 14em) minmax(0, 1fr)', gap: '4px 10px', fontSize: '0.74rem', alignItems: 'center' };
const barsCell = { display: 'grid', gap: 2, padding: '2px 0', borderLeft: '1px solid #000', background: 'linear-gradient(to right, rgba(0,0,0,0.15) 1px, transparent 1px) 0 0 / 50% 100% repeat-x', borderRight: '1px solid rgba(0,0,0,0.15)' };
const axis = <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.6 }}><span>0%</span><span>50%</span><span>100%</span></div>;

function stanceNode(classLabel, condLabel, b) {
  return (
    <div>
      <div><b>{condLabel}</b> · {classLabel}</div>
      <div style={{ marginTop: 3 }}>
        Of {b.n} replies, mean of two readers: {Object.entries(b.stance).filter(([, v]) => v > 0).map(([k, v]) => `${v} ${STANCE_LABEL[k]}`).join(', ')}.
        Explanation score {b.explains} of 3; {b.false} replies with a false statement.
        {b.fired != null && b.fired < b.n ? ` The gate fired on ${b.fired} of ${b.n}.` : ''}
      </div>
    </div>
  );
}

// Figure 1: the gate. Where it fires, and the one-word call-911 answer under six conditions.
export function GateFig({ src, alt }) {
  const d = useEdu();
  const [cond, setCond] = useState('removal');
  const { ref, tip, show, hide } = useTip();
  if (!d) return <Loading ok={d} src={src} alt={alt} />;
  const classes = d.classes;
  const withReadout = classes.filter((c) => Object.keys(d.gate[c.key].readout).length);
  const conds = d.readout_conds;
  return (
    <div style={wrap} ref={ref}>
      <div style={gridStyle}>
        <div style={{ gridColumn: '1 / -1', opacity: 0.6 }}>Share of prompts in each class on which the gate opens (the edit then fires)</div>
        <div />
        {axis}
        {classes.map((c) => {
          const g = d.gate[c.key];
          const share = g.fires / g.n;
          const node = <div><div><b>{c.label}</b></div><div style={{ marginTop: 3 }}>The gate opened on {g.fires} of {g.n} prompts. {c.about}</div></div>;
          return (
            <Fragment key={c.key}>
              <div style={{ lineHeight: 1.2, hyphens: 'none', paddingRight: 4 }}>{c.label}</div>
              <div style={barsCell}>
                <div {...mark(show, hide, node)} style={{ height: 14, position: 'relative' }}>
                  <div style={{ position: 'absolute', left: 0, top: 1, height: 12, width: `${share * 100}%`, background: c.key.startsWith('advice_emergency') ? C.orange : C.blue }} />
                  <span style={{ position: 'absolute', left: `calc(${share * 100}% + 4px)`, top: 0, fontSize: '0.66rem', lineHeight: '14px', whiteSpace: 'nowrap' }}>{g.fires} of {g.n}</span>
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
      <div style={{ ...small, marginTop: 16 }}>The one-word answer to &ldquo;should this person call 911 right now?&rdquo;, by condition</div>
      <div style={{ ...row, marginTop: 6 }}>
        <span style={small}>Condition</span>
        {conds.map(([k, label]) => <button key={k} type="button" aria-pressed={k === cond} style={chip(k === cond)} onClick={() => setCond(k)}>{label}</button>)}
      </div>
      <div className="scrollX" style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.74rem', lineHeight: 1.35, minWidth: 420 }}>
          <thead>
            <tr><th style={th}>class</th><th style={{ ...th, textAlign: 'right' }}>base model</th><th style={{ ...th, textAlign: 'right' }}>{conds.find(([k]) => k === cond)[1]}</th><th style={{ ...th, textAlign: 'right' }}>change</th><th style={{ ...th, textAlign: 'right' }}>cases at even odds or above</th></tr>
          </thead>
          <tbody>
            {withReadout.map((c) => {
              const r = d.gate[c.key].readout;
              const b = r.none; const v = r[cond];
              const delta = v.mean - b.mean;
              const node = <div><div><b>{c.label}</b></div><div style={{ marginTop: 3 }}>Log-odds of &ldquo;Yes&rdquo; against &ldquo;No&rdquo;, mean over the class: base {b.mean > 0 ? '+' : ''}{b.mean}, under this condition {v.mean > 0 ? '+' : ''}{v.mean}. Share of cases at even odds or above: base {(b.share_yes * 100).toFixed(0)} percent, this condition {(v.share_yes * 100).toFixed(0)} percent.</div></div>;
              return (
                <tr key={c.key} {...mark(show, hide, node)}>
                  <td style={td}>{c.label}</td>
                  <td style={{ ...td, textAlign: 'right' }}>{b.mean > 0 ? '+' : ''}{b.mean.toFixed(2)}</td>
                  <td style={{ ...td, textAlign: 'right', color: READOUT[cond], fontWeight: 'bold' }}>{v.mean > 0 ? '+' : ''}{v.mean.toFixed(2)}</td>
                  <td style={{ ...td, textAlign: 'right', background: Math.abs(delta) >= 0.5 ? 'rgba(0,0,0,0.06)' : 'transparent' }}>{delta > 0 ? '+' : ''}{delta.toFixed(2)}</td>
                  <td style={{ ...td, textAlign: 'right' }}>{(b.share_yes * 100).toFixed(0)}% → {(v.share_yes * 100).toFixed(0)}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Hint />
      <Tip tip={tip} />
    </div>
  );
}

// Figure 2: what two blind readers found, by class and condition
export function StanceFig({ src, alt }) {
  const d = useEdu();
  const [sel, setSel] = useState('advice_routine');
  const { ref, tip, show, hide } = useTip();
  if (!d) return <Loading ok={d} src={src} alt={alt} />;
  const conds = d.conds;
  const cls = d.classes.find((c) => c.key === sel);
  const block = d.stance[sel];
  return (
    <div style={wrap} ref={ref}>
      <div style={gridStyle}>
        <div style={{ gridColumn: '1 / -1', opacity: 0.6 }}>What the reply does for the person, as coded by two readers blind to condition (share of replies)</div>
        <div />
        {axis}
        {d.classes.map((c) => (
          <Fragment key={c.key}>
            <div onClick={() => setSel(c.key)} style={{ cursor: 'pointer', lineHeight: 1.2, hyphens: 'none', fontWeight: c.key === sel ? 'bold' : 'normal', paddingRight: 4 }}>{c.label}</div>
            <div onClick={() => setSel(c.key)} style={{ ...barsCell, cursor: 'pointer' }}>
              {conds.map((k) => {
                const b = d.stance[c.key][k.key];
                if (!b) return null;
                return <StackedBar key={k.key} parts={Object.entries(b.stance)} n={b.n} outline={c.key === sel} show={show} hide={hide} node={stanceNode(c.label, k.label, b)} />;
              })}
            </div>
          </Fragment>
        ))}
      </div>
      <div style={legendRow}>
        {Object.entries(STANCE_LABEL).map(([k, label]) => <Swatch key={k} color={STANCE[k]} label={label} />)}
      </div>
      <div style={{ fontSize: '0.76rem', lineHeight: 1.55, marginTop: 10, opacity: 0.85 }}>
        Each class has four bars, one per condition in this order: base model, gated shift, gated random direction, always-on removal. Select a class for its numbers.
      </div>
      <div style={{ ...small, marginTop: 12 }}>{cls.label}, {block.none.n} prompts: {cls.about}</div>
      <div className="scrollX" style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.74rem', lineHeight: 1.35, minWidth: 520, marginTop: 4 }}>
          <thead>
            <tr><th style={th}>condition</th><th style={th}>gate fired</th><th style={th}>education only</th><th style={th}>individualized</th><th style={th}>emergency redirect</th><th style={th}>explains (1 to 3)</th><th style={th}>false statements</th><th style={th}>911 on first line</th><th style={th}>you, your per 100 words</th></tr>
          </thead>
          <tbody>
            {conds.map((k) => {
              const b = block[k.key];
              if (!b) return null;
              return (
                <tr key={k.key}>
                  <td style={td}><Swatch color={COND[k.key]} label={k.label} /></td>
                  <td style={td}>{k.key === 'none' ? '—' : `${b.fired} of ${b.n}`}</td>
                  <td style={td}>{b.stance.education_only}</td><td style={td}>{b.stance.individualized_advice}</td><td style={td}>{b.stance.emergency_redirect}</td>
                  <td style={td}>{b.explains}</td><td style={td}>{b.false}</td><td style={td}>{b.ems_first_line}</td><td style={td}>{b.you_per_100}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Hint />
      <Tip tip={tip} />
    </div>
  );
}

// Figures 3 and 4: dose and referral arms on the three advice classes
function ArmFig({ src, alt, block, title, extra }) {
  const d = useEdu();
  const [sel, setSel] = useState('advice_routine');
  const { ref, tip, show, hide } = useTip();
  if (!d) return <Loading ok={d} src={src} alt={alt} />;
  const f = d[block];
  const classes = d.classes.filter((c) => f.classes[c.key]);
  const cls = classes.find((c) => c.key === sel);
  return (
    <div style={wrap} ref={ref}>
      <div style={gridStyle}>
        <div style={{ gridColumn: '1 / -1', opacity: 0.6 }}>{title}</div>
        <div />
        {axis}
        {classes.map((c) => (
          <Fragment key={c.key}>
            <div onClick={() => setSel(c.key)} style={{ cursor: 'pointer', lineHeight: 1.2, hyphens: 'none', fontWeight: c.key === sel ? 'bold' : 'normal', paddingRight: 4 }}>{c.label}</div>
            <div onClick={() => setSel(c.key)} style={{ ...barsCell, cursor: 'pointer' }}>
              {f.conds.map((k) => {
                const b = f.classes[c.key][k.key];
                return <StackedBar key={k.key} parts={Object.entries(b.stance)} n={b.n} outline={c.key === sel} show={show} hide={hide} node={stanceNode(c.label, k.label, b)} />;
              })}
            </div>
          </Fragment>
        ))}
      </div>
      <div style={legendRow}>
        {Object.entries(STANCE_LABEL).map(([k, label]) => <Swatch key={k} color={STANCE[k]} label={label} />)}
      </div>
      <div style={{ fontSize: '0.76rem', lineHeight: 1.55, marginTop: 10, opacity: 0.85 }}>
        Each class has one bar per arm in this order: {f.conds.map((k) => k.label).join(', ')}. Select a class for its numbers.
      </div>
      <div style={{ ...small, marginTop: 12 }}>{cls.label}, {f.classes[sel].none.n} prompts</div>
      <div className="scrollX" style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.74rem', lineHeight: 1.35, minWidth: 520, marginTop: 4 }}>
          <thead>
            <tr><th style={th}>arm</th><th style={th}>education only</th><th style={th}>individualized</th><th style={th}>explains (1 to 3)</th><th style={th}>false statements</th><th style={th}>names a clinician</th><th style={th}>you, your per 100 words</th>{extra && <th style={th}>{extra.head}</th>}</tr>
          </thead>
          <tbody>
            {f.conds.map((k) => {
              const b = f.classes[sel][k.key];
              return (
                <tr key={k.key}>
                  <td style={td}><Swatch color={COND[k.key]} label={k.label} /></td>
                  <td style={td}>{b.stance.education_only}</td><td style={td}>{b.stance.individualized_advice}</td>
                  <td style={td}>{b.explains}</td><td style={td}>{b.false}</td><td style={td}>{b.referral} of {b.n}</td><td style={td}>{b.you_per_100}</td>
                  {extra && <td style={td}>{extra.cell(b)}</td>}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Hint />
      <Tip tip={tip} />
    </div>
  );
}
export function DoseFig(props) {
  return <ArmFig {...props} block="dose" title="Stance by dose on the three advice classes, as coded by a second pair of readers" extra={{ head: 'replies that loop', cell: (b) => `${b.degenerate} of ${b.n}` }} />;
}
export function ReferralFig(props) {
  return <ArmFig {...props} block="referral" title="Stance under the two ways of keeping a referral, as coded by a third pair of readers" />;
}

// Figure 5: the red team, one row per attack family
export function RedTeamFig({ src, alt }) {
  const d = useEdu();
  const { ref, tip, show, hide } = useTip();
  if (!d) return <Loading ok={d} src={src} alt={alt} />;
  if (!d.redteam) return <div style={{ ...wrap, opacity: 0.6 }}>The red-team numbers are not published yet.</div>;
  const fams = d.redteam.families;
  const LABEL = { disguised_advice: 'advice disguised as a general question', third_person_proxy: 'advice for a named other person', advice_inside_education: 'advice attached to an education question', student_framing: 'a student asks about a patient', calm_emergency: 'an emergency phrased as minor', emergency_in_education: 'a live emergency inside an education question', two_turn: 'the request in a second turn', sloppy_advice: 'typos, run-on text, no question mark', cued_emergency: 'an emergency with an access sentence in front', education_with_dose: 'education questions about doses' };
  return (
    <div style={wrap} ref={ref}>
      <div style={gridStyle}>
        <div style={{ gridColumn: '1 / -1', opacity: 0.6 }}>Share of prompts in each attack family on which the gate opens</div>
        <div />
        {axis}
        {fams.map((f) => {
          const emergency = ['calm_emergency', 'emergency_in_education', 'cued_emergency'].includes(f.key);
          const share = f.fires / f.n;
          const node = <div><div><b>{LABEL[f.key]}</b></div><div style={{ marginTop: 3 }}>{f.about}. Expected: {f.expected}. The gate opened on {f.fires} of {f.n}. Base model: 911 on the first line in {f.none.ems_first_line}, individualized markers in {f.none.individualized}, a clinician named in {f.none.referral}. Edited model: {f.shift_prefill.ems_first_line}, {f.shift_prefill.individualized} and {f.shift_prefill.referral}.</div></div>;
          return (
            <Fragment key={f.key}>
              <div style={{ lineHeight: 1.2, hyphens: 'none', paddingRight: 4 }}>{LABEL[f.key]}</div>
              <div style={barsCell}>
                <div {...mark(show, hide, node)} style={{ height: 14, position: 'relative' }}>
                  <div style={{ position: 'absolute', left: 0, top: 1, height: 12, width: `${share * 100}%`, background: emergency ? C.orange : C.blue }} />
                  <span style={{ position: 'absolute', left: `calc(${share * 100}% + 4px)`, top: 0, fontSize: '0.66rem', lineHeight: '14px', whiteSpace: 'nowrap' }}>{f.fires} of {f.n}</span>
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
      <div style={legendRow}><Swatch color={C.blue} label="families where the gate should open" /><Swatch color={C.orange} label="emergency families where it must stay shut" /></div>
      <div className="scrollX" style={{ overflowX: 'auto', marginTop: 12 }}>
        <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.74rem', lineHeight: 1.35, minWidth: 560 }}>
          <thead>
            <tr><th style={th}>family</th><th style={th}>n</th><th style={th}>gate opens</th><th style={th}>911 first line, base → edited</th><th style={th}>individualized markers, base → edited</th><th style={th}>names a clinician, base → edited</th>{fams[0].readers && <th style={th}>readers: education only, base → edited</th>}{fams[0].readers && <th style={th}>readers: emergency redirect, base → edited</th>}</tr>
          </thead>
          <tbody>
            {fams.map((f) => (
              <tr key={f.key}>
                <td style={{ ...td, whiteSpace: 'normal' }}>{LABEL[f.key]}</td><td style={td}>{f.n}</td><td style={td}>{f.fires}</td>
                <td style={td}>{f.none.ems_first_line} → {f.shift_prefill.ems_first_line}</td>
                <td style={td}>{f.none.individualized} → {f.shift_prefill.individualized}</td>
                <td style={td}>{f.none.referral} → {f.shift_prefill.referral}</td>
                {f.readers && <td style={td}>{f.readers.none['stance:education_only']} → {f.readers.shift_prefill['stance:education_only']}</td>}
                {f.readers && <td style={td}>{f.readers.none['stance:emergency_redirect']} → {f.readers.shift_prefill['stance:emergency_redirect']}</td>}
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
