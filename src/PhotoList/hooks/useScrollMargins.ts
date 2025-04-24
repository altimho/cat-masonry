import { useCallback, useRef, useState } from 'react';

import { useScroll } from '../../hooks/useScroll';

interface UseScrollMarginsProps {
  visibilityGap?: number;
}

export const useScrollMargins = (props: UseScrollMarginsProps = {}) => {
  const { visibilityGap = 0 } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  const [begin, setBegin] = useState(0);
  const [end, setEnd] = useState(Infinity);

  const scrollCallback = useCallback(() => {
    const listTop = containerRef.current?.offsetTop ?? 0;

    const topMargin = window.scrollY - listTop - visibilityGap;
    const bottomMargin =
      window.scrollY - listTop + window.innerHeight + visibilityGap;

    setBegin(topMargin);
    setEnd(bottomMargin);
  }, [setBegin, setEnd, visibilityGap]);

  useScroll(scrollCallback);

  return {
    containerRef,
    begin,
    end,
  };
};
