import { PhotoCollection } from '../PhotoCollection';
import { PhotoResource } from '../../PexelsClient';

describe('PhotoCollection', () => {
  const collection = PhotoCollection.get();

  beforeEach(() => {
    collection.clear();
  });

  describe('savePhotosToCollection', () => {
    it('should save photos to the collection and return their IDs', () => {
      const photos = [{ id: 1 }, { id: 2 }] as PhotoResource[];

      const result = collection.savePhotosToCollection(photos);

      expect(result).toEqual([1, 2]);
    });
  });

  describe('getPhotoById', () => {
    it('should return the correct photo by ID', () => {
      const photos = [{ id: 1 }, { id: 2 }] as PhotoResource[];

      collection.savePhotosToCollection(photos);

      const photo = collection.getPhotoById(1);
      expect(photo).toEqual({ id: 1 });
    });

    it('should return undefined for a non-existent photo ID', () => {
      collection.savePhotosToCollection([
        { id: 1 },
        { id: 2 },
      ] as PhotoResource[]);

      const photo = collection.getPhotoById(999);

      expect(photo).toBeUndefined();
    });
  });
});
