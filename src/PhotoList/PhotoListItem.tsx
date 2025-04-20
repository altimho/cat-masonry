import { Link } from 'react-router';

import { PhotoResource } from '../PexelsClient';

interface PhotoListItemProps {
  photo: PhotoResource;
}

export const PhotoListItem = ({ photo }: PhotoListItemProps) => {
  const url = new URL(photo.src.original);
  url.searchParams.set('auto', 'compress');
  url.searchParams.set('cs', 'tinysrgb');
  url.searchParams.set('w', '350');

  return (
    <Link to={{ pathname: `/${photo.id.toString()}` }}>
      <img src={url.toString()} alt={photo.alt} />
    </Link>
  );
};
