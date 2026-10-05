import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/Writing.module.css";
import { useState, useEffect, useRef } from 'react';
import { AREAS, PAGES, byline, pageBySlug, slugFromHref } from '@/lib/pages.mjs';
import backlinks from '@/lib/backlinks.json';
import SocialMeta from '@/components/SocialMeta';

function PageList({ heading, slugs }) {
  if (!slugs.length) return null;
  return (
    <div className={styles.pageList}>
      <h4>{heading}</h4>
      <ul>
        {slugs.map((s) => (
          <li key={s}>
            <Link href={`/${s}`}>{pageBySlug[s].title}</Link>
            <span> — {pageBySlug[s].description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function WritingLayout({ children }) {
  const slug = useRouter().pathname.slice(1);
  const page = pageBySlug[slug];
  const [showArrow, setShowArrow] = useState(false);
  const [preview, setPreview] = useState(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowArrow(window.scrollY > 100);
      setPreview(null);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const el = contentRef.current;
    if (!el || !window.matchMedia('(hover: hover)').matches) return;

    const show = (e) => {
      const a = e.target.closest('a');
      const target = a && slugFromHref(a.getAttribute('href'));
      if (!target || target === slug) return;
      const r = a.getBoundingClientRect();
      const above = r.bottom + 160 > window.innerHeight;
      setPreview({ slug: target, top: above ? r.top - 8 : r.bottom + 8, above, left: Math.min(r.left, window.innerWidth - 376) });
    };
    const hide = (e) => {
      if (e.target.closest('a')) setPreview(null);
    };

    el.addEventListener('mouseover', show);
    el.addEventListener('mouseout', hide);
    return () => {
      el.removeEventListener('mouseover', show);
      el.removeEventListener('mouseout', hide);
    };
  }, [slug]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const previewPage = preview && pageBySlug[preview.slug];

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#f5f5dc', color: '#000000'}}>
      <Head>
        <title>{`${page.title} - Parker Smith`}</title>
        <meta name="description" content={page.description} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/icon-512.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <SocialMeta title={page.title} description={page.description} path={`/${slug}/`} image={`/og/${slug}.png`} />
      </Head>

      <nav className={styles.menu}>
        <div className={styles.menuToggle} style={{backgroundColor: 'rgba(0, 0, 0, 0.8)'}}>
          <span style={{backgroundColor: '#f5f5dc'}}></span>
          <span style={{backgroundColor: '#f5f5dc'}}></span>
          <span style={{backgroundColor: '#f5f5dc'}}></span>
        </div>
        <ul style={{padding: 0}}>
          <li><a href="/" className={styles.menuLink}>Home</a></li>
          {Object.entries(AREAS).map(([area, name]) => (
            <li key={area} className={styles.menuArea}>
              <div className={styles.menuHeading}>{name.toUpperCase()}</div>
              <ul className={styles.menuGroup}>
                {PAGES.filter((p) => p.area === area).map((p) => (
                  <li key={p.slug}><a href={`/${p.slug}`} className={styles.menuLink}>{p.title}</a></li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>

      <button
        onClick={scrollToTop}
        className={`${styles.topArrow} ${showArrow ? styles.showArrow : ''}`}
      >
        <i className="fas fa-arrow-up"></i>
      </button>

      <section style={{padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto'}}>
        <h1 className={styles.sectionTitle} style={{textAlign: 'center'}}>{page.title}</h1>
        <p className={styles.pageMeta}>
          {AREAS[page.area]}
          {' · '}{page.status.replace('-', ' ')}
          <br />
          {page.authorship === 'human' ? byline(page) : <Link href="/about-this-site#authorship">{byline(page)}</Link>}
          <br />
          created {page.created} · updated {page.updated}
        </p>

        <img src={`/drawings/${slug}.svg`} alt="" className={styles.drawing} />

        <div ref={contentRef} className={styles.content} style={{textAlign: 'justify', lineHeight: '1.8', maxWidth: '100%', wordWrap: 'break-word'}}>
          {children}
          {page.log?.length > 0 && (
            <div className={styles.pageList}>
              <h4>Log</h4>
              <ul>
                {[...page.log].reverse().map((entry) => (
                  <li key={entry.date + entry.text} className={styles.logEntry}>
                    <span className={styles.logDate}>{entry.date}</span>
                    <span>{entry.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <PageList heading="Related" slugs={page.related} />
          <PageList heading="Linked from" slugs={backlinks[slug].filter((s) => !page.related.includes(s))} />
        </div>
      </section>

      {previewPage && (
        <div className={styles.preview} style={{top: preview.top, left: preview.left, transform: preview.above ? 'translateY(-100%)' : 'none'}}>
          <strong>{previewPage.title}</strong>
          <p>{previewPage.description}</p>
          <small>{AREAS[previewPage.area]} · {previewPage.status.replace('-', ' ')} · {byline(previewPage)} · updated {previewPage.updated}</small>
        </div>
      )}

      <footer className={styles.footer}>
        <p>&copy; 2026 Parker Smith · <a href="https://x.com/parker5smith" target="_blank" rel="noopener noreferrer" style={{color: 'inherit'}}>@parker5smith</a></p>
      </footer>
    </div>
  );
}
