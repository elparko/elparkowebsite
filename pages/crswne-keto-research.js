import Head from 'next/head';
import Link from 'next/link';
import { SITE_URL } from '@/lib/pages.mjs';

// Old, misspelled address. Kept so existing links still land on the page.
const TO = '/crswnp-keto-research/';

export default function CRSwNPKetoResearchRedirect() {
  return (
    <div style={{minHeight: '100vh', backgroundColor: '#f5f5dc', color: '#000000', padding: '4rem 2rem', textAlign: 'center'}}>
      <Head>
        <title>CRSwNP & Keto Research - Parker Smith</title>
        <meta httpEquiv="refresh" content={`0; url=${TO}`} />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={SITE_URL + TO} />
      </Head>
      <p>This page moved to <Link href={TO}>{TO}</Link>.</p>
    </div>
  );
}
