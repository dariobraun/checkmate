import { useEffect, useState } from 'react';

const useMobileMediaQuery = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 640px)');
    setIsMobile(media.matches);
  }, []);

  return isMobile;
};

export default useMobileMediaQuery;
