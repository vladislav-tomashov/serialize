import { IChangableArray } from "./interfaces/IChangableArray";
import { ArrayChanges } from "./ArrayChanges";
import { ArrayAnalog } from "./ArrayAnalog";
import { IArrayChangeItem } from "./interfaces/IArrayChangeItem";
import { toChangable } from "./interfaces/IChangable";

const defaultEqual = <T>(obj1: T, obj2: T) => obj1 === obj2;
const equal = defaultEqual;

class ChangableArray<T> implements IChangableArray<T> {
  private _changes?: ArrayChanges2<T>;
  private _changed = false;

  constructor(private _array = new ArrayAnalog<T>()) {}

  get length(): number {
    return this._array.length;
  }

  get changed(): boolean {
    return this._changed || this._array.some((el) => toChangable(el)?.changed);
  }

  getChanges(): IArrayChanges<T> {
    // private _changes?: ArrayChanges2; // = new ArrayChanges2<T>(() => this._array);
    const changes: IArrayChangeItem<T>[] = [];

    this._array.forEach((x, index) => {
      if (!x.changed) {
        return;
      }

      changes.push({
        changes: x.getChanges(),
        action: "update",
        index
      });
    });

    return new ArrayChanges([...this._changes.toArray(), ...changes]);
  }

  toArray(): T[] {
    return this._array.map((x) => x.value);
  }

  toChangableArray(): T1[] {
    return this._array.toArray();
  }

  get(index: number): T | undefined {
    const c = this._array.get(index);
    const oldValue = c?.value;
    return oldValue;
  }

  set(index: number, value: T): void {
    const c = this._array.get(index);
    const oldValue = c?.value;

    if (equal(oldValue, value)) {
      return;
    }

    if (!c) {
      this.insert(index, value);
    } else {
      c.value = value;
    }
  }

  clear(): void {
    this._array.clear();
    this._changes.add({ action: "clear" });
  }

  push(...items: T[]): number {
    items.forEach((item) => {
      this._array.push();
      this._changes.add({ action: "push", value });
    });

    return this.length;
  }

  delete(index: number): T | undefined {
    const [result] = this._array.splice(index, 1);

    if (result !== undefined) {
      this._changes.add({ action: "delete", index });
    }

    return result;
  }

  pop(): T | undefined {
    const result = this._array.pop();

    if (result !== undefined) {
      this._changes.add({ action: "pop" });
    }

    return result;
  }

  insert(index: number, value: T): void {
    this._array.splice(index, 0, value);
    this._changes.add({ action: "insert", index, value });
  }

  concat(...args: any[]): T[] {
    throw new Error("Method not implemented.");
  }
  indexOf(...args: any[]): number {
    throw new Error("Method not implemented.");
  }
  sort(...args: any[]): T[] {
    throw new Error("Method not implemented.");
  }
  reverse(...args: any[]): T[] {
    throw new Error("Method not implemented.");
  }
  unshift(...args: any[]): number {
    throw new Error("Method not implemented.");
  }
  shift(...args: any[]): T | undefined {
    throw new Error("Method not implemented.");
  }
  map(...args: any[]): unknown[] {
    throw new Error("Method not implemented.");
  }
  reduce(...args: any[]): T {
    throw new Error("Method not implemented.");
  }
  reduceRight(...args: any[]): T {
    throw new Error("Method not implemented.");
  }
  lastIndexOf(...args: any[]): number {
    throw new Error("Method not implemented.");
  }
  join(...args: any[]): string {
    throw new Error("Method not implemented.");
  }
  filter(...args: any[]): T[] {
    throw new Error("Method not implemented.");
  }
  every(...args: any[]): boolean {
    throw new Error("Method not implemented.");
  }
  some(...args: any[]): boolean {
    throw new Error("Method not implemented.");
  }
  forEach(...args: any[]): void {
    throw new Error("Method not implemented.");
  }
  slice(...args: any[]): T[] {
    throw new Error("Method not implemented.");
  }
  splice(...args: any[]): T[] {
    throw new Error("Method not implemented.");
  }
  toString(...args: any[]): string {
    throw new Error("Method not implemented.");
  }
  toJSON(): T[] {
    throw new Error("Method not implemented.");
  }
  clearChanges(): void {
    this._changes.clear();
  }

  applyChanges(changesLog: ArrayChanges<T>) {
    this._changes.clear();

    changesLog.toArray().forEach(({ action, index, value }) => {
      switch (action) {
        case "clear":
          this._array.clear();
          break;
        case "push":
          this._array.push(value as T);
          break;
        case "pop":
          this._array.pop();
          break;
        case "delete":
          this._array.splice(index as number, 1);
          break;
        case "insert":
          this._array.splice(index as number, 0, value as T);
          break;
        case "constructor":
          this._array = value as ArrayAnalog<T>;
          break;
        case "update":
          this._array.set(index as number, value as T);
          break;
        default:
          break;
      }
    });
  }
}

export { ChangableArray };
