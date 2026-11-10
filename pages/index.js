import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import styles from '@/styles/Index.module.css';
import SocialMeta from '@/components/SocialMeta';
import HomeChat from '@/components/HomeChat';
import { EXTERNAL, HOME, PAGES, formatDate } from '@/lib/pages.mjs';
import { DOCS, rank } from '@/lib/guide.mjs';

// Every page on the site, grouped by type, newest first within each group. A page's date is the day it was started.
const GROUPS = [
  ['Research', 'Research'],
  ['Company', 'Company'],
  ['Project', 'Projects'],
  ['Build', 'Builds'],
  ['Web', 'Web'],
  ['Essay', 'Essays'],
  ['Art', 'Art'],
  ['Log', 'Log'],
  ['Site', 'Site'],
];

// The four pages shown first, each with its drawing.
const FEATURED = ['circumstance-sensitive-triage', 'education-not-advice', 'smile-msi', 'pereste-health']
  .map((slug) => PAGES.find((p) => p.slug === slug))
  .filter(Boolean);

const everything = [...PAGES, ...EXTERNAL].map((p) => ({ ...p, date: p.created || '' }));

const hrefOf = (p) => (p.slug ? `/${p.slug}` : p.href);

// One typed letter matches nearly every page, so the list narrows from the second letter on.
const MIN_FILTER = 2;

// The pages that match what is typed so far: the word ranker (stems, synonyms, typos), plus any page whose
// title, description or group holds the typed letters, so a half-typed word already narrows the list.
// With nothing typed, the list is every page except the site's own (the CV and About this site sit in the links).
function matcher(text) {
  const t = text.trim().toLowerCase();
  if (t.length < MIN_FILTER) return (p) => p.area !== 'site';
  const found = new Set(rank(t, DOCS.length).map((r) => r.doc.href));
  return (p) => found.has(hrefOf(p)) || `${p.title} ${p.description} ${p.type}`.toLowerCase().includes(t);
}

function Card({ item }) {
  const body = (
    <>
      <span className={styles.cardTitle}>{item.title}{item.slug ? '' : ' ↗'}</span>
      <span className={styles.cardLine}>{item.description}</span>
      {item.date && <span className={styles.cardDate}>{formatDate(item.date)}</span>}
    </>
  );
  return (
    <li className={styles.card}>
      {item.slug ? <Link href={`/${item.slug}`}>{body}</Link> : <a href={item.href}>{body}</a>}
    </li>
  );
}

export default function Home() {
  const [typed, setTyped] = useState('');
  const groups = useMemo(() => {
    const match = matcher(typed);
    return GROUPS
      .map(([type, label]) => ({
        type,
        label,
        items: everything
          .filter((p) => p.type === type && match(p))
          .sort((a, b) => b.date.localeCompare(a.date)),
      }))
      .filter((g) => g.items.length);
  }, [typed]);
  const filtering = typed.trim().length >= MIN_FILTER;
  const count = groups.reduce((n, g) => n + g.items.length, 0);
  const heading = filtering ? `${count} ${count === 1 ? 'page matches' : 'pages match'} “${typed.trim()}”` : 'Every page';

  // A screen reader hears the count once typing pauses, not on every letter.
  const [spoken, setSpoken] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => setSpoken(filtering ? heading : ''), 700);
    return () => clearTimeout(timer);
  }, [filtering, heading]);

  return (
    <div className={styles.home}>
      <Head>
        <title>Parker Smith</title>
        <meta name="description" content={HOME.description} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/icon-512.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <SocialMeta title={HOME.title} description={HOME.description} path="/" image="/og/home.png" />
      </Head>

      <header className={styles.top}>
        <div className={styles.side}>
          <h1>Parker Smith</h1>
          <p>Medical student; builds things.</p>
          <p className={styles.company}><Link href="/pereste-health">Pereste Health, Inc.</Link></p>
        </div>

        <nav className={styles.links} aria-label="Links">
          <Link href="/cv">CV</Link>
          <a href="https://github.com/elparko">GitHub</a>
          <a href="https://x.com/parker5smith">X</a>
          <a href="mailto:pjs002@lsuhs.edu">Email</a>
          <Link href="/about-this-site">About this site</Link>
        </nav>
      </header>

      <main>
        <div className={styles.chat}>
          <HomeChat onType={setTyped} />
        </div>

        {!filtering && (
          <section className={styles.featured} aria-labelledby="start-here">
            <h2 id="start-here">Start here</h2>
            <ul>
              {FEATURED.map((p) => (
                <li key={p.slug}>
                  <Link href={`/${p.slug}`}>
                    <img src={`/drawings/${p.slug}.svg`} alt="" className={styles.drawing} />
                    <span className={styles.featuredText}>
                      <span className={styles.cardTitle}>{p.title}</span>
                      <span className={styles.cardLine}>{p.description}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className={styles.pages} aria-labelledby="every-page">
          <h2 id="every-page">{heading}</h2>
          <p className={styles.hidden} role="status">{spoken}</p>
          {filtering && count === 0 && (
            <p className={styles.none}>No page has those words. Press Enter to ask it as a question.</p>
          )}
          {groups.map((g) => (
            <div key={g.type} className={styles.group}>
              <h3>{g.label} <span>{g.items.length}</span></h3>
              <ul className={styles.cards}>
                {g.items.map((item) => <Card key={item.slug || item.href} item={item} />)}
              </ul>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
