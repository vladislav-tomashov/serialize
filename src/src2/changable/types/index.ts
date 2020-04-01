export enum ValueChangeType {
  NewValue,
  OldValue
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

export type TChanges<T> = TPrimitiveChanges<T> | TValueChanges<T>;
