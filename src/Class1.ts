import { Collection } from "./Collection";

class Class1 {
  private _prop1: number;
  private _prop2: Collection<string>;
  private _prop3: Date;
  private _prop4: Object;

  constructor({
    prop1,
    prop2,
    prop3,
    prop4
  }: {
    prop1: number;
    prop2: Collection<string>;
    prop3: Date;
    prop4: Object;
  }) {
    this.prop1 = prop1;
    this.prop2 = prop2;
    this.prop3 = prop3;
    this.prop4 = prop4;
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

  set prop2(value: Collection<string>) {
    this._prop2 = value;
  }

  get prop3() {
    return this._prop3;
  }

  set prop3(value: Date) {
    this._prop3 = value;
  }

  get prop4() {
    return this._prop4;
  }

  set prop4(value: Object) {
    this._prop4 = value;
  }
}

export { Class1 };
