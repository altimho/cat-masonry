import { useFetcher, useLoaderData } from 'react-router';
import { css } from '@emotion/react';
import { useCallback, useMemo } from 'react';

import { useIntersect } from '../hooks/useIntersect';

import { type photoListLoader } from './loader';
import { PhotoListItem } from './PhotoListItem';
import { buildMasonry } from './utils/buildMasonry';
import { useFlexibleCols } from './hooks/useFlexibleCols';
import { useScrollMargins } from './hooks/useScrollMargins';

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
  const { photoIds: initialPhotoIds } = useLoaderData<typeof photoListLoader>();

  const fetcher = useFetcher<typeof photoListLoader>();
  const { photoIds = initialPhotoIds, page = 1 } = fetcher.data ?? {};

  const { resizableRef, cols } = useFlexibleCols({ colWidth: COL_WIDTH });

  const masonry = useMemo(() => {
    return buildMasonry(cols, photoIds, COL_WIDTH);
  }, [photoIds, cols]);

  const { containerRef, begin, end } = useScrollMargins({
    visibilityGap: VISIBILITY_GAP,
  });

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
        style={{
          top: masonry.lowestHeight - LOAD_MORE_GAP,
        }}
        ref={(node) => {
          intersectRef.current = node;
        }}
      ></div>
    </div>
  );
};
