import WritingLayout from '../components/WritingLayout';
import TriageChat from '../components/TriageChat';
import { Fig1, Fig2, Fig3, Fig4, Fig5, Fig6, Fig7, Fig8, Fig9, HaikuGrid, BreadthTable } from '../components/TriageCharts';

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

const CHARTS = { fig1: Fig1, fig2: Fig2, fig3: Fig3, fig4: Fig4, fig5: Fig5, fig6: Fig6, fig7: Fig7, fig8: Fig8, fig9: Fig9 };

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

function FixGrid({ sets, note }) {
  return (
    <div style={{ ...rowsStyle, marginBottom: '10px' }}>
      <p style={{ ...captionStyle, margin: '8px 0' }}>
        {note || 'Each set lists what the system line fixed on the left and what it broke on the right. Benefit: emergency replies that open with call 911. Harm: non-emergencies sent to 911.'}
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
          them off, and tested two fixes. Then we tested 40 more sentences about the patient&apos;s life to ask
          whether the money sentence is special. The chat window shows the real messages and the real replies. Pick a
          patient, a model and the added sentence. The added sentence is highlighted. Replies were generated to a
          fixed length, so some stop mid-sentence.
        </p>
        <TriageChat />
        <ul style={listStyle}>
          <li style={itemStyle}>
            <b>A sentence about money lowers the emergency instruction.</b> With &quot;no insurance, money is
            tight&quot;, 7 of 16 Qwen emergency replies tell a confused diabetic, a stroke patient or a septic
            80-year-old to get to the ER on their own instead of calling 911. On Gemma the same sentence halves the
            &quot;call EMS&quot; replies and three of sixteen say wait at home. A larger commercial model, Claude Haiku
            5.5, keeps &quot;call 911&quot; in 15 or 16 of 16 under every sentence. Wording matters: &quot;I pay for
            every visit myself&quot; changes nothing, and naming the ambulance cost outright makes the model argue it
            down and say &quot;call 911&quot; first every time.
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
          <li style={itemStyle}>
            <b>A fix that waits for the money sentence recovers part of the instruction at a lower price.</b> A gate
            opens only when the model has read a money sentence. It then subtracts the shift that sentence causes in
            the model&apos;s working memory. At layer 12 this restores &quot;call 911&quot; in 3 of the 7 emergency
            replies the sentence had moved. At layer 20 it halves the same-day over-escalation and cuts the routine
            over-escalation by a third to two thirds. Prompts with no such sentence move by 0.13 log-odds or less. It
            does not reach the other barrier sentences.
          </li>
          <li style={itemStyle}>
            <b>The money sentence is one of a crowd.</b> Forty sentences about the patient&apos;s life in 25 families,
            each against a weather sentence of the same length: 24 of 25 families raise the routine &quot;call 911&quot;
            reading, by +1.0 log-odds on average. Hardship (substance use, a bad prior experience, housing, immigration
            status) moves it two to three times as far as the money sentence. Facts that should lower the alarm, good
            insurance or a nurse in the family, raise it too. In the model&apos;s working memory every new direction
            points partly along the money direction, so a wider fix needs a direction fit on the hardship families
            together, or one per family.
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
            that passes on symptoms alone can fail the same patient one sentence later. Any stated fact about the
            person&apos;s life pushes a routine complaint toward 911, and hardship pushes it further.
          </li>
          <li style={itemStyle}>
            <b>Score a fix by harm as well as benefit.</b> The one-line fix repaired every emergency and sent
            borderline patients with the least access to 911. The gated fix repairs less at a smaller price: no
            non-emergency reply sent to 911, and prompts with no money sentence move by 0.13 log-odds or less.
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
        </p>
        <p>
          The aim is that a woman with heart failure four hours from the nearest hospital gets the same first
          instruction as a patient who lives next door to one. She gets it in the first reply, in words that fit her
          life. A chatbot must not talk her out of an ambulance she needs, or send her to one she does not.
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

      <Section eyebrow="Findings" title="A larger model keeps the emergency instruction under every sentence">
        <p>
          The same 192 messages went to Claude Haiku 5.5, a much larger commercial model. It told every emergency
          patient to call 911 first, with or without the money sentence. The one reply that said &quot;go to the
          emergency room&quot; first said so with no added sentence too. On routine complaints its first advice stayed
          home care or a clinic call under every sentence. So the money effect on the two small models is not a
          property of chat models in general. At this size and tuning it is absent.
        </p>
        <p>
          What the sentences did change was the content. Under the money sentence, 15 of 16 emergency replies and 10
          of 16 routine replies talk about cost. Haiku answers the barrier instead of bending to it: it says the
          emergency room must see the patient under EMTALA, the federal law that requires emergency screening
          regardless of ability to pay, and points to charity care. Under &quot;nobody can take me&quot; it adds that
          an ambulance is the ride, and 12 or 13 of 16 routine replies carry a &quot;call 911 if&quot; line, against
          4 of 16 with no sentence. That is the one trace of circumstance-sensitivity in this model, and it runs in
          the safe direction. Haiku is a third option in the chat window and in Figure 1.
        </p>
        <HaikuGrid />
        <p style={captionStyle}>
          Table 3. Claude Haiku 5.5 on the 32 scenarios and six added sentences, coded by two independent coders
          (kappa 0.97 on the first advice). Caveat: the replies came through a coding-agent harness, not a plain chat
          interface, so the paired contrasts between sentences are the comparable quantity and the absolute rates
          depend on the harness. No next-word readouts exist for this model.
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

      <Section eyebrow="Fix" title="A fix that waits for the money sentence recovers part of the instruction at a lower price">
        <p>
          The second fix is narrower than the system line. It acts only when the model has read a money sentence, and
          only on the state the model carries forward from that point. A gate scores the model&apos;s working memory
          along the money direction, the average difference the sentence makes at one layer. When the gate opens, the
          fix subtracts that average difference at the reply opener and at every word the model writes. On a prompt
          that does not open the gate, nothing happens. Eight conditions on every scenario, with a random direction as the
          control, and free replies coded blind by two coders. Both fixed models are in the chat window at the top
          under the money sentence.
        </p>
        <ul style={listStyle}>
          <li style={itemStyle}>
            <b>The gate works.</b> It opens on 94 to 100 percent of money prompts and on none of the emergency or
            same-day prompts without one at layer 12. Under the counter-shifts, prompts with no sentence move by 0.13
            log-odds or less.
          </li>
          <li style={itemStyle}>
            <b>Layer 12 restores part of the emergency instruction.</b> The money sentence had moved 7 of 16 emergency
            replies from &quot;call 911&quot; to &quot;get to the ER yourself&quot;. The fix moves 3 of them back, 9 of 16
            to 12 of 16, both coders. Same-day advice does not change. Routine first advice moves for one or two replies
            per coder, none toward 911.
          </li>
          <li style={itemStyle}>
            <b>Layer 20 cuts the over-escalation.</b> The routine &quot;High over Low&quot; shift falls from +2.37 to +1.49
            log-odds and the same-day &quot;call 911&quot; shift from +0.54 to +0.29, with no measured change to the
            emergency reading. In free replies, 9 or 10 of 16 emergency replies still open with call 911.
            &quot;Go to the ER yourself&quot; falls from 7 to 4 or 5, with one reply per coder moved to home care and one
            to unclear. The home-care reply is a patient with a blood sugar of 40 who is told to take oral glucose
            first. Two routine replies move from a same-day clinic to home care.
          </li>
          <li style={itemStyle}>
            <b>The named risk is real.</b> Removing the part of the money direction that lies inside the model&apos;s
            urgency subspace at layer 12 removes urgency itself: the emergency &quot;call 911&quot; reading falls by 3.3
            log-odds. The random direction changes nothing.
          </li>
          <li style={itemStyle}>
            <b>The fix is specific to the sentence it was built from.</b> On the main set the gate opens for the
            distance, clinic-closed and no-ride sentences too at layer 20. Their emergency &quot;call 911&quot; readings move
            by 0.11 log-odds or less, in the wrong direction, and their emergency urgency label falls by 0.2 to 0.4
            log-odds. Each barrier needs its own direction.
          </li>
        </ul>
        <FixGrid
          note="Each row lists what the gated fix repaired on the left and what it broke on the right, on the 48 money prompts. Benefit: emergency replies that open with call 911. Harm: non-emergencies sent to 911."
          sets={[
            { set: 'Layer 12, counter-shift of the urgency part', benefit: { before: '9 of 16 emergency replies open with call 911', after: '12 of 16, both coders' }, harm: { before: '0 of 16 routine and 0 of 16 same-day replies sent to 911', after: '0 of 16 and 0 of 16' } },
            { set: 'Layer 20, counter-shift of the full direction', benefit: { before: '9 of 16 emergency replies open with call 911', after: '9 or 10 of 16; one reply opens with oral glucose' }, harm: { before: '0 of 16 routine and 0 of 16 same-day replies sent to 911', after: '0 of 16 and 0 of 16; the routine 911 reading moves by +0.18 instead of +0.54' } },
          ]}
        />
        <p style={captionStyle}>
          Table 4. The gated fix against the system line of Table 2. The system line restored 16 of 16 emergency
          replies and sent 12 of 96 routine replies to 911. The gated fix restores 12 of 16 at layer 12 and sends none,
          and no-cue prompts do not change. Coder agreement on first advice: kappa 0.84 to 0.91 on three blind sheets
          of 96.
        </p>
        <Chart fig="fig7" src="/rural-triage/fig7-gated.png" alt="Dot plots of the money-sentence shift that survives each of eight conditions at layers 12 and 20, three arms, three readouts.">
          Figure 7. The money-sentence shift that survives each condition. Pick the layer, the readout and the prompts.
          The gated counter-shifts (green) flatten the shift in the arm their layer controls. The urgency-subspace
          projection (orange) removes the emergency signal itself at layer 12. The random direction (grey) matches no
          change. On prompts with no money sentence, the gated counter-shifts move the readouts by 0.13 log-odds or
          less; the gated removal of the urgency part moves them by up to 0.16.
        </Chart>
        <p>
          Caveats. The direction, the gate and the threshold come from the same 48 scenarios the fix is tested on; the
          replication set is in the queue. At layer 20 the gate opens on 31 percent of emergency prompts with no money
          sentence. Those prompts moved by 0.13 log-odds or less, but that is a false-positive rate to report. The fix leaves 4 of 16
          emergency replies at &quot;get to the ER yourself&quot;, against the system line&apos;s 16 of 16. One model.
        </p>
      </Section>

      <Section eyebrow="Findings" title="Almost any fact about the patient's life raises the alarm on a routine complaint">
        <p>
          Is the money sentence special? To find out we wrote 40 more sentences about a patient&apos;s life, in 25
          named families, and measured each one the same way: against a weather sentence of the same length at the
          same place in the message, on the 48 three-arm scenarios, 2496 readings. Fifteen circumstance families have
          two sentences each (employment, housing, language, immigration status, religion, substance use, disability,
          veteran status, a pregnancy in the household, lives alone, lives with family, a prior bad experience with
          care, no phone or poor signal, cannot read well, caregiver for someone else). Four facts should raise the
          advice (a nurse in the family, a hospital five minutes away, good insurance, a neighbour with a car). Five
          state an identity only (a Louisiana parish, a rural town, a spouse under 65, the patient&apos;s sex, a
          race-coded name). The money sentence is the anchor. The weather sentences are neutral: on every arm the
          filler prompts read within 0.25 log-odds of the prompts with no added sentence. These are readouts, the
          model&apos;s next-word odds, not coded replies; the replies for three families are queued.
        </p>
        <ul style={listStyle}>
          <li style={itemStyle}>
            <b>Twenty-four of 25 families raise the routine &quot;call 911&quot; reading</b> above their weather
            sentence, 23 with an interval that excludes zero. Over the 40 sentences the routine shift averages +1.0
            log-odds of 911 and +1.8 of High over Low urgency. The one exception is the patient&apos;s sex. Same-day
            cases follow at about half the size.
          </li>
          <li style={itemStyle}>
            <b>Hardship moves it two to three times as far as the money sentence.</b> Substance use +2.55, a bad prior
            experience +2.30, housing +1.61, immigration status +1.47 and a pregnancy in the house +1.41, against
            +0.74 for the money sentence.
          </li>
          <li style={itemStyle}>
            <b>Facts that should lower the alarm raise it too.</b> Good insurance +0.31, a nurse down the road +0.34,
            a hospital five minutes away +0.95, a neighbour with a car +1.30. The model does not weigh a fact for or
            against escalation. A stated fact about the person pushes the routine reading up, and hardship pushes it
            further. The one sensible move: a hospital five minutes away cuts the routine ambulance reading by 1.07.
          </li>
          <li style={itemStyle}>
            <b>On emergencies the 911 reading barely moves, but the ride does.</b> Twenty of 25 families sit within
            0.65 log-odds on the emergency &quot;call 911&quot; reading; religion, at +1.14, is the largest, and
            caregiving is the one family that lowers it, by 0.27. The ride readout moves more: an immigration-status
            sentence cuts &quot;ambulance over drive&quot; on an emergency by 0.90 and no phone or poor signal by
            0.78. These are the breadth analogues of the money and no-ride effects above, and the candidates for a
            wider fix.
          </li>
          <li style={itemStyle}>
            <b>Every new direction points partly along the money direction.</b> In the model&apos;s working memory the
            cosine with the money direction is 0.27 to 0.75 at layer 12 and 0.19 to 0.78 at layer 20. Closest:
            immigration status, caregiver, employment and housing (0.7 to 0.8). Farthest: the race-coded name, the
            patient&apos;s sex and good insurance (0.2 to 0.3). Between families the median cosine is about 0.5. So
            the money direction is in part a shared &quot;personal detail stated&quot; direction, which is why the
            gate of the fix above opened on the other barrier sentences. The race-coded name moves the working memory
            farthest of any sentence at layer 20, in a direction nearly at right angles to money, with a small
            readout effect.
          </li>
          <li style={itemStyle}>
            <b>A wider fix needs a direction fit on the hardship families together, or one per family, both
            gated.</b> The counter-shift built from the money sentence did not move the other families, and a cosine
            of 0.6 to 0.8 leaves 36 to 64 percent of each direction&apos;s length outside the money line.
          </li>
        </ul>
        <BreadthTable keys={['substance_use', 'prior_bad_experience', 'housing', 'immigration_status', 'pregnancy_in_household', 'neighbour_with_car', 'hospital_five_minutes', 'uninsured', 'nurse_in_family', 'good_insurance']} />
        <p style={captionStyle}>
          Table 5. Ten of the 25 families: the five largest routine shifts, the four facts that should raise the advice,
          and the money sentence. Each cell is the reading with the sentence minus the reading with the matched weather
          sentence, mean over 16 scenarios per arm (32 pairs for a two-sentence family), with a bootstrap 95 percent
          interval. Bold: at least 1 log-odds with the interval off zero. All 25 families are in Figure 8.
        </p>
        <Chart fig="fig8" src="/rural-triage/fig8-breadth-map.png" alt="Heat map of 25 families of life facts against three arms, three readouts, shift against a matched weather sentence.">
          Figure 8. Shift per family and arm, the sentence minus its matched weather sentence, log-odds, 48 scenarios
          per readout. Pick the readout. Red raises the reading. The routine column is the over-escalation. On the
          ambulance readout the emergency column shows the two families, immigration status and no phone, that pull an
          emergency toward driving, and the neighbour with a car and the nurse in the family that push it toward the
          ambulance.
        </Chart>
        <Chart fig="fig9" src="/rural-triage/fig9-direction-atlas.png" alt="Bars per family of the cosine with the money direction and the part inside the urgency subspace, at layers 12 and 20.">
          Figure 9. The direction atlas. Per family at layers 12 and 20: the cosine with the money direction, and the
          part of the direction inside the model&apos;s urgency subspace, the three-dimensional span of the arm
          averages. The second view is the cosine between every pair of family directions; the closest pairs are
          caregiver with employment, housing and lives alone (0.78 to 0.83), the farthest substance use with cannot
          read well (0.10).
        </Chart>
        <p>
          Caveats. One model. Readouts only so far; the free replies for religion, the parish name and a prior bad
          experience on the emergency arm are queued and will be added here. A weather sentence is a low bar for
          neutral, so +1.0 on average means against a sentence with no personal content. Two sentences per circumstance
          family and one per raise and identity family, so a family number is a two-sentence or a one-sentence estimate.
          The intervals are over the 48 scenarios and do not cover sentence wording.
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
            Two 4-billion-parameter models and one frontier model through an agent harness, author-written
            vignettes, AI-coded replies. No clinician has labelled a case; seven close calls are flagged.
          </li>
          <li style={itemStyle}>
            Many next-word label shifts also appear for control sentences that state no barrier: a sentence about where
            the pills are kept raises routine urgency more than any access cue. The barrier-specific evidence is the
            coded replies, the graded distance curve, the caregiver effect and the insured-against-uninsured pair.
          </li>
          <li style={itemStyle}>The atlas maps what the model reads, not what moves its advice.</li>
          <li style={itemStyle}>
            The breadth map rests on readouts. The coded replies for three of its families are queued; until they land,
            a family number says how the next-word odds moved, not how often the advice changed.
          </li>
          <li style={itemStyle}>
            Next: clinician labels on a four-level scale with harm ratings; the same benchmark on larger local models
            and on frontier models through a plain chat API; the gated fix on the replication set and a direction fit on
            the hardship families together, or one per family; a fine-tuned fix scored the same way; a carbon-monoxide set, since a generator in the carport rarely produced a
            carbon-monoxide warning; the caregiver-voice set; de-identified real messages if an institutional path
            exists.
          </li>
        </ul>
      </Section>

      <p style={noteStyle}>
        Full record: the lab notebook with every run, interval and negative result, the scenario and text-bank files,
        the code and the neuron handoff for the explorer are in the project repository (<i>interp-lab</i>, notebook of
        27 October 2026). This note condenses sections 0 to 29 of that notebook; overnight runs (a fine-tuned fix, an
        independent replication set, control-sentence replies, the coded replies for three breadth families, cue
        order and turns) will be added.
      </p>
    </WritingLayout>
  );
}
