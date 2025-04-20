import { LoaderFunctionArgs } from 'react-router';

import { PexelsApiClient } from '../PexelsClient';
import { assertIsString } from '../utils/assert/assertIsString';

const pexelsClient = new PexelsApiClient();

export const photoDetailsLoader = async ({
  params: { photoId },
}: LoaderFunctionArgs) => {
  assertIsString(photoId);

  return {
    photo: await pexelsClient.getPhoto(Number(photoId)),
  };
};
