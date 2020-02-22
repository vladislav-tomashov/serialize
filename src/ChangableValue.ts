import { IChanges } from "./interfaces/IChanges";
import { ValueChanges } from "./ValueChanges";
import { IChangableValue } from "./interfaces/IChangableValue";

const defaultEqual = <T>(obj1: T, obj2: T) => obj1 === obj2;
const equal = defaultEqual;

class ChangableValue<T> implements IChangableValue<T> {
  private _changed = false;

  constructor(private _value: T = undefined) {}

  set value(value: T) {
    if (equal(this._value, value)) {
      return;
    }

    this._value = value;
    this._changed = true;
  }

  get value(): T {
    return this._value;
  }

  get changed(): boolean {
    return this._changed;
  }

  getChanges(): ValueChanges<T> {
    return this._changes;
  }

  clearChanges(): void {
    this._changed = false;
  }

  applyChanges(changes: ValueChanges<T>): void {
    this.clearChanges();

    if (changes.empty) {
      return;
    }

    this._value = changes.value as T;
  }
}

export { ChangableValue };
