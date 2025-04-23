import { useLoaderData } from 'react-router';
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
  const { photoIds } = useLoaderData<typeof photoListLoader>();

  const [begin, setBegin] = useState(0);
  const [end, setEnd] = useState(0);

  const scrollCallback = useCallback(() => {
    const listTop = containerRef.current?.offsetTop ?? 0;
    setBegin(window.scrollY - listTop - 200);
    setEnd(window.scrollY - listTop + window.innerHeight + 200);
  }, []);

  useEffect(() => {
    scrollCallback();

    window.addEventListener('scroll', scrollCallback);
    window.addEventListener('resize', scrollCallback);
    return () => {
      window.removeEventListener('scroll', scrollCallback);
      window.addEventListener('resize', scrollCallback);
    };
  }, [scrollCallback]);

  const masonry = useMemo(() => {
    return buildMasonry(5, photoIds, COL_WIDTH);
  }, [photoIds]);

  const items = useMemo(
    () => masonry.getVisibleItems(begin, end),
    [begin, end, masonry],
  );

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
