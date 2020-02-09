import { IChangable } from "./IChangable";

export interface IChangableValue<T> extends IChangable {
  value: T;
}
