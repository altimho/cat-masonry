import { LoaderFunctionArgs } from 'react-router';

import { PexelsApiClient } from '../PexelsClient';
import { assertIsString } from '../utils/assert/assertIsString';
import { getPhotoById } from '../photoCollection';

const pexelsClient = new PexelsApiClient();

export const photoDetailsLoader = async ({
  params: { photoId },
}: LoaderFunctionArgs) => {
  assertIsString(photoId);
  const id = Number(photoId);

  return {
    photo: getPhotoById(id) ?? (await pexelsClient.getPhoto(id)),
  };
};
