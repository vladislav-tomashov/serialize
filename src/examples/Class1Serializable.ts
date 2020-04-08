import { IClass1 } from "./IClass1";
import {
  IBaseState,
  IBaseJson,
  ChangableBase,
} from "../serialize/changable-object/ChangableBase";
import { ChangableArrayCollection } from "../serialize/changable-collections/ChangableArrayCollection";
import { IToJSON } from "../serialize/changable-object/changable-object.interface";
import { IChangable } from "../serialize/serialize.interface";

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
    this._prop2 += 1;
    this._arr.push(10);
  }

  // Proxied state properties
  private get _prop1() {
    return this._state.getProperty("_prop1") as string;
  }

  private set _prop1(value: string) {
    this._state.setProperty("_prop1", value);
  }

  protected get _prop2() {
    return this._state.getProperty("_prop2") as number;
  }

  protected set _prop2(value: number) {
    this._state.setProperty("_prop2", value);
  }

  get prop3() {
    return this._state.getProperty("prop3") as string;
  }

  set prop3(value: string) {
    this._state.setProperty("prop3", value);
  }

  private get _arr() {
    return this._state.getProperty("_arr") as ChangableArrayCollection<number>;
  }

  private set _arr(value: ChangableArrayCollection<number>) {
    this._state.setProperty("_arr", value);
  }

  // implementation of interface IToJSON
  toJSON(): IClass1Json {
    return { ...super.toJSON(), class1: true };
  }

  // protected
  // eslint-disable-next-line class-methods-use-this
  protected _isStateJson(value: any): boolean {
    return isClass1Json(value);
  }

  protected _getStateOptionsFromJson(json: IClass1Json): IClass1State {
    const parentOptions = super._getStateOptionsFromJson(json);
    const { state } = json;
    const { _prop1, _prop2, prop3, _arr } = state;

    return {
      ...parentOptions,
      _prop1,
      _prop2,
      prop3,
      _arr:
        _arr === undefined
          ? undefined
          : new ChangableArrayCollection<number>(_arr),
    };
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
