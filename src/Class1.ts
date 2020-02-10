import { OfArray } from "./OfArray";

class Class1 {
  private _prop1: number;
  private _prop2: OfArray<string>;

  constructor({ prop1, prop2 }: { prop1: number; prop2: OfArray<string> }) {
    this._prop1 = prop1;
    this._prop2 = prop2;
  }

  get prop1() {
    return this._prop1;
  }

  set prop1(value: number) {
    this._prop1 = value;
  }

  get prop2() {
    return this._prop2;
  }
  set prop2(value: OfArray<string>) {
    this._prop2 = value;
  }
}

export { Class1 };
