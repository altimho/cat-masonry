import { PhotoResource } from './PhotoResource.ts';

export interface PhotoList {
  photos: PhotoResource[];
  total_results: number;
  page: number;
  per_page: number;
  next_page?: string;
  prev_page?: string;
}
