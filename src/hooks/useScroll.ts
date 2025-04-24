import { useEffect } from 'react';

type ScrollCallback = () => void;

export const useScroll = (callback: ScrollCallback) => {
  useEffect(() => {
    window.addEventListener('scroll', callback);
    return () => {
      window.removeEventListener('scroll', callback);
    };
  }, [callback]);
};
