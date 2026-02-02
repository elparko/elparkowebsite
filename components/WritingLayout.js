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

          <li style={{padding: '10px 30px', color: '#f5f5dc', fontSize: '1.1rem', fontWeight: 'bold', opacity: 1, letterSpacing: '0.1em', fontFamily: 'inherit', pointerEvents: 'none'}}>
            WRITING
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

          <li style={{padding: '10px 30px', color: '#f5f5dc', fontSize: '1.1rem', fontWeight: 'bold', opacity: 1, marginTop: '10px', letterSpacing: '0.1em', fontFamily: 'inherit', pointerEvents: 'none'}}>
            CURRENT PROJECTS
          </li>
          <li
            onMouseEnter={() => setHoveredItem('crswne')}
            onMouseLeave={() => setHoveredItem(null)}
            style={{backgroundColor: hoveredItem === 'crswne' ? 'rgba(245, 245, 220, 0.8)' : 'transparent', padding: 0}}
          >
            <a
              href="/crswne-keto-research"
              className={styles.menuLink}
              style={{color: hoveredItem === 'crswne' ? '#000000' : '#f5f5dc', display: 'block', padding: '15px 30px'}}
            >
              CRSwNP & Keto Research
            </a>
          </li>

          <li style={{padding: '10px 30px', color: '#f5f5dc', fontSize: '1.1rem', fontWeight: 'bold', opacity: 1, marginTop: '10px', letterSpacing: '0.1em', fontFamily: 'inherit', pointerEvents: 'none'}}>
            CURRENT SIDE QUEST
          </li>
          <li
            onMouseEnter={() => setHoveredItem('clawdbot')}
            onMouseLeave={() => setHoveredItem(null)}
            style={{backgroundColor: hoveredItem === 'clawdbot' ? 'rgba(245, 245, 220, 0.8)' : 'transparent', padding: 0}}
          >
            <a
              href="/clawdbot"
              className={styles.menuLink}
              style={{color: hoveredItem === 'clawdbot' ? '#000000' : '#f5f5dc', display: 'block', padding: '12px 30px'}}
            >
              ClawdBot
            </a>
          </li>

          <li style={{padding: '10px 30px', color: '#f5f5dc', fontSize: '1.1rem', fontWeight: 'bold', opacity: 1, marginTop: '10px', letterSpacing: '0.1em', fontFamily: 'inherit', pointerEvents: 'none'}}>
            COMPLETED SIDE QUESTS
          </li>
          <li
            onMouseEnter={() => setHoveredItem('sauna')}
            onMouseLeave={() => setHoveredItem(null)}
            style={{backgroundColor: hoveredItem === 'sauna' ? 'rgba(245, 245, 220, 0.8)' : 'transparent', padding: 0}}
          >
            <a
              href="/sauna-build"
              className={styles.menuLink}
              style={{color: hoveredItem === 'sauna' ? '#000000' : '#f5f5dc', display: 'block', padding: '12px 30px'}}
            >
              Sauna Build
            </a>
          </li>
          <li
            onMouseEnter={() => setHoveredItem('mohs')}
            onMouseLeave={() => setHoveredItem(null)}
            style={{backgroundColor: hoveredItem === 'mohs' ? 'rgba(245, 245, 220, 0.8)' : 'transparent', padding: 0}}
          >
            <a
              href="/art-feature"
              className={styles.menuLink}
              style={{color: hoveredItem === 'mohs' ? '#000000' : '#f5f5dc', display: 'block', padding: '12px 30px'}}
            >
              Mohs Map
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
