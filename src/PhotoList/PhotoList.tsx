import { useLoaderData } from 'react-router';
import { css } from '@emotion/react';

import { type photoListLoader } from './loader';
import { PhotoListItem } from './PhotoListItem';

interface PhotoListProps {
  className?: string;
}

const photoListCss = css({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
});

export const PhotoList = ({ className }: PhotoListProps) => {
  const { photoIds } = useLoaderData<typeof photoListLoader>();

  return (
    <div css={photoListCss} className={className}>
      {photoIds.map((photoId) => (
        <PhotoListItem key={photoId} photoId={photoId} />
      ))}
    </div>
  );
};
