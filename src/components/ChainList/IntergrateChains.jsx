import { HorizontalScroll } from '../HorizontalScroll/HorizontalScroll';
import { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';

const LazyImage = ({ src, alt, title, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <img
      ref={imgRef}
      className={`${className} ${isLoaded ? styles.loaded : styles.loading}`}
      src={isInView ? src : ''}
      alt={alt}
      title={title}
      onLoad={handleLoad}
      style={{
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out'
      }}
    />
  );
};

const IntergrateChains = ({ chains, rows = 4 }) => {
  // 平均分组
  const groupChains = Array.from({ length: rows }, (_, i) =>
    chains.filter((_, idx) => idx % rows === i)
  );

  return (
    <div className={styles.chainsContainer}>
      {groupChains.map((rowChains, rowIdx) => (
        <div className={styles.chainsRow} key={rowIdx}>
          <HorizontalScroll
            speed={70}
            direction={rowIdx % 2 === 0 ? 'right' : 'left'}
            infiniteLoop
            pauseOnHover={true}
          >
            {rowChains.map(chain => (
              <LazyImage
                className={styles.chainItem}
                key={chain.id}
                src={chain.logo_url}
                alt={chain.name}
                title={chain.name}
              />
            ))}
          </HorizontalScroll>
        </div>
      ))}
    </div>
  );
};

export default IntergrateChains;
