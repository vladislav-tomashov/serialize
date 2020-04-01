import {
  TArrayChange,
  ArrayChangeType,
  TArrayPushChange,
  TArrayPopChange,
  TArrayClearChange,
  TArraySortChange,
  TArrayReverseChange,
  TArraySetChange,
  TArrayUnshiftChange,
  TArrayShiftChange
} from "./types";

type TPushChange<T> = [ArrayChangeType.Push, T[]];

type TUnshiftChange<T> = [ArrayChangeType.Unshift, T[]];

type TPopChange = [ArrayChangeType.Pop];

type TShiftChange = [ArrayChangeType.Shift];

type TClearChange = [ArrayChangeType.Clear];

type TSortChange = [ArrayChangeType.Sort];

type TReverseChange = [ArrayChangeType.Reverse];

type TSetChange<T> = [ArrayChangeType.Set, number, T];

type TSpliceChange<T> = [
  ArrayChangeType.Splice,
  number,
  number | undefined,
  T[] | undefined
];

type TChange<T> =
  | TPushChange<T>
  | TPopChange
  | TClearChange
  | TSortChange
  | TReverseChange
  | TSetChange<T>
  | TUnshiftChange<T>
  | TShiftChange
  | TSpliceChange<T>;

export class ArrayChanges<T> {
  private _log: Array<TChange<T>> = [];
  private _skipFutherChanges = false;

  get length() {
    return this._log.length;
  }

  clear() {
    this._log = [];
    this._skipFutherChanges = false;
  }

  registerSplice(start: number, deleteCount: number, items: T[]) {
    if (this._skipFutherChanges) {
      return;
    }

    const change = [
      ArrayChangeType.Splice,
      start,
      deleteCount,
      items
    ] as TSpliceChange<T>;

    this._log.push(change);
  }

  registerSet(index: number, value: T) {
    if (this._skipFutherChanges) {
      return;
    }

    const change = [ArrayChangeType.Set, index, value] as TSetChange<T>;
    this._log.push(change);
  }

  registerPop() {
    if (this._skipFutherChanges) {
      return;
    }

    const change = [ArrayChangeType.Pop] as TPopChange;
    this._log.push(change);
  }

  registerShift() {
    if (this._skipFutherChanges) {
      return;
    }

    const change = [ArrayChangeType.Shift] as TShiftChange;
    this._log.push(change);
  }

  registerClear() {
    if (this._skipFutherChanges) {
      return;
    }

    const change = [ArrayChangeType.Clear] as TClearChange;
    this._log = [];
    this._log.push(change);
    this._skipFutherChanges = true;
  }

  registerSort() {
    if (this._skipFutherChanges) {
      return;
    }

    const change = [ArrayChangeType.Sort] as TSortChange;
    this._log = [];
    this._log.push(change);
    this._skipFutherChanges = true;
  }

  registerReverse() {
    if (this._skipFutherChanges) {
      return;
    }

    const change = [ArrayChangeType.Reverse] as TReverseChange;
    this._log = [];
    this._log.push(change);
    this._skipFutherChanges = true;
  }

  registerPush(items: T[]) {
    if (this._skipFutherChanges) {
      return;
    }

    const change = [ArrayChangeType.Push, items] as TPushChange<T>;
    this._log.push(change);
  }

  registerUnshift(items: T[]) {
    if (this._skipFutherChanges) {
      return;
    }

    const change = [ArrayChangeType.Unshift, items] as TUnshiftChange<T>;
    this._log.push(change);
  }

  private getChanges(source: T[]): TArrayChange<T>[] {
    const result = this._log.map((x) => this._getChange(x, source));
    return result;
  }

  getChangesAndClear(source: T[]): TArrayChange<T>[] {
    const result = this.getChanges(source);
    this.clear();
    return result;
  }

  private _getChange(change: TChange<T>, source: T[]): TArrayChange<T> {
    const [changeType] = change;

    switch (changeType) {
      case ArrayChangeType.Push:
        return change as TArrayPushChange<T>;
      case ArrayChangeType.Unshift:
        return change as TArrayUnshiftChange<T>;
      case ArrayChangeType.Pop:
        return change as TArrayPopChange;
      case ArrayChangeType.Shift:
        return change as TArrayShiftChange;
      case ArrayChangeType.Clear:
        return [ArrayChangeType.Clear, source] as TArrayClearChange<T>;
      case ArrayChangeType.Sort:
        return [ArrayChangeType.Sort, source] as TArraySortChange<T>;
      case ArrayChangeType.Reverse:
        return [ArrayChangeType.Reverse, source] as TArrayReverseChange<T>;
      case ArrayChangeType.Set:
        return change as TArraySetChange<T>;
      default:
        throw new Error(`Unknown array change type=${changeType}`);
    }
  }
}
