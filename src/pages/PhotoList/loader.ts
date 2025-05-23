import { LoaderFunctionArgs } from 'react-router';

import { PexelsApiClient } from '../../PexelsClient';
import { photoCollection } from '../../photoCollection';

const pexelsClient = new PexelsApiClient();

export const photoListLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParamPage = url.searchParams.get('page');
  const requestPage = searchParamPage ? Number(searchParamPage) : undefined;

  const { photos, page } = await pexelsClient.getPhotoList({
    page: requestPage,
  });
  const photoIds = photoCollection.savePhotosToCollection(photos);

  return {
    photoIds,
    page,
  };
};
