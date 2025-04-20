import { PexelsApiClient } from '../PexelsClient';

const pexelsClient = new PexelsApiClient();

export const photoListLoader = async () => {
  const { photos } = await pexelsClient.getPhotoList();

  return {
    photos,
  };
};
