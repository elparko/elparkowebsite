import { useState } from 'react';

const C = { blue: 'light-dark(#0072b2, #56b4e9)', orange: '#d55e00', green: '#009e73', gray: '#7f7f7f', pink: '#cc79a7' };
const wrap = { textAlign: 'left', fontSize: '0.8rem', lineHeight: '1.5', hyphens: 'none', margin: '18px 0 10px' };
const row = { display: 'flex', flexWrap: 'wrap', gap: '6px 14px', alignItems: 'center', marginBottom: '10px' };
const small = { fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.6 };
const chip = (on) => ({ font: 'inherit', fontSize: '0.78rem', padding: '3px 9px', border: '1px solid var(--fg)', borderRadius: '999px', background: on ? 'var(--fg)' : 'transparent', color: on ? 'var(--bg)' : 'var(--fg)', cursor: 'pointer' });
const th = { padding: '5px 6px', textAlign: 'left', borderBottom: '1.5px solid var(--fg)', fontWeight: 'normal', opacity: 0.6, fontSize: '0.68rem' };
const td = { padding: '6px', borderBottom: '1px solid var(--line)', hyphens: 'none' };

function dot(a, b) { return a[0] * b[0] + a[1] * b[1]; }
function unit(a) { const n = Math.hypot(a[0], a[1]) || 1; return [a[0] / n, a[1] / n]; }
function sub(a, b) { return [a[0] - b[0], a[1] - b[1]]; }
function scale(a, c) { return [a[0] * c, a[1] * c]; }
function fmt(x) { return (Math.abs(x) < 0.005 ? 0 : x).toFixed(2); }

// Figure: the removal of a direction in two dimensions. v is a fixed state; u is the direction removed, set by the
// angle slider; e is the emergency axis. Guarding u makes it orthogonal to e, and then the e-coordinate of the
// removed vector equals that of v. Everything on the figure is computed from the three vectors.
export default function ProofFig() {
  const [deg, setDeg] = useState(35);
  const [guarded, setGuarded] = useState(false);
  const v = [1.6, 1.1];
  const e = [1, 0];
  const raw = [Math.cos((deg * Math.PI) / 180), Math.sin((deg * Math.PI) / 180)];
  const u = guarded ? unit(sub(raw, scale(e, dot(raw, e)))) : raw;
  const removed = sub(v, scale(u, dot(v, u)));
  const S = 58;
  const O = [112, 168];
  const P = (a) => [O[0] + a[0] * S, O[1] - a[1] * S];
  const Arrow = ({ a, color, label, dash }) => {
    const [x, y] = P(a);
    const ang = Math.atan2(-(a[1]), a[0]);
    const hx = x - 9 * Math.cos(ang), hy = y - 9 * Math.sin(ang);
    return (
      <g>
        <line x1={O[0]} y1={O[1]} x2={x} y2={y} style={{ stroke: color }} strokeWidth={2} strokeDasharray={dash ? '4 3' : undefined} />
        <polygon points={`${x},${y} ${hx + 4 * Math.sin(ang)},${hy - 4 * Math.cos(ang)} ${hx - 4 * Math.sin(ang)},${hy + 4 * Math.cos(ang)}`} style={{ fill: color }} />
        <text x={x + 6 * Math.cos(ang) + 2} y={y - 6 * Math.sin(ang) + 4} fontSize="11" style={{ fill: color }} fontFamily="ui-monospace, Menlo, monospace">{label}</text>
      </g>
    );
  };
  const ue = dot(u, e);
  const foot = P(scale(u, dot(v, u)));
  return (
    <div style={wrap}>
      <div style={row}>
        <span style={small}>Direction removed</span>
        <input type="range" min="0" max="180" value={deg} onChange={(ev) => setDeg(Number(ev.target.value))} aria-label="angle of the removed direction" style={{ width: 160 }} />
        <span>{deg}°</span>
        <button type="button" aria-pressed={guarded} style={chip(guarded)} onClick={() => setGuarded((g) => !g)}>{guarded ? 'guard on: u made orthogonal to e' : 'guard off'}</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px 18px', alignItems: 'start' }}>
        <svg viewBox="0 0 300 300" style={{ width: '100%', maxWidth: 300, background: 'light-dark(#ffffff, var(--bg))', border: '1px solid var(--line)' }} role="img" aria-label="Two-dimensional picture of a state vector, the direction removed from it, the emergency axis, and the result of the removal">
          <line x1={10} y1={O[1]} x2={290} y2={O[1]} style={{ stroke: 'var(--line)' }} />
          <line x1={O[0]} y1={10} x2={O[0]} y2={290} style={{ stroke: 'var(--line)' }} />
          <line x1={P(v)[0]} y1={P(v)[1]} x2={foot[0]} y2={foot[1]} stroke={C.gray} strokeDasharray="3 3" />
          <Arrow a={e} color={C.orange} label="e" />
          <Arrow a={u} color={C.blue} label="u" />
          <Arrow a={v} color={C.gray} label="v" />
          <Arrow a={removed} color={C.green} label="v′" />
        </svg>
        <div style={{ flex: '1 1 260px', minWidth: 0 }}>
          <div style={{ fontSize: '0.74rem', marginBottom: 8, display: 'flex', flexWrap: 'wrap', gap: '4px 14px' }}>
            <span style={{ color: C.gray }}>v: the state</span><span style={{ color: C.blue }}>u: the direction removed</span><span style={{ color: C.orange }}>e: the emergency axis</span><span style={{ color: C.green }}>v′: v with u removed</span>
          </div>
          <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.78rem', tableLayout: 'fixed' }}>
            <thead><tr><th style={{ ...th, width: '42%' }}>quantity</th><th style={{ ...th, textAlign: 'right', width: '16%' }}>value</th><th style={th}>what the theorem says</th></tr></thead>
            <tbody>
              <tr><td style={td}>⟨v′, u⟩</td><td style={{ ...td, textAlign: 'right' }}>{fmt(dot(removed, u))}</td><td style={{ ...td, whiteSpace: 'normal' }}>always 0 (claim 1)</td></tr>
              <tr><td style={td}>⟨u, e⟩</td><td style={{ ...td, textAlign: 'right' }}>{fmt(ue)}</td><td style={{ ...td, whiteSpace: 'normal' }}>0 when the guard is on</td></tr>
              <tr><td style={td}>e-coordinate of v</td><td style={{ ...td, textAlign: 'right' }}>{fmt(dot(v, e))}</td><td style={{ ...td, whiteSpace: 'normal' }}></td></tr>
              <tr><td style={td}>e-coordinate after the removal</td><td style={{ ...td, textAlign: 'right', fontWeight: 'bold', color: Math.abs(dot(removed, e) - dot(v, e)) < 0.005 ? C.green : C.pink }}>{fmt(dot(removed, e))}</td><td style={{ ...td, whiteSpace: 'normal' }}>equal to the row above when ⟨u, e⟩ = 0 (claim 2); otherwise it moves</td></tr>
            </tbody>
          </table>
          <div style={{ fontSize: '0.74rem', opacity: 0.7, marginTop: 8 }}>Drag the slider to turn the removed direction. Turn the guard on to make it orthogonal to the emergency axis and watch the e-coordinate stop moving. The theorems say the same holds in 2,560 dimensions, for every state and every depth of the network.</div>
        </div>
      </div>
    </div>
  );
}
