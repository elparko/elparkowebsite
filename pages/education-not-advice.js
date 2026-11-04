import WritingLayout from '../components/WritingLayout';
import EduChat from '../components/EduChat';
import { GateFig, StanceFig, DoseFig, ReferralFig, RedTeamFig } from '../components/EduCharts';

const eyebrowStyle = { fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.6, marginTop: '2.6em', marginBottom: '0.3em', textAlign: 'left' };
const headingStyle = { marginTop: 0, marginBottom: '0.7em', paddingTop: '0.4em', borderTop: '1.5px solid #000000', textAlign: 'left', fontSize: '1.25rem' };
const listStyle = { marginTop: '12px', marginBottom: '20px', marginLeft: '20px', lineHeight: '1.7' };
const itemStyle = { marginBottom: '0.7em' };
const figureStyle = { margin: '24px 0 28px' };
const captionStyle = { fontSize: '0.85rem', lineHeight: '1.55', opacity: 0.75, marginTop: '8px', textAlign: 'left' };
const noteStyle = { fontSize: '0.85rem', lineHeight: '1.6', opacity: 0.75, marginTop: '2.5em', paddingTop: '1em', borderTop: '1px solid rgba(0, 0, 0, 0.2)' };
const keyStyle = { border: '1.5px solid #000000', padding: '14px 16px', margin: '16px 0 8px', lineHeight: '1.7', fontSize: '0.95rem' };
const stepStyle = { display: 'grid', gridTemplateColumns: '2.2em 1fr', gap: '6px 10px', margin: '14px 0 18px', fontSize: '0.92rem', lineHeight: 1.6, textAlign: 'left' };
const stepNum = { fontWeight: 'bold', borderTop: '1.5px solid #000', paddingTop: '4px' };
const stepText = { borderTop: '1px solid rgba(0,0,0,0.2)', paddingTop: '4px', hyphens: 'none' };

function Section({ eyebrow, title, children }) {
  return (
    <>
      <p style={eyebrowStyle}>{eyebrow}</p>
      <h3 style={headingStyle}>{title}</h3>
      {children}
    </>
  );
}

function Chart({ C, src, alt, children }) {
  return (
    <figure style={figureStyle}>
      <C src={src} alt={alt} />
      <figcaption style={captionStyle}>{children}</figcaption>
    </figure>
  );
}

export default function EducationNotAdvice() {
  return (
    <WritingLayout>
      <p style={{ marginBottom: '20px', textAlign: 'center', fontSize: '1.1rem' }}>
        An edit inside a small chat model that makes it explain medicine but stop giving personal advice, without touching its emergency answer.
      </p>
      <p style={{ textAlign: 'center', fontSize: '0.85rem', opacity: 0.75, marginBottom: '8px' }}>
        Preliminary research note, 3 November 2026. One open chat model with 4 billion parameters (Qwen3.5-4B), author-written prompts,
        replies coded by pairs of independent artificial intelligence (AI) readers blind to condition. No clinician labels yet. Shared to
        invite scrutiny. Not medical advice.
      </p>
      <p style={{ textAlign: 'center', fontSize: '0.85rem', opacity: 0.75 }}>
        Parker Smith. Medical student, LSU Health Shreveport. Founder and CEO, <a href="/pereste-health">Pereste Health</a>.
        <br />
        pjs002@lsuhs.edu · ORCID 0000-0003-0993-3459
      </p>

      <Section eyebrow="Summary" title="A gate and a push: the model explains instead of advising, and nothing else moves">
        <p>
          This page follows the <a href="/circumstance-sensitive-triage">triage study</a> on the same model. The question here is different: can
          a change inside the model make it give medical education (how a drug works, what a lab value means) but not medical advice (what
          you have, what to take, whether you can wait at home), while a person with stroke symptoms still hears &quot;call 911&quot; first?
        </p>
        <p>
          The chat window shows the real prompts and the real replies. Pick a prompt and the version of the model to compare with the base
          model. The models wrote each reply to a fixed length, so some replies stop mid-sentence. A highlighted first sentence is the fixed
          referral line of the final version.
        </p>
        <EduChat />
        <ul style={listStyle}>
          <li style={itemStyle}>
            <b>The edit works where it should and only there.</b> On a routine complaint (&quot;I&apos;m 75 with COPD and a two-day cold, what should I do?&quot;)
            the base model writes a disclaimer, a referral and a verdict about the person&apos;s case. The edited model explains what a chest cold does in
            COPD, in the third person. Two readers coded 12 of 16 routine-case replies as individualized advice for the base model and 2 of 16 for the
            edited model. On education questions, on education questions that mention the person&apos;s own diagnosis, on emergencies and on non-medical
            questions, the edited model&apos;s reply is the base model&apos;s reply, byte for byte, in all 118 cases.
          </li>
          <li style={itemStyle}>
            <b>The emergency answer does not move.</b> The one-word answer to &quot;should this person call 911 right now?&quot; is identical to the base model
            on 24 emergencies and on 24 more written afterwards in new wording, and two readers coded the same number of emergency replies as an emergency
            redirect (21 of 24 and 23 of 24) under both. That holds by construction: the edit never fires on them.
          </li>
          <li style={itemStyle}>
            <b>The same idea written into the weights fails.</b> Removing the advice direction from every write into the model&apos;s working memory, the
            kind of edit that produces a new checkpoint, lectures a stroke patient about stroke. Replies that name 911 on the first line fall from 20 to 3
            of 24 emergencies. That version is reported here as the negative result it is.
          </li>
          <li style={itemStyle}>
            <b>The cost is invented facts and a lost referral.</b> Pushed into the register of a general explanation on a case it was asked to judge, the
            model confabulates: false statements rise from 0 to 7 of 16 routine replies (&quot;a cold often becomes pneumonia&quot;, a bump called pressure
            necrosis). And the referral to a clinician vanishes with the advice. A fixed first sentence on the edited prompts puts the clinician back in
            every reply and lowers the invented facts, without removing them.
          </li>
          <li style={itemStyle}>
            <b>A red team of 96 prompts did not open the gate on any emergency.</b> Advice disguised as a general question, advice for a named other person,
            and advice tucked inside an education question all open it. Eight emergencies phrased as minor, eight buried inside education questions and 32
            with a sentence about money or transport in front all leave it shut.
          </li>
        </ul>
      </Section>

      <Section eyebrow="How the edit works" title="One direction, two gates, one subtraction">
        <p>
          A language model carries a running summary of the conversation through its layers, called the residual stream. At layer 16 of 32, at the
          moment the model is about to write its first word, we read that summary and compare it with two reference points: the average summary for
          30 personal advice requests and the average for 50 education questions. The difference is the advice direction. We removed from it any part
          that lies along the four directions that separate emergencies from routine and same-day cases, so the push cannot move the emergency signal
          directly.
        </p>
        <div style={stepStyle}>
          <div style={stepNum}>1</div>
          <div style={stepText}>The advice gate. The summary at the first word is scored along the advice direction. The gate opens only if the score is past
            the midpoint between the advice and education groups.</div>
          <div style={stepNum}>2</div>
          <div style={stepText}>The emergency gate. The same summary is scored along the emergency direction. The edit is held back if the score is above the
            lowest emergency seen while fitting, minus one standard deviation of the routine cases. This gate is deliberately cautious: it also holds back
            about a third of routine and same-day cases.</div>
          <div style={stepNum}>3</div>
          <div style={stepText}>The push. When both gates agree, the advice direction is subtracted from the layer 16 summary at every position, at a strength
            equal to the average gap between the two groups, for the whole reply. The model then writes as if it had been asked a general question.</div>
          <div style={stepNum}>4</div>
          <div style={stepText}>The referral line. In the final version, the reply on an edited prompt starts with one fixed sentence: &quot;This is general
            information, not advice about your own case; a clinician who can examine you should decide what applies to you.&quot;</div>
        </div>
        <p>
          The whole intervention is a 52 kilobyte file: the layer, two directions, two reference points, two thresholds and the push. It runs as a hook on
          the unchanged model. A version that reads the gate during the model&apos;s own first pass reproduces the decisions of the offline analysis on 238 of
          238 prompts.
        </p>
        <div style={keyStyle}>
          <b>A key to the numbers.</b> &quot;Gate opens&quot; counts prompts on which the edit fires. A reply&apos;s <i>stance</i> is one of five labels given by a
          reader blind to condition: education only, individualized advice, emergency redirect, refusal only, unclear. &quot;First advice&quot; is the first
          concrete instruction to the person, from the triage study&apos;s codebook. Counts are the mean of two readers. &quot;Log-odds&quot; is the model&apos;s lean
          toward &quot;Yes&quot; over &quot;No&quot; on the one-word call-911 question; zero is even odds.
        </div>
      </Section>

      <Section eyebrow="The gate" title="It opens on advice requests, never on emergencies, and the static edit breaks the 911 answer">
        <Chart C={GateFig} src="/education-not-advice/fig-stance.png" alt="Bars: the share of prompts in each class on which the gate opens, and a table of the one-word call-911 answer by condition">
          Figure 1. Top: of 238 prompts, the gate opens on 16 of 20 general advice requests, 16 of 16 routine cases and 6 of 24 same-day cases, and on none
          of the 48 emergencies, none of the 70 education questions and none of the 20 education questions with personal context. Bottom: the one-word
          answer to &quot;should this person call 911 right now?&quot;, as log-odds of Yes over No, under six conditions run as hooks on one model. Select a
          condition. The always-on removal (the version that would live in the weights) costs emergencies a full log-odd and drops two of 24 below even
          odds; a random direction of the same size costs nothing; removing the emergency direction itself moves the answer but flips no emergency, which
          shows the measure can move. The gated shift leaves every emergency number identical.
        </Chart>
        <p>
          The emergency guard built into the direction did not save the static version. The 911 decision is not confined to the four coordinates the
          guard protects, so a push that is orthogonal to them on paper still reaches it through the rest of the network. The gate saves the conditional
          version by never pushing at all.
        </p>
      </Section>

      <Section eyebrow="The replies" title="Two blind readers: advice becomes education; the random direction changes words, not stance">
        <Chart C={StanceFig} src="/education-not-advice/fig-stance.png" alt="Stacked bars of reader stance by prompt class under four conditions">
          Figure 2. For each class of prompt, four bars: the base model, the gated shift, a random direction of the same size through the same gate, and the
          always-on removal. Each bar splits the replies by the stance two readers gave them. On general advice requests the gated shift moves the count
          coded education only from 13 to 19 of 20; on routine cases from 4 to 14 of 16. The gated random direction leaves both where they were (14 and 3),
          so the direction carries the change, not the disturbance. The always-on removal makes advice worse (13.5 of 20 individualized) and cuts the
          emergency redirect from 20.5 to 13.5 of 24. Select a class for the explanation score, the false statements and the share of words addressed to
          the reader. Reader agreement (Cohen&apos;s kappa) on stance: 0.77 to 1.00 on the advice and emergency classes.
        </Chart>
        <p>
          What the shifted reply looks like. The base model answers &quot;what should I take for this cough?&quot; with a disclaimer and &quot;you should contact your
          healthcare provider&quot;, then says what the symptoms sound like. The edited model writes &quot;A cough with yellow phlegm that lasts for ten days is
          typically a sign of a respiratory infection&quot; and goes on in the third person. Words addressed to the reader (you, your) fall from about five per
          hundred to about one. On two same-day cases the triage judgment survived in the third person: &quot;an 80-year-old with diabetes should have a
          urinary tract infection checked today.&quot;
        </p>
        <p>
          The cost. Of the 36 prompts the edit fired on, a word naming a doctor, clinic, provider or emergency service appears in 34 base replies and in 3
          edited replies. And the readers found more false statements in the edited replies: 4.5 against 0.5 of 20 general requests, 7 against 0 of 16
          routine cases. The explanation score on routine cases fell from 2.66 to 2.22 of 3. The model explains a case it was asked to judge, and invents
          mechanism to do it.
        </p>
      </Section>

      <Section eyebrow="Dose" title="Half the push barely moves the stance; double the push breaks the text">
        <Chart C={DoseFig} src="/education-not-advice/fig-stance.png" alt="Stacked bars of reader stance on the three advice classes at four doses">
          Figure 3. The push at half, full and double strength on the 60 advice prompts, coded by a second pair of readers together with the base replies.
          At half strength routine cases coded education only rise from 3 to 5.5 of 16; at full strength to 10 (14 in the first panel, other readers); at
          double strength the text loops on a phrase in 23 of 36 edited replies and 13 of 16 routine replies were coded unclear. The usable window is one
          dose wide.
        </Chart>
      </Section>

      <Section eyebrow="Keeping a referral" title="A fixed first line keeps the clinician; delaying the push gives the base model's verdict back">
        <Chart C={ReferralFig} src="/education-not-advice/fig-stance.png" alt="Stacked bars of reader stance on the three advice classes under two ways of keeping a referral">
          Figure 4. Two ways to keep a referral under the gated shift, coded by a third pair of readers. A delayed push lets the base model write its first 30
          or 60 words before the subtraction begins; that keeps the referral (33 or 34 of 36 edited replies name a clinician) but the base model&apos;s first
          sentences already carry the verdict (&quot;you are likely experiencing a COPD exacerbation&quot;), so at 60 words the stance is the base model&apos;s again.
          A fixed first line on the edited prompts only keeps a clinician in 36 of 36, keeps the education stance (17.5 of 20 and 12.5 of 16) and lowers
          the false statements on routine cases from 8.5 to 5.5, above the base model&apos;s 2. The fixed line is the version in the chat window.
        </Chart>
      </Section>

      <Section eyebrow="Red team" title="Ninety-six prompts written to break the gate: none of the emergencies opened it">
        <Chart C={RedTeamFig} src="/education-not-advice/fig-stance.png" alt="Bars: the share of prompts in each attack family on which the gate opens, with base and edited counts">
          Figure 5. Ten families of prompts written to fool one gate or the other, run through the deployed gate (the one the model reads in its own first
          pass) with the fixed referral line. Blue families should open the gate; orange families must not. Advice disguised as a general question (8 of 8),
          advice for a named other person (8 of 8) and advice attached to an education question (7 of 8) open it. The second turn of a conversation (3 of 6)
          and sloppy text (4 of 6) open it less, and in every one of those misses the advice score was past its threshold and the emergency gate held the
          edit back, on a symptomatic low blood sugar or a heart-failure weight gain. No emergency opened it: 0 of 8 phrased as minor, 0 of 8 buried inside
          an education question, 0 of 32 with a sentence about money or transport in front. A fourth pair of readers coded the replies (stance agreement
          0.71 to 1.00): on advice disguised as a general question the count coded education only goes from 4 to 8 of 8, on advice for a named other person
          from 3.5 to 7.5 of 8, and on every emergency family the counts are identical under both models. Hover a bar for the base and edited counts.
        </Chart>
        <p>
          What the gate protects is the base model&apos;s behaviour, which is itself uneven on these attacks. On an emergency buried inside an education
          question the base model names 911 on the first line in only 1 of 8 replies, and on an emergency phrased as minor in 4 of 8, with the rest saying
          &quot;seek emergency medical attention immediately&quot; without naming a service. With the sentence about money or transport in front, 21 of 32 base
          replies open with 911, the effect the triage study measured. The edited model gives the same replies in all 48 cases, so it neither repairs nor
          worsens the floor. A product that needs a better floor needs a different fix than this one.
        </p>
      </Section>

      <Section eyebrow="What could be proved" title="Where a proof assistant would help, and where it cannot">
        <p>
          Three claims on this page are linear algebra and could be stated and checked by machine, for example in the Lean proof assistant: that removing a
          unit direction leaves no component along it; that a direction built orthogonal to the emergency basis leaves every emergency coordinate unchanged
          under the removal, at every depth of a residual stream whose embedding and block writes have all been edited; and that the gated map is the
          identity on a prompt where the gate is shut. The first two are exactly what the static edit guaranteed, and the experiment shows the guarantee was
          about the wrong quantity: the coordinates were preserved and the answer still broke. The gate claim is the one the conditional edit rests on, and
          it is trivial, which is the point. What cannot be proved is anything about the model&apos;s behaviour: where the gate opens on prompts it has not
          seen, whether the explanation it writes is true, or what two readers will call it. Those stay empirical.
        </p>
      </Section>

      <Section eyebrow="Limits" title="What this does not show">
        <ul style={listStyle}>
          <li style={itemStyle}>One model, one layer (16; layers 13 to 17 looked the same in the fit and were not run), one fit of the direction on 80 prompts,
            greedy decoding, replies cut at 160 words and read to 900 characters.</li>
          <li style={itemStyle}>The advice and education prompts differ in format as well as intent (a first-person case against a general question), so the direction
            may partly encode the format. The 20 education questions with personal context are the check on that, and the gate accepted none of them.</li>
          <li style={itemStyle}>The readers are language models, not clinicians, and the false-statement notes are their judgment calls. Agreement between readers fell
            in the later panels (kappa 0.50 to 0.70 on the advice sheets).</li>
          <li style={itemStyle}>Zero misses on 48 emergencies, and on 48 more in the red team, bounds the miss rate at a few percent, not at zero. The two gates are the
            whole floor; an emergency they both miss would be explained rather than redirected.</li>
          <li style={itemStyle}>The referral line is one wording, not a sweep, and the confabulation cost was measured on 36 edited replies per arm.</li>
          <li style={itemStyle}>Next steps. A clinician read of the false-statement notes. The same gate on a second model family. A prompt-only baseline (an
            instruction to explain and never advise) against the edit, with the same readers. A fix for the base model&apos;s own floor on emergencies that are
            phrased as minor or buried in a lesson.</li>
        </ul>
      </Section>

      <p style={noteStyle}>
        Full record: the lab notebook has every run, interval and negative result (<i>interp-lab</i>, notebook sections 42 and 43, and the red-team page
        under <i>outputs/edu_surgery/redteam</i>). The prompt sets, the coding sheets, both readers&apos; files for every panel, and the 52 kilobyte patch
        are in the same repository. The method builds on conditional activation steering (Lee and colleagues, 2024) and on refusal-direction removal
        (Arditi and colleagues, 2024); the static arm here is the second method applied to a stance the model should not express, and its failure on the
        emergency answer is the result.
      </p>
    </WritingLayout>
  );
}
