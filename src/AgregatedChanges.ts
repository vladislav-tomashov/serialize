import { IChanges } from "./interfaces/IChanges";
import { ValueGetter } from "./types/ValueGetter";
import { IAgregatedChanges } from "./interfaces/IAgregatedChanges";

export class AgregatedChanges implements IAgregatedChanges {
  constructor(private _changes: Array<ValueGetter<IChanges>>) {}

  get hasChanges(): boolean {
    return this._changes.some(x => x().hasChanges);
  }

  get length(): number {
    return this._changes.length;
  }

  get changes(): Array<IChanges> {
    return this._changes.map(x => x());
  }

  toJSON(): Array<IChanges> {
    return this.changes;
  }
}
