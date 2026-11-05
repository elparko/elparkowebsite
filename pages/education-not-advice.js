import WritingLayout from '../components/WritingLayout';
import EduChat from '../components/EduChat';
import { GateFig, StanceFig, DoseFig, ReferralFig, RedTeamFig } from '../components/EduCharts';
import { Full, Plain } from '../components/Literacy';

const eyebrowStyle = { fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.6, marginTop: '2.6em', marginBottom: '0.3em', textAlign: 'left' };
const headingStyle = { marginTop: 0, marginBottom: '0.7em', paddingTop: '0.4em', borderTop: '1.5px solid var(--fg)', textAlign: 'left', fontSize: '1.25rem' };
const listStyle = { marginTop: '12px', marginBottom: '20px', marginLeft: '20px', lineHeight: '1.7' };
const itemStyle = { marginBottom: '0.7em' };
const figureStyle = { margin: '24px 0 28px' };
const captionStyle = { fontSize: '0.85rem', lineHeight: '1.55', opacity: 0.75, marginTop: '8px', textAlign: 'left' };
const plainCaptionStyle = { fontSize: '1rem', lineHeight: '1.6', marginTop: '10px', textAlign: 'left' };
const noteStyle = { fontSize: '0.85rem', lineHeight: '1.6', opacity: 0.75, marginTop: '2.5em', paddingTop: '1em', borderTop: '1px solid color-mix(in srgb, var(--fg) 20%, transparent)' };
const keyStyle = { border: '1.5px solid var(--fg)', padding: '14px 16px', margin: '16px 0 8px', lineHeight: '1.7', fontSize: '0.95rem' };
const stepStyle = { display: 'grid', gridTemplateColumns: '2.2em 1fr', gap: '6px 10px', margin: '14px 0 18px', fontSize: '0.92rem', lineHeight: 1.6, textAlign: 'left' };
const stepNum = { fontWeight: 'bold', borderTop: '1.5px solid var(--fg)', paddingTop: '4px' };
const stepText = { borderTop: '1px solid color-mix(in srgb, var(--fg) 20%, transparent)', paddingTop: '4px', hyphens: 'none' };

function Section({ eyebrow, title, plainTitle, children }) {
  return (
    <>
      <p style={eyebrowStyle}>{eyebrow}</p>
      <h3 style={headingStyle}><Plain plain={<>{plainTitle || title}</>}>{title}</Plain></h3>
      {children}
    </>
  );
}

// `plain` is the one sentence the figure says at the plain reading level; the children are the full caption.
function Chart({ C, src, alt, plain, children }) {
  return (
    <figure style={figureStyle}>
      <C src={src} alt={alt} />
      <Plain plain={<figcaption style={plainCaptionStyle}>{plain}</figcaption>}>
        <figcaption style={captionStyle}>{children}</figcaption>
      </Plain>
    </figure>
  );
}

export default function EducationNotAdvice() {
  return (
    <WritingLayout>
      <Plain plain={
        <p style={{ marginBottom: '20px', textAlign: 'center', fontSize: '1.1rem' }}>
          We changed a small chat program so it explains medicine but stops telling you what to do about your own body. If you describe a stroke, it still says call 911 first.
        </p>
      }>
        <p style={{ marginBottom: '20px', textAlign: 'center', fontSize: '1.1rem' }}>
          A change inside a small chat model that makes it explain medicine but stop giving personal advice, while a person with stroke symptoms still hears &quot;call 911&quot; first.
        </p>
      </Plain>
      <Plain plain={
        <p style={{ textAlign: 'center', fontSize: '0.85rem', opacity: 0.75, marginBottom: '8px' }}>
          An early research note from 3 November 2026, corrected and extended on 4 November 2026. The answers were graded by other computer programs, not by doctors. This is shared so people can check it. It is not medical advice.
        </p>
      }>
        <p style={{ textAlign: 'center', fontSize: '0.85rem', opacity: 0.75, marginBottom: '8px' }}>
          Preliminary research note, 3 November 2026; counts corrected and plain-words results added 4 November 2026. One open chat model with 4 billion parameters (Qwen3.5-4B), prompts written by the author,
          replies coded by pairs of independent artificial intelligence (AI) readers who did not know which version of the model wrote each reply.
          No clinician labels yet. Shared to invite scrutiny. Not medical advice.
        </p>
      </Plain>
      <p style={{ textAlign: 'center', fontSize: '0.85rem', opacity: 0.75 }}>
        Parker Smith. Medical student, LSU Health Shreveport. Founder and CEO, <a href="/pereste-health">Pereste Health</a>.
        <br />
        pjs002@lsuhs.edu · ORCID 0000-0003-0993-3459
      </p>

      <Section eyebrow="Summary" title="A switch and a push: the model explains instead of advising, and nothing else changes" plainTitle="What we did, in short">
        <Plain plain={
          <>
            <p>
              Chat programs will happily tell a 74-year-old with heart failure whether their swollen ankles are normal. They should not. Nobody who has not examined you should.
            </p>
            <p>
              So we reached inside one of these programs and changed how it answers. It can still explain what heart failure is and why ankles swell. It no longer tells you whether yours are fine.
            </p>
            <p>
              The window below shows real messages and real answers. Pick a message, then compare the changed program with the original. Answers were cut at a fixed length, so some stop mid-sentence. In the final version, a changed answer starts with one fixed sentence, shown in a box.
            </p>
          </>
        }>
          <p>
            The <a href="/circumstance-sensitive-triage">triage study</a> on this site asked how one sentence about a patient&apos;s life changes a small
            chat model&apos;s emergency advice. This page asks a different question about the same model. Can a change inside the model make it give
            medical education (how a drug works, what a lab value means, what a disease does) but not medical advice (what you have, what to take,
            whether you can wait at home), while a person who describes stroke symptoms still hears &quot;call 911&quot; first?
          </p>
          <p>
            The chat window shows the real messages and the real replies. Pick a message, then pick which version of the model to compare with the
            unchanged model. The models wrote each reply to a fixed length, so some replies stop mid-sentence. In the final version, a reply that the
            model was told to change starts with one fixed sentence, shown with a box around it. We wrote that sentence, so no count of clinicians
            on this page includes it. Reader counts from panels that saw the sentence are marked where they appear.
          </p>
        </Plain>
        <EduChat />
        <Plain plain={
          <ul style={listStyle}>
            <li style={itemStyle}>Before the change, the program gave personal advice to 12 of 16 people who asked about their own case. After the change, to 2 of 16.</li>
            <li style={itemStyle}>For 118 messages that were not asking for personal advice, including the emergencies, the changed program wrote exactly the same words as before.</li>
            <li style={itemStyle}>Every one of 48 emergency messages still got the same answer to &quot;should this person call 911 right now?&quot;</li>
            <li style={itemStyle}>A cruder version of the same idea, baked into the program for good, failed. It lectured a stroke patient about strokes instead of saying call 911.</li>
            <li style={itemStyle}>The change has a cost. When the program explains instead of advising, it sometimes makes things up, and it stops telling people to see a doctor. The final version starts each changed answer with a fixed sentence that names a clinician, but we wrote that sentence. In the program&apos;s own words, only 3 of 36 changed answers mention a doctor.</li>
            <li style={itemStyle}>We wrote 96 messages meant to trick the change. None of the emergencies fooled it.</li>
          </ul>
        }>
          <ul style={listStyle}>
            <li style={itemStyle}>
              <b>The change works where it should and only there.</b> To a 75-year-old with COPD (chronic obstructive pulmonary disease) who has a
              two-day cold and asks what to do, the unchanged model writes a disclaimer, tells the person to contact a provider, and says what the
              symptoms sound like. The changed model explains what a chest cold does to lungs with COPD, in the third person, and does not tell the
              person what they have. Two readers coded 12 of 16 routine-case replies as individualized advice for the unchanged model and 2 of 16 for
              the changed model. On education questions, on education questions that mention the person&apos;s own diagnosis, on emergencies and on
              non-medical questions, the changed model&apos;s reply is the unchanged model&apos;s reply, word for word, in all 118 cases.
            </li>
            <li style={itemStyle}>
              <b>The emergency answer does not move.</b> The model&apos;s one-word answer to &quot;should this person call 911 right now?&quot; is identical
              under the change on 24 emergencies and on 24 more written afterwards in new wording. Two readers coded about the same number of emergency
              replies as a call-911 redirect under both versions: a mean of 20.5 and 21 of 24, and 23 of 24 under both on the new wording. The change never fires on an emergency, so it cannot
              touch the emergency reply.
            </li>
            <li style={itemStyle}>
              <b>The same idea written permanently into the model fails.</b> One way to make the change is to remove the advice direction from every
              place the model writes into its working memory, which produces a new model file with no switch. That version lectures a stroke
              patient about stroke: replies that name 911 on the first line fall from 20 to 3 of 24 emergencies. It is reported on this page as a
              failure.
            </li>
            <li style={itemStyle}>
              <b>The cost is invented facts and a lost referral.</b> When the change pushes the model to explain a case it was asked to judge, the
              model makes up mechanism. In the first reader panel, replies with a false statement rose from 0 to 7 of 16 routine cases (&quot;a URI often becomes pneumonia&quot;;
              a bump on a bed rail called pressure necrosis). And the advice to contact a provider disappears along with the advice about the case:
              a clinician is named in 34 of 36 unchanged replies and in 2 of 36 replies changed without a fixed first sentence. The final version
              starts each changed reply with one fixed sentence that names a clinician. We wrote that sentence, so it is not a result: in that
              version, with the sentence cut off, the model&apos;s own words name a clinician in 3 of 36 changed replies.
            </li>
            <li style={itemStyle}>
              <b>Ninety-six messages written to break the switch did not open it on any emergency.</b> Advice disguised as a general question, advice
              for a named other person, and advice tucked inside an education question all open the switch. Eight emergencies phrased as minor, eight
              buried inside education questions and 32 with a sentence about money or transport in front all leave it shut.
            </li>
          </ul>
        </Plain>
      </Section>

      <Section eyebrow="How the change works" title="One direction, two checks, one push" plainTitle="How the change works">
        <Plain plain={
          <>
            <p>
              As a chat program reads your message, it keeps a running summary of it as a long list of numbers. We looked at that summary partway through, at the moment the program is about to write its first word.
            </p>
            <p>
              We compared the summaries for 30 messages asking for personal advice with the summaries for 50 messages asking general questions. The difference between them points in one direction. Call it the advice direction. It is the way the summary leans when someone is asking what to do.
            </p>
            <p>
              The change is a switch and a push. The switch has two checks. Does this message lean toward advice? And does it look like an emergency? Only when the answers are yes and no does the push happen. The push nudges the summary away from the advice direction, and the program then writes as if it had been asked a general question.
            </p>
            <p>
              In the final version, every changed answer also starts with one fixed sentence: &quot;This is general information, not advice about your own case; a clinician who can examine you should decide what applies to you.&quot; We wrote that sentence, so nothing on this page counts it as the program&apos;s words.
            </p>
            <p>
              The whole change is a file of 52 kilobytes that runs alongside the unchanged program.
            </p>
          </>
        }>
          <p>
            A chat model carries a running summary of the conversation through its layers as a list of numbers, called the residual stream. At layer
            16 of 32, at the moment the model is about to write its first word, we read that summary. We compared the average summary for 30 personal
            advice requests with the average for 50 education questions. The difference between the two averages is the advice direction: the way
            the summary leans when the person is asking what to do. We removed from that direction any part that lies along the four directions
            that separate emergencies from routine and same-day cases, so the push cannot move the emergency signal directly.
          </p>
          <div style={stepStyle}>
            <div style={stepNum}>1</div>
            <div style={stepText}>The advice check. The summary at the first word is scored along the advice direction. The switch opens only if the
              score is past the midpoint between the advice group and the education group.</div>
            <div style={stepNum}>2</div>
            <div style={stepText}>The emergency check. The same summary is scored along the emergency direction. The switch stays shut if the score is
              above the lowest emergency seen while fitting, minus one standard deviation of the routine cases. This check is cautious on purpose:
              it also keeps the switch shut on about a third of routine and same-day cases.</div>
            <div style={stepNum}>3</div>
            <div style={stepText}>The push. When both checks agree, the advice direction is subtracted from the layer-16 summary at every word of the
              message and every word of the reply, at a strength equal to the average gap between the two groups. The model then writes as if it had
              been asked a general question.</div>
            <div style={stepNum}>4</div>
            <div style={stepText}>The referral line. In the final version, a reply on a message where the switch opened starts with one fixed sentence:
              &quot;This is general information, not advice about your own case; a clinician who can examine you should decide what applies to
              you.&quot; It is not scored: every count of clinicians on this page is on the model&apos;s own words, with the sentence cut off.</div>
          </div>
          <p>
            The whole change is a 52 kilobyte file: the layer, two directions, two reference points, two thresholds and the push. It runs as a small
            piece of code attached to the unchanged model. A version that reads the checks during the model&apos;s own first pass over the message made
            the same decision as the offline analysis on 238 of 238 messages for the two checks; with the one-word 911 check that the offline
            analysis also applies, the two differ on 2 of 238.
          </p>
          <div style={keyStyle}>
            <b>A key to the numbers on this page.</b> &quot;Switch opens&quot; counts the messages on which the change fires. A reply&apos;s <i>stance</i> is
            one of five labels given by a reader who did not know which version wrote the reply: education only (explains, does not tell the person
            what they have or what to do), individualized advice (tells this person what they have, what to take, or that they can wait),
            emergency redirect (the first instruction is call 911), refusal only, unclear. &quot;First advice&quot; is the first concrete instruction to
            the person, using the triage study&apos;s codebook. Counts are the mean of two readers, so they can end in .5. &quot;Log-odds&quot; measures how
            strongly the model leans toward &quot;Yes&quot; over &quot;No&quot; on the one-word call-911 question; zero is even odds, +2 means Yes is about seven times
            more likely than No, +4 about fifty-five times.
          </div>
        </Plain>
      </Section>

      <Section eyebrow="The switch" title="It opens on advice requests, never on emergencies, and the permanent version breaks the 911 answer" plainTitle="When the switch opens">
        <Chart
          C={GateFig}
          src="/education-not-advice/fig-stance.png"
          alt="Bars: the share of messages in each class on which the switch opens, and a table of the one-word call-911 answer by condition"
          plain="The switch opened on most requests for personal advice and on none of the 48 emergencies, none of the 70 general questions, and none of the 20 general questions that mentioned the person's own diagnosis."
        >
          Figure 1. Top: each bar is the share of messages in one class on which the switch opened and the reply was changed. Of 238 messages, the
          switch opened on 16 of 20 general advice requests, 16 of 16 routine cases and 6 of 24 same-day cases, and on none of the 48 emergencies,
          none of the 70 education questions, none of the 20 education questions with personal context and 1 of 30 patient-bank questions. The
          bars count the version that reads the checks during the model&apos;s own first pass; the offline analysis behind the replies on this page
          also applies the one-word 911 check and opened the switch on 14 of the 16 routine cases. Bottom: each number is the model&apos;s
          lean toward &quot;Yes&quot; on &quot;should this person call 911 right now?&quot;, in log-odds, averaged over the class, under six versions of the
          model. Select a version. On emergencies, a lower number is harm. The permanent removal (the version with no switch) costs emergencies a full
          log-odd and drops two of 24 below even odds. A random direction of the same size costs nothing. Removing the emergency direction itself
          lowers the number by 1.6 but flips no emergency, which shows the measure can move. The switch-and-push version leaves every emergency
          number identical to the unchanged model.
        </Chart>
        <Plain plain="We also tried baking the change into the program permanently, with no switch. That version made the program less sure that an emergency was an emergency. The switch-and-push version is safe for a simple reason: on an emergency it never pushes at all.">
          <p>
            The emergency guard built into the direction did not save the permanent version. The call-911 decision is not confined to the four
            coordinates the guard protects, so a push that avoids those coordinates on paper still reaches the decision through the rest of the
            network. The switch-and-push version is safe for a simpler reason: on an emergency it never pushes at all.
          </p>
        </Plain>
      </Section>

      <Section eyebrow="The replies" title="Two readers who did not know the version: advice becomes education, and a random push changes words but not the stance" plainTitle="What the answers looked like">
        <Chart
          C={StanceFig}
          src="/education-not-advice/fig-stance.png"
          alt="Stacked bars of reader stance by prompt class under four conditions"
          plain="Two readers who did not know which version they were reading judged each answer. For people asking about their own routine problem, answers that only explained rose from 4 of 16 to 14 of 16. A random nudge of the same size changed nothing, so the advice direction is what matters."
        >
          Figure 2. For each class of message, four bars: the unchanged model, the switch-and-push change, a random push of the same size through
          the same switch, and the permanent removal with no switch. Each bar splits the replies by the stance two readers gave them, so a bar that
          is mostly green means most replies explained without telling the person what to do. On general advice requests the switch-and-push change
          moves the count coded education only from 13 to 19 of 20; on routine cases from 4 to 14 of 16. The random push leaves both where they were
          (14 and 3), so the advice direction carries the change, not the disturbance. The permanent removal makes advice worse (13.5 of 20
          individualized) and cuts the call-911 redirect from 20.5 to 13.5 of 24 emergencies. Select a class for the explanation score, the count of
          replies with a false statement and the share of words addressed to the reader. Agreement between the two readers on the stance (Cohen&apos;s
          kappa, where 1 is perfect agreement) was 0.77 to 1.00 on the advice and emergency classes.
        </Chart>
        <Plain plain={
          <>
            <p>
              Asked &quot;what should I take for this cough?&quot;, the original program gives a disclaimer, says to contact a provider, then says what the symptoms sound like. The changed program writes &quot;A cough with yellow phlegm that lasts for ten days is typically a sign of a respiratory infection&quot; and keeps explaining, without saying &quot;you&quot;.
            </p>
            <p>
              The cost: of 36 changed answers, only 2 mentioned a doctor, clinic, or emergency service, down from 34. The changed answers also contained more false statements. When the program is pushed to explain a case it was asked to judge, it sometimes invents the explanation.
            </p>
          </>
        }>
          <p>
            What a changed reply looks like. The unchanged model answers &quot;what should I take for this cough?&quot; with a disclaimer and &quot;you should
            contact your healthcare provider&quot;, then says what the symptoms sound like. The changed model writes &quot;A cough with yellow phlegm that lasts
            for ten days is typically a sign of a respiratory infection&quot; and goes on in the third person. Words addressed to the reader (you, your)
            fall from 5.3 to 1.1 per hundred words on routine cases and from 4.0 to 1.4 on general requests. On two same-day cases the model&apos;s judgment survived in the third person: &quot;an
            80-year-old with diabetes should have a urinary tract infection checked today.&quot;
          </p>
          <p>
            The cost. Of the 36 messages the switch opened on, a word naming a doctor, clinic, provider or emergency service appears in 34 unchanged
            replies and in 2 changed replies. The readers also found more false statements in the changed replies: 4.5 against 0.5 of 20 general
            requests, and 7 against 0 of 16 routine cases. The explanation score on routine cases (1 to 3, where 3 is a clear and correct explanation)
            fell from 2.66 to 2.22. The model explains a case it was asked to judge, and invents mechanism to do it.
          </p>
        </Plain>
      </Section>

      <Section eyebrow="Dose" title="Half the push barely moves the stance; double the push breaks the text" plainTitle="How hard to push">
        <Chart
          C={DoseFig}
          src="/education-not-advice/fig-stance.png"
          alt="Stacked bars of reader stance on the three advice classes at four doses"
          plain="Half the push barely changed the answers. Double the push broke them: the text started repeating itself in 23 of 36 changed answers. There is one strength that works."
        >
          Figure 3. Each bar splits the replies on one class of message by the stance two readers gave them, for the push at half, full and double
          strength on the 60 advice messages, coded by a second pair of readers together with the unchanged replies. At half strength, routine cases
          coded education only rise from 3 to 5.5 of 16. At full strength they rise to 10 of 16 with this pair of readers (14 of 16 with the first
          pair). At double strength the text loops on a phrase in 23 of 36 changed replies, and 13 of 16 routine replies were coded unclear. The
          usable range is one dose wide.
        </Chart>
      </Section>

      <Section eyebrow="Keeping a referral" title="A fixed first line puts a clinician in every reply only because we wrote it; delaying the push gives the model's verdict back" plainTitle="Keeping the doctor in the answer">
        <Chart
          C={ReferralFig}
          src="/education-not-advice/fig-stance.png"
          alt="Stacked bars of reader stance on the three advice classes under two ways of keeping a referral"
          plain="Starting every changed answer with one fixed sentence that names a clinician puts a doctor in all 36 answers, but only because we wrote that sentence. In the program's own words, 3 of 36 answers mention a doctor. The sentence is the version shown in the chat window, as a wrapper around the program, not something the program learned."
        >
          Figure 4. Each bar splits the replies on one class of message by the stance two readers gave them, for two ways of keeping a referral under
          the switch-and-push change, coded by a third pair of readers. A delayed push lets the unchanged model write its first 30 or 60 tokens before
          the subtraction begins. That keeps the referral (33 or 34 of 36 changed replies name a clinician), but the model&apos;s first sentences already
          carry its verdict (&quot;you are likely experiencing an acute exacerbation of COPD&quot;), so at 60 tokens the stance stays close to the unchanged model&apos;s: 12 of 20 general requests and 6.5 of 16 routine
          cases are coded education only, against 9 and 3 for the unchanged model. A
          fixed first line on the changed replies names a clinician in every changed reply because the line itself names one. With the line cut
          off, the model&apos;s own words name a clinician in 3 of 36 changed replies (notebook section 46). The table&apos;s clinician column counts the same way over every message in each class, including messages on
          which the switch stayed shut.
          The readers coded this version with the line in view: 17.5 of 20 general requests and 12.5 of 16 routine cases education only, and 5.5
          routine replies with a false statement, against 8.5 without the line and 2 for the unchanged model. Those reader counts describe replies
          shown with the line, not the model alone. The fixed line is the version shown in the chat window.
        </Chart>
      </Section>

      <Section eyebrow="Messages written to break the switch" title="Ninety-six messages in ten families: none of the emergencies opened it" plainTitle="Trying to trick it">
        <Chart
          C={RedTeamFig}
          src="/education-not-advice/fig-stance.png"
          alt="Bars: the share of messages in each attack family on which the switch opens, with unchanged and changed counts"
          plain="We wrote 96 messages in ten styles meant to fool the switch. Advice dressed up as a general question did open it, which is what we wanted. Emergencies phrased as minor, emergencies hidden inside a lesson, and emergencies with a sentence about money or transport in front never opened it: 0 of 48."
        >
          Figure 5. Each bar is the share of messages in one family on which the switch opened. The ten families were written to fool one check or the
          other and were run through the version of the switch that reads the model&apos;s own first pass, with the fixed referral line. Blue families
          should open the switch; orange families must not. Advice disguised as a general question (8 of 8), advice for a named other person (8 of 8)
          and advice attached to an education question (7 of 8) open it. The second turn of a conversation (3 of 6) and sloppy text with typos (4 of
          6) open it less often, and in every one of those cases the advice score was past its threshold and the emergency check held the push back,
          on a symptomatic low blood sugar or a heart-failure weight gain. No emergency opened it: 0 of 8 phrased as minor, 0 of 8 buried inside an
          education question, 0 of 32 with a sentence about money or transport in front. A fourth pair of readers coded the replies, with the fixed line in view on the changed ones (agreement on
          stance 0.71 to 1.00), so the reader counts here describe replies shown with the line. On advice disguised as a general question, replies coded education only go from 4 to 8 of 8; on advice for a named
          other person from 3.5 to 7.5 of 8; on every emergency family the reader counts and the 911 counts are identical under both versions. The clinician counts in the table are on the model&apos;s own
          words, with the fixed line cut off. Hover a bar for the counts.
        </Chart>
        <Plain plain="One thing the change cannot fix: the original program is already uneven on tricky emergencies. When an emergency is hidden inside a lesson, the original names 911 first in only 1 of 8 answers. The changed program gives the same answers in those cases, so it neither helps nor hurts there.">
          <p>
            What the switch protects is the unchanged model&apos;s behaviour, and on these messages that behaviour is uneven. On an emergency buried
            inside an education question the unchanged model names 911 on the first line in only 1 of 8 replies, and on an emergency phrased as minor
            in 4 of 8. The other replies say &quot;seek emergency medical attention immediately&quot; without naming a service. With a sentence about money or
            transport in front, 21 of 32 unchanged replies open with 911, the same loss the triage study measured. The changed model gives the same
            replies in all 48 of these cases, so it neither repairs nor worsens them. A product that needs a stronger emergency floor needs a different
            fix than the one on this page.
          </p>
        </Plain>
      </Section>

      <Section eyebrow="Plain words" title="A second direction at layer 16 lowers the reading grade; on advice requests it holds up only on top of the switch, at half strength" plainTitle="Simpler words">
        <Plain plain={
          <>
            <p>
              The changed program explains instead of advising, but it explains like a textbook. A second change, found the same way, makes it use plain words.
            </p>
            <p>
              On 16 health questions written the way an older rural patient might ask them (&quot;Why do I have to take a water pill every morning?&quot;), the original program wrote at about an 8th-grade level. The plain-words change brought it to about a 5th-grade level, the same as telling the program to use plain words. A random change of the same size did nothing.
            </p>
            <p>
              On its own, the plain-words change is not safe: it made advice more personal and weakened the 911 answer on some emergencies. On top of the switch at half strength, it kept call 911 as the first step on the same 45 of 48 emergencies as the original program and lowered the reading level of the changed answers from about 10th grade to about 7th grade. Stronger settings made the text repeat, dropped call 911 as the first step on some emergencies, or added false statements.
            </p>
            <p>
              Simpler words do not fix a misread question. Every version, including the original, read &quot;my heart&apos;s got a fib&quot; as a lump of scar tissue instead of atrial fibrillation.
            </p>
          </>
        }>
          <p>
            Notebook section 44 fits a plain-words direction the way the advice direction was fitted. The unchanged model answered 32 education
            questions written in an older rural adult&apos;s own words three times: with no system line, with a line asking for a medical-student
            explanation, and with a line asking for plain words for someone who left school early. Those replies score at Flesch-Kincaid reading
            grades 8.4, 15.3 and 4.8. The direction is the difference between the model&apos;s averaged layer-16 state over the plain-line replies and
            over the no-line replies, fitted on half the questions. Added at every generated token with no system line, it lowers the grade on the
            other 16 questions from 8.4 to 4.8, the same as the plain system line, while a random direction of the same size leaves it between 8.5 and 10.1. Two blind
            readers rated plainness on a 1 to 5 scale at 2.47 for the unchanged model, 4.19 for the plain system line and 4.06 for the direction, and
            flagged a false statement in 6, 5 and 4 of 32 ratings. No single neuron reproduces it: of 12 candidates, the best one whose text stayed coherent
            (layer 17, neuron 3082) lowered the grade by 2.1, against 3.6 for the direction.
          </p>
          <p>
            Plain output does not repair a misread question. In every version, including the unchanged model, the model read &quot;my heart&apos;s got
            a fib&quot; as a fibroma or scar tissue, not atrial fibrillation.
          </p>
          <p>
            Section 45 tests the direction together with the switch. On its own, at the strength that works on education questions, it makes advice
            replies more personal (27 of 36 coded as individualized advice, from 22) and lowers the readers&apos; mean count of &quot;call 911&quot; as the first
            instruction on the 48 emergencies from 45 to 39. On top of the switch at half that strength, it keeps &quot;call 911&quot; first on the same 45
            of 48 emergencies as the unchanged model, keeps the education stance on 30 of 36 changed advice replies (33 for the switch alone; the
            readers saw the fixed line), lowers the replies with a false statement from 13 to 9 of 36 (also coded with the fixed line in view), and lowers the reading grade of the
            model&apos;s own words from 9.9 to 6.6 (section 46). Stronger settings repeat (11 of 36 replies at 1.5 times the half strength, 26 of 36 at
            full strength) or drop the 911 opening (41 of 48 at 1.5 times). Each edit works only in a narrow range of strength, and two edits that
            each sit inside their own range can fall outside it together.
          </p>
        </Plain>
      </Section>

      <Section eyebrow="What was proved" title="Eleven theorems, checked by machine, say what the permanent version guaranteed" plainTitle="What was proved">
        <Plain plain={
          <p>
            Three of the claims on this page are pure mathematics, and a computer has checked the proofs, on a <a href="/proofs-for-the-edit">separate page</a>. The proofs say exactly what the permanent version guaranteed. It kept that guarantee and still broke the 911 answer, because the 911 answer does not live where the guarantee looks. What the proofs cannot say is how the program will behave on a message it has never seen. That has to be measured.
          </p>
        }>
          <p>
            Three claims on this page are linear algebra, and they have now been proved in the Lean proof assistant, on a
            <a href="/proofs-for-the-edit"> separate page</a>. Removing a unit direction from a vector leaves no component along that direction. A
            direction built orthogonal to the emergency directions leaves every emergency coordinate unchanged under the removal, at every depth of
            a network whose embedding and layer writes have all been edited. And on a message where the switch is shut, the changed model is the
            unchanged model. The first two are exactly what the permanent version guaranteed, and the measurements confirm it held in the real model
            to within rounding; the call-911 answer broke anyway, because that answer is not read off the protected coordinates. The third is the
            one-line reason the switch-and-push version is safe. What cannot be proved is anything about the model&apos;s behaviour: where the
            switch opens on messages it has not seen, whether the explanation it writes is true, or what two readers will call it. Those stay
            empirical.
          </p>
        </Plain>
      </Section>

      <Section eyebrow="Limits" title="What this page does not show">
        <Plain plain={
          <ul style={listStyle}>
            <li style={itemStyle}>This is one program, tested one way, by one person.</li>
            <li style={itemStyle}>The answers were graded by other computer programs, not by doctors.</li>
            <li style={itemStyle}>No emergency got past the switch in 96 tries. That means the miss rate is small, not zero.</li>
            <li style={itemStyle}>Next: have a clinician read the false statements, try the same change on a second program, and compare it with simply instructing the program to explain and never advise.</li>
          </ul>
        }>
          <ul style={listStyle}>
            <li style={itemStyle}>One model, one layer (16; layers 13 to 17 looked the same when the direction was fitted and were not run), one fit of
              the direction on 80 messages, one decoding (the most likely word each time), replies cut at 160 tokens and read to 900 characters.</li>
            <li style={itemStyle}>The advice and education messages differ in format as well as intent (a first-person case against a general question),
              so the direction may partly encode the format. The 20 education questions with personal context are the check on that, and the switch
              opened on none of them.</li>
            <li style={itemStyle}>The readers are language models, not clinicians, and their notes on false statements are judgment calls. Agreement
              between readers fell in the later panels (0.50 to 0.70 on the advice sheets of the dose panel).</li>
            <li style={itemStyle}>No emergency opened the switch, in 48 emergencies from the study and 48 more from the break-the-switch set. That bounds the
              miss rate at a few percent, not at zero. The two checks are the whole safeguard; an emergency they both miss would be explained rather than
              redirected.</li>
            <li style={itemStyle}>The referral line is one wording, not a sweep. Every count of clinicians on this page is on the model&apos;s own words, with the
              line cut off (notebook section 46); the reader panels on the referral, plain-words and break-the-switch versions were coded with the
              line in view. The count of invented facts was measured on the 20 general and 16 routine advice replies per version, of which the switch
              changed 30.</li>
            <li style={itemStyle}>Next steps. A clinician read of the false-statement notes. The same switch on a second model family. A prompt-only
              comparison (an instruction to explain and never advise) against the change, with the same readers. A fix for the unchanged model&apos;s own
              weakness on emergencies that are phrased as minor or buried in a lesson.</li>
          </ul>
        </Plain>
      </Section>

      <Full>
        <p style={noteStyle}>
          Full record: the lab notebook has every run, interval and negative result (<i>interp-lab</i>, notebook sections 42 and 43, and the page on the
          break-the-switch set under <i>outputs/edu_surgery/redteam</i>). The message sets, the coding sheets, both readers&apos; files for every panel,
          and the 52 kilobyte change file are in the same repository. The method builds on conditional activation steering (Lee and colleagues, 2024)
          and on refusal-direction removal (Arditi and colleagues, 2024). The permanent version on this page is the second method applied to a stance
          the model should not express, and its failure on the emergency answer is the result.
        </p>
      </Full>
    </WritingLayout>
  );
}
