import { TCollectionChange } from "./changable-collections/changable-collections.interface";

export type TPropertyChange<T> = [string, T];

export type TObjectChange = TPropertyChange<any>[];

export type TOwnChanges = TObjectChange | TCollectionChange<any>[];

export type TNestedChanges<K> = [K, TChanges<any>][];

export interface IOwnChanges {
  readonly hasOwnChanges: boolean;

  disableOwnChanges(): void;

  enableOwnChanges(): void;

  getOwnChanges(): TOwnChanges;

  setOwnChanges(changes: TOwnChanges): void;
}

export interface INestedChanges<K> {
  readonly hasNestedChanges: boolean;

  disableNestedChanges(): void;

  enableNestedChanges(): void;

  getNestedChanges(): TNestedChanges<K>;

  setNestedChanges(changes: TNestedChanges<K>): void;

  getChangableEntries(): [K, IChangable<any>][];
}

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
