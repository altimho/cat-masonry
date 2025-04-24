import { LoaderFunctionArgs } from 'react-router';

import { PexelsApiClient } from '../../PexelsClient';
import { assertIsString } from '../../utils/assert/assertIsString';
import { photoCollection } from '../../photoCollection';

const pexelsClient = new PexelsApiClient();

export const photoDetailsLoader = async ({
  params: { photoId },
}: LoaderFunctionArgs) => {
  assertIsString(photoId);
  const id = Number(photoId);

  const photoFromCollection = photoCollection.getPhotoById(id);
  if (photoFromCollection) {
    return {
      photo: photoFromCollection,
    };
  }

  const photoFromApi = await pexelsClient.getPhoto(id);
  photoCollection.savePhotosToCollection([photoFromApi]);

  return {
    photo: photoFromApi,
  };
};
