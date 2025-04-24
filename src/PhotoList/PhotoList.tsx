import { useFetcher, useLoaderData } from 'react-router';
import { css } from '@emotion/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { type photoListLoader } from './loader';
import { PhotoListItem } from './PhotoListItem';
import { buildMasonry } from './utils/buildMasonry';

const COL_WIDTH = 350;

const photoListCss = css({
  position: 'relative',
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

  const [begin, setBegin] = useState(0);
  const [end, setEnd] = useState(0);

  const masonry = useMemo(() => {
    return buildMasonry(5, photoIds, COL_WIDTH);
  }, [photoIds]);

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
      fetcher.submit({ page: page + 1 });
    }
  }, [masonry, fetcher, page]);

  useEffect(() => {
    scrollCallback();

    window.addEventListener('scroll', scrollCallback);
    window.addEventListener('resize', scrollCallback);
    return () => {
      window.removeEventListener('scroll', scrollCallback);
      window.addEventListener('resize', scrollCallback);
    };
  }, [scrollCallback]);

  return (
    <div
      css={photoListCss}
      style={{ height: masonry.height }}
      ref={containerRef}
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
