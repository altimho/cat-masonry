import { useLoaderData } from 'react-router';

import { type photoListLoader } from './loader';
import { PhotoListItem } from './PhotoListItem';

interface PhotoListProps {
  className?: string;
}

export const PhotoList = ({ className }: PhotoListProps) => {
  const { photoIds } = useLoaderData<typeof photoListLoader>();

  return (
    <div className={className}>
      {photoIds.map((photoId) => (
        <PhotoListItem key={photoId} photoId={photoId} />
      ))}
    </div>
  );
};
