import WritingLayout from '../components/WritingLayout';

export default function VoiceAssistant() {
  return (
    <WritingLayout>
      <img
        src="/elparko-icon.png"
        alt="The elparko app icon: a white p and a pink square on black"
        style={{display: 'block', width: '96px', height: '96px', margin: '0 auto 24px', borderRadius: '22px'}}
      />
      <p style={{marginBottom: '20px', textAlign: 'center', fontSize: '1.1rem'}}>
        A voice assistant for my house that runs on my own server. A small
        speaker hears the wake word, my server works out what I meant, and it
        answers out loud.
      </p>

      <h3>What it does</h3>
      <ul style={{marginBottom: '20px', marginLeft: '20px'}}>
        <li>Controls thermostats, lamps, curtains, the bed's temperature, the <a href="/mirror">mirror</a>, timers, and alarms.</li>
        <li>Answers how I slept, gives a morning briefing, and reads the weather and calendar.</li>
        <li>&ldquo;Flag that&rdquo; marks a wrong action, and &ldquo;undo&rdquo; reverses it.</li>
        <li>Also works through Siri and a hold-to-talk button in my phone app.</li>
      </ul>

      <h3>How it works</h3>
      <ul style={{marginBottom: '20px', marginLeft: '20px'}}>
        <li>The device is a Home Assistant Voice Preview Edition. A custom firmware config removes the vendor's update pieces and adds my own wake-word models with an adjustable cutoff.</li>
        <li>Home Assistant itself is not in the loop. My server speaks the device's protocol directly.</li>
        <li>Speech to text is faster-whisper on an M2 Max. A short prompt listing the words the house uses fixed most mishearings: &ldquo;set the lights to 100 percent brightness&rdquo; comes back correct in about 400 ms.</li>
        <li>Speech out is Kokoro.</li>
        <li>To decide what to do, fixed rules go first. A small classifier trained on this house's own commands checks them and handles what they miss. Claude Haiku takes anything the classifier can't place.</li>
      </ul>

      <h3>Why a classifier replaced the local model</h3>
      <p style={{marginBottom: '20px'}}>
        For a month a local language model (qwen3:8b) handled whatever the rules
        didn't. Over 304 real commands it took a median of 5.8 seconds, got 13
        of 41 requests with a value wrong, claimed 7 actions that never ran, and
        acted on background noise 6 times, once turning the bed off. The
        classifier answers in about 33 ms.
      </p>

      <h3>Training a wake word</h3>
      <p style={{marginBottom: '20px'}}>
        The first custom wake word was trained with microWakeWord: 20,000
        synthetic clips across 5 spellings, 30,000 steps, on a rented GPU for
        $0.70. At its strictest cutoff it measured 0.375 false triggers per hour
        on a recorded dinner-party dataset, with 90.7% recall.
      </p>
      <p style={{marginBottom: '20px'}}>
        Those numbers are weaker than they look. 0.375 per hour is two events in
        5.3 hours, and recall was measured on synthetic voices. In the room it
        misfired more than the stock wake word, so the stock word went back on.
      </p>
      <p style={{marginBottom: '20px'}}>
        The next wake word, &ldquo;elparko&rdquo;, is planned with sound-alikes
        like &ldquo;El Paso&rdquo; as weighted negatives and real recordings of
        the room. It replaces the stock word only if it measures at most 0.2
        false triggers per hour and at least 95% recall.
      </p>
    </WritingLayout>
  );
}
