import { SUPPORT_EMAIL, isContactEmailReady } from '@/lib/mac-app.mjs';

export default function SupportEmail() {
  if (!isContactEmailReady(SUPPORT_EMAIL)) {
    return <strong>TODO (Parker): add your contact email</strong>;
  }
  return <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>;
}
