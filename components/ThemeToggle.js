import { useEffect, useState } from 'react';
import styles from '@/styles/Corner.module.css';

// Follows the system setting until the visitor picks one; the choice is kept in localStorage and
// applied before first paint by the script in pages/_document.js.
export default function ThemeToggle() {
  const [dark, setDark] = useState(null);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const read = () => {
      const set = document.documentElement.dataset.theme;
      setDark(set ? set === 'dark' : media.matches);
    };
    read();
    media.addEventListener('change', read);
    return () => media.removeEventListener('change', read);
  }, []);

  function flip() {
    const next = dark ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch {}
    setDark(!dark);
  }

  if (dark === null) return null;
  const label = dark ? 'Switch to light mode' : 'Switch to dark mode';
  return (
    <button type="button" onClick={flip} className={styles.toggle} aria-label={label} title={label}>
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {dark ? (
          <>
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
          </>
        ) : (
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
        )}
      </svg>
    </button>
  );
}
