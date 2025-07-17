import { useState, useEffect } from 'react';

export const useIsSmallScreen =() => {
    const [isSmall, setIsSmall] = useState(() => window.innerWidth <= 1024);
    useEffect(() => {
      const onResize = () => setIsSmall(window.innerWidth <= 1024);
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }, []);
    return isSmall;
}
  
