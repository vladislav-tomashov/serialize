import { IClass2 } from "./IClass2";
import { ChangableArrayCollection } from "../changables/changableCollections/ChangableArrayCollection";
import { IToJSON } from "../changables/changableObject/changableObject.interface";
import { IChangable } from "../changables/changables.interface";
import { Class1Serializable, IClass1Json } from "./Class1Serializable";
import {
  ChangableBase,
  IBaseJson,
  IBaseState,
} from "../changables/changableObject/ChangableBase";

export interface IClass2State extends IBaseState {
  prop1?: Class1Serializable;
  prop2?: ChangableArrayCollection<Class1Serializable>;
}

export type TClass2StateKey = keyof IClass2State;

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
  implements IClass2, IToJSON<IClass2Json>, IChangable<TClass2StateKey> {
  constructor();
  constructor(json: IClass2Json);
  constructor(json?: any) {
    super(json);

    if (this._isStateJson(json)) {
      return;
    }

    this.disableChanges();

    this.prop1 = new Class1Serializable(5, "hfufhvhf");
    this.prop2 = new ChangableArrayCollection([
      new Class1Serializable(1, "test1"),
      new Class1Serializable(2, "test2"),
    ]);

    this.enableChanges();
  }

  // Proxied state properties
  public get prop1() {
    return <Class1Serializable>this._state.getProperty("prop1");
  }

  public set prop1(value: Class1Serializable) {
    this._state.setProperty("prop1", value);
  }

  public get prop2() {
    return <ChangableArrayCollection<Class1Serializable>>(
      this._state.getProperty("prop2")
    );
  }

  public set prop2(value: ChangableArrayCollection<Class1Serializable>) {
    this._state.setProperty("prop2", value);
  }

  // implementation of interface IToJSON
  toJSON(): IClass2Json {
    return { ...super.toJSON(), class2: true };
  }

  // protected
  protected _isStateJson(value: any): boolean {
    return isClass2Json(value);
  }

  protected _getStateOptionsFromJson(json: IClass2Json): IClass2State {
    const parentOptions = super._getStateOptionsFromJson(json);
    const { state } = json;
    const { prop1, prop2 } = state;

    return {
      ...parentOptions,
      prop1:
        prop1 === undefined
          ? undefined
          : new Class1Serializable(<IClass1Json>prop1),
      prop2:
        prop2 === undefined
          ? undefined
          : new ChangableArrayCollection<Class1Serializable>(
              (<IClass1Json[]>prop2).map(
                (x) => new Class1Serializable(<IClass1Json>x)
              )
            ),
    };
  }

  protected _getDefaultStateOptions(): IClass2State {
    const parentOptions = super._getDefaultStateOptions();
    return { ...parentOptions, prop1: undefined, prop2: undefined };
  }
}
