import { useCallback, useEffect, useRef, useState } from 'react';

import { useScroll } from '../../hooks/useScroll';

interface UseScrollMarginsProps {
  visibilityGap?: number;
}

export const useScrollMargins = <T extends HTMLElement>(
  props: UseScrollMarginsProps = {},
) => {
  const { visibilityGap = 0 } = props;

  const containerRef = useRef<T>(null);

  const [begin, setBegin] = useState(0);
  const [end, setEnd] = useState(0);

  const scrollCallback = useCallback(() => {
    const listTop = containerRef.current?.offsetTop ?? 0;

    const topMargin = window.scrollY - listTop - visibilityGap;
    const bottomMargin =
      window.scrollY - listTop + window.innerHeight + visibilityGap;

    setBegin(topMargin);
    setEnd(bottomMargin);
  }, [setBegin, setEnd, visibilityGap]);

  useScroll(scrollCallback);

  useEffect(() => {
    scrollCallback();
  }, [scrollCallback]);

  return {
    containerRef,
    begin,
    end,
  };
};
