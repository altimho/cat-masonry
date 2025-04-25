import { Masonry } from '../Masonry';

describe('Masonry', () => {
  describe('height', () => {
    it('should return the maximum height among all columns', () => {
      const masonry = new Masonry(2);

      masonry.push(1, 50);
      masonry.push(2, 30);

      expect(masonry.height).toBe(50);
    });

    it('should return 0 if there are no columns', () => {
      const masonry = new Masonry(0);

      expect(masonry.height).toBe(0);
    });
  });

  describe('lowestHeight', () => {
    it('should return the minimum height among all columns', () => {
      const masonry = new Masonry(2);

      masonry.push(1, 50);
      masonry.push(2, 30);

      expect(masonry.lowestHeight).toBe(30);
    });

    it('should return 0 if there are no columns', () => {
      const masonry = new Masonry(0);
      expect(masonry.lowestHeight).toBe(0);
    });
  });

  describe('push', () => {
    it('should add an item to the column with the lowest height', () => {
      const masonry = new Masonry(2);

      masonry.push(1, 50);
      masonry.push(2, 30);
      masonry.push(3, 10);

      expect(masonry.height).toBe(50);
      expect(masonry.lowestHeight).toBe(40);
    });

    it('should do nothing if there are no columns', () => {
      const masonry = new Masonry(0);

      const test = () => {
        masonry.push(1, 50);
      };

      expect(test).not.toThrow();
    });
  });

  describe('getVisibleItems', () => {
    it('should return visible items within the specified range across all columns', () => {
      const masonry = new Masonry(2);

      masonry.push(1, 100);
      masonry.push(2, 30);
      masonry.push(3, 30);
      masonry.push(3, 30);

      expect(masonry.getVisibleItems(35, 40)).toEqual([
        { id: 1, height: 100, top: 0, column: 0 },
        { id: 3, height: 30, top: 30, column: 1 },
      ]);
    });

    it('should return an empty array if there are no items within the range', () => {
      const masonry = new Masonry(2);

      masonry.push(1, 50);

      expect(masonry.getVisibleItems(100, 200)).toEqual([]);
    });
  });

  describe('getItemById', () => {
    it('should return the item with the specified id and its column index', () => {
      const masonry = new Masonry(1);

      masonry.push(1, 50);
      masonry.push(2, 30);
      masonry.push(3, 20);

      expect(masonry.getItemById(2)).toEqual({
        id: 2,
        height: 30,
        top: 50,
        column: 0,
      });
    });

    it('should return undefined if the item with the specified id does not exist', () => {
      const masonry = new Masonry(2);

      masonry.push(1, 50);

      expect(masonry.getItemById(999)).toBeUndefined();
    });
  });
});
