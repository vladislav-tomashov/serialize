import { IValueChange, ValueChangeAction } from "./interfaces/IValueChange";
import { IChanges } from "./interfaces/IChanges";

interface IValueOwnChange<T> {
  changed: boolean;
  value: T;
}

type IChangesOrUndefined = IChanges | undefined;

class ValueChange2<T> implements IValueChange<T> {
  constructor(
    private _getOwnChanges: () => IValueOwnChange<T>,
    private _getChildChanges: () => IChangesOrUndefined
  ) {}

  get hasChanges() {
    const { changed } = this._getOwnChanges();
    return changed || Boolean(this._getChildChanges()?.hasChanges);
  }

  get value(): T | undefined {
    const { changed, value } = this._getOwnChanges();
    return changed ? value : undefined;
  }

  get action(): ValueChangeAction {
    const { changed } = this._getOwnChanges();
    return changed ? "set" : "update";
  }

  get valueChanges(): IChanges | undefined {
    return this._getChildChanges();
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

export { ValueChange2, IValueOwnChange, IChangesOrUndefined };
