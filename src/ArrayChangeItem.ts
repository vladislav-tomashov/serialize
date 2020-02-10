import { IArrayChangeItem, ArrayAction } from "./interfaces/IArrayChangeItem";
import { OfArray } from "./OfArray";

class ArrayChangeItem<T> implements IArrayChangeItem<T> {
  private _action: ArrayAction;
  private _index?: number;
  private _value?: T | OfArray<T>;

  constructor({
    action,
    index,
    value
  }: {
    action: ArrayAction;
    index?: number;
    value?: T | OfArray<T>;
  }) {
    this._action = action;
    this._index = index;
    this._value = value;
  }

  get action() {
    return this._action;
  }

  get index() {
    return this._index;
  }

  get value() {
    return this._value;
  }

  toJSON() {
    return { value: this.value, index: this.index, action: this.action };
  }
}

export { ArrayChangeItem };
