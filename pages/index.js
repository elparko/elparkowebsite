import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useState, useEffect, useRef } from "react";
import Link from 'next/link';

export default function Home() {
  const [activeSection, setActiveSection] = useState('');
  const menuToggleRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [showArrow, setShowArrow] = useState(false);
  const [ankiStats, setAnkiStats] = useState(null);
  const [displayToday, setDisplayToday] = useState(0);
  const [displayWeek, setDisplayWeek] = useState(0);
  const [displayTotal, setDisplayTotal] = useState(0);
  const [displayTimeToday, setDisplayTimeToday] = useState(0);
  const [displayTimeWeek, setDisplayTimeWeek] = useState(0);
  const [displayTimeTotal, setDisplayTimeTotal] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const smoothScroll = (e) => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute("href").slice(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    };

    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'blog', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 50 && rect.bottom > 50;
        }
        return false;
      });

      setActiveSection(currentSection || '');

      // Show arrow on all sections except home
      setShowArrow(currentSection !== 'home');
    };

    const links = document.querySelectorAll(`.${styles.menuLink}`);
    links.forEach(link => link.addEventListener("click", smoothScroll));

    const container = document.querySelector(`.${styles.container}`);
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial active section

    return () => {
      links.forEach(link => link.removeEventListener("click", smoothScroll));
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const updateMenuToggleColor = () => {
      if (menuToggleRef.current) {
        const rect = menuToggleRef.current.getBoundingClientRect();
        const elementAtPoint = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
        const backgroundColor = window.getComputedStyle(elementAtPoint).backgroundColor;
        
        // Check if the background color is light or dark
        const rgb = backgroundColor.match(/\d+/g);
        const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
        
        if (brightness > 128) {
          menuToggleRef.current.classList.remove(styles.dark);
          menuToggleRef.current.classList.add(styles.light);
        } else {
          menuToggleRef.current.classList.remove(styles.light);
          menuToggleRef.current.classList.add(styles.dark);
        }
      }
    };

    updateMenuToggleColor();
    window.addEventListener('scroll', updateMenuToggleColor);
    return () => window.removeEventListener('scroll', updateMenuToggleColor);
  }, []);

  useEffect(() => {
    // Fetch Anki stats
    fetch('/anki-stats.json')
      .then(res => res.json())
      .then(data => setAnkiStats(data))
      .catch(err => console.error('Error loading Anki stats:', err));
  }, []);

  // Animate numbers from previous to current values
  useEffect(() => {
    if (!ankiStats) return;

    const duration = 5000; // 5 seconds
    const frameRate = 60; // 60 FPS
    const totalFrames = (duration / 1000) * frameRate;

    const animateValue = (start, end, setter) => {
      const increment = (end - start) / totalFrames;
      let current = start;
      let frame = 0;

      const timer = setInterval(() => {
        frame++;
        current += increment;

        if (frame >= totalFrames) {
          setter(end);
          clearInterval(timer);
        } else {
          setter(Math.round(current));
        }
      }, 1000 / frameRate);

      return timer;
    };

    const timers = [
      animateValue(ankiStats.previousToday, ankiStats.today, setDisplayToday),
      animateValue(ankiStats.previousWeek, ankiStats.week, setDisplayWeek),
      animateValue(ankiStats.previousTotal, ankiStats.total, setDisplayTotal),
      animateValue(ankiStats.previousTimeToday || 0, ankiStats.timeToday || 0, setDisplayTimeToday),
      animateValue(ankiStats.previousTimeWeek || 0, ankiStats.timeWeek || 0, setDisplayTimeWeek),
      animateValue(ankiStats.previousTimeTotal || 0, ankiStats.timeTotal || 0, setDisplayTimeTotal)
    ];

    return () => timers.forEach(timer => clearInterval(timer));
  }, [ankiStats]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Parker Smith</title>
        <meta name="description" content="Parker Smith's personal portfolio website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className={styles.menu}>
        <div className={styles.menuToggle}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul style={{padding: 0}}>
          <li style={{padding: 0}}><a href="#home" className={`${styles.menuLink} ${activeSection === 'home' ? styles.active : ''}`} style={{display: 'block', padding: '15px 30px'}}>Home</a></li>
          <li style={{padding: 0}}><a href="#about" className={`${styles.menuLink} ${activeSection === 'about' ? styles.active : ''}`} style={{display: 'block', padding: '15px 30px'}}>About</a></li>
          <li style={{padding: 0}}><a href="#projects" className={`${styles.menuLink} ${activeSection === 'projects' ? styles.active : ''}`} style={{display: 'block', padding: '15px 30px'}}>Projects</a></li>
          <li style={{padding: 0}}><a href="#blog" className={`${styles.menuLink} ${activeSection === 'blog' ? styles.active : ''}`} style={{display: 'block', padding: '15px 30px'}}>Writing</a></li>
          <li style={{padding: 0}}><a href="#contact" className={`${styles.menuLink} ${activeSection === 'contact' ? styles.active : ''}`} style={{display: 'block', padding: '15px 30px'}}>Contact</a></li>
        </ul>
      </nav>

      <button
        onClick={() => {
          const homeSection = document.getElementById('home');
          if (homeSection) {
            homeSection.scrollIntoView({ behavior: "smooth" });
          }
        }}
        className={`${styles.topArrow} ${showArrow ? styles.showArrow : ''} ${activeSection === 'about' || activeSection === 'blog' ? styles.lightBackground : ''}`}
      >
        <i className="fas fa-arrow-up"></i>
      </button>

      <section id="home" className={`${styles.section} ${styles.home}`}>
        <h1 className={styles.sectionTitle}>Parker Smith</h1>
        <p>another resumé</p>
      </section>
      <section id="about" className={`${styles.section} ${styles.about}`}>
        <h2 className={styles.sectionTitle}>Anki Stats</h2>
        {ankiStats ? (
          <div style={{display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              padding: '30px 40px',
              borderRadius: '10px',
              textAlign: 'center',
              minWidth: '180px'
            }}>
              <h3 style={{fontSize: '1rem', marginBottom: '10px', fontWeight: 'normal'}}>Today</h3>
              <p style={{fontSize: '3rem', fontWeight: 'bold', margin: 0}}>{displayToday.toLocaleString()}</p>
              <p style={{fontSize: '0.9rem', marginTop: '10px', color: '#666'}}>{displayTimeToday.toFixed(1)} min</p>
            </div>
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              padding: '30px 40px',
              borderRadius: '10px',
              textAlign: 'center',
              minWidth: '180px'
            }}>
              <h3 style={{fontSize: '1rem', marginBottom: '10px', fontWeight: 'normal'}}>This Week</h3>
              <p style={{fontSize: '3rem', fontWeight: 'bold', margin: 0}}>{displayWeek.toLocaleString()}</p>
              <p style={{fontSize: '0.9rem', marginTop: '10px', color: '#666'}}>{displayTimeWeek.toFixed(1)} min</p>
            </div>
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              padding: '30px 40px',
              borderRadius: '10px',
              textAlign: 'center',
              minWidth: '180px'
            }}>
              <h3 style={{fontSize: '1rem', marginBottom: '10px', fontWeight: 'normal'}}>Total</h3>
              <p style={{fontSize: '3rem', fontWeight: 'bold', margin: 0}}>{displayTotal.toLocaleString()}</p>
              <p style={{fontSize: '0.9rem', marginTop: '10px', color: '#666'}}>{displayTimeTotal.toFixed(1)} hrs</p>
            </div>
          </div>
        ) : (
          <p>Loading stats...</p>
        )}
      </section>

      <section id="projects" className={`${styles.section} ${styles.projects}`}>
        <h2 className={styles.sectionSubtitle}>My Projects</h2>
        <div className={styles.projectGrid}>
          <a href="https://www.pereste.com" target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
            <div className={styles.projectCard}>
              <div className={styles.projectFront}>
                <i className="fas fa-hospital"></i>
                <h3>Pereste, Inc.</h3>
              </div>
              <div className={styles.projectBack}>
                <p>A failed venture into AI in healthcare focused on health literacy.</p>
              </div>
            </div>
          </a>
          <a href="https://www.instagram.com/migrainesofuci?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
            <div className={styles.projectCard}>
              <div className={styles.projectFront}>
                <i className="fas fa-brain"></i>
                <h3>The Migraine Club at UCI</h3>
              </div>
              <div className={styles.projectBack}>
                <p>A club I founded at UCI.</p>
              </div>
            </div>
          </a>
          <a href="https://mohswoundcare.com" target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
            <div className={styles.projectCard}>
              <div className={styles.projectFront}>
                <i className="fas fa-user-md"></i>
                <h3>MohsWoundCare</h3>
              </div>
              <div className={styles.projectBack}>
                <p>A comprehensive guide for Mohs surgery wound care and recovery.</p>
              </div>
            </div>
          </a>
        </div>
      </section>
      <section id="blog" className={`${styles.section} ${styles.about}`}>
        <h2 className={styles.sectionSubtitle}>Writing</h2>
        <div className={styles.projectGrid}>
          <Link href="/learning-at-the-edge" className={styles.projectLink}>
            <div className={styles.projectCard}>
              <div className={styles.projectFront}>
                <i className="fas fa-lightbulb"></i>
                <h3>Learning at the Edge of Knowledge</h3>
              </div>
              <div className={styles.projectBack}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px'}}>
                  <p style={{fontSize: '2rem', margin: 0}}>October</p>
                  <p style={{fontSize: '2rem', margin: 0}}>2025</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>
      <section id="contact" className={`${styles.section} ${styles.home}`}>
        <h2 className={styles.sectionSubtitle}>Contact Me</h2>
        <p>elparkowebsite@proton.me</p>
        <div className={styles.socialLinks}>
          <a href="https://github.com/elparko" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.instagram.com/park.rsmith" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2025 Parker Smith</p>
      </footer>
    </div>
  );
}
