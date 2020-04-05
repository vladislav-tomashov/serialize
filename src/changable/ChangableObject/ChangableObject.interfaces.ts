import { TCollectionChange } from "../ChangableCollection/ChangableCollection.interfaces";
import { TChanges, IChangable } from "../changable.interfaces";

export type TPropertyChange<T> = [string, T];

export type TObjectChange = TPropertyChange<any>[];

export type TOwnChanges = TObjectChange | TCollectionChange<any>[];

export type TNestedChanges<K> = [K, TChanges<any>][];

export interface IToJSON<T> {
  toJSON(): T;
}

export interface IGetProperty<T, K extends keyof T> {
  getProperty(prop: K): T[K];
}

export interface ISetProperty<T, K extends keyof T> {
  setProperty(prop: K, value: T[K]): void;
}

export interface IOwnChanges {
  readonly hasOwnChanges: boolean;

  clearOwnChanges(): void;

  getOwnChanges(): TOwnChanges;

  setOwnChanges(changes: TOwnChanges): void;
}

export interface INestedChanges<K> {
  readonly hasNestedChanges: boolean;

  clearNestedChanges(): void;

  getNestedChanges(): TNestedChanges<K>;

  setNestedChanges(changes: TNestedChanges<K>): void;

  getChangableEntries(): [K, IChangable<any>][];
}

export interface IObjectState<T extends object, K extends keyof T>
  extends IGetProperty<T, K>,
    ISetProperty<T, K> {}
