import AppDocLayout from '@/components/AppDocLayout';
import SupportEmail from '@/components/SupportEmail';
import { APPS } from '@/lib/mac-app.mjs';

const app = APPS.quillmath;

export default function Support() {
  return (
    <AppDocLayout
      appName={app.name}
      title={`${app.name} Support`}
      description={`Support for ${app.name}, a Mac app for LaTeX math, calculation, and graphing.`}
      path={app.supportPath}
    >
      <h3 id="what">What {app.name} is</h3>
      <p style={{marginBottom: '20px'}}>
        {app.name} is a Mac app for working out math. You write LaTeX, calculate, and graph. It does not need an account.
      </p>

      <h3 id="contact">Contact</h3>
      <p style={{marginBottom: '20px'}}>
        <SupportEmail email={app.email} />
      </p>

      <h3 id="stored">Where are my documents stored?</h3>
      <p style={{marginBottom: '20px'}}>
        On your Mac. {app.name} stores documents locally. I cannot see them.
      </p>

      <h3 id="data">Does {app.name} collect data?</h3>
      <p style={{marginBottom: '20px'}}>
        No. There is no account, no analytics, and no network data collection.
      </p>

      <p style={{marginBottom: '20px'}}>
        <a href={app.privacyPath}>Privacy policy</a>
      </p>
    </AppDocLayout>
  );
}
