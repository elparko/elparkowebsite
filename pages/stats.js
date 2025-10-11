import Head from "next/head";
import styles from "@/styles/Writing.module.css";
import { useState, useEffect } from 'react';

export default function Stats() {
  const [stats, setStats] = useState(null);
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowArrow(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Fetch stats from JSON file
    fetch('/anki-stats.json')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Error loading stats:', err));
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#f5f5dc', color: '#000000'}}>
      <Head>
        <title>Anki Stats - Parker Smith</title>
        <meta name="description" content="Anki study statistics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className={styles.menu}>
        <div className={styles.menuToggle} style={{backgroundColor: 'rgba(0, 0, 0, 0.8)'}}>
          <span style={{backgroundColor: '#f5f5dc'}}></span>
          <span style={{backgroundColor: '#f5f5dc'}}></span>
          <span style={{backgroundColor: '#f5f5dc'}}></span>
        </div>
        <ul style={{padding: 0}}>
          <li style={{padding: 0}}>
            <a
              href="/"
              className={styles.menuLink}
              style={{color: '#f5f5dc', display: 'block', padding: '15px 30px'}}
            >
              Home
            </a>
          </li>
          <li style={{padding: 0}}>
            <a
              href="/learning-at-the-edge"
              className={styles.menuLink}
              style={{color: '#f5f5dc', display: 'block', padding: '15px 30px'}}
            >
              Learning at the Edge of Knowledge
            </a>
          </li>
          <li style={{padding: 0}}>
            <a
              href="/stats"
              className={styles.menuLink}
              style={{color: '#f5f5dc', display: 'block', padding: '15px 30px'}}
            >
              Anki Stats
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
        <h1 className={styles.sectionTitle} style={{textAlign: 'center'}}>Anki Stats</h1>

        {stats ? (
          <div style={{marginTop: '3rem'}}>
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              padding: '30px',
              borderRadius: '10px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              <h2 style={{fontSize: '1.2rem', marginBottom: '10px', fontWeight: 'normal'}}>Cards Reviewed Today</h2>
              <p style={{fontSize: '3rem', fontWeight: 'bold', margin: 0}}>{stats.today}</p>
              <p style={{fontSize: '0.9rem', color: '#666', marginTop: '10px'}}>
                Time: {stats.timeToday} min
              </p>
            </div>

            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              padding: '30px',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <h2 style={{fontSize: '1.2rem', marginBottom: '10px', fontWeight: 'normal'}}>Total Cards Reviewed</h2>
              <p style={{fontSize: '3rem', fontWeight: 'bold', margin: 0}}>{stats.total}</p>
              <p style={{fontSize: '0.9rem', color: '#666', marginTop: '10px'}}>
                Total time: {stats.timeTotal} hrs
              </p>
            </div>

            <p style={{textAlign: 'center', marginTop: '30px', fontSize: '0.9rem', color: '#666'}}>
              Last updated: {new Date(stats.lastUpdated).toLocaleString()}
            </p>
          </div>
        ) : (
          <div style={{textAlign: 'center', marginTop: '3rem'}}>
            <p>Loading stats...</p>
          </div>
        )}
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2025 Parker Smith</p>
      </footer>
    </div>
  );
}
