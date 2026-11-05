import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/Corner.module.css';

export default function TopArrow() {
  const [shown, setShown] = useState(false);
  const button = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const show = window.scrollY > 100;
      if (!show && document.activeElement === button.current) button.current.blur();
      setShown(show);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      ref={button}
      type="button"
      className={`${styles.top} ${shown ? styles.shown : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      title="Back to top"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5.5 11.5L12 5l6.5 6.5" />
      </svg>
    </button>
  );
}
