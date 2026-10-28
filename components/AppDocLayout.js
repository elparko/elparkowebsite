import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '@/styles/Writing.module.css';
import { AREAS, PAGES, SITE_URL } from '@/lib/pages.mjs';

export default function AppDocLayout({ title, description, path, appName, children }) {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowArrow(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#f5f5dc', color: '#000000'}}>
      <Head>
        <title>{`${title} - Parker Smith`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_URL}${path}/`} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/icon-512.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Parker Smith" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${SITE_URL}${path}/`} />
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
        <h1 className={styles.sectionTitle} style={{textAlign: 'center'}}>{title}</h1>
        <p className={styles.pageMeta}>{appName} · Mac app</p>

        <div className={styles.content} style={{textAlign: 'justify', lineHeight: '1.8', maxWidth: '100%', wordWrap: 'break-word'}}>
          {children}
        </div>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2026 Parker Smith · <a href="https://x.com/parker5smith" target="_blank" rel="noopener noreferrer" style={{color: 'inherit'}}>@parker5smith</a></p>
      </footer>
    </div>
  );
}
