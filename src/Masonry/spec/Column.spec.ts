import { Column } from '../Column';

describe('Column.', () => {
  describe('Newly created column', () => {
    let column: Column;

    beforeEach(() => {
      column = new Column();
    });

    it('should have zero height', () => {
      expect(column.height).toBe(0);
    });
  });

  describe('Column with items', () => {
    let column: Column;

    beforeEach(() => {
      column = new Column();
    });

    describe('push()', () => {
      it('should add an item and update column height', () => {
        column.push(1, 100);
        expect(column.height).toBe(100);
        expect(column.getItemById(1)).toEqual({ id: 1, height: 100, top: 0 });
      });

      it('should add multiple items and update column height', () => {
        column.push(1, 100);
        column.push(2, 200);
        expect(column.height).toBe(300);
        expect(column.getItemById(2)).toEqual({ id: 2, height: 200, top: 100 });
      });
    });

    describe('getVisibleItems()', () => {
      it('should return items within the visible range', () => {
        column.push(1, 100);
        column.push(2, 200);
        column.push(3, 300);

        const visibleItems = column.getVisibleItems(50, 250);
        expect(visibleItems).toEqual([
          { id: 1, height: 100, top: 0 },
          { id: 2, height: 200, top: 100 },
        ]);
      });

      it('should return an empty array if no items are within the range', () => {
        column.push(1, 100);
        column.push(2, 200);
        const visibleItems = column.getVisibleItems(500, 600);
        expect(visibleItems).toEqual([]);
      });
    });

    describe('getItemById()', () => {
      it('should retrieve the correct item by id', () => {
        column.push(1, 100);
        column.push(2, 200);
        const item = column.getItemById(2);
        expect(item).toEqual({ id: 2, height: 200, top: 100 });
      });

      it('should return undefined if no item with the specified id exists', () => {
        column.push(1, 100);
        const item = column.getItemById(3);
        expect(item).toBeUndefined();
      });
    });
  });
});
