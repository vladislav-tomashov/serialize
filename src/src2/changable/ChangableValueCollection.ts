import {
  IChangableValueCollection,
  toChangable,
  TChangableValueCollectionChanges,
  TCollectionItemChange
} from "./interfaces";
import { ICollection } from "../Collection/ICollection";
import { Collection } from "../Collection/Collection";
import { CollectionChanges } from "./CollectionChanges";

export class ChangableValueCollection<T>
  implements IChangableValueCollection<T> {

    private _array: Collection<T>;
    private _changes = new CollectionChanges<T>();
    private _disableChanges = false;
  
  isChangable: true = true;
  isChangableValueCollection: true = true;

  constructor(value: T[]);
  constructor(value: ICollection<T>);
  constructor(value: any) {
    this._array = new Collection(value);
  }

  get changed(): boolean {
    return this._super.changed
      ? true
      : this._super.some((x) => toChangable(x)?.changed);
  }

  getChanges(): TChangableValueCollectionChanges<T> {
    const collectionChanges = this._super.getChanges();
    const itemsChanges: TCollectionItemChange<T>[] = [];

    this._super.forEach((x, index) => {
      const changable = toChangable<T>(x);

      if (!changable || !changable.changed) {
        return;
      }

      itemsChanges.push([index, changable.getChanges()]);
    });

    const result = [
      collectionChanges,
      itemsChanges
    ] as TChangableValueCollectionChanges<T>;
    return result;
  }

  setChanges(changes: TChangableValueCollectionChanges<T>): void {
    const [collectionChanges, itemsChanges] = changes;

    this._super.setChanges(collectionChanges);

    itemsChanges.forEach((x) => {
      const [index, itemChanges] = x;
      const itemAsChangable = this._super.get(index) as ;
      itemAsChangable?.setChanges(itemChanges);
    });
  }

  clearChanges(): void {
    this._super.clearChanges();
  }

  get length(): number {
    return this._super.length;
  }

  toString(): string {
    return this._super.toString();
  }

  pop(): T | undefined {
    throw new Error("Method not implemented.");
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
  toArray(): T[] {
    throw new Error("Method not implemented.");
  }
  get(index: number): T | undefined {
    throw new Error("Method not implemented.");
  }
  set(index: number, value: T): void {
    throw new Error("Method not implemented.");
  }
  clear(): void {
    throw new Error("Method not implemented.");
  }
}
