import { ChangablePrimitive } from "./ChangablePrimitive";
import {
  toChangable,
  TValueChanges,
  ValueChangeType,
  IChangableValue
} from "./interfaces";

export class ChangableValue<T> implements IChangableValue<T> {
  private _value: ChangablePrimitive<T>;

  isChangableValue: true = true;
  isChangable: true = true;

  constructor(value: T) {
    this._value = new ChangablePrimitive(value);
  }

  private get _valueAsChangable() {
    return toChangable<T>(this._value.value);
  }

  get value() {
    return this._value.value;
  }

  set value(value: T) {
    this._value.value = value;
  }

  get changed() {
    if (this._value.changed) {
      return true;
    }

    return !!this._valueAsChangable?.changed;
  }

  getChanges(): TValueChanges<T> {
    if (this._value.changed) {
      return [ValueChangeType.NewValue, this._value.getChanges()];
    }

    const { _valueAsChangable } = this;

    if (!_valueAsChangable || !_valueAsChangable.changed) {
      return undefined;
    }

    return [ValueChangeType.OldValue, _valueAsChangable.getChanges()];
  }

  setChanges(changes: TValueChanges<T>) {
    this.clearChanges();

    if (!changes) {
      return;
    }

    if (changes[0] === ValueChangeType.NewValue) {
      this._value.setChanges(changes[1]);
    } else {
      this._valueAsChangable?.setChanges(changes[1]);
    }
  }

  clearChanges() {
    this._value.clearChanges();
    this._valueAsChangable?.clearChanges();
  }
}
