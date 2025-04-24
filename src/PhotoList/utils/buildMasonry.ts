import { getPhotoById } from '../../photoCollection';

interface ColumnItem {
  id: number;
  height: number;
  top: number;
}

class Column {
  protected _height = 0;
  protected items: ColumnItem[] = [];

  get height() {
    return this._height;
  }

  push(id: number, height: number) {
    this.items.push({
      id,
      height,
      top: this._height,
    });
    this._height += height;
  }

  getVisibleItems(begin: number, end: number) {
    return this.items.filter(
      (item) => item.top + item.height >= begin && item.top <= end,
    );
  }

  getItemById(id: number) {
    return this.items.find((item) => item.id === id);
  }
}

interface MasonryIem extends ColumnItem {
  column: number;
}

class Masonry {
  protected columns: Column[] = [new Column()];

  constructor(cols: number) {
    this.columns = Array.from(Array(cols), () => new Column());
  }

  get height() {
    return this.columns.length
      ? Math.max(...this.columns.map((column) => column.height))
      : 0;
  }

  get lowestHeight() {
    return this.columns.length
      ? Math.min(...this.columns.map((column) => column.height))
      : 0;
  }

  push(id: number, height: number) {
    if (this.columns.length === 0) {
      return;
    }

    const lowest = this.columns.reduce((result, column) => {
      return column.height < result.height ? column : result;
    }, this.columns[0]);

    lowest.push(id, height);
  }

  getVisibleItems(begin = 0, end = Infinity): MasonryIem[] {
    return this.columns.flatMap((column, columnIdx) =>
      column
        .getVisibleItems(begin, end)
        .map((a) => ({ ...a, column: columnIdx })),
    );
  }

  getItemById(id: number): MasonryIem | undefined {
    for (let i = 0; i < this.columns.length; i++) {
      const item = this.columns[i].getItemById(id);
      if (item) {
        return { ...item, column: i };
      }
    }
  }
}

export const buildMasonry = (
  colsNumber: number,
  ids: number[],
  width: number,
) => {
  const masonry = new Masonry(colsNumber);

  ids.forEach((id) => {
    const photo = getPhotoById(id);
    if (photo) {
      const k = photo.width / width;
      masonry.push(photo.id, Math.round(photo.height / k));
    }
  });

  return masonry;
};
