import { useFetcher, useLoaderData } from 'react-router';
import { css } from '@emotion/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useResize } from '../hooks/useResize';

import { type photoListLoader } from './loader';
import { PhotoListItem } from './PhotoListItem';
import { buildMasonry } from './utils/buildMasonry';

const COL_WIDTH = 350;

const photoListCss = css({
  position: 'relative',
  width: '100%',
});

const photoListItemCss = css({
  position: 'absolute',
  width: COL_WIDTH,
});

export const PhotoList = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { photoIds: initialPhotoIds } = useLoaderData<typeof photoListLoader>();
  const fetcher = useFetcher<typeof photoListLoader>();
  const { photoIds = initialPhotoIds, page = 1 } = fetcher.data ?? {};

  const [cols, setCols] = useState(1);
  const resizeCallback = useCallback(
    (entry: ResizeObserverEntry | undefined) => {
      if (!entry?.contentRect.width) {
        return;
      }

      const newCols = Math.floor(entry.contentRect.width / COL_WIDTH);
      if (cols !== newCols) {
        setCols(newCols);
      }
    },
    [cols, setCols],
  );
  const resizableRef = useResize(resizeCallback);

  const [begin, setBegin] = useState(0);
  const [end, setEnd] = useState(0);

  const masonry = useMemo(() => {
    return buildMasonry(cols, photoIds, COL_WIDTH);
  }, [photoIds, cols]);

  const items = useMemo(
    () => masonry.getVisibleItems(begin, end),
    [begin, end, masonry],
  );

  const scrollCallback = useCallback(() => {
    const listTop = containerRef.current?.offsetTop ?? 0;

    const topMargin = window.scrollY - listTop - 200;
    const bottomMargin = window.scrollY - listTop + window.innerHeight + 200;

    setBegin(topMargin);
    setEnd(bottomMargin);

    const windowBottomLine = window.scrollY + window.innerHeight;

    if (windowBottomLine >= masonry.lowestHeight) {
      if (fetcher.state === 'idle') {
        // fetcher.submit({ page: page + 1 });
      }
    }
  }, [masonry, fetcher, page]);

  useEffect(() => {
    scrollCallback();

    window.addEventListener('scroll', scrollCallback);
    return () => {
      window.removeEventListener('scroll', scrollCallback);
    };
  }, [scrollCallback]);

  return (
    <div
      css={photoListCss}
      style={{ height: masonry.height }}
      ref={(node) => {
        containerRef.current = node;
        resizableRef.current = node;
      }}
    >
      {items.map(({ id, top, column }) => {
        return (
          <div
            key={id}
            css={photoListItemCss}
            style={{ top, left: column * COL_WIDTH }}
          >
            <PhotoListItem photoId={id} width={COL_WIDTH} />
          </div>
        );
      })}
    </div>
  );
};
