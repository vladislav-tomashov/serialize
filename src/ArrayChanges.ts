import { IArrayChangeItem } from "./interfaces/IArrayChangeItem";
import { IArrayChanges } from "./interfaces/IArrayChanges";

class ArrayChanges<T> implements IArrayChanges<T {
  constructor(private _changes: IArrayChangeItem<T>[] = []) {}

  get hasChanges(): boolean {
    return this._changes.length > 0;
  }

  toArray(): IArrayChangeItem<T>[] {
    return this._changes;
  }

  add(change: IArrayChangeItem<T>): void {
    if (change.action === "clear") {
      this._changes = [];
      return;
    }

    this._changes.push(change);
  }

  toJSON(): IArrayChangeItem<T>[] {
    return this._changes;
  }
}

export { ArrayChanges };
