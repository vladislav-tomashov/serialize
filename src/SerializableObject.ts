import { ISerializable } from "./interfaces/ISerializable";
import { IChanges } from "./interfaces/IChanges";
import { ChangesLog } from "./ChangesLog";

class SerializableObject implements ISerializable {
  private _props: Record<string, ISerializable> = {};
  private _propNames: Array<string> = [];

  constructor(props: Record<string, any>) {
    Object.keys(props).forEach(prop => {
      const value = props[prop];
      // if ((value as ISerializable).getChanges) {
      this._props[prop] = value;
      // }
    });

    this._propNames = Object.keys(this._props);
  }

  get changed(): boolean {
    return this._propNames.some(prop => this._props[prop].changed);
  }

  set(prop: string, value: any): void {
    this._props[prop].value = value;
  }

  get(prop: string): any {
    return this._props[prop].value;
  }

  clearChanges(): void {
    this._propNames.forEach(prop => this._props[prop].clearChanges());
  }

  setChanges(objChanges: IChanges): void {
    objChanges.toArray().forEach(({ action, params }) => {
      if (action !== "changes") {
        throw new Error(
          `Invalid action=${action}. Only "changes" action is supported!`
        );
      }

      const { changes, prop } = params;

      this._props[prop].setChanges(changes);
    });
  }

  getChanges(): IChanges {
    const changes = new ChangesLog();

    this._propNames.forEach(prop => {
      const serializableProp = this._props[prop];

      if (!serializableProp.changed) {
        return;
      }

      changes.add({
        action: "changes",
        params: {
          prop,
          changes: serializableProp.getChanges()
        }
      });
    });

    return changes;
  }
}

export { SerializableObject };
