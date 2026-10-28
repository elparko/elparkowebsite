import WritingLayout from '../components/WritingLayout';
import TriageChat from '../components/TriageChat';
import { Fig1, Fig2, Fig3, Fig4, Fig5, Fig6 } from '../components/TriageCharts';

const eyebrowStyle = {
  fontSize: '0.7rem',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  opacity: 0.6,
  marginTop: '2.6em',
  marginBottom: '0.3em',
  textAlign: 'left',
};
const headingStyle = {
  marginTop: 0,
  marginBottom: '0.7em',
  paddingTop: '0.4em',
  borderTop: '1.5px solid #000000',
  textAlign: 'left',
  fontSize: '1.25rem',
};
const listStyle = { marginTop: '12px', marginBottom: '20px', marginLeft: '20px', lineHeight: '1.7' };
const itemStyle = { marginBottom: '0.7em' };
const figureStyle = { margin: '24px 0 28px' };
const imageStyle = { display: 'block', width: '100%', height: 'auto', background: '#ffffff', border: '1px solid rgba(0, 0, 0, 0.15)' };
const captionStyle = { fontSize: '0.85rem', lineHeight: '1.55', opacity: 0.75, marginTop: '8px', textAlign: 'left' };
const noteStyle = { fontSize: '0.85rem', lineHeight: '1.6', opacity: 0.75, marginTop: '2.5em', paddingTop: '1em', borderTop: '1px solid rgba(0, 0, 0, 0.2)' };

function Section({ eyebrow, title, children }) {
  return (
    <>
      <p style={eyebrowStyle}>{eyebrow}</p>
      <h3 style={headingStyle}>{title}</h3>
      {children}
    </>
  );
}

const CHARTS = { fig1: Fig1, fig2: Fig2, fig3: Fig3, fig4: Fig4, fig5: Fig5, fig6: Fig6 };

function Chart({ fig, src, alt, children }) {
  const C = CHARTS[fig];
  return (
    <figure style={figureStyle}>
      <C src={src} alt={alt} />
      <figcaption style={captionStyle}>{children}</figcaption>
    </figure>
  );
}

function Figure({ src, alt, children }) {
  return (
    <figure style={figureStyle}>
      <img src={src} alt={alt} style={imageStyle} />
      <figcaption style={captionStyle}>{children}</figcaption>
    </figure>
  );
}

const rowsStyle = { margin: '14px 0 6px', borderTop: '1.5px solid #000000' };
const rowStyle = { padding: '10px 0', borderBottom: '1px solid rgba(0, 0, 0, 0.2)', fontSize: '0.85rem', lineHeight: '1.55', textAlign: 'left' };
const rowLabel = { fontWeight: 'bold', marginBottom: '4px' };
const cellRow = { display: 'grid', gridTemplateColumns: '5.5em 1fr', gap: '8px', hyphens: 'none' };
const cellHead = { opacity: 0.6 };

const fixSet = { padding: '12px 0', borderBottom: '1px solid rgba(0, 0, 0, 0.2)', fontSize: '0.85rem', lineHeight: '1.55', textAlign: 'left' };
const fixCols = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px 24px', marginTop: '6px' };
const fixHead = { fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.6, marginBottom: '4px' };
const fixLine = { display: 'grid', gridTemplateColumns: '4.2em 1fr', gap: '8px', hyphens: 'none' };
const fixArrow = { opacity: 0.6 };

function FixCell({ head, value, empty }) {
  return (
    <div style={{ borderLeft: '2px solid #000000', paddingLeft: '10px' }}>
      <div style={fixHead}>{head}</div>
      {value ? (
        <>
          <div style={fixLine}><span style={fixArrow}>before</span><span>{value.before}</span></div>
          <div style={fixLine}><span style={fixArrow}>after</span><span>{value.after}</span></div>
        </>
      ) : <div style={{ opacity: 0.6 }}>{empty}</div>}
    </div>
  );
}

function FixGrid({ sets }) {
  return (
    <div style={{ ...rowsStyle, marginBottom: '10px' }}>
      <p style={{ ...captionStyle, margin: '8px 0' }}>
        Each set lists what the system line fixed on the left and what it broke on the right. Benefit: emergency
        replies that open with call 911. Harm: non-emergencies sent to 911.
      </p>
      {sets.map((x) => (
        <div key={x.set} style={fixSet}>
          <div style={rowLabel}>{x.set}</div>
          <div style={fixCols}>
            <FixCell head="Benefit" value={x.benefit} empty="not applicable: no emergencies in this set" />
            <FixCell head="Harm" value={x.harm} empty="not measured on this set" />
          </div>
        </div>
      ))}
    </div>
  );
}

function Rows({ head, rows, note }) {
  return (
    <div style={rowsStyle}>
      {note && <p style={{ ...captionStyle, margin: '8px 0' }}>{note}</p>}
      {rows.map((r) => (
        <div key={r[0]} style={rowStyle}>
          <div style={rowLabel}>{r[0]}</div>
          {r.slice(1).map((c, i) => (
            <div key={head[i + 1]} style={cellRow}><span style={cellHead}>{head[i + 1]}</span><span>{c}</span></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function CircumstanceSensitiveTriage() {
  return (
    <WritingLayout>
      <p style={{ marginBottom: '20px', textAlign: 'center', fontSize: '1.1rem' }}>
        How one sentence about a rural patient&apos;s life shifts emergency advice in small chat models.
      </p>
      <p style={{ textAlign: 'center', fontSize: '0.85rem', opacity: 0.75, marginBottom: '8px' }}>
        Preliminary research note, 27 October 2026. Experiments on two 4-billion-parameter open models,
        with author-written vignettes and AI-coded replies. No clinician labels yet. Shared to invite scrutiny.
        Not medical advice.
      </p>
      <p style={{ textAlign: 'center', fontSize: '0.85rem', opacity: 0.75 }}>
        Parker Smith. Medical student, LSU Health Shreveport. Founder and CEO, <a href="/pereste-health">Pereste Health</a>.
        <br />
        pjs002@lsuhs.edu · ORCID 0000-0003-0993-3459
      </p>

      <Section eyebrow="Summary" title="One sentence about the patient's circumstances changes the advice">
        <p>
          Two small open chat models (Qwen3.5-4B and Gemma-3-4b-it) read messages like the ones older rural patients
          with chronic illness write. We added one sentence about the person&apos;s circumstances and measured what
          changed. Then we looked inside one model for the units that respond to those sentences, tried to switch
          them off, and tested a first fix. The chat window shows the real messages and the real replies. Pick a
          patient, a model and the added sentence. The added sentence is highlighted. Replies were generated to a
          fixed length, so some stop mid-sentence.
        </p>
        <TriageChat />
        <ul style={listStyle}>
          <li style={itemStyle}>
            <b>A sentence about money lowers the emergency instruction.</b> With &quot;no insurance, money is
            tight&quot;, 7 of 16 Qwen emergency replies tell a confused diabetic, a stroke patient or a septic
            80-year-old to get to the ER on their own instead of calling 911. On Gemma the same sentence halves the
            &quot;call EMS&quot; replies and three of sixteen say wait at home. Wording matters: &quot;I pay for every
            visit myself&quot; changes nothing, and naming the ambulance cost outright makes the model argue it down
            and say &quot;call 911&quot; first every time.
          </li>
          <li style={itemStyle}>
            <b>Distance lowers it in proportion to the distance.</b> From 30 minutes to four hours from the hospital,
            both models say &quot;call 911&quot; less at every step on true emergencies (Gemma: -0.4 to -1.9
            log-odds). An ambulance is the one thing that solves distance; the models treat it as a reason to call
            less. On routine complaints the same sentences raise the alarm.
          </li>
          <li style={itemStyle}>
            <b>A sentence of reluctance lowers it on Qwen and raises urgency on routine complaints.</b> &quot;Probably
            just my age&quot;, &quot;I&apos;m not one to make a fuss&quot; and &quot;I&apos;ll talk it over with my
            son&quot; soften the first instruction in emergencies (8 to 10 of 16 replies open with &quot;call
            911&quot;, against 13 of 16 with a neutral sentence) and make the model sterner. On routine complaints they
            make it rate a rash or a refill as more serious. On Gemma only the family sentence moves the advice.
          </li>
          <li style={itemStyle}>
            <b>A message typed by a family member is rated as more urgent</b> than the same words from the patient.
            Largest single effect on the urgency reading; it needs its own study.
          </li>
          <li style={itemStyle}>
            <b>The model infers traits of the person that the message did not state.</b> &quot;No insurance&quot;
            makes it infer low income and distrust of doctors; a far hospital, rural; &quot;nobody can take me&quot;,
            lives alone with no car. Every constraint also makes it infer frailty and poor reading, though no sentence
            said so.
          </li>
          <li style={itemStyle}>
            <b>After the model has advised 911, objections do not change the advice.</b> Objections sent as a second
            message are argued down. The weak moment is the first reply.
          </li>
          <li style={itemStyle}>
            <b>Specific neurons respond to the facts of rural life, and switching them off does not change the
            advice.</b> Housing loss, money strain, the payer&apos;s name, no coverage, medicine supply, living alone,
            transport, trust in doctors, &quot;a reason not to comply&quot;: one patient sentence drives each to 10 to
            30 times its normal level. Switching them off changes nothing. The advice change is spread across the
            model; one direction in its working memory moved it.
          </li>
          <li style={itemStyle}>
            <b>A one-line system instruction restores the emergency advice and over-escalates borderline cases.</b>{' '}
            &quot;Decide from the symptoms alone whether this needs 911&quot; restores &quot;call 911&quot; in 16 of 16
            emergencies under every sentence, and sends one routine patient in eight and up to two thirds of same-day
            cases to 911 when they mention a barrier. Fixes have to be scored on harm.
          </li>
        </ul>
        <p>
          For rural health: a chatbot that is safe for a patient who states only symptoms can be less safe for one who
          also states a barrier or a reluctance, and the direction of the error depends on how sick the person is. Test
          deployments with these sentences, and test fixes on borderline cases, not only on emergencies.
        </p>
      </Section>

      <Section eyebrow="What this means" title="For rural patients with chronic illness">
        <p>
          Older people in rural areas with heart failure, COPD, diabetes or kidney disease already ask chatbots what to
          do. When they do, they say what is true for them: the hospital is far, there is no ride, money is tight, they
          do not want to be a bother. This study shows that those sentences change the advice. A small model tells an
          uninsured stroke patient to get to the ER on their own instead of calling 911. It rates a routine refill as
          more urgent when the person adds that the hospital is far. The words that make the message honest make the
          advice worse, in both directions.
        </p>
        <ul style={listStyle}>
          <li style={itemStyle}>
            <b>Test a health chatbot with the sentences rural patients write,</b> not only with symptoms. A model
            that passes on symptoms alone can fail the same patient one sentence later.
          </li>
          <li style={itemStyle}>
            <b>Score a fix by harm as well as benefit.</b> The one-line fix repaired every emergency and sent
            borderline patients with the least access to 911.
          </li>
          <li style={itemStyle}>
            <b>The problem is not one switch inside the model.</b> The neurons that read these sentences can be
            switched off with no effect. Part of the change travels along one direction in the model&apos;s working
            memory, which is a lead for a real fix.
          </li>
        </ul>
        <p>
          Where this aims to go: a benchmark that any chatbot can be scored on before it is offered to rural
          patients, fixes that keep the emergency instruction without sending the worried well to 911, and, with
          clinician labels, a way to say which replies would have caused harm.
          {/* TODO(human): one or two sentences, in your words, on the future you want this to reach for a rural patient with a chronic condition. */}
        </p>
      </Section>

      <Section eyebrow="Method" title="What we did">
        <p>
          Thirty-two scenarios in two arms (16 textbook emergencies, 16 clearly routine complaints) plus 16 same-day
          cases, in the voice of patients aged 65 to 88 with heart failure, COPD, diabetes, atrial fibrillation, kidney
          disease or recent surgery. Each cue is one sentence inserted before the final question, paired against a
          weather sentence of the same length. Readouts: the model&apos;s next-word probabilities after a fixed prefill
          (High or Low urgency; Yes or No to &quot;call 911 now&quot;; ambulance or drive), and free replies coded by
          two independent AI coders (kappa 0.77 to 1.0). Paired tests within scenario, bootstrap intervals, Holm
          correction. Mechanism: every neuron read at the reply opener and over the cue, trigger sweeps over 474 bank
          texts with falsifier pairs, ablation and steering against random-unit controls, a residual-stream direction
          against a random direction. Cue families: distance, transport, clinic hours, insurance, cost wording, stance,
          caregiver voice, graded doses, and sentences from a literature sweep on rural life.
        </p>
        <Rows
          head={['Design element', 'Choice', 'Why']}
          rows={[
            ['Models', 'Qwen3.5-4B (mechanism and behaviour), Gemma-3-4b-it (behaviour replication)', 'both run locally; two training lineages'],
            ['Control', 'a token-matched weather sentence, plus 16 one-feature control sentences', 'separates the barrier from "an added sentence"'],
            ['Primary measure', 'the first instruction in the free reply, coded by two coders', 'next-word labels move for many non-barrier sentences'],
            ['Negatives reported', 'four interventions that did nothing, with their controls', 'a claimed mechanism must survive its controls'],
          ]}
        />
      </Section>

      <Section eyebrow="Findings" title="Money and the emergency instruction">
        <Chart fig="fig1" src="/rural-triage/fig1-first-advice.png" alt="Stacked bars of the first advice in 16 emergency scenarios, one pair of bars per added sentence.">
          Figure 1. What the reply tells an emergency patient to do first, by added sentence. Qwen3.5-4B, 16 scenarios
          per bar, two coders side by side. With the no-insurance sentence, 7 and 6 of 16 replies say &quot;go to the
          ER yourself&quot;; with the clinic-closed sentence, two; with the other sentences, none.
        </Chart>
        <p>
          The same test on the second model family is behind the model toggle in Figure 1. On Gemma-3-4b-it the
          cost effect replicates and is larger: with the no-insurance sentence, 8 of 16 replies say call EMS now,
          3 say go to the ER yourself, and 3 say wait at home. With no added sentence, 14 of 16 say call EMS now.
        </p>
      </Section>

      <Section eyebrow="Findings" title="The farther the hospital, the less the model says call 911">
        <p>
          An ambulance is the one thing that solves distance. The model treats a far hospital as a reason to call
          one less. So a rural patient who mentions the drive gets weaker emergency advice than one who does not.
          On a routine complaint the same sentence raises the alarm, so the error runs both ways.
        </p>
        <Chart fig="fig2" src="/rural-triage/fig2-dose.png" alt="Six line charts of three readouts against hospital distance and against the size of a past bill.">
          Figure 2. Graded cues on Qwen3.5-4B: the nearest hospital 30 to 240 minutes away, and a past bill of 200 to
          20,000 dollars. Top row: distance; bottom row: the bill. Orange: emergencies; blue: routine complaints. Bands
          are 95% intervals. On emergencies the &quot;call 911&quot; reading falls with each step of distance and the
          &quot;ambulance&quot; reading falls overall; on routine complaints the alarm rises. Gemma shows the same slope,
          steeper.
        </Chart>
      </Section>

      <Section eyebrow="Findings" title="Reluctance, in both directions">
        <Chart fig="fig3" src="/rural-triage/fig3-stance.png" alt="Two bar charts of the emergency and routine readouts for each reluctance sentence.">
          Figure 3. One sentence of reluctance on Qwen3.5-4B. Left: how many of 16 emergency replies open with
          &quot;call 911&quot;. Right: how likely the model is to call a routine complaint High urgency at the start of
          its reply. Orange bars are the stance sentences. Black is the weather sentence. Blue is a smoking-history
          fact. Gray is no sentence, and a neutral self-description.
        </Chart>
      </Section>

      <Section eyebrow="Findings" title="What the model assumes about the person">
        <Chart fig="fig4" src="/rural-triage/fig4-persona.png" alt="Heat map of ten inferred traits against four added sentences.">
          Figure 4. Yes/no questions put to the model after each message (&quot;Based only on this message, does this
          person live in a rural area?&quot;). Cells: the shift in log-odds of Yes when one sentence is added, against
          the weather sentence. Every constraint raises &quot;low health literacy&quot; and &quot;frail&quot;.
        </Chart>
      </Section>

      <Section eyebrow="Inside the model" title="The rural-life units, and what moves the advice">
        <p>
          Forty-four paired test sentences settled the labels of the strongest units. Housing loss fires at 26 on
          &quot;sleeping in my car&quot; and under 1 on &quot;I sleep in my own bed&quot;. Money strain fires at 10 on
          &quot;money is tight&quot;, 4 on &quot;my schedule is tight&quot;, 0.6 on &quot;tight-knit family&quot;. The
          reason-not-to-comply unit fires on &quot;I milk the cows at five&quot;, &quot;nobody can watch the kids&quot;
          and &quot;I do not trust doctors&quot;, and not on &quot;I cannot name the capital of France&quot;. The payer
          unit fires at 17 to 20 on Medicare and Medicaid and near zero on &quot;my plan&quot;. The no-coverage unit
          fires alike on &quot;I cannot afford insurance&quot; and &quot;I came to this country without papers&quot;.
          Three labels failed their own test and were dropped.
        </p>
        <Chart fig="fig5" src="/rural-triage/fig5-atlas.png" alt="Heat map of sixteen named units against thirteen kinds of text.">
          Figure 5. The sixteen most selective units, named by what they respond to, against the kinds of text in the
          bank. Each cell is the unit&apos;s mean activation on that kind of text, in multiples of its largest
          activation on ordinary web text. Clinical notes are the average of four cases in twelve document formats.
        </Chart>
        <p>
          Four interventions did nothing against random controls: switching off the twenty units that read the
          insurance sentence (everywhere, or only on the sentence), pushing the units that shift at the reply opener,
          and pushing the atlas units themselves. The fifth worked: removing one direction from the model&apos;s working
          memory, the average difference the money sentence makes at layer 20, cut the routine over-escalation by a
          third and most of the same-day &quot;call 911&quot; rise, while a random direction did nothing. The units show
          what the model has read; the advice change travels along a direction spread across many of them.
        </p>
        <Chart fig="fig6" src="/rural-triage/fig6-intervention.png" alt="Three dot plots of the no-insurance shift under no ablation, twenty units zeroed, and two random unit sets.">
          Figure 6. Switching off the twenty insurance-reading units everywhere (orange) leaves the cost effect in
          place, and so do two random sets of units (gray). Three arms, three readouts, 16 scenarios each.
        </Chart>
      </Section>

      <Section eyebrow="Fix" title="One line of instruction, and its price">
        <FixGrid
          sets={[
            { set: 'Main set, 6 added sentences', benefit: { before: '10 to 13 of 16 emergency replies open with call 911', after: '16 of 16, under every sentence' }, harm: { before: '2 to 3 of 96 routine replies sent to 911', after: '12 of 96' } },
            { set: 'Stance set, 9 added sentences', benefit: { before: '8 to 14 of 16 emergency replies open with call 911', after: '16 of 16, under every sentence' }, harm: null },
            { set: 'Same-day cases, 16 scenarios', benefit: null, harm: { before: '0 to 2 of 16 sent to 911', after: '6 to 10 of 16 under a barrier sentence; 2 of 16 with "I have good insurance"' } },
          ]}
        />
        <p style={captionStyle}>
          Table 2. The system line &quot;decide from the symptoms alone whether this needs 911, before weighing
          circumstances&quot; repairs the emergency instruction and moves the same error onto borderline patients,
          concentrated among those with the least access. A softer line, a small fine-tune and the direction are under
          test.
        </p>
      </Section>

      <Section eyebrow="Knowledge" title="What the model knows about the rural safety net">
        <p>
          Sixteen factual questions: EMTALA, ambulance response and billing, charity care, community health centers,
          Louisiana Medicaid, Medicare ambulance cover, the insulin cap, nurse lines, 988 from a landline, text-to-911,
          dialysis in a hurricane, insulin without power, the stroke window, home INR checks, 340B. Two answers fully
          correct, seven mostly correct, five wrong or missing a key fact, two unsafe: the model says Louisiana never
          expanded Medicaid (it did, in 2016) and that texting 911 beats calling (it works only where supported). A
          model that argues a cost barrier down with the wrong facts resolves it badly.
        </p>
      </Section>

      <Section eyebrow="Limits and next steps" title="What this does not show">
        <ul style={listStyle}>
          <li style={itemStyle}>
            Two 4-billion-parameter models, author-written vignettes, AI-coded replies. No clinician has
            labelled a case; seven close calls are flagged.
          </li>
          <li style={itemStyle}>
            Many next-word label shifts also appear for control sentences that state no barrier: a sentence about where
            the pills are kept raises routine urgency more than any access cue. The barrier-specific evidence is the
            coded replies, the graded distance curve, the caregiver effect and the insured-against-uninsured pair.
          </li>
          <li style={itemStyle}>The atlas maps what the model reads, not what moves its advice.</li>
          <li style={itemStyle}>
            Next: clinician labels on a four-level scale with harm ratings; the same benchmark on larger local models
            and on frontier models through their APIs; fixes scored as benefit and harm on three arms (system line,
            direction, fine-tune); a carbon-monoxide set, since a generator in the carport rarely produced a
            carbon-monoxide warning; the caregiver-voice set; de-identified real messages if an institutional path
            exists.
          </li>
        </ul>
      </Section>

      <p style={noteStyle}>
        Full record: the lab notebook with every run, interval and negative result, the scenario and text-bank files,
        the code and the neuron handoff for the explorer are in the project repository (<i>interp-lab</i>, notebook of
        27 October 2026). This note condenses sections 0 to 25 of that notebook; overnight runs (a fine-tuned fix, an
        independent replication set, control-sentence replies) will be added.
      </p>
    </WritingLayout>
  );
}
