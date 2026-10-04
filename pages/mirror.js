import WritingLayout from '../components/WritingLayout';

const PHOTOS = [
  { src: '/mirror-display.jpeg', alt: 'The mirror showing the clock, calendar, sleep plan, and weather' },
  { src: '/mirror-video.jpeg', alt: 'The mirror playing surf video over AirPlay' },
];

export default function Mirror() {
  return (
    <WritingLayout>
      <p style={{marginBottom: '20px', textAlign: 'center', fontSize: '1.1rem'}}>
        A used fitness mirror, gutted and rebuilt as a display for the house:
        the time, tonight's sleep plan, the calendar, and the weather, behind
        two-way glass.
      </p>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '15px', maxWidth: '480px', margin: '0 auto 30px'}}>
        {PHOTOS.map(({ src, alt }) => (
          <img key={src} src={src} alt={alt} style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)'}} />
        ))}
      </div>

      <h3>Hardware</h3>
      <ul style={{marginBottom: '20px', marginLeft: '20px'}}>
        <li>Started as a 2019 Mirror &ldquo;Model One&rdquo; fitness mirror: a 40-inch 1080p LCD behind two-way glass.</li>
        <li>The locked Android board is cut out. A generic LVDS controller board drives the panel, and a Raspberry Pi 5 inside the case feeds it over HDMI.</li>
        <li>The factory speakers, power supply, and backlight are reused. The backlight switches off in hardware from a Pi pin, and a smart plug can cut mains power.</li>
        <li>About $200 in parts.</li>
        <li>No microphone or camera. The factory mic board turned out to carry only an I2C bus and an analog line, so a separate device handles <a href="/voice-assistant">voice</a>.</li>
        <li>Hung portrait. The page draws itself at 1080&times;1920 and rotates itself, so nothing on the Pi needs rotating.</li>
      </ul>

      <img
        src="/mirror-inside.jpeg"
        alt="Inside the mirror: the original power board, the new LVDS controller board, and the Raspberry Pi"
        style={{display: 'block', maxWidth: '300px', width: '100%', margin: '0 auto 30px', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)'}}
      />

      <h3>What it shows</h3>
      <p style={{marginBottom: '20px'}}>
        A large clock and date. Tonight's bedtime, the alarm, and last night's
        sleep score. Today's agenda beside a month calendar. Current weather and
        the next four hours. The middle stays empty so it still works as a
        mirror.
      </p>
      <p style={{marginBottom: '20px'}}>
        The background is animated: the real sky overhead drawn from a star
        catalog with the current moon phase, a fluid simulation of ink in
        water, an aurora. When it is raining or snowing outside, rain or snow
        runs down the glass. My phone can play to it over AirPlay.
      </p>

      <h3>How it works</h3>
      <p style={{marginBottom: '20px'}}>
        The Pi runs no custom code beyond a kiosk browser and a small agent. The
        page itself is served by my home server. Every 5 seconds the agent asks
        the server what to show, and every 30 seconds it reports back. The
        server never connects to the Pi. If the server disappears for 10
        minutes, the mirror lights up with a &ldquo;no server&rdquo; note
        instead of failing silently.
      </p>
      <p style={{marginBottom: '20px'}}>
        Whether the screen is on is decided by one small, tested function on the
        server. The first matching rule wins: AirPlay playing, a manual
        override, the sunrise alarm, nobody home, stale bed data, someone in
        bed. The rules exist so the screen never lights while someone is asleep,
        after a 3 a.m. bathroom trip, or because the server restarted.
      </p>
      <p style={{marginBottom: '20px'}}>
        The mirror is one part of a larger home system I built: sleep data from
        the bed and a wrist strap, a phone app, and
        the <a href="/voice-assistant">voice assistant</a>, which can turn the
        mirror on and off.
      </p>
    </WritingLayout>
  );
}
