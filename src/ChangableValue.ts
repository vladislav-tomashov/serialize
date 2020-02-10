import { IChanges } from "./interfaces/IChanges";
import { ValueChanges } from "./ValueChanges";
import { IChangableValue } from "./interfaces/IChangableValue";

const defaultEqual = <T>(obj1: T, obj2: T) => obj1 === obj2;

class ChangableValue<T> implements IChangableValue<T> {
  private _changes = new ValueChanges();

  constructor(
    private _value: T,
    private _equal: (obj1: T, obj2: T) => boolean = defaultEqual
  ) {}

  set value(value: T) {
    if (this._equal(this._value, value)) {
      return;
    }

    this._value = value;
    this._changes.update(this._value);
  }

  get value(): T {
    return this._value;
  }

  get changed(): boolean {
    return !this._changes.empty;
  }

  getChanges(): IChanges {
    return this._changes;
  }

  clearChanges(): void {
    this._changes.clear();
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
