import { PhotoResource } from './types/PhotoResource.ts';
import { PhotoList } from './types/PhotoList.ts';

interface GetPhotoList {
  query?: string;
  perPage?: number;
}

export class PexelsApiClient {
  async getPhotoList(params: GetPhotoList = {}) {
    const { query = 'funny cats', perPage = 80 } = params;

    const queryString = encodeURIComponent(query);
    const perPageString = perPage.toString();

    const response = await fetch(
      `/api/search?query=${queryString}&per_page=${perPageString}`,
    );

    return response.json() as Promise<PhotoList>;
  }

  async getPhoto(photoId: number): Promise<PhotoResource> {
    const photoIdString = photoId.toString();

    const response = await fetch(`/api/photos/${photoIdString}`);

    return response.json() as Promise<PhotoResource>;
  }
}
