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
      const sections = ['home', 'about', 'projects', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 50 && rect.bottom > 50;
        }
        return false;
      });

      setActiveSection(currentSection || '');
    };

    const links = document.querySelectorAll(`.${styles.menuLink}`);
    links.forEach(link => link.addEventListener("click", smoothScroll));

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial active section

    return () => {
      links.forEach(link => link.removeEventListener("click", smoothScroll));
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
    audioRef.current = new Audio('/resume.wav');
    const audio = audioRef.current;

    const updateTime = () => {
      setCurrentTime(formatTime(audio.currentTime));
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const loadedMetadata = () => {
      setDuration(formatTime(audio.duration));
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', loadedMetadata);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', loadedMetadata);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(e.target.value);
  };

  const adjustVolume = (e) => {
    const newVolume = e.target.value / 100;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

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
        <ul>
          <li><a href="#home" className={`${styles.menuLink} ${activeSection === 'home' ? styles.active : ''}`}>Home</a></li>
          <li><a href="#about" className={`${styles.menuLink} ${activeSection === 'about' ? styles.active : ''}`}>About</a></li>
          <li><a href="#projects" className={`${styles.menuLink} ${activeSection === 'projects' ? styles.active : ''}`}>Projects</a></li>
          <li><a href="#contact" className={`${styles.menuLink} ${activeSection === 'contact' ? styles.active : ''}`}>Contact</a></li>
        </ul>
      </nav>

      <a href="#home" className={styles.topArrow}>
        <i className="fas fa-arrow-up"></i>
      </a>

      <section id="home" className={`${styles.section} ${styles.home}`}>
        <h1 className={styles.sectionTitle}>Parker Smith</h1>
        <p>another resumé</p>
      </section>
      <section id="about" className={`${styles.section} ${styles.about}`}>
        <h2 className={styles.sectionTitle}>About Me</h2>
        <div className={styles.audioContainer}>
          <div className={styles.audioControls}>
            <div className={styles.topControls}>
              <button onClick={togglePlay} className={styles.playPauseButton}>
                {isPlaying ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}
              </button>
              <div className={styles.audioTimer}>
                {currentTime} / {duration}
              </div>
              <div className={styles.volumeControl}>
                <i className="fas fa-volume-up"></i>
                <input 
                  type="range" 
                  className={styles.volumeSlider} 
                  value={volume * 100} 
                  onChange={adjustVolume}
                  min="0" 
                  max="100" 
                />
              </div>
            </div>
          </div>
          <input 
            type="range" 
            className={styles.progressBar}
            value={progress}
            onChange={handleProgressChange}
            min="0" 
            max="100" 
          />
        </div>
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
      <section id="contact" className={`${styles.section} ${styles.contact}`}>
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
        <p>&copy; 2024 Parker Smith</p>
      </footer>
    </div>
  );
}
