import React, { useState, useEffect } from 'react';
import styles from './BackToTopButton.module.scss';

const ArrowUpIcon = () => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="25" height="25">
  <path style={{ opacity: 0.35 }}
    d="M160 141.3V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.3l-32-32-32 32z" />
  <path
    d="M169.4 41.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L192 109.3 54.6 246.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z" />
</svg>
);

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className={`${styles['back-to-top-button']} ${isVisible ? styles.visible : ''}`}
      onClick={scrollToTop}
    >
      <ArrowUpIcon />
    </button>
  );
};

export default BackToTopButton;
