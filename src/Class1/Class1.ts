import { IClass1 } from "./Class1.interfaces";

export class Class1 implements IClass1 {
  private _prop1: string = "Hello!"; // serialize
  private _prop4: string; // do not serialize

  protected _prop2: number = 0; // serialize

  prop3: string; // serialize

  constructor(arg1: number, arg2: string) {
    if (arg1 === 1) {
      this._prop2 = 5;
      this._prop4 = "goodbye";
    } else {
      this._prop2 = 6;
      this._prop4 = "hello";
    }

    this.prop3 = "abc";
  }

  func1(): void {
    this._prop2 = this._prop2 + 1;
  }
}
