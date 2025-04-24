import { useEffect, useRef } from 'react';

type IntersectCallback = (entry?: IntersectionObserverEntry) => void;

export const useIntersect = <T extends HTMLElement>(
  callback: IntersectCallback,
) => {
  const ref = useRef<T>(null);

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
