import { IChangeItem } from "./IChangeItem";
import { OfArray } from "../OfArray";

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
  readonly value?: T | OfArray<T>;
  readonly index?: number;
}
