import {
  TCollectionChange,
  CollectionChangeType,
  TCollectionPushChange,
  TCollectionUnshiftChange,
  TCollectionClearChange,
  TCollectionSortChange,
  TCollectionReverseChange,
  TCollectionSetChange,
  TCollectionSpliceChange,
  IChangable,
  isChangable
} from "./interfaces";
import { CollectionChanges } from "./CollectionChanges";
import { Collection } from "../collections/Collection";
import { ICollection } from "../collections/interfaces";

export class ChangableCollection<T> implements IChangable, ICollection<T> {
  private _array: Collection<T>;
  private _changes = new CollectionChanges<T>();
  private _changesDisabled = false;

  isChangable: true = true;

  constructor(value: T[]);
  constructor(value: ICollection<T>);
  constructor(value: any) {
    this._array = new Collection(value);
  }

  get changed(): boolean {
    return this._changes.length > 0;
  }

  getChangableEntries(): [number | string, IChangable][] {
    if (!this.length || !isChangable(this.get(0))) {
      return [];
    }

    return this.map((value, index) => {
      const changable = (value as unknown) as IChangable;
      return [index, changable];
    });
  }

  getChanges(): TCollectionChange<T>[] {
    const result = this._changes.getChanges(this._array.toArray());
    return result;
  }

  setChanges(changes: TCollectionChange<T>[]): void {
    this.clearChanges();
    this._changesDisabled = true;
    changes.forEach((x) => this._setChange(x));
    this._changesDisabled = false;
  }

  clearChanges(): void {
    this._changes.clear();
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

    if (!this._changesDisabled) {
      this._changes.registerSet(index, value);
    }
  }

  toString(): string {
    return this._array.toString();
  }

  pop(): T | undefined {
    const result = this._array.pop();

    if (!this._changesDisabled) {
      this._changes.registerPop();
    }

    return result;
  }

  push(...items: T[]): number {
    const result = this._array.push(...items);

    if (!this._changesDisabled) {
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

    if (!this._changesDisabled) {
      this._changes.registerReverse();
    }

    return result;
  }
  clear(): void {
    this._array.clear();

    if (!this._changesDisabled) {
      this._changes.registerClear();
    }
  }
  sort(compareFn?: ((a: T, b: T) => number) | undefined): this {
    this._array.sort(compareFn);

    if (!this._changesDisabled) {
      this._changes.registerSort();
    }

    return this;
  }
  unshift(...items: T[]): number {
    const result = this._array.unshift(...items);

    if (!this._changesDisabled) {
      this._changes.registerUnshift(items);
    }

    return result;
  }
  shift(): T | undefined {
    const result = this._array.shift();

    if (!this._changesDisabled) {
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

    if (!this._changesDisabled) {
      this._changes.registerSplice(start, deleteCount, rest);
    }

    return result;
  }

  private _setChange(change: TCollectionChange<T>) {
    const [changeType] = change;

    switch (changeType) {
      case CollectionChangeType.Splice: {
        const [, start, deleteCount, items] = change as TCollectionSpliceChange<
          T
        >;
        if (deleteCount && items) {
          this._array.splice(start, deleteCount, ...items);
        } else {
          this._array.splice(start, deleteCount);
        }
        break;
      }
      case CollectionChangeType.Push: {
        const [, items] = change as TCollectionPushChange<T>;
        this._array.push(...items);
        break;
      }
      case CollectionChangeType.Unshift: {
        const [, items] = change as TCollectionUnshiftChange<T>;
        this._array.unshift(...items);
        break;
      }
      case CollectionChangeType.Pop: {
        this._array.pop();
        break;
      }
      case CollectionChangeType.Shift: {
        this._array.shift();
        break;
      }
      case CollectionChangeType.Clear: {
        const [, items] = change as TCollectionClearChange<T>;
        this._array.clear();
        this._array.push(...items);
        break;
      }
      case CollectionChangeType.Sort: {
        const [, items] = change as TCollectionSortChange<T>;
        this._array.clear();
        this._array.push(...items);
        break;
      }
      case CollectionChangeType.Reverse: {
        const [, items] = change as TCollectionReverseChange<T>;
        this._array.clear();
        this._array.push(...items);
        break;
      }
      case CollectionChangeType.Set: {
        const [, index, value] = change as TCollectionSetChange<T>;
        this._array.set(index, value);
        break;
      }
      default:
        throw new Error(`Unknown array change type=${changeType}`);
    }
  }
}
