import { useLoaderData } from 'react-router';

import { type photoListLoader } from './loader';
import { PhotoListItem } from './PhotoListItem';

interface PhotoListProps {
  className?: string;
}

export const PhotoList = ({ className }: PhotoListProps) => {
  const { photos } = useLoaderData<typeof photoListLoader>();

  return (
    <div className={className}>
      {photos.map((photo) => (
        <PhotoListItem key={photo.id} photo={photo} />
      ))}
    </div>
  );
};
