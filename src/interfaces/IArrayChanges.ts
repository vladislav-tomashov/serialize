import { IChanges } from "./IChanges";
import { IArrayChangeItem } from "./IArrayChangeItem";

interface IArrayChanges<T> extends IChanges {
  toArray(): Array<IArrayChangeItem<T>>;

  add(change: IArrayChangeItem<T>): void;
}

export { IArrayChanges };
