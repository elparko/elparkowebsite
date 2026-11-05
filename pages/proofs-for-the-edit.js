import WritingLayout from '../components/WritingLayout';
import ProofFig from '../components/ProofFig';

const eyebrowStyle = { fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.6, marginTop: '2.6em', marginBottom: '0.3em', textAlign: 'left' };
const headingStyle = { marginTop: 0, marginBottom: '0.7em', paddingTop: '0.4em', borderTop: '1.5px solid var(--fg)', textAlign: 'left', fontSize: '1.25rem' };
const listStyle = { marginTop: '12px', marginBottom: '20px', marginLeft: '20px', lineHeight: '1.7' };
const itemStyle = { marginBottom: '0.7em' };
const figureStyle = { margin: '24px 0 28px' };
const captionStyle = { fontSize: '0.85rem', lineHeight: '1.55', opacity: 0.75, marginTop: '8px', textAlign: 'left' };
const noteStyle = { fontSize: '0.85rem', lineHeight: '1.6', opacity: 0.75, marginTop: '2.5em', paddingTop: '1em', borderTop: '1px solid color-mix(in srgb, var(--fg) 20%, transparent)' };
const keyStyle = { border: '1.5px solid var(--fg)', padding: '14px 16px', margin: '16px 0 8px', lineHeight: '1.7', fontSize: '0.95rem' };
const claimStyle = { display: 'grid', gridTemplateColumns: '2.2em 1fr', gap: '6px 10px', margin: '14px 0 18px', fontSize: '0.92rem', lineHeight: 1.6, textAlign: 'left' };
const claimNum = { fontWeight: 'bold', borderTop: '1.5px solid var(--fg)', paddingTop: '4px' };
const claimText = { borderTop: '1px solid color-mix(in srgb, var(--fg) 20%, transparent)', paddingTop: '4px', hyphens: 'none' };
const math = { fontFamily: 'ui-monospace, Menlo, monospace', fontSize: '0.88em', whiteSpace: 'nowrap' };
const th = { padding: '5px 6px', textAlign: 'left', borderBottom: '1.5px solid var(--fg)', fontWeight: 'normal', opacity: 0.6, fontSize: '0.72rem' };
const td = { padding: '6px', borderBottom: '1px solid var(--line)', fontSize: '0.8rem', verticalAlign: 'top' };

function Section({ eyebrow, title, children }) {
  return (
    <>
      <p style={eyebrowStyle}>{eyebrow}</p>
      <h3 style={headingStyle}>{title}</h3>
      {children}
    </>
  );
}

const ROWS = [
  ['Norm of the guarded direction (the theorems need exactly 1)', '0.9999990', 'claims 1 and 3'],
  ['How far the emergency family is from orthonormal (the theorems need exactly orthonormal)', '0.000000002', 'claim 2'],
  ['Largest dot product between the guarded direction and the emergency family (the theorems need 0)', '0.00000007', 'claim 2'],
  ['Dot product of the unguarded advice direction with the emergency direction', '+0.023', 'why the guard was needed'],
  ['Part of the advice direction that lay inside the emergency family, as a share of its length', '0.228', ''],
  ['Component along the removed direction after the removal, on a random vector of length 5,045 (64-bit arithmetic)', '0.00008', 'claim 1'],
  ['Change in the emergency coordinates after that removal', '0.000003', 'claim 2'],
  ['Component along the removed direction in the real model after the weight edit, largest over 32 layers, on vectors of length 2 to 54 (16-bit arithmetic)', '0.010', 'claim 3'],
];

export default function ProofsForTheEdit() {
  return (
    <WritingLayout>
      <p style={{ marginBottom: '20px', textAlign: 'center', fontSize: '1.1rem' }}>
        Eleven short theorems, checked by machine, that say exactly what the education-not-advice edit guarantees, and why that was not enough.
      </p>
      <p style={{ textAlign: 'center', fontSize: '0.85rem', opacity: 0.75, marginBottom: '8px' }}>
        Research note, 3 November 2026. Proofs written in the Lean 4 proof assistant and checked against the Mathlib library (Lean 4.35.0,
        Mathlib v4.35.0). Typeset statements and proofs: <a href="/education-not-advice/invariants.pdf">four pages as a PDF</a>.
      </p>
      <p style={{ textAlign: 'center', fontSize: '0.85rem', opacity: 0.75 }}>
        Parker Smith. Medical student, LSU Health Shreveport. Founder and CEO, <a href="/pereste-health">Pereste Health</a>.
        <br />
        pjs002@lsuhs.edu · ORCID 0000-0003-0993-3459
      </p>

      <Section eyebrow="Summary" title="The guarantee was real, and it was about the wrong quantity">
        <p>
          The <a href="/education-not-advice">education-not-advice page</a> describes two versions of one edit to a small chat model. The
          permanent version removes the &quot;advice direction&quot; from every place the model writes into its working memory, after first
          making that direction orthogonal to the directions that carry the emergency signal, so that, by construction, the emergency
          coordinates pass through untouched. It failed: the model stopped telling a stroke patient to call 911. The switch-and-push version
          leaves the model alone unless two checks pass, and it worked.
        </p>
        <p>
          This page takes the three &quot;by construction&quot; claims behind the permanent version, and the one claim behind the switch, and proves
          them as theorems in a proof assistant. A proof assistant is a program that accepts a statement only when every step of its proof
          follows from the definitions by rules it can check; it cannot be talked into a result. All eleven theorems passed. Then it measures
          how closely the saved edit satisfies the theorems&apos; hypotheses in floating-point arithmetic. The result is a precise reading of the
          experiment: the permanent version preserved every emergency coordinate at every layer, to within rounding, exactly as proved, and the
          call-911 answer still broke, because that answer is not read off those coordinates. The switch version rests on a theorem so
          simple it is one line, which is why it is safe.
        </p>
        <div style={keyStyle}>
          <b>A key to the words on this page.</b> The model&apos;s <i>working memory</i> (the residual stream) is a list of 2,560 numbers that runs
          through the model&apos;s 32 layers; each layer reads it and adds to it. A <i>direction</i> is a list of 2,560 numbers of length 1. The
          <i> coordinate</i> of a state along a direction is their dot product: how far the state leans that way. <i>Removing</i> a direction
          from a state sets that coordinate to zero and leaves the rest. Two directions are <i>orthogonal</i> when their dot product is zero.
          The <i>emergency family</i> is four orthogonal directions along which emergencies differ from routine cases at layer 16.
        </div>
      </Section>

      <Section eyebrow="The four claims" title="What was proved, in words and in symbols">
        <p>
          Everything below is stated for an abstract real inner product space, so it holds in the model&apos;s 2,560 dimensions and in the
          two-dimensional picture under the claims alike. In the symbols, ⟨a, b⟩ is the dot product, ‖a‖ is the length, and
          remove<sub>u</sub>(v) = v − ⟨v, u⟩ u is the removal of the direction u from the state v.
        </p>
        <div style={claimStyle}>
          <div style={claimNum}>1</div>
          <div style={claimText}>Removing a direction leaves nothing along it. If ‖u‖ = 1 then <span style={math}>⟨remove<sub>u</sub>(v), u⟩ = 0</span> for every
            state v. (Lean: <span style={math}>inner_removeAlong_self</span>.) The proof is two lines of algebra: expand the dot product and use
            ⟨u, u⟩ = 1.</div>
          <div style={claimNum}>2</div>
          <div style={claimText}>A guarded direction leaves every emergency coordinate alone. Build the guarded direction by subtracting from the advice
            direction its components along each member of the emergency family. If the family is orthonormal, the guarded direction is
            orthogonal to every member (<span style={math}>inner_guard_eq_zero</span>), stays so when rescaled to length 1
            (<span style={math}>inner_smul_guard_eq_zero</span>), and then <span style={math}>⟨remove<sub>g</sub>(v), e⟩ = ⟨v, e⟩</span> for every
            state v and every member e of the family (<span style={math}>inner_removeAlong_guard</span>).</div>
          <div style={claimNum}>3</div>
          <div style={claimText}>The guarantee reaches every depth. Model the working memory after n layers as the embedding plus the sum of each
            layer&apos;s write, where the writes may be anything. If the direction is removed from the embedding and from every write, the
            memory has no component along it at any depth (<span style={math}>inner_stream_edited_self</span>), and every coordinate orthogonal
            to the removed direction equals what it would be without the removal, for the same writes
            (<span style={math}>inner_stream_edited_coord</span>). The last clause is the whole story: the theorem is about the coordinates of
            whatever the layers write, not about what they write, and the layers of the edited model write different things because they read
            an edited memory.</div>
          <div style={claimNum}>4</div>
          <div style={claimText}>A shut switch is the identity. The conditional edit subtracts the push only when the switch is open
            (<span style={math}>gated_false</span>), the switch is shut whenever the emergency score is above its threshold, whatever the
            advice score (<span style={math}>switch_eq_false_of_emergency</span>), and so on any message with an emergency score above the
            threshold the edited model returns the unchanged state (<span style={math}>gated_switch_identity_of_emergency</span>). This is
            the theorem the working version rests on.</div>
        </div>
        <figure style={figureStyle}>
          <ProofFig />
          <figcaption style={captionStyle}>
            Figure 1. Claims 1 and 2 in two dimensions, computed live. The grey arrow is a fixed state v, the blue arrow is the direction u being
            removed (turn it with the slider), the orange arrow is the emergency axis e, and the green arrow is v with u removed. The first row of
            the table is always zero, whatever the angle: that is claim 1. The last row moves as the angle changes, until the guard is switched
            on and u is made orthogonal to e; then it equals the e-coordinate of v and stays there: that is claim 2. The theorems say the same
            holds in the model&apos;s 2,560 dimensions, for every state and, by claim 3, at every layer.
          </figcaption>
        </figure>
      </Section>

      <Section eyebrow="The measurements" title="The saved edit satisfies the hypotheses to rounding, and the proved invariant holds in the real model">
        <p>
          A theorem is only as good as its hypotheses. The saved edit is a file of 32-bit floating-point numbers, so the guarded direction has
          length 1 only to rounding and the emergency family is orthonormal only to rounding. The table gives the measurements, from the script
          that checks them. The last row is the one that matters most: the permanent removal was applied to the real model&apos;s weights (the
          embedding and all 64 output matrices, in 16-bit arithmetic), and the largest component along the removed direction at any of the 32
          layers, at the moment the model starts its reply, was 0.010 on vectors of length 2 to 54. Claim 3 says zero; 16-bit arithmetic says
          0.010. The invariant held. The call-911 answer broke anyway: replies naming 911 on the first line fell from 20 to 3 of 24 emergencies, as the education-not-advice page reports.
        </p>
        <div className="scrollX" style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 520 }}>
            <thead><tr><th style={th}>quantity</th><th style={{ ...th, textAlign: 'right' }}>value</th><th style={th}>theorem it belongs to</th></tr></thead>
            <tbody>
              {ROWS.map((r) => <tr key={r[0]}><td style={td}>{r[0]}</td><td style={{ ...td, textAlign: 'right', whiteSpace: 'nowrap' }}>{r[1]}</td><td style={td}>{r[2]}</td></tr>)}
            </tbody>
          </table>
        </div>
        <p style={captionStyle}>
          Table 1. Each value is a dot product, a length or a difference of dot products, measured on the saved vectors in 64-bit arithmetic,
          and in the last row on the model&apos;s working memory after the weight edit in 16-bit arithmetic. A value of zero would satisfy the
          theorem exactly; the values shown are the sizes of floating-point rounding.
        </p>
      </Section>

      <Section eyebrow="What a proof buys here" title="Precision about the claim, not confidence in the model">
        <p>
          The proofs did not find a mistake in the edit, and they could not have found the reason it failed, because the reason lies in the
          parts of the model the theorems leave abstract: the normalisation and the attention and feed-forward computations inside each layer,
          which read the whole memory and not only the protected coordinates. What the proofs buy is a clean statement of what &quot;protected by
          construction&quot; meant, so that the sentence &quot;the emergency coordinates were preserved and the answer still broke&quot; is a fact with
          both halves nailed down, not a puzzle. They also pin the working version to its one-line reason: when the switch is shut, nothing
          happens. The empirical questions stay empirical. Where the switch opens on messages it has not seen, whether the explanation the
          edited model writes is true, and what two readers call it are answered on the <a href="/education-not-advice">education-not-advice
          page</a>, not here.
        </p>
      </Section>

      <Section eyebrow="Limits" title="What this page does not show">
        <ul style={listStyle}>
          <li style={itemStyle}>The theorems are about exact real numbers. The model runs in 16-bit floating point, and the table shows the size of
            the gap, which is small but not zero.</li>
          <li style={itemStyle}>The residual-stream model in claim 3 is the sum of the embedding and the layer writes, which is how these models are
            built, but the theorem treats each write as an arbitrary vector and says nothing about how a write depends on the memory it reads.</li>
          <li style={itemStyle}>The switch theorem is about the rule, not about the scores: whether a message gets the right advice score and emergency
            score is the empirical question the other page measures.</li>
          <li style={itemStyle}>Eleven theorems, one file, one evening. The Lean source is 120 lines; a reader who knows Lean can check every step in
            about three minutes of build time.</li>
        </ul>
      </Section>

      <p style={noteStyle}>
        Full record: the Lean file is <i>lean/EduProofs/Invariants.lean</i> in the <i>interp-lab</i> repository, with the project files to rebuild
        it; the typeset statements and proofs are the <a href="/education-not-advice/invariants.pdf">PDF</a>; the numeric check is
        <i> scripts/edu_lean_check.py</i> and its output is under <i>outputs/edu_surgery/lean</i>. The proofs were built on a second machine
        because the Mathlib library needs about 7 gigabytes of disk.
      </p>
    </WritingLayout>
  );
}
