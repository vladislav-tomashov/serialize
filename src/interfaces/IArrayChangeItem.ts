import { IChangeItem } from "./IChangeItem";

export type ArrayAction =
  | "set"
  | "clear"
  | "push"
  | "pop"
  | "delete"
  | "update"
  | "insert";

export interface IArrayChangeItem<T> extends IChangeItem {
  readonly action: ArrayAction;
  readonly value?: T | T[];
  readonly index?: number;
}
