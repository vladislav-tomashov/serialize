import { IArray } from "../ArrayAnalog/IArray";
import { IChangable } from "./interfaces/IChangable";
import { ArrayAnalog } from "../ArrayAnalog/ArrayAnalog";
import {
  TChanges,
  TArrayChange,
  ArrayChangeType,
  TArrayPushChange,
  TArrayUnshiftChange,
  TArrayClearChange,
  TArraySortChange,
  TArrayReverseChange,
  TArraySetChange
} from "./types";
import { ArrayChanges } from "./ArrayChanges";

export class ChangableArray<T> implements IArray<T>, IChangable<T> {
  private _array: ArrayAnalog<T>;
  private _changes = new ArrayChanges<T>();
  private _disableChanges = false;

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

  get changed(): boolean {
    return this._changes.length > 0;
  }

  getChanges(): TChanges<T> {
    const result = this._changes.getChangesAndClear(this._array.toArray());
    return result;
  }

  private _setChange(change: TArrayChange<T>) {
    const [changeType] = change;

    switch (changeType) {
      case ArrayChangeType.Push: {
        const [, items] = change as TArrayPushChange<T>;
        this._array.push(...items);
        break;
      }
      case ArrayChangeType.Unshift: {
        const [, items] = change as TArrayUnshiftChange<T>;
        this._array.unshift(...items);
        break;
      }
      case ArrayChangeType.Pop: {
        this._array.pop();
        break;
      }
      case ArrayChangeType.Shift: {
        this._array.shift();
        break;
      }
      case ArrayChangeType.Clear: {
        const [, items] = change as TArrayClearChange<T>;
        this._array.clear();
        this._array.push(...items);
        break;
      }
      case ArrayChangeType.Sort: {
        const [, items] = change as TArraySortChange<T>;
        this._array.clear();
        this._array.push(...items);
        break;
      }
      case ArrayChangeType.Reverse: {
        const [, items] = change as TArrayReverseChange<T>;
        this._array.clear();
        this._array.push(...items);
        break;
      }
      case ArrayChangeType.Set: {
        const [, index, value] = change as TArraySetChange<T>;
        this._array.set(index, value);
        break;
      }
      default:
        throw new Error(`Unknown array change type=${changeType}`);
    }
  }

  setChanges(changes: TChanges<T>): void {
    this.clearChanges();
    this._disableChanges = true;
    const arrayChanges = changes as TArrayChange<T>[];
    arrayChanges.forEach((x) => this._setChange(x));
    this._disableChanges = false;
  }

  clearChanges(): void {
    if (!this._disableChanges) {
      this._changes.clear();
    }
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

    if (!this._disableChanges) {
      this._changes.registerSet(index, value);
    }
  }

  toString(): string {
    return this._array.toString();
  }

  pop(): T | undefined {
    const result = this._array.pop();

    if (!this._disableChanges) {
      this._changes.registerPop();
    }

    return result;
  }

  push(...items: T[]): number {
    const result = this._array.push(...items);

    if (!this._disableChanges) {
      this._changes.registerPush(items);
    }

    return result;
  }

  indexOf(searchElement: T, fromIndex?: number | undefined): number {
    return this._array.indexOf(searchElement, fromIndex);
  }
  lastIndexOf(searchElement: T, fromIndex?: number | undefined): number {
    return this._array.lastIndexOf(searchElement, fromIndex);
  }
  every(
    callbackfn: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): boolean {
    return this._array.every(callbackfn, thisArg);
  }
  some(
    callbackfn: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): boolean {
    return this._array.some(callbackfn, thisArg);
  }
  forEach(
    callbackfn: (value: T, index: number, array: T[]) => void,
    thisArg?: any
  ): void {
    this._array.forEach(callbackfn, thisArg);
  }
  map<U>(
    callbackfn: (value: T, index: number, array: T[]) => U,
    thisArg?: any
  ): U[] {
    return this._array.map(callbackfn, thisArg);
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
    return this._array.filter(callbackfn, thisArg);
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
    return this._array.reduce(callbackfn, initialValue);
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
    return this._array.reduceRight(callbackfn, initialValue);
  }
  join(separator?: string | undefined): string {
    return this._array.join(separator);
  }
  reverse(): T[] {
    const result = this._array.reverse();

    if (!this._disableChanges) {
      this._changes.registerReverse();
    }

    return result;
  }
  clear(): void {
    this._array.clear();

    if (!this._disableChanges) {
      this._changes.registerClear();
    }
  }
  sort(compareFn?: ((a: T, b: T) => number) | undefined): this {
    this._array.sort(compareFn);

    if (!this._disableChanges) {
      this._changes.registerSort();
    }

    return this;
  }
  unshift(...items: T[]): number {
    const result = this._array.unshift(...items);

    if (!this._disableChanges) {
      this._changes.registerUnshift(items);
    }

    return result;
  }
  shift(): T | undefined {
    const result = this._array.shift();

    if (!this._disableChanges) {
      this._changes.registerShift();
    }

    return result;
  }
  slice(start?: number | undefined, end?: number | undefined): T[] {
    return this._array.slice(start, end);
  }

  concat(...items: ConcatArray<T>[]): T[];
  concat(...items: (T | ConcatArray<T>)[]): T[];
  concat(...items: any[]) {
    return this._array.concat(...items);
  }

  splice(start: number, deleteCount?: number | undefined): T[];
  splice(start: number, deleteCount: number, ...items: T[]): T[];
  splice(start: any, deleteCount?: any, ...rest: any[]) {
    const result = this._array.splice(start, deleteCount, ...rest);

    if (!this._disableChanges) {
      this._changes.registerSplice(start, deleteCount, rest);
    }

    return result;
  }
}
