// Display name for the Mac App Store build.
// Change this when the name is final. Page copy reads it from here.
export const APP_NAME = 'Rowlight';

// URL segment. Keep this stable once the App Store listing points at it.
export const APP_SLUG = 'rowlight';

// TODO(Parker): replace 'TODO' with your contact email before App Store submission.
export const SUPPORT_EMAIL = 'TODO';

export const privacyPath = `/apps/${APP_SLUG}/privacy`;
export const supportPath = `/apps/${APP_SLUG}/support`;

export function isContactEmailReady(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
