import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import styles from '@/styles/Index.module.css';
import SocialMeta from '@/components/SocialMeta';
import HomeChat from '@/components/HomeChat';
import { EXTERNAL, HOME, PAGES, formatDate } from '@/lib/pages.mjs';

// Every page on the site, grouped by type, newest first within each group. A page's date is the day it was started.
const GROUPS = [
  ['Research', 'Research'],
  ['Project', 'Projects'],
  ['Company', 'Company'],
  ['Build', 'Builds'],
  ['Web', 'Web'],
  ['Essay', 'Essays'],
  ['Art', 'Art'],
  ['Log', 'Log'],
];

const everything = [
  ...PAGES.filter((p) => p.area !== 'site'),
  ...EXTERNAL,
].map((p) => ({ ...p, date: p.created || '' }));

const groups = GROUPS
  .map(([type, label]) => ({
    type,
    label,
    items: everything.filter((p) => p.type === type).sort((a, b) => b.date.localeCompare(a.date)),
  }))
  .filter((g) => g.items.length);

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

// Between the two screens the page settles on one of them. Scrolling down more than a quarter of the way
// lands on the "Every page" screen; less goes back to the top. Scrolling up from the second screen does the
// same in reverse. Past the top of the second screen, scrolling is free.
const SNAP = 0.25;

function useSnapBetween(pagesRef) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let last = window.scrollY;
    let down = true;
    let target = null;
    let timer = null;
    let touching = false;

    const settle = () => {
      // iOS scrolls the page itself to keep a focused field above the keyboard; that scroll is not a gesture.
      if (touching || document.activeElement?.matches('input, textarea')) return;
      const y = window.scrollY;
      const end = pagesRef.current.offsetTop;
      if (target !== null) {
        const arrived = Math.abs(y - target) < 2;
        target = null;
        if (arrived) return;
      }
      if (y <= 1 || y >= end - 1) return;
      // A first screen whose content is taller than the window (a very small phone after a search) scrolls freely to its bottom.
      const contentEnd = pagesRef.current.previousElementSibling.lastElementChild.getBoundingClientRect().bottom + y;
      if (y <= contentEnd - window.innerHeight) return;
      const to = (down ? y > end * SNAP : y > end * (1 - SNAP)) ? end : 0;
      target = to;
      window.scrollTo({ top: to, behavior: reduce.matches ? 'auto' : 'smooth' });
    };

    const onScroll = () => {
      const y = window.scrollY;
      if (y !== last) down = y > last;
      last = y;
      if (!('onscrollend' in window)) {
        clearTimeout(timer);
        timer = setTimeout(settle, 140);
      }
    };
    const onTouchStart = () => { touching = true; target = null; };
    const onTouchEnd = () => {
      touching = false;
      if (!('onscrollend' in window)) {
        clearTimeout(timer);
        timer = setTimeout(settle, 140);
      }
    };
    const onWheel = () => { target = null; };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scrollend', settle);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scrollend', settle);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('wheel', onWheel);
    };
  }, [pagesRef]);
}

export default function Home() {
  const pages = useRef(null);
  useSnapBetween(pages);
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

      <section className={styles.hero} id="top">
        <header className={styles.side}>
          <h1>Parker Smith</h1>
          <p>Medical student;<br />builds things.</p>
          <p className={styles.company}><Link href="/pereste-health">Pereste Health, Inc.</Link></p>
        </header>

        <nav className={styles.links} aria-label="Links">
          <Link href="/cv">CV</Link>
          <a href="https://github.com/elparko">GitHub</a>
          <a href="https://x.com/parker5smith">X</a>
          <a href="mailto:pjs002@lsuhs.edu">Email</a>
          <Link href="/about-this-site">About this site</Link>
        </nav>

        <main className={styles.chat}>
          <HomeChat />
        </main>

        <a href="#pages" className={styles.hint}>Every page ↓</a>
      </section>

      <section className={styles.pages} id="pages" aria-labelledby="every-page" ref={pages}>
        <div className={styles.pagesInner}>
          <h2 id="every-page">Every page</h2>
          {groups.map((g) => (
            <div key={g.type} className={styles.group}>
              <h3>{g.label} <span>{g.items.length}</span></h3>
              <ul className={styles.cards}>
                {g.items.map((item) => <Card key={item.slug || item.href} item={item} />)}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
