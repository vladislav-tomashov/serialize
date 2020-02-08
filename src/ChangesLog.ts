import { IChangesItem } from "./interfaces/IChangesItem";
import { IChanges } from "./interfaces/IChanges";

class ChangesLog implements IChanges {
  private _log: IChangesItem[] = [];

  get empty(): boolean {
    return this._log.length === 0;
  }

  toArray(): IChangesItem[] {
    return this._log;
  }

  add(item: IChangesItem): void {
    if (item.action === "clear") {
      this.clear();
    }

    this._log.push(item);
  }

  clear(): void {
    if (!this.empty) {
      this._log = [];
    }
  }

  toJSON(): IChangesItem[] {
    return this._log;
  }

  fromJSON(json: IChangesItem[]): void {
    this._log = json;
  }
}

export { ChangesLog };
