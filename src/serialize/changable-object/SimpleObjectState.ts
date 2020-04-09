import { IObjectState } from "./changable-object.interface";

export class SimpleObjectState<T extends object, K extends keyof T>
  implements IObjectState<T, K> {
  constructor(protected _props: T) {}

  // implementation of interface IObjectState
  getProperty(prop: K): T[K] {
    return this._props[prop];
  }

  setProperty(prop: K, value: T[K]): void {
    this._props[prop] = value;
  }
}
