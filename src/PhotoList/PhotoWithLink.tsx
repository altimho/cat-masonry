import React from 'react';
import { Link } from 'react-router';
import { css } from '@emotion/react';

import { getPhotoById } from '../photoCollection';
import { assertIsNotNil } from '../utils/assert/assertIsNotNil';

interface PhotoWithLinkProps {
  photoId: number;
  imgWidth: number;
}

const imgCss = css({
  width: '100%',
});

const PhotoWithLinkBase = ({ photoId, imgWidth }: PhotoWithLinkProps) => {
  const photo = getPhotoById(photoId);
  assertIsNotNil(photo);

  const url = new URL(photo.src.original);
  url.searchParams.set('auto', 'compress');
  url.searchParams.set('cs', 'tinysrgb');
  url.searchParams.set('w', imgWidth.toString());

  return (
    <Link to={{ pathname: `/${photo.id.toString()}` }}>
      <img src={url.toString()} alt={photo.alt} css={imgCss} />
    </Link>
  );
};

export const PhotoWithLink = React.memo(PhotoWithLinkBase);
