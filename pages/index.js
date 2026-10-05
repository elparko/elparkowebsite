import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/Index.module.css';
import SocialMeta from '@/components/SocialMeta';
import { AREAS, EXTERNAL, HOME, PAGES } from '@/lib/pages.mjs';

const SECTIONS = [
  { area: 'research', blurb: 'Lab and clinical research.' },
  { area: 'ai-code', blurb: 'Software for medicine and for myself.' },
  { area: 'builds', blurb: 'Things I made with my hands, or close to it.' },
  { area: 'writing', blurb: 'Essays and notes.' },
];

const today = new Date().toISOString().slice(0, 10);
const entries = PAGES.flatMap((p) => (p.log || []).map((e) => ({ ...e, page: p })))
  .sort((a, b) => b.date.localeCompare(a.date));
const upcoming = entries.filter((e) => e.date > today).reverse();
const recent = entries.filter((e) => e.date <= today).slice(0, 6);

function Entries({ heading, items }) {
  if (!items.length) return null;
  return (
    <>
      <h4>{heading}</h4>
      {items.map((e) => (
        <div key={e.page.slug + e.date + e.text} className={styles.entry}>
          <span>{e.date}</span>
          <span><Link href={`/${e.page.slug}`}>{e.page.title}</Link>: {e.text}</span>
        </div>
      ))}
    </>
  );
}

function Card({ item }) {
  const body = (
    <>
      <i className={`fas ${item.icon}`}></i>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <span className={styles.cardMeta}>
        {item.slug ? `${item.status.replace('-', ' ')} · updated ${item.updated}` : 'external site ↗'}
      </span>
    </>
  );
  return item.slug
    ? <Link href={`/${item.slug}`} className={styles.card}>{body}</Link>
    : <a href={item.href} className={styles.card}>{body}</a>;
}

export default function Home() {
  const scroller = useRef(null);
  const [active, setActive] = useState('top');

  useEffect(() => {
    const el = scroller.current;
    el.focus({ preventScroll: true });
    const sections = () => [...el.querySelectorAll('section')];
    const current = () => {
      const y = el.scrollTop + el.clientHeight / 3;
      return sections().findLast((s) => s.offsetTop <= y) || sections()[0];
    };
    const onScroll = () => setActive(current().id);
    const onKey = (e) => {
      if (e.target.closest('input, textarea')) return;
      const down = ['ArrowDown', 'PageDown'].includes(e.key) || (e.key === ' ' && !e.shiftKey);
      const up = ['ArrowUp', 'PageUp'].includes(e.key) || (e.key === ' ' && e.shiftKey);
      if (!down && !up) return;
      const list = sections();
      const sec = current();
      const bottom = sec.offsetTop + sec.offsetHeight;
      const viewBottom = el.scrollTop + el.clientHeight;
      const page = el.clientHeight * 0.85;
      const below = bottom - viewBottom;
      const above = el.scrollTop + el.querySelector('nav').offsetHeight - sec.offsetTop;
      e.preventDefault();
      if (down && below > 4) return el.scrollBy({ top: Math.min(below, page) });
      if (up && above > 4) return el.scrollBy({ top: -Math.min(above, page) });
      const next = list[list.indexOf(sec) + (down ? 1 : -1)];
      if (next) next.scrollIntoView();
    };
    el.addEventListener('scroll', onScroll);
    window.addEventListener('keydown', onKey);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  const theme = (id) => (['top', 'research', 'builds', 'contact'].includes(id) ? styles.dark : styles.light);

  return (
    <div className={styles.page} ref={scroller} tabIndex={-1}>
      <Head>
        <title>Parker Smith</title>
        <meta name="description" content={HOME.description} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/icon-512.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <SocialMeta title={HOME.title} description={HOME.description} path="/" image="/og/home.png" />
      </Head>

      <nav className={`${styles.nav} ${theme(active)}`}>
        <a href="#top" className={styles.navName}>Parker Smith</a>
        <div className={styles.navLinks}>
          {[['recent', 'Recent'], ...SECTIONS.map(({ area }) => [area, AREAS[area]])].map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? styles.navActive : ''}>{label}</a>
          ))}
          <Link href="/cv">CV</Link>
          <a href="#contact" className={active === 'contact' ? styles.navActive : ''}>Contact</a>
        </div>
      </nav>

      <section id="top" className={`${styles.section} ${theme('top')} ${styles.hero}`}>
        <img src="/drawings/home.svg" alt="" className={styles.drawing} />
        <h1>Parker Smith</h1>
        <p>Medical student who likes to build things.</p>
        <div className={styles.buttons}>
          <Link href="/cv" className={styles.button}>CV</Link>
          <a href="https://x.com/parker5smith" className={styles.button}>X</a>
          <a href="https://github.com/elparko" className={styles.button}>GitHub</a>
        </div>
        <span className={styles.hint}>↓</span>
      </section>

      <section id="recent" className={`${styles.section} ${theme('recent')}`}>
        <h2 className={styles.heading}>Recent</h2>
        <p className={styles.blurb}>Dated changes from every page.</p>
        <div className={styles.entries}>
          <Entries heading="Upcoming" items={upcoming} />
          <Entries heading="Latest" items={recent} />
        </div>
      </section>

      {SECTIONS.map(({ area, blurb }) => {
        const items = [
          ...PAGES.filter((p) => p.area === area),
          ...EXTERNAL.filter((e) => e.area === area),
        ];
        return (
          <section key={area} id={area} className={`${styles.section} ${theme(area)}`}>
            <h2 className={styles.heading}>{AREAS[area]}</h2>
            <p className={styles.blurb}>{blurb}</p>
            <div className={styles.grid}>
              {items.map((item) => <Card key={item.slug || item.href} item={item} />)}
            </div>
          </section>
        );
      })}

      <section id="contact" className={`${styles.section} ${theme('contact')}`}>
        <h2 className={styles.heading}>Contact</h2>
        <div className={styles.social}>
          <a href="https://x.com/parker5smith" aria-label="X"><i className="fab fa-x-twitter"></i></a>
          <a href="https://github.com/elparko" aria-label="GitHub"><i className="fab fa-github"></i></a>
          <a href="https://www.instagram.com/park.rsmith" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
        </div>
        <p className={styles.footer}>
          &copy; 2026 Parker Smith · <Link href="/about-this-site" style={{color: 'inherit'}}>About this site</Link>
        </p>
      </section>
    </div>
  );
}
