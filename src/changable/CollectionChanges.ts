import {
  TCollectionChange,
  CollectionChangeType,
  TCollectionPushChange,
  TCollectionPopChange,
  TCollectionClearChange,
  TCollectionSortChange,
  TCollectionReverseChange,
  TCollectionSetChange,
  TCollectionUnshiftChange,
  TCollectionShiftChange,
  TCollectionSpliceChange
} from "./interfaces";

type TPushChange<T> = [CollectionChangeType.Push, T[]];

type TUnshiftChange<T> = [CollectionChangeType.Unshift, T[]];

type TPopChange = [CollectionChangeType.Pop];

type TShiftChange = [CollectionChangeType.Shift];

type TClearChange = [CollectionChangeType.Clear];

type TSortChange = [CollectionChangeType.Sort];

type TReverseChange = [CollectionChangeType.Reverse];

type TSetChange<T> = [CollectionChangeType.Set, number, T];

type TSpliceChange<T> = [
  CollectionChangeType.Splice,
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

export class CollectionChanges<T> {
  private _log: Array<TChange<T>> = [];
  private _skipFutherChanges = false;

  get length() {
    return this._log.length;
  }

  clear() {
    if (this._skipFutherChanges) {
      this._skipFutherChanges = false;
    }

    if (this._log.length > 0) {
      this._log = [];
    }
  }

  registerSplice(start: number, deleteCount: number, items: T[]) {
    if (this._skipFutherChanges) {
      return;
    }

    const change = [
      CollectionChangeType.Splice,
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

    const change = [CollectionChangeType.Set, index, value] as TSetChange<T>;
    this._log.push(change);
  }

  registerPop() {
    if (this._skipFutherChanges) {
      return;
    }

    const change = [CollectionChangeType.Pop] as TPopChange;
    this._log.push(change);
  }

  registerShift() {
    if (this._skipFutherChanges) {
      return;
    }

    const change = [CollectionChangeType.Shift] as TShiftChange;
    this._log.push(change);
  }

  registerClear() {
    if (this._skipFutherChanges) {
      return;
    }

    const change = [CollectionChangeType.Clear] as TClearChange;
    this._log = [];
    this._log.push(change);
    this._skipFutherChanges = true;
  }

  registerSort() {
    if (this._skipFutherChanges) {
      return;
    }

    const change = [CollectionChangeType.Sort] as TSortChange;
    this._log = [];
    this._log.push(change);
    this._skipFutherChanges = true;
  }

  registerReverse() {
    if (this._skipFutherChanges) {
      return;
    }

    const change = [CollectionChangeType.Reverse] as TReverseChange;
    this._log = [];
    this._log.push(change);
    this._skipFutherChanges = true;
  }

  registerPush(items: T[]) {
    if (this._skipFutherChanges) {
      return;
    }

    const change = [CollectionChangeType.Push, items] as TPushChange<T>;
    this._log.push(change);
  }

  registerUnshift(items: T[]) {
    if (this._skipFutherChanges) {
      return;
    }

    const change = [CollectionChangeType.Unshift, items] as TUnshiftChange<T>;
    this._log.push(change);
  }

  getChanges(source: T[]): TCollectionChange<T>[] {
    const result = this._log.map((x) => this._getChange(x, source));
    return result;
  }

  private _getChange(change: TChange<T>, source: T[]): TCollectionChange<T> {
    const [changeType] = change;

    switch (changeType) {
      case CollectionChangeType.Push:
        return change as TCollectionPushChange<T>;
      case CollectionChangeType.Unshift:
        return change as TCollectionUnshiftChange<T>;
      case CollectionChangeType.Pop:
        return change as TCollectionPopChange;
      case CollectionChangeType.Shift:
        return change as TCollectionShiftChange;
      case CollectionChangeType.Clear:
        return [CollectionChangeType.Clear, source] as TCollectionClearChange<
          T
        >;
      case CollectionChangeType.Sort:
        return [CollectionChangeType.Sort, source] as TCollectionSortChange<T>;
      case CollectionChangeType.Reverse:
        return [
          CollectionChangeType.Reverse,
          source
        ] as TCollectionReverseChange<T>;
      case CollectionChangeType.Set:
        return change as TCollectionSetChange<T>;
      case CollectionChangeType.Splice:
        return change as TCollectionSpliceChange<T>;
      default:
        throw new Error(`Unknown array change type=${changeType}`);
    }
  }
}
