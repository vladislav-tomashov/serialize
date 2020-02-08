import { IChangesItem } from "./interfaces/IChangesItem";
import { IChanges } from "./interfaces/IChanges";

class ValueChanges<T> implements IChanges {
  private _changed = false;
  private _value: T = undefined;

  get empty(): boolean {
    return !this._changed;
  }

  getValue(): T {
    return this._value;
  }

  toArray(): IChangesItem[] {
    return this._changed
      ? [{ action: "change", params: { value: this._value } }]
      : [];
  }

  update(value: T): void {
    this._value = value;

    if (!this._changed) {
      this._changed = true;
    }
  }

  add(change: IChangesItem): void {
    const { action, params } = change;

    if (action !== "change") {
      throw new Error(
        `Unsupported action=${action}. Only "change" action is supported.`
      );
    }

    this._changed = true;
    this._value = params.value;
  }

  clear(): void {
    if (this._changed) {
      this._changed = false;
    }
  }

  toJSON(): any {
    if (!this._changed) {
      return undefined;
    }

    return { value: this._value };
  }

  fromJSON(json): void {
    if (!json) {
      this._changed = false;
    }

    this._changed = true;
    this._value = json.value;
  }
}

export { ValueChanges };
