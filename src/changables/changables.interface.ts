import {
  TOwnChanges,
  TNestedChanges,
} from "./changable-object/changable-object.interface";

export type TChanges<K> = [TOwnChanges, TNestedChanges<K>];

export interface IChangable<K> {
  readonly isChangable: true;

  readonly changed: boolean;

  disableChanges(): void;

  enableChanges(): void;

  getChanges(): TChanges<K>;

  setChanges(changes: TChanges<K>): void;
}

export function isChangable<K>(value: any): value is IChangable<K> {
  if (typeof value !== "object") {
    return false;
  }

  return value.isChangable;
}

export function toChangable<K>(value: any): undefined | IChangable<K> {
  return isChangable(value) ? (value as IChangable<K>) : undefined;
}
