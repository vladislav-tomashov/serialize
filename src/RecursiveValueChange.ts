import { IChanges } from "./interfaces/IChanges";
import { ValueChange } from "./ValueChange";

export class RecursiveValueChange<T> extends ValueChange<T>
  implements IChanges {
  private _ownChanges: IChanges;
  private _childrenChanges: Array<IChanges>;

  constructor({
    ownChanges,
    childrenChanges
  }: {
    ownChanges: IChanges;
    childrenChanges: Array<IChanges>;
  }) {
    super();
    this._ownChanges = ownChanges;
    this._childrenChanges = childrenChanges;
  }

  get hasChanges() {
    return (
      this._ownChanges.hasChanges ||
      this._childrenChanges.some(x => x.hasChanges)
    );
  }

  get value() {
    return this._value;
  }

  toJSON(): T {
    return this._value;
  }

  //   toArray(): IArrayChangeItem<T>[] {
  //     return this._changes;
  //   }

  //   clear(): void {
  //     this._changes = [];
  //   }

  //   add(change: IArrayChangeItem<T>): void {
  //     if (change.action === "clear") {
  //       this.clear();
  //       return;
  //     }

  //     this._changes.push(change);
  //   }

  //   toJSON(): IArrayChangeItem<T>[] {
  //     return this._changes;
  //   }
}
