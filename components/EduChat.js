import { useEffect, useRef, useState } from 'react';

const frame = { border: '1px solid #000000', boxShadow: '4px 4px 0 rgba(0, 0, 0, 0.8)', background: '#f5f5dc', margin: '20px 0 28px', textAlign: 'left', fontSize: '0.85rem', lineHeight: '1.6' };
const bar = { display: 'flex', justifyContent: 'space-between', gap: '12px', padding: '8px 14px', background: '#000000', color: '#f5f5dc', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase' };
const controls = { padding: '12px 14px', borderBottom: '1px solid rgba(0, 0, 0, 0.2)', display: 'flex', flexDirection: 'column', gap: '10px' };
const row = { display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' };
const label = { fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.6, minWidth: '6.5em' };
const chip = (on) => ({ font: 'inherit', fontSize: '0.78rem', padding: '3px 9px', border: '1px solid #000000', borderRadius: '999px', background: on ? '#000000' : 'transparent', color: on ? '#f5f5dc' : '#000000', cursor: 'pointer' });
const thread = { padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' };
const patient = { alignSelf: 'flex-end', maxWidth: '88%', padding: '10px 14px', background: '#e6e6d2', color: '#000000', border: '1px solid rgba(0, 0, 0, 0.25)', borderRadius: '14px 14px 3px 14px', hyphens: 'none' };
const assistant = { alignSelf: 'flex-start', maxWidth: '92%', padding: '10px 14px', background: '#ffffff', color: '#000000', border: '1px solid #000000', borderRadius: '14px 14px 14px 3px', hyphens: 'none' };
const edited = { ...assistant, borderWidth: '2px', boxShadow: '3px 3px 0 rgba(0, 114, 178, 0.55)' };
const who = { fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.55, marginBottom: '4px' };
const coded = { fontSize: '0.75rem', opacity: 0.7, padding: '0 14px 12px' };
const prefillMark = { background: '#ffffff', color: '#000000', padding: '0 3px', borderRadius: '3px', boxShadow: '0 0 0 1px #000000' };
const PREFILL = 'This is general information, not advice about your own case; a clinician who can examine you should decide what applies to you.';
const STANCE_LABEL = { education_only: 'education only', individualized_advice: 'individualized advice', emergency_redirect: 'emergency redirect', refusal_only: 'refusal only', unclear: 'unclear' };
const FIRST_LABEL = { ems_now: 'call 911', go_to_er_yourself: 'go to the ER yourself', clinic_today_or_urgent_care: 'clinic today', clinic_routine_or_call_doctor: 'call the doctor', home_care_or_wait: 'home care or wait', unclear: 'unclear' };

function inline(text, keyBase) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => (p.startsWith('**') && p.endsWith('**') ? <b key={keyBase + i}>{p.slice(2, -2)}</b> : p));
}

function Reply({ text }) {
  const pre = text.startsWith(PREFILL);
  const body = pre ? text.slice(PREFILL.length) : text;
  const clean = body.replace(/\r/g, '').replace(/\*+\s*$/, '').replace(/\n\s*([*\-•]|\d+\.)\s*$/, '').trimEnd();
  const cut = !/[.!?)]\s*$/.test(clean);
  const lines = clean.split('\n').map((l) => l.replace(/^#+\s*/, '').trimEnd()).filter((l, i, arr) => l.trim() || (i > 0 && arr[i - 1].trim()));
  const last = lines.map((l) => l.trim()).filter(Boolean).length - 1;
  let seen = -1;
  return (
    <>
      {pre && <p style={{ margin: 0 }}><span style={prefillMark}>{PREFILL}</span></p>}
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
        return <p key={i} style={{ margin: i || pre ? '8px 0 0' : 0 }}>{inline(l, `${i}-`)}{tail}</p>;
      })}
    </>
  );
}

const ddButton = { font: 'inherit', fontSize: '0.8rem', padding: '4px 10px', border: '1px solid #000000', borderRadius: '4px', background: 'transparent', color: '#000000', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px', maxWidth: '100%', textAlign: 'left' };
const ddPanel = { position: 'absolute', zIndex: 6, top: 'calc(100% + 6px)', left: 0, minWidth: '18em', maxWidth: 'calc(100vw - 48px)', background: '#f5f5dc', border: '1px solid #000000', boxShadow: '3px 3px 0 rgba(0, 0, 0, 0.8)', padding: '6px 0', maxHeight: '60vh', overflowY: 'auto' };
const ddGroup = { fontSize: '0.66rem', letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.55, padding: '8px 12px 2px' };
const ddItem = (on, active) => ({ display: 'block', width: '100%', font: 'inherit', fontSize: '0.8rem', textAlign: 'left', padding: '6px 12px', border: 'none', background: active ? 'rgba(0, 0, 0, 0.08)' : 'transparent', color: '#000000', cursor: 'pointer', fontWeight: on ? 'bold' : 'normal', whiteSpace: 'normal' });

function Dropdown({ label: ariaLabel, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef(null);
  const current = options.find((o) => o.value === value);
  useEffect(() => {
    if (!open) return undefined;
    const close = (e) => { if (!root.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', close);
    document.addEventListener('touchstart', close);
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('touchstart', close); };
  }, [open]);
  const choose = (o) => { onChange(o.value); setOpen(false); };
  const onKey = (e) => {
    if (e.key === 'Escape') { setOpen(false); return; }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) { setOpen(true); setActive(Math.max(0, options.findIndex((o) => o.value === value))); return; }
      setActive((i) => (i + (e.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length);
    }
    if ((e.key === 'Enter' || e.key === ' ') && open) { e.preventDefault(); choose(options[active]); }
  };
  const groups = [...new Set(options.map((o) => o.group))];
  return (
    <div ref={root} style={{ position: 'relative', display: 'inline-block', maxWidth: '100%' }} onKeyDown={onKey}>
      <button type="button" style={ddButton} aria-haspopup="listbox" aria-expanded={open} aria-label={ariaLabel}
        onClick={() => { setOpen((v) => !v); setActive(Math.max(0, options.findIndex((o) => o.value === value))); }}>
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{current ? current.label : ariaLabel}</span>
        <span aria-hidden="true" style={{ fontSize: '0.65rem', transform: open ? 'rotate(180deg)' : 'none', display: 'inline-block' }}>▼</span>
      </button>
      {open && (
        <div role="listbox" style={ddPanel}>
          {groups.map((g) => (
            <div key={g}>
              <div style={ddGroup}>{g}</div>
              {options.map((o, i) => (o.group === g ? (
                <button key={o.value} type="button" role="option" aria-selected={o.value === value} style={ddItem(o.value === value, i === active)}
                  onMouseEnter={() => setActive(i)} onClick={() => choose(o)}>{o.label}</button>
              ) : null))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Codes({ r }) {
  if (!r || !r.stance.length) return null;
  return <>stance {r.stance.map((s, i) => `reader ${i + 1}: ${STANCE_LABEL[s] || s}`).join(' · ')}; first advice {r.first.map((s, i) => `reader ${i + 1}: ${FIRST_LABEL[s] || s}`).join(' · ')}{r.false.length ? `; a false statement noted: ${r.false.join('; ')}` : ''}</>;
}

const FAMILY = { disguised_advice: 'advice disguised as a general question', third_person_proxy: 'advice for a named other person', advice_inside_education: 'advice attached to an education question', student_framing: 'a student asks about a patient', calm_emergency: 'an emergency phrased as minor', emergency_in_education: 'a live emergency inside an education question', two_turn: 'the request in a second turn', sloppy_advice: 'typos, run-on text, no question mark', cued_emergency: 'an emergency with an access sentence in front', education_with_dose: 'education questions about doses' };

export default function EduChat() {
  const [data, setData] = useState(null);
  const [set, setSet] = useState('study');
  const [pid, setPid] = useState('main_r03');
  const [cond, setCond] = useState('gated_shift_L16_a1_prefill');

  useEffect(() => {
    fetch('/education-not-advice/conversations.json').then((r) => r.json()).then(setData).catch(() => setData(false));
  }, []);

  if (data === false) return <p style={{ opacity: 0.7 }}>The example conversations did not load.</p>;
  if (!data) return <div style={frame}><div style={bar}><span>prompt</span><span>loading</span></div><div style={thread}>Loading the example conversations.</div></div>;

  const red = set === 'redteam';
  const items = red ? data.redteam.items : data.items;
  const conds = red ? data.redteam.conds : data.conds;
  const item = items.find((x) => x.id === pid) || items[0];
  const available = Object.keys(item.replies).filter((k) => k !== 'none');
  const useCond = available.includes(cond) ? cond : available[0];
  const base = item.replies.none;
  const ed = item.replies[useCond];
  const turns = Array.isArray(item.prompt) ? item.prompt : [{ role: 'user', content: item.prompt }];
  const switchSet = (s) => {
    setSet(s);
    const first = (s === 'redteam' ? data.redteam.items : data.items)[0];
    setPid(s === 'redteam' ? first.id : 'main_r03');
    setCond(s === 'redteam' ? 'shift_prefill' : 'gated_shift_L16_a1_prefill');
  };
  const options = items.map((x) => ({ value: x.id, label: x.label, group: red ? FAMILY[x.family] : data.classes[x.cls] }));

  return (
    <div style={frame}>
      <div style={bar}>
        <span>{red ? `red team · ${FAMILY[item.family]}` : `prompt · ${data.classes[item.cls]}`}</span>
        <span>{ed && ed.fire ? 'gate open' : 'gate shut: reply unchanged'}</span>
      </div>
      <div style={controls}>
        <div style={row}>
          <span style={label}>Set</span>
          <button type="button" style={chip(!red)} onClick={() => switchSet('study')}>the study prompts</button>
          {data.redteam.items.length > 0 && <button type="button" style={chip(red)} onClick={() => switchSet('redteam')}>the red-team prompts</button>}
        </div>
        <div style={row}>
          <span style={label}>Prompt</span>
          <Dropdown label="Prompt" value={item.id} onChange={setPid} options={options} />
        </div>
        <div style={row}>
          <span style={label}>Compare</span>
          {available.map((k) => <button key={k} type="button" style={chip(k === useCond)} onClick={() => setCond(k)}>{conds[k]}</button>)}
        </div>
      </div>
      <div style={thread}>
        {turns.map((t, i) => (
          t.role === 'user'
            ? <div key={i} style={patient}><div style={who}>person{turns.length > 1 ? ` · turn ${Math.floor(i / 2) + 1}` : ''}</div>{t.content}</div>
            : <div key={i} style={assistant}><div style={who}>model, earlier turn (written for the test)</div>{t.content}</div>
        ))}
        <div style={assistant}><div style={who}>base model</div><Reply text={base.reply} /></div>
        {ed && (ed.fire
          ? <div style={edited}><div style={who}>{conds[useCond]}</div><Reply text={ed.reply} /></div>
          : <div style={{ ...assistant, opacity: 0.7 }}><div style={who}>{conds[useCond]}</div>The gate did not open on this prompt, so the edited model gives the base model&apos;s reply, unchanged.</div>)}
      </div>
      {(base.stance.length > 0 || (ed && ed.stance.length > 0)) && (
        <div style={coded}>
          {base.stance.length > 0 && <div>Base model, two readers: <Codes r={base} /></div>}
          {ed && ed.fire && ed.stance.length > 0 && <div>{conds[useCond]}, two readers: <Codes r={ed} /></div>}
        </div>
      )}
    </div>
  );
}
