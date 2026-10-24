import AppDocLayout from '@/components/AppDocLayout';
import SupportEmail from '@/components/SupportEmail';
import { APP_NAME, privacyPath, supportPath } from '@/lib/mac-app.mjs';

export default function PrivacyPolicy() {
  return (
    <AppDocLayout
      title={`${APP_NAME} Privacy Policy`}
      description={`Privacy policy for ${APP_NAME}, a Mac PDF reader. No account, no analytics, and no data collected by the developer.`}
      path={privacyPath}
    >
      <p style={{marginBottom: '20px'}}>
        Effective date: October 24, 2026.
      </p>
      <p style={{marginBottom: '20px'}}>
        {APP_NAME} is a PDF reader for the Mac. This page says what the app does with your information.
      </p>

      <h3 id="collected">Information the app collects</h3>
      <p style={{marginBottom: '20px'}}>
        {APP_NAME} does not collect personal information. There is no account, no analytics, no tracking, and no ads. I am the developer, and I do not collect data from the app.
      </p>

      <h3 id="stored">Where highlights, notes, and settings are stored</h3>
      <p style={{marginBottom: '20px'}}>
        Highlights, notes, and settings are stored on your Mac. If you use iCloud, they are also stored in your own iCloud account. Apple holds that copy. I have no access to it.
      </p>

      <h3 id="servers">Servers</h3>
      <p style={{marginBottom: '20px'}}>
        The app does not send data to any server I operate.
      </p>

      <h3 id="images">Images in notes</h3>
      <p style={{marginBottom: '20px'}}>
        A note can include a link to an image. When the app loads that image, your Mac contacts the host of the image. That host is whoever you linked to. I do not receive the request.
      </p>

      <h3 id="children">Children&apos;s privacy</h3>
      <p style={{marginBottom: '20px'}}>
        {APP_NAME} is not directed at children under 13. It does not knowingly collect personal information from anyone, including children.
      </p>

      <h3 id="changes">Changes to this policy</h3>
      <p style={{marginBottom: '20px'}}>
        If this policy changes, the new version will be posted on this page and the effective date above will change.
      </p>

      <h3 id="contact">Contact</h3>
      <p style={{marginBottom: '20px'}}>
        Questions about this policy: <SupportEmail />.
      </p>
      <p style={{marginBottom: '20px'}}>
        <a href={supportPath}>Support</a>
      </p>
    </AppDocLayout>
  );
}
