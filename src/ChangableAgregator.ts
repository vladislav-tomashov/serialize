import { IChangable } from "./interfaces/IChangable";
import { AgregatedChanges } from "./AgregatedChanges";

export class ChangableAgregator implements IChangable {
  private _changes?: AgregatedChanges;

  constructor(protected changeables: Array<IChangable>) {}

  get changed(): boolean {
    return this.changeables.some(x => x.changed);
  }

  getChanges(): AgregatedChanges {
    if (!this._changes) {
      this._changes = new AgregatedChanges(
        this.changeables.map(x => x.getChanges())
      );
    }

    return this._changes;
  }

  clearChanges(): void {
    this.changeables.forEach(x => x.clearChanges());
  }

  applyChanges(changes: AgregatedChanges): void {
    this.clearChanges();

    if (!changes.hasChanges) {
      return;
    }

    if (changes.length !== this.changeables.length) {
      throw new Error(
        "Cannot applyChages, because changes.length !== this.changeables.length"
      );
    }

    for (let i = 0, { length } = changes; i < length; i++) {
      const change = changes.changes[i];
      const changeable = this.changeables[i];

      changeable.applyChanges(change);
    }
  }
}
