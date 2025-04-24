import { createSearchParams } from 'react-router';

import { PhotoResource } from './types/PhotoResource.ts';
import { PhotoList } from './types/PhotoList.ts';

interface GetPhotoList {
  query?: string;
  perPage?: number;
  page?: number;
}

export class PexelsApiClient {
  async getPhotoList(params: GetPhotoList = {}) {
    const { query = 'funny cats', perPage = 80, page } = params;

    const searchParams = createSearchParams({
      query,
      per_page: perPage.toString(),
    });

    if (page) {
      searchParams.set('page', page.toString());
    }

    const response = await fetch(`/api/search?${searchParams}`);

    return response.json() as Promise<PhotoList>;
  }

  async getPhoto(photoId: number): Promise<PhotoResource> {
    const photoIdString = photoId.toString();

    const response = await fetch(`/api/photos/${photoIdString}`);

    return response.json() as Promise<PhotoResource>;
  }
}
