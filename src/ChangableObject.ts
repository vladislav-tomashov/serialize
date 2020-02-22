import { IChangable } from "./interfaces/IChangable";
import { ObjectChanges } from "./ObjectChanges";
import { IChangableValue } from "./interfaces/IChangableValue";
import { ObjectChangeItem } from "./ObjectChangeItem";

class ChangableObject implements IChangable {
  constructor(private _props: Record<string, IChangableValue<any>> = {}) {}

  get changed(): boolean {
    return this._getChangables().some(changable => changable.changed);
  }

  set(prop: string, value: any): void {
    this._props[prop].value = value;
  }

  get(prop: string): any {
    return this._props[prop].value;
  }

  clearChanges(): void {
    this._getChangables().forEach(changable => changable.clearChanges());
  }

  applyChanges(objChanges: ObjectChanges): void {
    objChanges.toArray().forEach(({ property, changes }) => {
      this._props[property].applyChanges(changes);
    });
  }

  getChanges(): ObjectChanges {
    const changes = new ObjectChanges();

    this._getPropNames().forEach(property => {
      const changable = this._props[property];

      if (!changable.changed) {
        return;
      }

      changes.add(
        new ObjectChangeItem({
          property,
          changes: changable.getChanges()
        })
      );
    });

    return changes;
  }

  private _getPropNames(): Array<string> {
    return Object.getOwnPropertyNames(this._props);
  }

  private _getChangables(): Array<IChangableValue<any>> {
    return Object.getOwnPropertyNames(this._props).map(
      prop => this._props[prop]
    );
  }
}

export { ChangableObject };
