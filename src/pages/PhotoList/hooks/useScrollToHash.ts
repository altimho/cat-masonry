import { useLocation } from 'react-router';
import { useEffect, useRef } from 'react';

interface UseScrollToHashProps {
  isRendered: boolean;
}

export const useScrollToHash = <T extends HTMLElement>({
  isRendered,
}: UseScrollToHashProps) => {
  const { hash } = useLocation();
  const hashIdToScroll = hash.slice(1);
  const hashItemRef = useRef<T>(null);

  useEffect(() => {
    if (isRendered) {
      hashItemRef.current?.scrollIntoView();
    }
  }, [isRendered]);

  return {
    hashItemRef,
    hashIdToScroll,
  };
};
