import { IChangableArray } from "./interfaces/IChangableArray";
import { IChanges } from "./interfaces/IChanges";
import { ArrayChanges } from "./ArrayChanges";

const defaultEqual = <T>(obj1: T, obj2: T) => obj1 === obj2;

class ChangableArray<T> implements IChangableArray<T> {
  private _value: T[] = [];

  constructor(
    value: T[],
    private _changes = new ArrayChanges<T>(),
    private _equal: (obj1: T, obj2: T) => boolean = defaultEqual
  ) {
    this._value = [...value];
  }

  get changed(): boolean {
    return !this._changes.empty;
  }

  get value() {
    return this._value;
  }

  set value(value: T[]) {
    this._value = value;
    this._changes.add({ action: "set", value });
  }

  getChanges(): IChanges {
    return this._changes;
  }

  get(index: number): T | undefined {
    return this._value[index];
  }

  set(index: number, value: T): void {
    this._value[index] = value;

    if (this._equal(this._value[index], value)) {
      return;
    }

    this._changes.add({ action: "update", index, value });
  }

  toArray(): T[] {
    return [...this._value];
  }

  clear(): void {
    this._value = [];
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
          this._value = [];
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
          this._value = value as T[];
          break;
        case "update":
          this._value[index as number] = value as T;
          break;
        default:
          break;
      }
    });
  }
}

export { ChangableArray };
