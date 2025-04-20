import { Link } from 'react-router';

import { getPhotoById } from '../photoCollection';
import { assertIsNotNil } from '../utils/assert/assertIsNotNil';

interface PhotoListItemProps {
  className?: string;
  photoId: number;
}

export const PhotoListItem = ({ photoId, className }: PhotoListItemProps) => {
  const photo = getPhotoById(photoId);
  assertIsNotNil(photo);

  const url = new URL(photo.src.original);
  url.searchParams.set('auto', 'compress');
  url.searchParams.set('cs', 'tinysrgb');
  url.searchParams.set('w', '350');

  return (
    <div className={className}>
      <Link to={{ pathname: `/${photo.id.toString()}` }}>
        <img src={url.toString()} alt={photo.alt} />
      </Link>
    </div>
  );
};
