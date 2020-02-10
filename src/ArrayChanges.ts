import { IChangeItem } from "./interfaces/IChangeItem";
import { IChanges } from "./interfaces/IChanges";
import { IArrayChangeItem } from "./interfaces/IArrayChangeItem";

class ArrayChanges<T> implements IChanges {
  constructor(private _changes: IArrayChangeItem<T>[] = []) {}

  get empty(): boolean {
    return this._changes.length === 0;
  }

  toArray(): IArrayChangeItem<T>[] {
    return this._changes;
  }

  clear(): void {
    if (!this.empty) {
      this._changes = [];
    }
  }

  add(change: IArrayChangeItem<T>): void {
    console.log("ArrayChanges:", JSON.stringify(change));

    if (change.action === "clear") {
      this.clear();
    }

    this._changes.push(change);
  }

  toJSON(): IChangeItem[] {
    return this._changes;
  }
}

export { ArrayChanges };
