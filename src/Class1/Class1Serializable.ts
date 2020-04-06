import { IClass1 } from "./Class1.interface";
import { IArrayCollection } from "../collections/collections.interface";
import { ChangableArrayCollection } from "../changables/changable-collections/ChangableArrayCollection";
import {
  IToJSON,
  TNestedChanges,
  TObjectChange,
} from "../changables/changable-object/changable-object.interface";
import { IChangable } from "../changables/changables.interface";
import { ChangableObjectState } from "../changables/changable-object/ChangableObjectState";

export interface IClass1State {
  _prop1: string;
  _prop2: number;
  prop3?: string;
  _arr?: IArrayCollection<number>;
}

export const defaultClass1State: IClass1State = {
  _prop1: "Hello!",
  _prop2: 0,
  prop3: undefined,
  _arr: undefined,
};

export type TClass1StateKey = keyof IClass1State;

interface IClass1Json {
  class1State: IClass1State;
}

function isClass1Json(value: any): value is IClass1Json {
  if (typeof value !== "object") {
    return false;
  }

  return !!value.class1State;
}

export class Class1Serializable
  implements IClass1, IToJSON<IClass1Json>, IChangable<TClass1StateKey> {
  protected _state: ChangableObjectState<IClass1State, TClass1StateKey>;

  // not serializable
  private _prop4: string;

  constructor(arg1: IClass1Json, arg2: any);
  constructor(arg1: number, arg2: string);
  constructor(arg1: any, arg2: any) {
    this._state = new ChangableObjectState<IClass1State, TClass1StateKey>(
      isClass1Json(arg1) ? arg1.class1State : defaultClass1State
    );

    // copied from Class1 constructor
    if (arg1 === 1) {
      this._prop2 = 5;
      this._prop4 = "goodbye";
      this._arr = new ChangableArrayCollection([1, 2, 3]);
    } else {
      this._prop2 = 6;
      this._prop4 = "hello";
      this._arr = new ChangableArrayCollection([4, 5, 6]);
    }

    this.prop3 = "abc";
  }

  // Implementation of interface IClass1
  // copied from Class1
  func1(): void {
    this._prop2 = this._prop2 + 1;
    this._arr.push(10);
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

  private get _arr() {
    return <IArrayCollection<number>>this._state.getProperty("_arr");
  }

  private set _arr(value: IArrayCollection<number>) {
    this._state.setProperty("_arr", value);
  }

  // implementation of interface IToJSON
  toJSON(): IClass1Json {
    return { class1State: this._state.toJSON() };
  }

  // implementation of interface IChangable
  isChangable: true = true;

  get changed(): boolean {
    return this._state.changed;
  }

  clearChanges(): void {
    this._state.clearChanges();
  }

  getChanges(): [TObjectChange, TNestedChanges<TClass1StateKey>] {
    return this._state.getChanges();
  }

  setChanges(changes: [TObjectChange, TNestedChanges<TClass1StateKey>]): void {
    this._state.setChanges(changes);
  }
}
