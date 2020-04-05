import {
  IToJSON,
  INestedChanges,
  IOwnChanges,
  TNestedChanges,
  TOwnChanges,
} from "./ChangableObject.interfaces";
import { ObjectChanges } from "./ObjectChanges";
import { IChangable, TChanges, toChangable } from "../changable.interfaces";
import { SimpleObjectState } from "./SimpleObjectState";

export class ChangableObjectState<T extends object, K extends keyof T>
  extends SimpleObjectState<T, K>
  implements IChangable<K>, INestedChanges<K>, IOwnChanges, IToJSON<T> {
  isChangable: true = true;

  private _changes = new ObjectChanges<T, K>();

  // Implementation of interface INestedChanges
  get hasNestedChanges(): boolean {
    return this.getChangableEntries().some(([, x]) => x.changed);
  }

  clearNestedChanges(): void {
    this.getChangableEntries().forEach(([, x]) => x.clearChanges());
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
      //   throw new Error(
      //     `setNestedChanges(): cannot set changes. Property "${prop}" is not IChangable`
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

  clearOwnChanges(): void {
    this._changes.clear();
  }

  getOwnChanges(): TOwnChanges {
    return this._changes.getChanges(this);
  }

  setOwnChanges(changes: TOwnChanges): void {
    this.clearOwnChanges();

    changes.forEach((change) => {
      const [key, value] = change;
      const prop = <K>key;
      this._state[prop] = value;
    });
  }

  // Implementation of interface IChangable
  get changed(): boolean {
    return this.hasOwnChanges || this.hasNestedChanges;
  }

  clearChanges(): void {
    this.clearNestedChanges();
    this.clearOwnChanges();
  }

  getChanges(): TChanges<K> {
    return [this.getOwnChanges(), this.getNestedChanges()];
  }

  setChanges(changes: TChanges<K>): void {
    const [ownChanges, nestedChanges] = changes;
    this.setOwnChanges(ownChanges);
    this.setNestedChanges(nestedChanges);
  }

  // implementation of interface IToJSON
  toJSON(): T {
    const result = <T>{};

    this._stateKeys.forEach((prop) => {
      result[prop] = this.getProperty(prop);
    });

    return result;
  }
}
