import React from 'react';
import { Link } from 'react-router';

import { getPhotoById } from '../photoCollection';
import { assertIsNotNil } from '../utils/assert/assertIsNotNil';

interface PhotoListItemProps {
  photoId: number;
  width: number;
}

const PhotoListItemBase = ({ photoId, width }: PhotoListItemProps) => {
  const photo = getPhotoById(photoId);
  assertIsNotNil(photo);

  const url = new URL(photo.src.original);
  url.searchParams.set('auto', 'compress');
  url.searchParams.set('cs', 'tinysrgb');
  url.searchParams.set('w', width.toString());

  return (
    <Link to={{ pathname: `/${photo.id.toString()}` }}>
      <img src={url.toString()} alt={photo.alt} />
    </Link>
  );
};

export const PhotoListItem = React.memo(PhotoListItemBase);
