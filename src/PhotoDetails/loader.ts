import { LoaderFunctionArgs } from 'react-router';

import { PexelsApiClient } from '../PexelsClient';
import { assertIsString } from '../utils/assert/assertIsString';
import { getPhotoById, savePhotosToCollection } from '../photoCollection';

const pexelsClient = new PexelsApiClient();

export const photoDetailsLoader = async ({
  params: { photoId },
}: LoaderFunctionArgs) => {
  assertIsString(photoId);
  const id = Number(photoId);

  const photoFromCollection = getPhotoById(id);
  if (photoFromCollection) {
    return {
      photo: photoFromCollection,
    };
  }

  const photoFromApi = await pexelsClient.getPhoto(id);
  savePhotosToCollection([photoFromApi]);

  return {
    photo: photoFromApi,
  };
};
