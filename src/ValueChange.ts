import { IChanges } from "./interfaces/IChanges";

class ValueChange<T> implements IChanges {
  constructor(private _value: T) {}

  get hasChanges() {
    return true;
  }

  get value() {
    return this._value;
  }

  toJSON(): T {
    return this._value;
  }
}

export { ValueChange };
