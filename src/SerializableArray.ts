import { ISerializableArray } from "./interfaces/ISerializableArray";
import { IChanges } from "./interfaces/IChanges";
import { ChangesLog } from "./ChangesLog";

const defaultEqual = <T>(obj1: T, obj2: T) => obj1 === obj2;

class SerializableArray<T> implements ISerializableArray<T> {
  private _value: T[] = [];

  constructor(
    value: T[],
    private _changesLog: IChanges = new ChangesLog(),
    private _equal: (obj1: T, obj2: T) => boolean = defaultEqual
  ) {
    this._value = [...value];
  }

  get changed(): boolean {
    return !this._changesLog.empty;
  }

  get value() {
    return this._value;
  }

  set value(value: T[]) {
    this._value = value;
    this._changesLog.add({ action: "set", params: { value } });
  }

  getChanges(): IChanges {
    return this._changesLog;
  }

  toJSON(): T[] {
    return this._value;
  }

  set(index: number, value: T): void {
    this._value[index] = value;

    if (this._equal(this._value[index], value)) {
      return;
    }

    this._changesLog.add({ action: "update", params: { index, value } });
  }

  toArray(): T[] {
    return [...this._value];
  }

  clear(): void {
    this._value = [];
    this._changesLog.add({ action: "clear" });
  }

  push(value: T): void {
    this._value.push(value);
    this._changesLog.add({ action: "push", params: { value } });
  }

  delete(index: number): T | undefined {
    const [result] = this._value.splice(index, 1);

    if (result !== undefined) {
      this._changesLog.add({ action: "delete", params: { index } });
    }

    return result;
  }

  pop(): T | undefined {
    const result = this._value.pop();

    if (result !== undefined) {
      this._changesLog.add({ action: "pop" });
    }

    return result;
  }

  insert(index: number, value: T): void {
    this._value.splice(index, 0, value);
    this._changesLog.add({ action: "insert", params: { index, value } });
  }

  clearChanges(): void {
    this._changesLog.clear();
  }

  setChanges(changesLog: IChanges) {
    this._changesLog.clear();

    changesLog.toArray().forEach(({ action, params }) => {
      switch (action) {
        case "clear":
          this._value = [];
          break;
        case "push":
          {
            const { value } = params;
            this._value.push(value);
          }
          break;
        case "pop":
          this._value.pop();
          break;
        case "delete":
          {
            const { index } = params;
            this._value.splice(index, 1);
          }
          break;
        case "insert":
          {
            const { index, value } = params;
            this._value.splice(index, 0, value);
          }
          break;
        case "set":
          {
            const { value } = params;
            this._value = value;
          }
          break;
        case "update":
          {
            const { index, value } = params;
            this._value[index] = value;
          }
          break;
        default:
          break;
      }
    });
  }
}

export { SerializableArray };
