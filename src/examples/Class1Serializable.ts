import { IClass1 } from "./IClass1";
import { ChangableArrayCollection } from "../changables/changableCollections/ChangableArrayCollection";
import { IToJSON } from "../changables/changableObject/changableObject.interface";
import { IChangable } from "../changables/changables.interface";
import {
  ChangableBase,
  IBaseJson,
  IBaseState,
} from "../changables/changableObject/ChangableBase";

export interface IClass1State extends IBaseState {
  _prop1: string;
  _prop2: number;
  prop3?: string;
  _arr?: ChangableArrayCollection<number>;
}

export type TClass1StateKey = keyof IClass1State;

export interface IClass1Json extends IBaseJson {
  class1: true;
}

export function isClass1Json(value: any): value is IClass1Json {
  if (typeof value !== "object") {
    return false;
  }

  return Boolean(value.class1);
}

export class Class1Serializable extends ChangableBase
  implements IClass1, IToJSON<IClass1Json>, IChangable<TClass1StateKey> {
  // not serializable
  private _prop4: string;

  constructor(json: IClass1Json);
  constructor(arg1: number, arg2: string);
  constructor(arg1: any, arg2?: any) {
    super(arg1);

    if (this._isStateJson(arg1)) {
      // init _prop4
      if (arg1 === 1) {
        this._prop4 = "goodbye";
      } else {
        this._prop4 = "hello";
      }

      return;
    }

    this.disableChanges();

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

    this.enableChanges();
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
    return <ChangableArrayCollection<number>>this._state.getProperty("_arr");
  }

  private set _arr(value: ChangableArrayCollection<number>) {
    this._state.setProperty("_arr", value);
  }

  // implementation of interface IToJSON
  toJSON(): IClass1Json {
    return { ...super.toJSON(), class1: true };
  }

  // protected
  protected _isStateJson(value: any): boolean {
    return isClass1Json(value);
  }

  protected _getStateOptionsFromJson(json: IClass1Json): IClass1State {
    const parentOptions = super._getStateOptionsFromJson(json);

    const { state } = json;
    const { _prop1, _prop2, prop3, _arr } = state;

    const result = {
      ...parentOptions,
      _prop1,
      _prop2,
      prop3,
      _arr:
        _arr === undefined
          ? undefined
          : new ChangableArrayCollection<number>(_arr),
    };

    return result;
  }

  protected _getDefaultStateOptions(): IClass1State {
    const parentOptions = super._getDefaultStateOptions();

    return {
      ...parentOptions,
      _prop1: "Hello!",
      _prop2: 0,
      prop3: undefined,
      _arr: undefined,
    };
  }
}
