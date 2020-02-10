import { OfArray } from "./OfArray";

class Class1 {
  private _prop1: number;
  private _prop2: OfArray<string>;
  private _prop3: Date;

  constructor({
    prop1,
    prop2,
    prop3
  }: {
    prop1: number;
    prop2: OfArray<string>;
    prop3: Date;
  }) {
    this.prop1 = prop1;
    this.prop2 = prop2;
    this.prop3 = prop3;
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

  get prop3() {
    return this._prop3;
  }

  set prop3(value: Date) {
    this._prop3 = value;
  }
}

export { Class1 };
