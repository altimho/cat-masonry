import { useEffect, useRef } from 'react';

type ResizeCallback = (entry?: ResizeObserverEntry) => void;

export const useResize = <T extends HTMLElement>(callback: ResizeCallback) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      const observer = new ResizeObserver((entries) => {
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
