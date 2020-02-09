import { IChangable } from "./interfaces/IChangable";
import { ObjectChanges } from "./ObjectChanges";

class ChangableObject implements IChangable {
  private _props: Record<string, IChangable> = {};
  private _propNames: Array<string> = [];

  constructor(props: Record<string, any>) {
    Object.keys(props).forEach(prop => {
      const value = props[prop];
      this._props[prop] = value;
    });

    this._propNames = Object.keys(this._props);
  }

  get changed(): boolean {
    return this._propNames.some(prop => this._props[prop].changed);
  }

  // set(prop: string, value: any): void {
  //   this._props[prop].value = value;
  // }

  // get(prop: string): any {
  //   return this._props[prop].value;
  // }

  clearChanges(): void {
    this._propNames.forEach(prop => this._props[prop].clearChanges());
  }

  applyChanges(objChanges: ObjectChanges): void {
    objChanges.toArray().forEach(({ property, changes }) => {
      this._props[property].applyChanges(changes);
    });
  }

  getChanges(): ObjectChanges {
    const changes = new ObjectChanges();

    this._propNames.forEach(property => {
      const serializableProp = this._props[property];

      if (!serializableProp.changed) {
        return;
      }

      changes.add({
        action: "change",
        property,
        changes: serializableProp.getChanges()
      });
    });

    return changes;
  }
}

export { ChangableObject };
