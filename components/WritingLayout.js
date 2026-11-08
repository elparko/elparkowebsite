import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/Writing.module.css";
import { useState, useEffect, useRef } from 'react';
import { AREAS, PAGES, formatDate, pageBySlug, slugFromHref } from '@/lib/pages.mjs';
import backlinks from '@/lib/backlinks.json';
import SocialMeta from '@/components/SocialMeta';
import { Dial, LiteracyProvider } from '@/components/Literacy';

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
  return (
    <LiteracyProvider enabled={!!page.literacy}>
      <Layout slug={slug} page={page}>{children}</Layout>
    </LiteracyProvider>
  );
}

function Layout({ slug, page, children }) {
  const [preview, setPreview] = useState(null);
  const contentRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOutside = (e) => {
      if (!menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => setPreview(null);

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

  const previewPage = preview && pageBySlug[preview.slug];

  return (
    <div style={{minHeight: '100vh', backgroundColor: 'var(--bg)', color: 'var(--fg)'}}>
      <Head>
        <title>{`${page.title} - Parker Smith`}</title>
        <meta name="description" content={page.description} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/icon-512.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <SocialMeta title={page.title} description={page.description} path={`/${slug}/`} image={`/og/${slug}.png`} />
      </Head>

      <nav ref={menuRef} className={`${styles.menu} ${menuOpen ? styles.menuOpen : ''}`}>
        <button type="button" className={styles.menuToggle} aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
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

      <section style={{padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto'}}>
        <h1 className={styles.sectionTitle} style={{textAlign: 'center'}}>{page.title}</h1>
        <p className={styles.pageMeta}>
          {AREAS[page.area]}
          {' · '}{page.status.replace('-', ' ')}
          <br />
          by Parker
          <br />
          created {formatDate(page.created)} · updated {formatDate(page.updated)}
        </p>

        <img src={`/drawings/${slug}.svg`} alt="" className={styles.drawing} />

        {page.literacy && <Dial />}

        <div ref={contentRef} className={styles.content}>
          {children}
          {page.log?.length > 0 && (
            <div className={styles.pageList}>
              <h4>Log</h4>
              <ul>
                {[...page.log].reverse().map((entry) => (
                  <li key={entry.date + entry.text} className={styles.logEntry}>
                    <span className={styles.logDate}>{formatDate(entry.date)}</span>
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
          <small>{AREAS[previewPage.area]} · {previewPage.status.replace('-', ' ')} · updated {formatDate(previewPage.updated)}</small>
        </div>
      )}

      <footer className={styles.footer} data-fixed-footer>
        <p>&copy; 2026 Parker Smith · <a href="https://x.com/parker5smith" target="_blank" rel="noopener noreferrer" style={{color: 'inherit'}}>@parker5smith</a></p>
      </footer>
    </div>
  );
}
