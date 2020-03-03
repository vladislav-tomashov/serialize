import { IChanges } from "./IChanges";

export type ValueChangeAction = "set" | "update";

export interface IValueChange<T> extends IChanges {
  readonly value?: T;
  readonly action: ValueChangeAction;
  readonly valueChanges?: IChanges;
}
