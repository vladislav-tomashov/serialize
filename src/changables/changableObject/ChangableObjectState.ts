import {
  IToJSON,
  INestedChanges,
  IOwnChanges,
  TNestedChanges,
  TObjectChange,
} from "./changableObject.interface";
import { ObjectChanges } from "./ObjectChanges";
import { IChangable, TChanges, toChangable } from "../changables.interface";
import { SimpleObjectState } from "./SimpleObjectState";

export class ChangableObjectState<T extends object, K extends keyof T>
  extends SimpleObjectState<T, K>
  implements IChangable<K>, INestedChanges<K>, IOwnChanges, IToJSON<T> {
  isChangable: true = true;

  private _changes = new ObjectChanges<T, K>();

  // Overrides
  setProperty(prop: K, value: T[K]) {
    this._state[prop] = value;
    this._changes.registerPropertyUpdate(prop);

    const changable = toChangable(this._state[prop]);
    if (changable) {
      changable.disableChanges();
    }
  }

  // Implementation of interface INestedChanges
  get hasNestedChanges(): boolean {
    return this.getChangableEntries().some(([, x]) => x.changed);
  }

  disableNestedChanges(): void {
    this.getChangableEntries().forEach(([, x]) => x.disableChanges());
  }

  enableNestedChanges(): void {
    this.getChangableEntries().forEach(([, x]) => x.enableChanges());
  }

  getNestedChanges(): TNestedChanges<K> {
    return this.getChangableEntries()
      .filter(([, x]) => x.changed)
      .map(([prop, x]) => <[K, TChanges<any>]>[prop, x.getChanges()]);
  }

  setNestedChanges(changes: TNestedChanges<K>): void {
    changes.forEach(([prop, change]) => {
      // const changable = toChangable(this._state[prop]);
      // if (!changable) {
      //   console.log("this._state", this._state);
      //   console.log("this._state[prop]", this._state[prop]);
      //   throw new Error(
      //     `setNestedChanges(): Property "${prop}" is not IChangable. changes=${JSON.stringify(
      //       change
      //     )}`
      //   );
      // }
      const changable = <IChangable<K>>(<unknown>this._state[prop]);
      changable.setChanges(change);
    });
  }

  getChangableEntries(): [K, IChangable<any>][] {
    const result = <[K, IChangable<any>][]>[];

    this._stateKeys.forEach((prop) => {
      const changable = toChangable(this._state[prop]);
      if (changable) {
        result.push([prop, changable]);
      }
    });

    return result;
  }

  // Implementation of interface IOwnChanges
  get hasOwnChanges(): boolean {
    return this._changes.length > 0;
  }

  disableOwnChanges(): void {
    this._changes.disable();
  }

  enableOwnChanges(): void {
    this._changes.enable();
  }

  getOwnChanges(): TObjectChange {
    return this._changes.getChanges(this);
  }

  setOwnChanges(changes: TObjectChange): void {
    this.disableOwnChanges();

    changes.forEach((change) => {
      const [key, value] = change;
      const prop = <K>key;
      this._state[prop] = value;
    });

    this.enableOwnChanges();
  }

  // Implementation of interface IChangable
  get changed(): boolean {
    return this.hasOwnChanges || this.hasNestedChanges;
  }

  disableChanges(): void {
    this.disableOwnChanges();
    this.disableNestedChanges();
  }

  enableChanges(): void {
    this.enableOwnChanges();
    this.enableNestedChanges();
  }

  getChanges(): [TObjectChange, TNestedChanges<K>] {
    return [this.getOwnChanges(), this.getNestedChanges()];
  }

  setChanges(changes: [TObjectChange, TNestedChanges<K>]): void {
    const [ownChanges, nestedChanges] = changes;
    this.setOwnChanges(ownChanges);
    this.setNestedChanges(nestedChanges);
  }

  // implementation of interface IToJSON
  toJSON(): T {
    const result = <T>{};

    this._stateKeys.forEach((prop) => {
      result[prop] = this._state[prop];
    });

    return result;
  }
}
