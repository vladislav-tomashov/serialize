import { IChangeItem } from "./interfaces/IChangeItem";
import { IChanges } from "./interfaces/IChanges";
import { IValueChangeItem } from "./interfaces/IValueChangeItem";
import { ValueChangeItem } from "./ValueChangeItem";

class ValueChanges<T> implements IChanges {
  constructor(private _change?: IValueChangeItem<T>) {}

  get empty(): boolean {
    return !this._change;
  }

  get value() {
    if (this.empty) {
      throw new Error("ValueChanges are empty!");
    }

    return this._change?.value;
  }

  clear(): void {
    if (this._change) {
      this._change = undefined;
    }
  }

  toArray(): IChangeItem[] {
    return this._change ? [this._change] : [];
  }

  update(value: T): void {
    if (!this._change) {
      this._change = new ValueChangeItem(value);
    } else {
      this._change.value = value;
    }
  }

  add(change: IValueChangeItem<T>): void {
    const { value } = change;
    this.update(value);
  }

  toJSON(): any {
    if (this.empty) {
      return undefined;
    }

    return this._change;
  }
}

export { ValueChanges };
