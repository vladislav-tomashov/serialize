import { IChangeItem } from "./interfaces/IChangeItem";
import { IChanges } from "./interfaces/IChanges";

class ChangesLog implements IChanges {
  constructor(private _log: IChangeItem[] = []) {}

  get empty(): boolean {
    return this._log.length === 0;
  }

  toArray(): IChangeItem[] {
    return this._log;
  }

  add(item: IChangeItem): void {
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

  toJSON(): IChangeItem[] {
    return this._log;
  }
}

export { ChangesLog };
