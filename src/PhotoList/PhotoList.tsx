import { useFetcher, useLoaderData } from 'react-router';
import { css } from '@emotion/react';
import { useCallback, useMemo, useRef, useState } from 'react';

import { useResize } from '../hooks/useResize';
import { useIntersect } from '../hooks/useIntersect';
import { useScroll } from '../hooks/useScroll';

import { type photoListLoader } from './loader';
import { PhotoListItem } from './PhotoListItem';
import { buildMasonry } from './utils/buildMasonry';

const COL_WIDTH = 350;
const VISIBILITY_GAP = 200;
const LOAD_MORE_GAP = 200;

const photoListCss = css({
  position: 'relative',
  width: '100%',
});

const photoListItemCss = css({
  position: 'absolute',
  width: COL_WIDTH,
});

const anchorCss = css({
  position: 'absolute',
  overflow: 'hidden',
  width: 0,
  height: 0,
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

  const masonry = useMemo(() => {
    return buildMasonry(cols, photoIds, COL_WIDTH);
  }, [photoIds, cols]);

  const [begin, setBegin] = useState(0);
  const [end, setEnd] = useState(Infinity);

  const scrollCallback = useCallback(() => {
    const listTop = containerRef.current?.offsetTop ?? 0;

    const topMargin = window.scrollY - listTop - VISIBILITY_GAP;
    const bottomMargin =
      window.scrollY - listTop + window.innerHeight + VISIBILITY_GAP;

    setBegin(topMargin);
    setEnd(bottomMargin);
  }, [setBegin, setEnd]);
  useScroll(scrollCallback);

  const items = useMemo(
    () => masonry.getVisibleItems(begin, end),
    [begin, end, masonry],
  );

  const intersectCallback = useCallback(
    (entry: IntersectionObserverEntry | undefined) => {
      if ((entry?.intersectionRatio ?? 0) > 0) {
        fetcher.submit({ page: page + 1 });
      }
    },
    [page, fetcher],
  );
  const intersectRef = useIntersect(intersectCallback);

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
      <div
        css={anchorCss}
        ref={(node) => {
          intersectRef.current = node;
        }}
        style={{
          top: masonry.lowestHeight - LOAD_MORE_GAP,
        }}
      ></div>
    </div>
  );
};
