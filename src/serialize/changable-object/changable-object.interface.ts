export interface IToJSON<T> {
  toJSON(): T;
}

export interface IGetProperty<T, K extends keyof T> {
  getProperty(prop: K): T[K];
}

export interface ISetProperty<T, K extends keyof T> {
  setProperty(prop: K, value: T[K]): void;
}

export interface IObjectState<T extends object, K extends keyof T>
  extends IGetProperty<T, K>,
    ISetProperty<T, K> {}
