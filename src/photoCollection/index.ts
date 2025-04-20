import { PhotoResource } from '../PexelsClient';

const photoCollection = new Map<number, PhotoResource>();

export const savePhotosToCollection = (photos: PhotoResource[]) => {
  return photos.map((photo) => {
    photoCollection.set(photo.id, photo);

    return photo.id;
  });
};

export const getPhotoById = (id: number) => {
  return photoCollection.get(id);
};
