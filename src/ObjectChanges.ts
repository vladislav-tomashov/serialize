import { IChanges } from "./interfaces/IChanges";
import { IObjectChangeItem } from "./interfaces/IObjectChangeItem";

class ObjectChanges implements IChanges {
  constructor(private _log: IObjectChangeItem[] = []) {}

  get empty(): boolean {
    return this._log.length === 0;
  }

  toArray(): IObjectChangeItem[] {
    return this._log;
  }

  add(item: IObjectChangeItem): void {
    this._log.push(item);
  }

  clear(): void {
    if (!this.empty) {
      this._log = [];
    }
  }

  toJSON(): IObjectChangeItem[] {
    return this._log;
  }
}

export { ObjectChanges };
