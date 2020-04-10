import { IClass2 } from "./IClass2";
import { Class1Serializable, IClass1Json } from "./Class1Serializable";
import {
  IBaseState,
  IBaseJson,
  ChangableBase,
} from "../serialize/changable-object/ChangableBase";
import { ChangableArrayCollection } from "../serialize/changable-collections/ChangableArrayCollection";
import { IToJSON } from "../serialize/changable-object/changable-object.interface";

export interface IClass2State extends IBaseState {
  prop1: Class1Serializable;
  prop2: ChangableArrayCollection<Class1Serializable>;
}

export interface IClass2Json extends IBaseJson {
  class2: true;
}

export function isClass2Json(value: any): value is IClass2Json {
  if (typeof value !== "object") {
    return false;
  }

  return Boolean(value.class2);
}

export class Class2Serializable extends ChangableBase
  implements IClass2, IToJSON<IClass2Json> {
  constructor();

  constructor(json: IClass2Json);

  constructor(json?: any) {
    super(json);

    if (this._isStateJson(json)) {
      return;
    }

    this.prop1 = new Class1Serializable(5, "hfufhvhf");
    this.prop2 = new ChangableArrayCollection([
      new Class1Serializable(1, "test1"),
      new Class1Serializable(2, "test2"),
    ]);

    this.clearChanges();
  }

  // Proxied state properties
  public get prop1() {
    return this._state.getProperty("prop1") as Class1Serializable;
  }

  public set prop1(value: Class1Serializable) {
    this._state.setProperty("prop1", value);
  }

  public get prop2() {
    return this._state.getProperty("prop2") as ChangableArrayCollection<
      Class1Serializable
    >;
  }

  public set prop2(value: ChangableArrayCollection<Class1Serializable>) {
    this._state.setProperty("prop2", value);
  }

  // implementation of interface IToJSON
  toJSON(): IClass2Json {
    return { ...super.toJSON(), class2: true };
  }

  // protected
  // eslint-disable-next-line class-methods-use-this
  protected _isStateJson(value: any): boolean {
    return isClass2Json(value);
  }

  protected _getStatePropsFromJson(json: IClass2Json): IClass2State {
    const parentOptions = super._getStatePropsFromJson(json);
    const { state } = json;
    const { prop1, prop2 } = state;

    return {
      ...parentOptions,
      prop1: new Class1Serializable(prop1 as IClass1Json),
      prop2: new ChangableArrayCollection<Class1Serializable>(
        (prop2 as IClass1Json[]).map(
          (x) => new Class1Serializable(x as IClass1Json)
        )
      ),
    };
  }
}
