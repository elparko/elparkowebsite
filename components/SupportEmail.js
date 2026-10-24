import { SUPPORT_EMAIL } from '@/lib/mac-app.mjs';

export default function SupportEmail() {
  return <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>;
}
