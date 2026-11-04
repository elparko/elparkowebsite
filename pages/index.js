import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Index.module.css';
import SocialMeta from '@/components/SocialMeta';
import Guide from '@/components/Guide';
import { AREAS, EXTERNAL, HOME, PAGES, byline } from '@/lib/pages.mjs';

// Everything on the site, newest first. A page's date is the day it was started.
const posts = [
  ...PAGES.filter((p) => p.area !== 'site').map((p) => ({ ...p, date: p.created })),
  ...EXTERNAL.map((e) => ({ ...e, date: '' })),
].sort((a, b) => b.date.localeCompare(a.date));

function Row({ item }) {
  const title = item.slug
    ? <Link href={`/${item.slug}`}>{item.title}</Link>
    : <a href={item.href}>{item.title} ↗</a>;
  const meta = item.slug
    ? `${AREAS[item.area]} · ${byline(item)} · updated ${item.updated}`
    : `${AREAS[item.area]} · external site`;
  return (
    <li className={styles.row}>
      <span className={styles.date}>{item.date}</span>
      <div className={styles.body}>
        <h2>{title}</h2>
        <p>{item.description}</p>
        <span className={styles.meta}>{meta}</span>
      </div>
    </li>
  );
}

export default function Home() {
  return (
    <div className={styles.page}>
      <Head>
        <title>Parker Smith</title>
        <meta name="description" content={HOME.description} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/icon-512.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <SocialMeta title={HOME.title} description={HOME.description} path="/" image="/og/home.png" />
      </Head>

      <aside className={styles.side}>
        <h1>Parker Smith</h1>
        <p>Medical student, builds things.</p>
        <p className={styles.where}>
          LSU Health Shreveport<br />
          Founder, Pereste Health
        </p>
        <nav className={styles.links} aria-label="Links">
          <Link href="/cv">CV</Link>
          <a href="https://github.com/elparko">GitHub</a>
          <a href="https://x.com/parker5smith">X</a>
          <a href="mailto:pjs002@lsuhs.edu">Email</a>
          <Link href="/about-this-site">About this site</Link>
        </nav>
        <Guide />
      </aside>

      <main className={styles.list}>
        <ol>
          {posts.map((item) => <Row key={item.slug || item.href} item={item} />)}
        </ol>
      </main>
    </div>
  );
}
