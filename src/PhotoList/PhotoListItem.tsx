import { Link } from 'react-router';

import { PhotoResource } from '../PexelsClient';

interface PhotoListItemProps {
  className?: string;
  photo: PhotoResource;
}

export const PhotoListItem = ({ photo, className }: PhotoListItemProps) => {
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
