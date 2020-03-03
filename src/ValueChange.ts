import { IValueChange, ValueChangeAction } from "./interfaces/IValueChange";
import { IChanges } from "./interfaces/IChanges";

class ValueChange<T> implements IValueChange<T> {
  private _action: ValueChangeAction;
  private _value?: T;
  private _valueChanges?: IChanges;
  private _hasChanges = false;

  constructor({
    hasChanges,
    action,
    value,
    valueChanges
  }: {
    hasChanges: boolean;
    action: ValueChangeAction;
    value?: T;
    valueChanges?: IChanges;
  }) {
    this._valueChanges = valueChanges;
    this._action = action;
    this._value = value;
    this._hasChanges = hasChanges;
  }

  get hasChanges() {
    return this._hasChanges;
  }

  get value(): T | undefined {
    return this._value;
  }

  get action(): ValueChangeAction {
    return this._action;
  }

  get valueChanges(): IChanges | undefined {
    return this._valueChanges;
  }

  toJSON(): Object {
    return {
      action: this.action,
      value: this.value,
      valueChanges: this.valueChanges,
      hasChanges: this.hasChanges
    };
  }
}

export { ValueChange };
