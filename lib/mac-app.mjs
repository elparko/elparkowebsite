function defineApp({ name, slug, email }) {
  return {
    name,
    slug,
    email,
    privacyPath: `/apps/${slug}/privacy`,
    supportPath: `/apps/${slug}/support`,
  };
}

// One entry per Mac app. `slug` is the stable URL segment.
export const APPS = {
  rowlight: defineApp({
    name: 'Rowlight',
    slug: 'rowlight',
    email: 'rowlight@proton.me',
  }),
  quillmath: defineApp({
    name: 'Quill Math',
    slug: 'quillmath',
    email: 'quillmath@proton.me',
  }),
};

export function isContactEmailReady(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
