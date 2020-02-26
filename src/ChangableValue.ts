import { ValueChange } from "./ValueChange";
import { IChangableValue } from "./interfaces/IChangableValue";

const defaultEqual = <T>(obj1: T, obj2: T) => obj1 === obj2;
const equal = defaultEqual;

class ChangableValue<T> implements IChangableValue<T> {
  private _changed = false;
  private _changes: ValueChange<T> | undefined;

  constructor(private _value: T) {}

  set value(value: T) {
    if (equal(this._value, value)) {
      return;
    }

    this._value = value;

    if (!this._changed) {
      this._changed = true;
    }
  }

  get value(): T {
    return this._value;
  }

  get changed(): boolean {
    return this._changed;
  }

  getChanges(): ValueChange<T> {
    if (!this._changed) {
      return {} as ValueChange<T>;
    }

    if (!this._changes) {
      this._changes = new ValueChange(this._value);
    }

    return this._changes;
  }

  clearChanges(): void {
    if (!this._changed) {
      return;
    }

    this._changed = false;
    this._changes = undefined;
  }

  applyChanges(changes: ValueChange<T>): void {
    this.clearChanges();

    if (!changes.hasChanges) {
      return;
    }

    this._value = changes.value;
  }
}

export { ChangableValue };
