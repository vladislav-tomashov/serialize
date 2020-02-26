import { IChanges } from "./interfaces/IChanges";
import { IArrayChangeItem } from "./interfaces/IArrayChangeItem";

class ArrayChanges<T> implements IChanges {
  constructor(private _changes: IArrayChangeItem<T>[] = []) {}

  get hasChanges(): boolean {
    return this._changes.length > 0;
  }

  toArray(): IArrayChangeItem<T>[] {
    return this._changes;
  }

  clear(): void {
    this._changes = [];
  }

  add(change: IArrayChangeItem<T>): void {
    if (change.action === "clear") {
      this.clear();
      return;
    }

    this._changes.push(change);
  }

  toJSON(): IArrayChangeItem<T>[] {
    return this._changes;
  }
}

export { ArrayChanges };
