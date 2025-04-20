import { PexelsApiClient } from '../PexelsClient';
import { photoCollection, savePhotosToCollection } from '../photoCollection';

const pexelsClient = new PexelsApiClient();

export const photoListLoader = async () => {
  const { photos } = await pexelsClient.getPhotoList();

  return {
    photoIds: savePhotosToCollection(photos),
  };
};
