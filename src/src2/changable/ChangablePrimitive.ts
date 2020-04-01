import { IChangable } from "./interfaces/IChangable";
import { TPrimitiveChanges } from "./types";

export class ChangablePrimitive<T> implements IChangable<T> {
  private _changed = false;

  isChangable: true = true;

  constructor(private _value: T) {}

  get value() {
    return this._value;
  }

  set value(value: T) {
    if (this._value === value) {
      return;
    }

    this._value = value;

    if (!this._changed) {
      this._changed = true;
    }
  }

  get changed() {
    return this._changed;
  }

  getChanges(): TPrimitiveChanges<T> {
    return this._changed ? [this._value] : undefined;
  }

  setChanges(changes: TPrimitiveChanges<T>) {
    this.clearChanges();

    if (!changes) {
      return;
    }

    this._value = changes[0];
  }

  clearChanges() {
    this._changed = false;
  }
}
