import { useFetcher, useLoaderData, useLocation } from 'react-router';
import { css } from '@emotion/react';
import { useCallback, useEffect, useMemo, useRef } from 'react';

import { useIntersect } from '../hooks/useIntersect';

import { type photoListLoader } from './loader';
import { PhotoWithLink } from './PhotoWithLink';
import { buildMasonry } from './utils/buildMasonry';
import { useFlexibleCols } from './hooks/useFlexibleCols';
import { useScrollMargins } from './hooks/useScrollMargins';
import { PhotoListItem } from './PhotoListItem';

const COL_WIDTH = 300;
const VISIBILITY_GAP = 200;
const LOAD_MORE_GAP = 200;

const wrapperCss = css({
  width: '100%',
});

const containerCss = css({
  position: 'relative',
});

const anchorCss = css({
  position: 'absolute',
  overflow: 'hidden',
  width: 0,
  height: 0,
});

export const PhotoList = () => {
  const { photoIds: initialPhotoIds } = useLoaderData<typeof photoListLoader>();

  const fetcher = useFetcher<typeof photoListLoader>();
  const { photoIds = initialPhotoIds, page = 1 } = fetcher.data ?? {};

  const { resizableRef, cols } = useFlexibleCols<HTMLDivElement>({
    colWidth: COL_WIDTH,
  });

  const { hash } = useLocation();
  const idToScroll = hash.slice(1);
  const hashItemRef = useRef<HTMLDivElement>(null);
  const masonryIsRendered = cols > 0;

  useEffect(() => {
    if (masonryIsRendered) {
      hashItemRef.current?.scrollIntoView();
    }
  }, [masonryIsRendered]);

  const masonry = useMemo(() => {
    return buildMasonry(cols, photoIds, COL_WIDTH);
  }, [photoIds, cols]);

  const { containerRef, begin, end } = useScrollMargins<HTMLDivElement>({
    visibilityGap: VISIBILITY_GAP,
  });

  const items = useMemo(() => {
    const items = masonry.getVisibleItems(begin, end);
    if (idToScroll) {
      const item = masonry.getItemById(Number(idToScroll));
      if (item) {
        items.push(item);
      }
    }

    return items;
  }, [begin, end, masonry]);

  const intersectCallback = useCallback(
    (entry: IntersectionObserverEntry | undefined) => {
      if ((entry?.intersectionRatio ?? 0) > 0) {
        fetcher.submit({ page: page + 1 });
      }
    },
    [page, fetcher],
  );
  const intersectRef = useIntersect<HTMLDivElement>(intersectCallback);

  return (
    <div ref={resizableRef} css={wrapperCss}>
      <div
        ref={containerRef}
        css={containerCss}
        style={{ height: masonry.height, width: COL_WIDTH * cols }}
      >
        {items.map(({ id, top, height, column }) => {
          const ref = id.toString() === idToScroll ? hashItemRef : undefined;

          return (
            <PhotoListItem
              key={id}
              ref={ref}
              top={top}
              left={column * COL_WIDTH}
              height={height}
              width={COL_WIDTH}
            >
              <PhotoWithLink photoId={id} imgWidth={COL_WIDTH} />
            </PhotoListItem>
          );
        })}
        <div
          ref={intersectRef}
          css={anchorCss}
          style={{
            top: masonry.lowestHeight - LOAD_MORE_GAP,
          }}
        />
      </div>
    </div>
  );
};
