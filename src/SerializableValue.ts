import { ISerializableValue } from "./interfaces/ISerializableValue";
import { IChanges } from "./interfaces/IChanges";
import { ValueChanges } from "./ValueChanges";

const defaultEqual = <T>(obj1: T, obj2: T) => obj1 === obj2;

class SerializableValue<T> implements ISerializableValue<T> {
  private _changes = new ValueChanges();

  constructor(
    private _value: T,
    private _equal: (obj1: T, obj2: T) => boolean = defaultEqual
  ) {}

  set value(value: T) {
    if (!this._equal(this._value, value)) {
      this._changes.update(value);
    }

    this._value = value;
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

  setChanges(changes: ValueChanges<T>): void {
    this.clearChanges();

    if (changes.empty) {
      return;
    }

    const value = changes.getValue();
    this._value = value;
  }
}

export { SerializableValue };
