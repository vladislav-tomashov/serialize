import { IChangableArray } from "./interfaces/IChangableArray";
import { IChanges } from "./interfaces/IChanges";
import { ArrayChanges } from "./ArrayChanges";
import { OfArray } from "./OfArray";

const defaultEqual = <T>(obj1: T, obj2: T) => obj1 === obj2;
const equal = defaultEqual;

class ChangableArray<T> implements IChangableArray<T> {
  constructor(
    private _value = new OfArray<T>(),
    private _changes = new ArrayChanges<T>()
  ) {}

  get length(): number {
    return this._value.length;
  }

  get changed(): boolean {
    return !this._changes.empty;
  }

  get value() {
    return this._value;
  }

  set value(value: OfArray<T>) {
    this._value = value;
    this._changes.add({ action: "set", value });
  }

  getChanges(): IChanges {
    return this._changes;
  }

  get(index: number): T {
    return this._value.get(index);
  }

  set(index: number, value: T): void {
    this._value.set(index, value);

    if (equal(this._value.get(index), value)) {
      return;
    }

    this._changes.add({ action: "update", index, value });
  }

  toArray(): T[] {
    return this._value.toArray();
  }

  clear(): void {
    this._value.clear();
    this._changes.add({ action: "clear" });
  }

  push(value: T): void {
    this._value.push(value);
    this._changes.add({ action: "push", value });
  }

  delete(index: number): T | undefined {
    const [result] = this._value.splice(index, 1);

    if (result !== undefined) {
      this._changes.add({ action: "delete", index });
    }

    return result;
  }

  pop(): T | undefined {
    const result = this._value.pop();

    if (result !== undefined) {
      this._changes.add({ action: "pop" });
    }

    return result;
  }

  insert(index: number, value: T): void {
    this._value.splice(index, 0, value);
    this._changes.add({ action: "insert", index, value });
  }

  clearChanges(): void {
    this._changes.clear();
  }

  applyChanges(changesLog: ArrayChanges<T>) {
    this._changes.clear();

    changesLog.toArray().forEach(({ action, index, value }) => {
      switch (action) {
        case "clear":
          this._value.clear();
          break;
        case "push":
          this._value.push(value as T);
          break;
        case "pop":
          this._value.pop();
          break;
        case "delete":
          this._value.splice(index as number, 1);
          break;
        case "insert":
          this._value.splice(index as number, 0, value as T);
          break;
        case "set":
          this._value = value as OfArray<T>;
          break;
        case "update":
          this._value.set(index as number, value as T);
          break;
        default:
          break;
      }
    });
  }
}

export { ChangableArray };
