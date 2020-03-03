import { IChangableValue } from "./interfaces/IChangableValue";
import { toChangable } from "./interfaces/IChangable";
import { IValueChange } from "./interfaces/IValueChange";
import { IChanges } from "./interfaces/IChanges";
import { ValueChange2 } from "./ValueChange2";

const defaultEqual = <T>(obj1: T, obj2: T) => obj1 === obj2;
const equal = defaultEqual;

class ChangableValue<T> implements IChangableValue<T> {
  private _changed = false;
  private _changes?: ValueChange2<T>;

  private get valueAsChangable() {
    return toChangable(this._value);
  }

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
    return this._changed || Boolean(this.valueAsChangable?.changed);
  }

  getChanges(): IValueChange<T> {
    if (this._changes === undefined) {
      const getOwnChanges = () => {
        return { changed: this._changed, value: this._value };
      };

      const getChildChanges = () => {
        return this.valueAsChangable?.getChanges();
      };

      this._changes = new ValueChange2<T>(getOwnChanges, getChildChanges);
    }

    return this._changes;
  }

  clearChanges(): void {
    this._changed = false;
    this._changes = undefined;
  }

  applyChanges(changes: IValueChange<T>): void {
    this.clearChanges();

    const { action, value, valueChanges, hasChanges } = changes;

    if (!hasChanges) {
      return;
    }

    switch (action) {
      case "set": {
        this._value = value as T;
      }
      case "update": {
        this.valueAsChangable?.applyChanges(valueChanges as IChanges);
      }
      default:
        throw new Error(
          `Unknown action="${action}"! Should be of type ValueChangeAction`
        );
    }
  }
}

export { ChangableValue };
