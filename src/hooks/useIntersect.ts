import { useEffect, useRef } from 'react';

type IntersectCallback = (entry?: IntersectionObserverEntry) => void;

export const useIntersect = (callback: IntersectCallback) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          callback(entry);
        });
      });

      observer.observe(element);

      return () => {
        observer.disconnect();
      };
    }
  }, [callback]);

  return ref;
};
