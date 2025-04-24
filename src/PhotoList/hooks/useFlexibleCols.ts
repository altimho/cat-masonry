import { useCallback, useState } from 'react';

import { useResize } from '../../hooks/useResize';

interface UseFlexibleColsProps {
  colWidth: number;
}

export const useFlexibleCols = ({ colWidth }: UseFlexibleColsProps) => {
  const [cols, setCols] = useState(1);

  const resizeCallback = useCallback(
    (entry: ResizeObserverEntry | undefined) => {
      if (!entry?.contentRect.width) {
        return;
      }

      const newCols = Math.floor(entry.contentRect.width / colWidth);
      if (cols !== newCols) {
        setCols(newCols);
      }
    },
    [cols, setCols, colWidth],
  );

  const resizableRef = useResize(resizeCallback);

  return {
    resizableRef,
    cols,
  };
};
