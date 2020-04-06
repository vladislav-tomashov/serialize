import { IObjectState } from "./changableObject.interface";

export class SimpleObjectState<T extends object, K extends keyof T>
  implements IObjectState<T, K> {
  private _cacheStateKeys?: K[];

  constructor(protected _state: T) {}

  // implementation of interface IObjectState
  getProperty(prop: K): T[K] {
    return this._state[prop];
  }

  setProperty(prop: K, value: T[K]) {
    this._state[prop] = value;
  }

  // private and protected members
  protected get _stateKeys(): K[] {
    if (!this._cacheStateKeys) {
      this._cacheStateKeys = Object.keys(this._state).map((key) => <K>key);
    }

    return <K[]>this._cacheStateKeys;
  }
}
