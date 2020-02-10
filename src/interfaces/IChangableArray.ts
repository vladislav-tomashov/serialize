import { IChangableValue } from "./IChangableValue";
import { OfArray } from "../OfArray";

export interface IChangableArray<T> extends IChangableValue<OfArray<T>> {
  readonly length: number;

  set(index: number, value: T): void;

  get(index: number): T;

  toArray(): T[];

  clear(): void;

  push(value: T): void;

  delete(index: number): T | undefined;

  pop(): T | undefined;

  insert(index: number, value: T): void;
}
