import { useCallback, useState } from 'react';

import { useResize } from '../../../hooks/useResize';

interface UseFlexibleColsProps {
  colWidth: number;
}

export const useFlexibleCols = <T extends HTMLElement>({
  colWidth: baseColWidth,
}: UseFlexibleColsProps) => {
  const [cols, setCols] = useState(0);
  const [colWidth, setColWidth] = useState(0);

  const resizeCallback = useCallback(
    (entry: ResizeObserverEntry | undefined) => {
      if (!entry?.contentRect.width) {
        return;
      }

      const newCols = Math.floor(entry.contentRect.width / baseColWidth);
      if (cols !== newCols) {
        setCols(newCols);
      }

      const newColWidth = newCols
        ? Math.floor(entry.contentRect.width / newCols)
        : 0;
      if (colWidth !== newColWidth) {
        setColWidth(newColWidth);
      }
    },
    [cols, setCols, colWidth, setColWidth, baseColWidth],
  );

  const resizableRef = useResize<T>(resizeCallback);

  return {
    resizableRef,
    cols,
    colWidth,
  };
};
