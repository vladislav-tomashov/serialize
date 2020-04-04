export enum CollectionChangeType {
  Push,
  Pop,
  Clear,
  Sort,
  Reverse,
  Splice,
  Set,
  Shift,
  Unshift,
}

export type TCollectionPushChange<T> = [CollectionChangeType.Push, T[]];

export type TCollectionPopChange = [CollectionChangeType.Pop];

export type TCollectionClearChange<T> = [CollectionChangeType.Clear, T[]];

export type TCollectionSortChange<T> = [CollectionChangeType.Sort, T[]];

export type TCollectionReverseChange<T> = [CollectionChangeType.Reverse, T[]];

export type TCollectionSetChange<T> = [CollectionChangeType.Set, number, T];

export type TCollectionUnshiftChange<T> = [CollectionChangeType.Unshift, T[]];

export type TCollectionShiftChange = [CollectionChangeType.Shift];

export type TCollectionSpliceChange<T> = [
  CollectionChangeType.Splice,
  number,
  number | undefined,
  T[] | undefined
];

export type TCollectionChange<T> =
  | TCollectionPushChange<T>
  | TCollectionPopChange
  | TCollectionClearChange<T>
  | TCollectionSortChange<T>
  | TCollectionReverseChange<T>
  | TCollectionSetChange<T>
  | TCollectionUnshiftChange<T>
  | TCollectionShiftChange
  | TCollectionSpliceChange<T>;

export type TPropertyChange<T> = [string, T];

export type TObjectChanges = TPropertyChange<any>[];

export type TOwnChanges = TObjectChanges | TCollectionChange<any>;

export type TNestedChanges = [number | string, TChanges][];

export type TChanges = [TOwnChanges, TNestedChanges];

export interface IChangable {
  readonly isChangable: true;

  readonly changed: boolean;

  readonly hasOwnChanges: boolean;

  readonly hasNestedChanges: boolean;

  getChanges(): TChanges;

  getOwnChanges(): TOwnChanges;

  getNestedChanges(): TNestedChanges;

  setChanges(changes: TChanges): void;

  setOwnChanges(changes: TOwnChanges): void;

  setNestedChanges(changes: TNestedChanges): void;

  clearChanges(): void;

  clearOwnChanges(): void;

  clearNestedChanges(): void;

  getChangableEntries(): [number | string, IChangable][];
}

export function isChangable(value: any): value is IChangable {
  if (typeof value !== "object") {
    return false;
  }

  return value.isChangable;
}

export function toChangable(value: any): undefined | IChangable {
  return isChangable(value) ? (value as IChangable) : undefined;
}
