import { PexelsApiClient } from '../PexelsClient';
import { savePhotosToCollection } from '../photoCollection';

const pexelsClient = new PexelsApiClient();

export const photoListLoader = async () => {
  const { photos } = await pexelsClient.getPhotoList();
  const photoIds = savePhotosToCollection(photos);

  return {
    photoIds,
  };
};
