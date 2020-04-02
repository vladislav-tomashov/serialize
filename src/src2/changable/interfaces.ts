import { ICollection } from "../Collection/ICollection";

export interface IChangable<T> {
  readonly isChangable: true;

  readonly changed: boolean;

  getChanges(): TChanges<T>;

  setChanges(changes: TChanges<T>): void;

  clearChanges(): void;
}

export function isChangable<T>(value: any): value is IChangable<T> {
  if (typeof value !== "object") {
    return false;
  }

  return value.isChangable;
}

export function toChangable<T>(value: any): undefined | IChangable<T> {
  return isChangable(value) ? (value as IChangable<T>) : undefined;
}

export interface IChangablePrimitive<T> extends IChangable<T> {
  readonly isChangablePrimitive: true;
  value: T;
}

export function isChangablePrimitive<T>(
  value: any
): value is IChangablePrimitive<T> {
  if (typeof value !== "object") {
    return false;
  }

  return value.isChangablePrimitive;
}

export function toChangablePrimitive<T>(
  value: any
): undefined | IChangablePrimitive<T> {
  return isChangablePrimitive(value)
    ? (value as IChangablePrimitive<T>)
    : undefined;
}

export interface IChangableValue<T> extends IChangable<T> {
  readonly isChangableValue: true;
  value: T;
}

export function isChangableValue<T>(value: any): value is IChangableValue<T> {
  if (typeof value !== "object") {
    return false;
  }

  return value.isChangableValue;
}

export function toChangableValue<T>(
  value: any
): undefined | IChangableValue<T> {
  return isChangableValue(value) ? (value as IChangableValue<T>) : undefined;
}

export interface IChangablePrimitiveCollection<T>
  extends ICollection<T>,
    IChangable<T> {
  readonly isChangablePrimitiveCollection: true;
}

export function isChangablePrimitiveCollection<T>(
  value: any
): value is IChangablePrimitiveCollection<T> {
  if (typeof value !== "object") {
    return false;
  }

  return value.isChangablePrimitiveCollection;
}

export function toChangablePrimitiveCollection<T>(
  value: any
): undefined | IChangablePrimitiveCollection<T> {
  return isChangablePrimitiveCollection(value)
    ? (value as IChangablePrimitiveCollection<T>)
    : undefined;
}

export interface IChangableValueCollection<T>
  extends ICollection<T>,
    IChangable<T> {
  readonly isChangableValueCollection: true;
}

export function isChangableValueCollection<T>(
  value: any
): value is IChangableValueCollection<T> {
  if (typeof value !== "object") {
    return false;
  }

  return value.isChangableValueCollection;
}

export function toChangableValueCollection<T>(
  value: any
): undefined | IChangableValueCollection<T> {
  return isChangableValueCollection(value)
    ? (value as IChangableValueCollection<T>)
    : undefined;
}

export enum ValueChangeType {
  NewValue,
  OldValue
}

export enum CollectionChangeType {
  Push,
  Pop,
  Clear,
  Sort,
  Reverse,
  Splice,
  Set,
  Shift,
  Unshift
}

export type TPrimitiveChanges<T> = [T] | undefined;

export type TNewValueChange<T> = [
  ValueChangeType.NewValue,
  TPrimitiveChanges<T>
];

export type TOldValueChange<T> = [ValueChangeType.OldValue, TChanges<T>];

export type TValueChanges<T> =
  | TNewValueChange<T>
  | TOldValueChange<T>
  | undefined;

export type TCollectionItemChange<T> = [number, TChanges<T>];

export type TChangableValueCollectionChanges<T> = [
  TCollectionChange<T>[],
  TCollectionItemChange<T>[]
];

export type TChanges<T> =
  | TPrimitiveChanges<T>
  | TValueChanges<T>
  | TCollectionChange<T>[]
  | TChangableValueCollectionChanges<T>;

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
