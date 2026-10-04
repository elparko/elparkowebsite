import { SITE_URL, X_HANDLE } from '@/lib/pages.mjs';

export default function SocialMeta({ title, description, path, image }) {
  return (
    <>
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Parker Smith" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={SITE_URL + path} />
      <meta property="og:image" content={SITE_URL + image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={X_HANDLE} />
      <meta name="twitter:creator" content={X_HANDLE} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={SITE_URL + image} />
    </>
  );
}
