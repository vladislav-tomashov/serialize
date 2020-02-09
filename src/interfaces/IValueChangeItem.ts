import { IChangeItem } from "./IChangeItem";

export interface IValueChangeItem<T> extends IChangeItem {
  readonly action: "change";
  value: T;
}
