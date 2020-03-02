import { IChanges } from "./IChanges";

export type ArrayAction =
  | "clear"
  | "push"
  | "pop"
  | "delete"
  | "insert"
  | "update";

export interface IArrayChangeItem<T> {
  readonly action: ArrayAction;
  readonly index?: number;
  readonly value?: T;
  readonly changes?: IChanges;
}
