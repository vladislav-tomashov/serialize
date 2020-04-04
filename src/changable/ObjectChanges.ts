import { TPropertyChange } from "./interfaces";

export class ObjectChanges {
  private _log = new Set<string>();

  get length() {
    return this._log.size;
  }

  clear() {
    if (this._log.size) {
      this._log.clear();
    }
  }

  registerSet(prop: string, value: any) {
    this._log.add(prop);
  }

  getChanges(source: { [key: string]: any }): TPropertyChange<any>[] {
    const result = Array.from(this._log).map(
      (x) => [x, source[x]] as TPropertyChange<any>
    );
    return result;
  }
}
