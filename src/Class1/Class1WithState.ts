import { IClass1 } from "./Class1.interfaces";
import { IObjectState } from "../changable/ChangableObject/ChangableObject.interfaces";

export interface IClass1State {
  _prop1: string;
  _prop2: number;
  prop3?: string;
}

export type TClass1StateKey = keyof IClass1State;

export class Class1WithState implements IClass1 {
  // not serializable
  private _prop4: string;

  constructor(
    protected _state: IObjectState<IClass1State, TClass1StateKey>,
    arg1: number,
    arg2: string
  ) {
    // copied from Class1 constructor
    if (arg1 === 1) {
      this._prop2 = 5;
      this._prop4 = "goodbye";
    } else {
      this._prop2 = 6;
      this._prop4 = "hello";
    }

    this.prop3 = "abc";
  }

  // Implementation of interface IClass1
  // copied from Class1
  func1(): void {
    this._prop2 = this._prop2 + 1;
  }

  // Proxied state properties
  private get _prop1() {
    return <string>this._state.getProperty("_prop1");
  }

  private set _prop1(value: string) {
    this._state.setProperty("_prop1", value);
  }

  protected get _prop2() {
    return <number>this._state.getProperty("_prop2");
  }

  protected set _prop2(value: number) {
    this._state.setProperty("_prop2", value);
  }

  get prop3() {
    return <string>this._state.getProperty("prop3");
  }

  set prop3(value: string) {
    this._state.setProperty("prop3", value);
  }
}
