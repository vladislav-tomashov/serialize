import { IChangableValue } from "./IChangableValue";

export interface IChangableArray<T> extends IChangableValue<T[]> {
  set(index: number, value: T): void;

  get(index: number): T | undefined;

  toArray(): T[];

  clear(): void;

  push(value: T): void;

  delete(index: number): T | undefined;

  pop(): T | undefined;

  insert(index: number, value: T): void;
}
