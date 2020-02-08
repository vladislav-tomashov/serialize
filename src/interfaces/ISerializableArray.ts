import { ISerializableValue } from "./ISerializableValue";

export interface ISerializableArray<T> extends ISerializableValue<T[]> {
  set(index: number, value: T): void;

  toArray(): T[];

  clear(): void;

  push(value: T): void;

  delete(index: number): T | undefined;

  pop(): T | undefined;

  insert(index: number, value: T): void;
}
