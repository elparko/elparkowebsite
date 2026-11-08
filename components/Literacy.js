import { createContext, useContext, useEffect, useState } from 'react';

// The reading level of a page. 'plain' is short sentences and one claim per figure; 'full' is the
// complete note. Pages opt in with `literacy: true` in lib/pages.mjs and wrap passages in <Plain>.
const TierContext = createContext({ tier: 'full', setTier: () => {} });
const KEY = 'read-as';

export function LiteracyProvider({ enabled, children }) {
  const [tier, setTierState] = useState('full');
  useEffect(() => {
    if (!enabled) return;
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === 'plain' || saved === 'full') setTierState(saved);
    } catch {}
  }, [enabled]);
  const setTier = (t) => {
    setTierState(t);
    try { localStorage.setItem(KEY, t); } catch {}
  };
  return <TierContext.Provider value={{ tier: enabled ? tier : 'full', setTier }}>{children}</TierContext.Provider>;
}

export function useTier() {
  return useContext(TierContext);
}

// Renders `plain` at the plain level and the children at the full level.
// `plain` may be a string or any element. With no `plain`, the passage is dropped at the plain level.
export function Plain({ plain, children }) {
  const { tier } = useTier();
  if (tier !== 'plain') return children;
  if (plain === undefined) return null;
  return typeof plain === 'string' ? <p>{plain}</p> : plain;
}

// Shown only at the full level.
export function Full({ children }) {
  const { tier } = useTier();
  return tier === 'plain' ? null : children;
}

const wrap = { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--fg)', padding: '4px 6px 4px 10px', fontSize: '0.8rem', lineHeight: 1.4, margin: '0 0 1.5rem' };
const seg = (on) => ({ font: 'inherit', fontSize: '0.8rem', padding: '3px 10px', border: '1px solid var(--fg)', background: on ? 'var(--fg)' : 'transparent', color: on ? 'var(--bg)' : 'var(--fg)', cursor: 'pointer' });

export function Dial() {
  const { tier, setTier } = useTier();
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={wrap} role="group" aria-label="Reading level">
        <span>Read as</span>
        <button type="button" className="tapTarget" style={seg(tier === 'plain')} onClick={() => setTier('plain')} aria-pressed={tier === 'plain'}>plain</button>
        <button type="button" className="tapTarget" style={{ ...seg(tier === 'full'), marginLeft: '-1px' }} onClick={() => setTier('full')} aria-pressed={tier === 'full'}>full</button>
      </div>
    </div>
  );
}
