import AppDocLayout from '@/components/AppDocLayout';
import SupportEmail from '@/components/SupportEmail';
import { APP_NAME, privacyPath, supportPath } from '@/lib/mac-app.mjs';

export default function Support() {
  return (
    <AppDocLayout
      title={`${APP_NAME} Support`}
      description={`Support for ${APP_NAME}, a Mac PDF reader. Where highlights are stored, and how to move them between Macs.`}
      path={supportPath}
    >
      <h3 id="what">What {APP_NAME} is</h3>
      <p style={{marginBottom: '20px'}}>
        {APP_NAME} is a native Mac app for reading PDFs. You can highlight text and write notes. It does not need an account.
      </p>

      <h3 id="contact">Contact</h3>
      <p style={{marginBottom: '20px'}}>
        <SupportEmail />
      </p>

      <h3 id="stored">Where are my highlights stored?</h3>
      <p style={{marginBottom: '20px'}}>
        On your Mac. Highlights and notes live in a folder next to each PDF. Settings are stored on your Mac as well. If you use iCloud, those files are also in your iCloud account. I cannot see them.
      </p>

      <h3 id="pdf">Does {APP_NAME} change my PDF?</h3>
      <p style={{marginBottom: '20px'}}>
        No. The app reads the PDF and does not write to it. Highlights and notes stay outside the file.
      </p>

      <h3 id="macs">How do I move highlights between Macs?</h3>
      <p style={{marginBottom: '20px'}}>
        Use iCloud. The folder next to the PDF syncs through your iCloud account, and the same highlights show up on your other Macs. You can also copy that folder onto another Mac and keep it next to the same PDF.
      </p>

      <p style={{marginBottom: '20px'}}>
        <a href={privacyPath}>Privacy policy</a>
      </p>
    </AppDocLayout>
  );
}
