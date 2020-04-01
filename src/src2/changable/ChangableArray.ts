import { IArray } from "../ArrayAnalog/IArray";
import { IChangable } from "./interfaces/IChangable";
import { ArrayAnalog } from "../ArrayAnalog/ArrayAnalog";

export class ChangableArray<T> implements IArray<T>, IChangable<IArray<T>> {
  private _array: ArrayAnalog<T>;

  isChangable: true = true;

  constructor(value: T[]);
  constructor(value: IArray<T>);
  constructor(value: IArray<T> | T[]) {
    const valueAsIArray = value as IArray<T>;
    const array = valueAsIArray.toArray
      ? valueAsIArray.toArray()
      : (value as T[]);

    this._array = new ArrayAnalog(array);
  }

  get changed(): boolean {}

  getChanges(): import("./types").TChanges<IArray<T>> {
    throw new Error("Method not implemented.");
  }
  setChanges(changes: import("./types").TChanges<IArray<T>>): void {
    throw new Error("Method not implemented.");
  }
  clearChanges(): void {
    throw new Error("Method not implemented.");
  }

  get length(): number {
    return this._array.length;
  }

  toArray(): T[] {
    return this._array.toArray();
  }

  get(index: number): T | undefined {
    return this._array.get(index);
  }

  set(index: number, value: T): void {
    this._array.set(index, value);
    this._changes.registerSet(index, value);
  }

  toString(): string {
    return this._array.toString();
  }

  pop(): T | undefined {
    const result = this._array.pop();
    this._changes.registerPop();
    return result;
  }

  push(...items: T[]): number {
    throw new Error("Method not implemented.");
  }

  concat(...items: ConcatArray<T>[]): T[];
  concat(...items: (T | ConcatArray<T>)[]): T[];
  concat(...items: any[]) {
    throw new Error("Method not implemented.");
  }
  join(separator?: string | undefined): string {
    throw new Error("Method not implemented.");
  }
  reverse(): T[] {
    throw new Error("Method not implemented.");
  }
  shift(): T | undefined {
    throw new Error("Method not implemented.");
  }
  slice(start?: number | undefined, end?: number | undefined): T[] {
    throw new Error("Method not implemented.");
  }
  sort(compareFn?: ((a: T, b: T) => number) | undefined): this {
    throw new Error("Method not implemented.");
  }
  splice(start: number, deleteCount?: number | undefined): T[];
  splice(start: number, deleteCount: number, ...items: T[]): T[];
  splice(start: any, deleteCount?: any, ...rest: any[]) {
    throw new Error("Method not implemented.");
  }
  unshift(...items: T[]): number {
    throw new Error("Method not implemented.");
  }
  indexOf(searchElement: T, fromIndex?: number | undefined): number {
    throw new Error("Method not implemented.");
  }
  lastIndexOf(searchElement: T, fromIndex?: number | undefined): number {
    throw new Error("Method not implemented.");
  }
  every(
    callbackfn: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): boolean {
    throw new Error("Method not implemented.");
  }
  some(
    callbackfn: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): boolean {
    throw new Error("Method not implemented.");
  }
  forEach(
    callbackfn: (value: T, index: number, array: T[]) => void,
    thisArg?: any
  ): void {
    throw new Error("Method not implemented.");
  }
  map<U>(
    callbackfn: (value: T, index: number, array: T[]) => U,
    thisArg?: any
  ): U[] {
    throw new Error("Method not implemented.");
  }
  filter<S extends T>(
    callbackfn: (value: T, index: number, array: T[]) => value is S,
    thisArg?: any
  ): S[];
  filter(
    callbackfn: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): T[];
  filter(callbackfn: any, thisArg?: any) {
    throw new Error("Method not implemented.");
  }
  reduce(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => T
  ): T;
  reduce(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => T,
    initialValue: T
  ): T;
  reduce<U>(
    callbackfn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => U,
    initialValue: U
  ): U;
  reduce(callbackfn: any, initialValue?: any) {
    throw new Error("Method not implemented.");
  }
  reduceRight(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => T
  ): T;
  reduceRight(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => T,
    initialValue: T
  ): T;
  reduceRight<U>(
    callbackfn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => U,
    initialValue: U
  ): U;
  reduceRight(callbackfn: any, initialValue?: any) {
    throw new Error("Method not implemented.");
  }
}
