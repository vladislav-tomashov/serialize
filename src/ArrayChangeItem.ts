import { IArrayChangeItem, ArrayAction } from "./interfaces/IArrayChangeItem";

class ArrayChangeItem<T> implements IArrayChangeItem<T> {
  private _action: ArrayAction;
  private _index?: number;
  private _value?: T;

  constructor({
    action,
    index,
    value
  }: {
    action: ArrayAction;
    index?: number;
    value?: T;
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
    let result = { value: this.value };

    if (this.index !== undefined) {
      result = { ...result, index: this.index };
    }

    if (this.value !== undefined) {
      result = { ...result, value: this.value };
    }

    return result;
  }
}

export { ArrayChangeItem };
