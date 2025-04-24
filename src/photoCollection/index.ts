import { PhotoResource } from '../PexelsClient';

const photoCollection = new Map<number, PhotoResource>();

export const savePhotosToCollection = (photos: PhotoResource[]) => {
  photos.map((photo) => {
    photoCollection.set(photo.id, photo);
  });

  return Array.from(photoCollection.keys());
};

export const getPhotoById = (id: number) => {
  return photoCollection.get(id);
};
