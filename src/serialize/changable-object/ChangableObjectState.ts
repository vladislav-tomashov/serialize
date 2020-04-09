import { IToJSON } from "./changable-object.interface";
import { ObjectChanges } from "./ObjectChanges";
import {
  IChangable,
  TChanges,
  toChangable,
  INestedChanges,
  IOwnChanges,
  TNestedChanges,
  TObjectChange,
} from "../serialize.interface";
import { SimpleObjectState } from "./SimpleObjectState";

export class ChangableObjectState<T extends object, K extends keyof T>
  extends SimpleObjectState<T, K>
  implements
    IChangable<K>,
    INestedChanges<K>,
    IOwnChanges,
    IToJSON<{ [key: string]: any }> {
  private _changes = new ObjectChanges<T, K>();

  // Overrides
  setProperty(prop: K, value: T[K]): void {
    this._props[prop] = value;
    this._changes.registerPropertyUpdate(prop);

    const changable = toChangable(this._props[prop]);

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
      .map(([prop, x]) => [prop, x.getChanges()] as [K, TChanges<any>]);
  }

  setNestedChanges(changes: TNestedChanges<K>): void {
    changes.forEach(([prop, change]) => {
      // const changable = toChangable(this._props[prop]);
      // if (!changable) {
      //   console.log("this._props", this._props);
      //   console.log("this._props[prop]", this._props[prop]);
      //   throw new Error(
      //     `setNestedChanges(): Property "${prop}" is not IChangable. changes=${JSON.stringify(
      //       change
      //     )}`
      //   );
      // }
      const changable = (this._props[prop] as unknown) as IChangable<K>;
      changable.setChanges(change);
    });
  }

  getChangableEntries(): [K, IChangable<any>][] {
    const result = [] as [K, IChangable<any>][];

    this._propsKeys.forEach((prop) => {
      const changable = toChangable(this._props[prop]);
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
      const prop = key as K;
      this._props[prop] = value;
    });

    this.enableOwnChanges();
  }

  // Implementation of interface IChangable
  isChangable: true = true;

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
  toJSON(): { [keys: string]: any } {
    const result = {} as T;

    this._propsKeys.forEach((prop) => {
      result[prop] = this._props[prop];
    });

    return result;
  }

  // private and protected members
  protected get _propsKeys(): K[] {
    return Object.keys(this._props).map((key) => key as K);
  }
}
