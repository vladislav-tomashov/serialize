import { IObjectState } from "./changableObject.interface";

export class SimpleObjectState<T extends object, K extends keyof T>
  implements IObjectState<T, K> {

  constructor(protected _state: T) {}

  // implementation of interface IObjectState
  getProperty(prop: K): T[K] {
    return this._state[prop];
  }

  setProperty(prop: K, value: T[K]): void {
    this._state[prop] = value;
  }
}
