import { type PhotoResource } from '../PexelsClient';

export class PhotoCollection {
  protected static _instance = new PhotoCollection();

  static get() {
    return this._instance;
  }

  private constructor() {}

  protected photoCollection = new Map<number, PhotoResource>();

  savePhotosToCollection = (photos: PhotoResource[]) => {
    photos.map((photo) => {
      this.photoCollection.set(photo.id, photo);
    });

    return Array.from(this.photoCollection.keys());
  };

  getPhotoById = (id: number) => {
    return this.photoCollection.get(id);
  };
}
