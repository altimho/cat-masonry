export interface ColumnItem {
  id: number;
  height: number;
  top: number;
}

export class Column {
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
