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
      const sections = ['home', 'projects', 'blog', 'current-sidequest', 'completed-sidequests', 'contact'];
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
          <li style={{padding: 0}}><a href="#projects" className={`${styles.menuLink} ${activeSection === 'projects' ? styles.active : ''}`} style={{display: 'block', padding: '15px 30px'}}>Projects</a></li>
          <li style={{padding: 0}}><a href="#blog" className={`${styles.menuLink} ${activeSection === 'blog' ? styles.active : ''}`} style={{display: 'block', padding: '15px 30px'}}>Writing</a></li>
          <li style={{padding: 0}}><a href="#sidequests" className={`${styles.menuLink} ${activeSection === 'sidequests' ? styles.active : ''}`} style={{display: 'block', padding: '15px 30px'}}>Side Quests</a></li>
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
        className={`${styles.topArrow} ${showArrow ? styles.showArrow : ''} ${activeSection === 'blog' ? styles.lightBackground : ''}`}
      >
        <i className="fas fa-arrow-up"></i>
      </button>

      <section id="home" className={`${styles.section} ${styles.about}`}>
        <h1 className={styles.sectionTitle}>Parker Smith</h1>
        <p>another resumé</p>
      </section>

      <section id="projects" className={`${styles.section} ${styles.projects}`}>
        <h2 className={styles.sectionSubtitle}>My Projects</h2>
        <div className={styles.projectGrid}>
          <Link href="/crswne-keto-research" className={styles.projectLink}>
            <div className={styles.projectCard}>
              <div className={styles.projectFront}>
                <i className="fas fa-flask"></i>
                <h3>CRSwNP & Keto Research</h3>
              </div>
              <div className={styles.projectBack}>
                <p>Exploring the relationship between ketogenic diet and chronic rhinosinusitis with nasal polyps.</p>
              </div>
            </div>
          </Link>
          <a href="https://www.pereste.com" target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
            <div className={styles.projectCard}>
              <div className={styles.projectFront}>
                <i className="fas fa-hospital"></i>
                <h3>Pereste, Inc.</h3>
              </div>
              <div className={styles.projectBack}>
                <p>A venture into AI in healthcare focused on health literacy.</p>
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
      <section id="current-sidequest" className={`${styles.section} ${styles.projects}`}>
        <h2 className={styles.sectionSubtitle}>Current Side Quest</h2>
        <div className={styles.projectGrid}>
          <Link href="/clawdbot" className={styles.projectLink}>
            <div className={styles.projectCard}>
              <div className={styles.projectFront}>
                <i className="fas fa-robot"></i>
                <h3>ClawdBot</h3>
              </div>
              <div className={styles.projectBack}>
                <p>An upcoming project in development.</p>
              </div>
            </div>
          </Link>
        </div>
      </section>
      <section id="completed-sidequests" className={`${styles.section} ${styles.about}`}>
        <h2 className={styles.sectionSubtitle}>Completed Side Quests</h2>
        <div className={styles.projectGrid}>
          <Link href="/sauna-build" className={styles.projectLink}>
            <div className={styles.projectCard}>
              <div className={styles.projectFront}>
                <i className="fas fa-fire"></i>
                <h3>Sauna Build</h3>
              </div>
              <div className={styles.projectBack}>
                <p>Building a custom sauna from scratch.</p>
              </div>
            </div>
          </Link>
          <Link href="/art-feature" className={styles.projectLink}>
            <div className={styles.projectCard}>
              <div className={styles.projectFront}>
                <i className="fas fa-palette"></i>
                <h3>Mohs Map</h3>
              </div>
              <div className={styles.projectBack}>
                <p>Featured in the inaugural issue of Hippocratic magazine Ex Vivo.</p>
              </div>
            </div>
          </Link>
        </div>
      </section>
      <section id="contact" className={`${styles.section} ${styles.projects}`}>
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
