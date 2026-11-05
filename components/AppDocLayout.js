import Head from 'next/head';
import styles from '@/styles/Writing.module.css';
import { AREAS, PAGES, SITE_URL } from '@/lib/pages.mjs';

export default function AppDocLayout({ title, description, path, appName, children }) {
  return (
    <div style={{minHeight: '100vh', backgroundColor: 'var(--bg)', color: 'var(--fg)'}}>
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
        <div className={styles.menuToggle}>
          <span></span>
          <span></span>
          <span></span>
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

      <section style={{padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto'}}>
        <h1 className={styles.sectionTitle} style={{textAlign: 'center'}}>{title}</h1>
        <p className={styles.pageMeta}>{appName} · Mac app</p>

        <div className={styles.content}>
          {children}
        </div>
      </section>

      <footer className={styles.footer} data-fixed-footer>
        <p>&copy; 2026 Parker Smith · <a href="https://x.com/parker5smith" target="_blank" rel="noopener noreferrer" style={{color: 'inherit'}}>@parker5smith</a></p>
      </footer>
    </div>
  );
}
