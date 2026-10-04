import WritingLayout from '../components/WritingLayout';

export default function Tools() {
  return (
    <WritingLayout>
      <p style={{marginBottom: '30px', textAlign: 'center', fontSize: '1.1rem'}}>
        Software and automations I built for my own use. Each entry is updated
        as the tool changes.
      </p>

      <h3 id="fa-reader">fa-reader</h3>
      <p style={{marginBottom: '20px'}}>
        A Mac app for reading and annotating PDF textbooks, built for First Aid
        for USMLE Step 1. It never writes to the PDF. Highlights and notes live
        in a folder next to each book, with their own history, search index,
        and export, and sync between Macs through iCloud. The first working
        version took one day. <a href="https://github.com/elparko/fa-reader">Source on GitHub</a>.
      </p>

      <h3 id="writing-program">Writing program</h3>
      <p style={{marginBottom: '20px'}}>
        A plain writing app for one Mac, started 2026-10-03. I type or dictate a
        rough draft, and a local language model follows one paragraph behind
        the cursor. It removes filler words, fixes spelling and punctuation,
        and attaches links. It never writes a word: a check in code compares
        the model's output with my text and throws away any change that adds,
        swaps, or reorders a word. Every change is marked and can be reverted.
        Link addresses come only from my clipboard or a real lookup, never
        from the model. Pages written with it here will carry
        the <a href="/about-this-site">AI edited</a> byline.
      </p>

      <h3 id="thermostat">Thermostat cost saver</h3>
      <p style={{marginBottom: '20px'}}>
        My electric plan is a flat rate with no cheaper hours, so the bill
        tracks one thing: how long the air conditioner runs. The saver sets the
        room as far from comfort as it can whenever nobody would feel it, and
        brings it back in time. One readable rule per situation, and the reason
        is shown next to every change:
      </p>
      <ul style={{marginBottom: '20px', marginLeft: '20px'}}>
        <li><strong>Home, awake:</strong> comfort, 76°F in summer.</li>
        <li><strong>Asleep:</strong> 4°F warmer. A cooling pad on the bed, not the room air, is what the sleeper feels.</li>
        <li><strong>Before the alarm:</strong> back to comfort, timed so the room is there when the alarm rings.</li>
        <li><strong>Still in bed after the alarm:</strong> comfort. Lying awake is not sleep. The first version set back again 40 seconds after the alarm and I turned it down by hand four mornings in seven.</li>
        <li><strong>Out for a few hours:</strong> 2°F warmer. A short errand saves little and costs an hour of recovery at the door.</li>
        <li><strong>Away 8 hours or more:</strong> 6°F warmer.</li>
      </ul>
      <p style={{marginBottom: '20px'}}>
        Being in bed outranks the phone saying I'm away. When presence is
        unknown, the house counts as occupied, so nothing sets back on a guess.
        The air conditioner's runtime is logged every minute. Moving the
        setpoint from 72°F to 74°F dropped its duty cycle from about 80% to
        about 50%, worth roughly $2–3 a day in August.
      </p>

      <h3 id="menu-bar">Mac menu bar app</h3>
      <p style={{marginBottom: '20px'}}>
        A menu bar app that controls the lights, the alarm, the bed, and the
        thermostats from my Mac. One bar per room is both the switch and the
        dimmer.
      </p>

      <h3 id="house">The rest of the house</h3>
      <ul style={{marginBottom: '20px', marginLeft: '20px'}}>
        <li><a href="/mirror">Mirror</a>: a fitness mirror rebuilt as a display for the house.</li>
        <li><a href="/voice-assistant">Voice assistant</a>: wake word, local speech to text, and a classifier trained on the house.</li>
      </ul>
    </WritingLayout>
  );
}
