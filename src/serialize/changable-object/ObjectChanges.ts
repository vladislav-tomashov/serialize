import { IGetProperty } from "./changable-object.interface";
import { TPropertyChange } from "../serialize.interface";

export class ObjectChanges<T, K extends keyof T> {
  private _log = new Set<K>();

  private _disabled = false;

  get length() {
    return this._log.size;
  }

  disable() {
    this._clear();

    if (this._disabled) {
      return;
    }
    this._disabled = true;
  }

  enable() {
    if (!this._disabled) {
      return;
    }

    this._disabled = false;
  }

  registerPropertyUpdate(prop: K) {
    if (this._disabled) {
      return;
    }

    this._log.add(prop);
  }

  getChanges(source: IGetProperty<T, K>): TPropertyChange<any>[] {
    const result = Array.from(this._log).map(
      (x) => [x, source.getProperty(x)] as TPropertyChange<any>,
    );

    return result;
  }

  // private
  private _clear() {
    if (this.length > 0) {
      this._log.clear();
    }
  }
}
