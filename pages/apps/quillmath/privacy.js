import AppDocLayout from '@/components/AppDocLayout';
import SupportEmail from '@/components/SupportEmail';
import { APPS } from '@/lib/mac-app.mjs';

const app = APPS.quillmath;

export default function PrivacyPolicy() {
  return (
    <AppDocLayout
      appName={app.name}
      title={`${app.name} Privacy Policy`}
      description={`Privacy policy for ${app.name}, a Mac app for LaTeX math, calculation, and graphing. Documents stay on your Mac.`}
      path={app.privacyPath}
    >
      <p style={{marginBottom: '20px'}}>
        Effective date: October 24, 2026.
      </p>
      <p style={{marginBottom: '20px'}}>
        {app.name} is a LaTeX math scratchpad and calculator for the Mac, with graphing. This page says what the app does with your information.
      </p>

      <h3 id="collected">Information the app collects</h3>
      <p style={{marginBottom: '20px'}}>
        {app.name} does not collect personal information. There is no account and no analytics. The app does not collect data over the network. I am the developer, and I do not collect data from the app.
      </p>

      <h3 id="stored">Where documents are stored</h3>
      <p style={{marginBottom: '20px'}}>
        Documents are stored locally on your Mac. I have no access to them.
      </p>

      <h3 id="children">Children&apos;s privacy</h3>
      <p style={{marginBottom: '20px'}}>
        {app.name} is not directed at children under 13. It does not knowingly collect personal information from anyone, including children.
      </p>

      <h3 id="changes">Changes to this policy</h3>
      <p style={{marginBottom: '20px'}}>
        If this policy changes, the new version will be posted on this page and the effective date above will change.
      </p>

      <h3 id="contact">Contact</h3>
      <p style={{marginBottom: '20px'}}>
        Questions about this policy: <SupportEmail email={app.email} />.
      </p>
      <p style={{marginBottom: '20px'}}>
        <a href={app.supportPath}>Support</a>
      </p>
    </AppDocLayout>
  );
}
