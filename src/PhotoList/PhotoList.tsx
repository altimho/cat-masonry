import { useLoaderData } from 'react-router';

import { type photoListLoader } from './loader';
import { PhotoListItem } from './PhotoListItem';

export const PhotoList = () => {
  const { photos } = useLoaderData<typeof photoListLoader>();

  return (
    <div>
      {photos.map((photo) => (
        <PhotoListItem key={photo.id} photo={photo} />
      ))}
    </div>
  );
};
