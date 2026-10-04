import Link from 'next/link';
import WritingLayout from '../components/WritingLayout';
import { AUTHORSHIP, PAGES } from '@/lib/pages.mjs';

export default function AboutThisSite() {
  return (
    <WritingLayout>
      <h3 id="authorship">Authorship</h3>
      <p style={{marginBottom: '20px'}}>
        Every page has a byline. If a model drafted it, the model is the author.
      </p>
      {['ai-edited', 'ai-drafted'].map((key) => {
        const pages = PAGES.filter((p) => p.authorship === key && p.slug !== 'about-this-site');
        return (
          <div key={key} style={{marginBottom: '20px'}}>
            <p><strong>{AUTHORSHIP[key].label}</strong>: {AUTHORSHIP[key].detail}</p>
            {pages.length > 0 && (
              <ul style={{marginLeft: '20px'}}>
                {pages.map((p) => (
                  <li key={p.slug}><Link href={`/${p.slug}`} style={{color: '#000000'}}>{p.title}</Link></li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </WritingLayout>
  );
}
