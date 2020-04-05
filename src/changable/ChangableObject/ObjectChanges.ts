import { IGetProperty, TPropertyChange } from "./ChangableObject.interfaces";

export class ObjectChanges<T, K extends keyof T> {
  private _log = new Set<K>();

  get length() {
    return this._log.size;
  }

  clear() {
    if (this.length > 0) {
      this._log.clear();
    }
  }

  registerPropertyUpdate(prop: K) {
    this._log.add(prop);
  }

  getChanges(source: IGetProperty<T, K>): TPropertyChange<any>[] {
    const result = Array.from(this._log).map(
      (x) => <TPropertyChange<any>>[x, source.getProperty(x)]
    );

    return result;
  }
}
