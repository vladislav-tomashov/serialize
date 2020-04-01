export enum ValueChangeType {
  NewValue,
  OldValue
}

export enum ArrayChangeType {
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

export type TChanges<T> =
  | TPrimitiveChanges<T>
  | TValueChanges<T>
  | TArrayChange<T>[];

export type TArrayPushChange<T> = [ArrayChangeType.Push, T[]];

export type TArrayPopChange = [ArrayChangeType.Pop];

export type TArrayClearChange<T> = [ArrayChangeType.Clear, T[]];

export type TArraySortChange<T> = [ArrayChangeType.Sort, T[]];

export type TArrayReverseChange<T> = [ArrayChangeType.Reverse, T[]];

export type TArraySetChange<T> = [ArrayChangeType.Set, number, T];

export type TArrayUnshiftChange<T> = [ArrayChangeType.Unshift, T[]];

export type TArrayShiftChange = [ArrayChangeType.Shift];

export type TArrayChange<T> =
  | TArrayPushChange<T>
  | TArrayPopChange
  | TArrayClearChange<T>
  | TArraySortChange<T>
  | TArrayReverseChange<T>
  | TArraySetChange<T>
  | TArrayUnshiftChange<T>
  | TArrayShiftChange;
