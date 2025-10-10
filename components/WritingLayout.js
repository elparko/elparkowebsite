import Head from "next/head";
import styles from "@/styles/Writing.module.css";
import { useState, useEffect } from 'react';

export default function WritingLayout({ children, title, date }) {
  const [showArrow, setShowArrow] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowArrow(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#f5f5dc', color: '#000000'}}>
      <Head>
        <title>{title} - Parker Smith</title>
        <meta name="description" content={title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className={styles.menu}>
        <div className={styles.menuToggle} style={{backgroundColor: 'rgba(0, 0, 0, 0.8)'}}>
          <span style={{backgroundColor: '#f5f5dc'}}></span>
          <span style={{backgroundColor: '#f5f5dc'}}></span>
          <span style={{backgroundColor: '#f5f5dc'}}></span>
        </div>
        <ul style={{padding: 0}}>
          <li
            onMouseEnter={() => setHoveredItem('home')}
            onMouseLeave={() => setHoveredItem(null)}
            style={{backgroundColor: hoveredItem === 'home' ? 'rgba(245, 245, 220, 0.8)' : 'transparent', padding: 0}}
          >
            <a
              href="/"
              className={styles.menuLink}
              style={{color: hoveredItem === 'home' ? '#000000' : '#f5f5dc', display: 'block', padding: '15px 30px'}}
            >
              Home
            </a>
          </li>
          <li
            onMouseEnter={() => setHoveredItem('learning')}
            onMouseLeave={() => setHoveredItem(null)}
            style={{backgroundColor: hoveredItem === 'learning' ? 'rgba(245, 245, 220, 0.8)' : 'transparent', padding: 0}}
          >
            <a
              href="/learning-at-the-edge"
              className={styles.menuLink}
              style={{color: hoveredItem === 'learning' ? '#000000' : '#f5f5dc', display: 'block', padding: '15px 30px'}}
            >
              Learning at the Edge of Knowledge
            </a>
          </li>
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
        {date && <p style={{fontSize: '0.9rem', marginBottom: '2rem', textAlign: 'center'}}>{date}</p>}

        <div style={{textAlign: 'justify', lineHeight: '1.8', maxWidth: '100%', wordWrap: 'break-word'}}>
          {children}
        </div>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2025 Parker Smith</p>
      </footer>
    </div>
  );
}
