import { useFetcher, useLoaderData } from 'react-router';
import { css } from '@emotion/react';
import { useCallback, useMemo } from 'react';

import { useIntersect } from '../../hooks/useIntersect';

import { type photoListLoader } from './loader';
import { PhotoWithLink } from './PhotoWithLink';
import { buildMasonry } from './utils/buildMasonry';
import { useFlexibleCols } from './hooks/useFlexibleCols';
import { useScrollMargins } from './hooks/useScrollMargins';
import { PhotoListItem } from './PhotoListItem';
import { useScrollToHash } from './hooks/useScrollToHash';

const BASE_COLUMN_WIDTH = 300;
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

  const { resizableRef, cols, colWidth } = useFlexibleCols<HTMLDivElement>({
    colWidth: BASE_COLUMN_WIDTH,
  });

  const { hashItemRef, hashIdToScroll } = useScrollToHash<HTMLDivElement>({
    isRendered: cols > 0,
  });

  const masonry = useMemo(() => {
    return buildMasonry(cols, photoIds, colWidth);
  }, [photoIds, cols, colWidth]);

  const { containerRef, begin, end } = useScrollMargins<HTMLDivElement>({
    visibilityGap: VISIBILITY_GAP,
  });

  const items = useMemo(() => {
    const items = masonry.getVisibleItems(begin, end);

    if (
      hashIdToScroll &&
      items.findIndex((item) => item.id === Number(hashIdToScroll)) < 0
    ) {
      const item = masonry.getItemById(Number(hashIdToScroll));
      if (item) {
        items.push(item);
      }
    }

    return items;
  }, [begin, end, masonry, hashIdToScroll]);

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
        style={{ height: masonry.height, width: colWidth * cols }}
      >
        {items.map(({ id, top, height, column }) => {
          const ref =
            id.toString() === hashIdToScroll ? hashItemRef : undefined;

          return (
            <PhotoListItem
              key={id}
              ref={ref}
              top={top}
              left={column * colWidth}
              height={height}
              width={colWidth}
            >
              <PhotoWithLink photoId={id} imgWidth={BASE_COLUMN_WIDTH} />
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
