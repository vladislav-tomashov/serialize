import {
  IClass2Json,
  Class2Serializable,
  IClass2State,
} from "./Class2Serializable";
import { IClass3 } from "./IClass3";
import { ChangableArrayCollection } from "../serialize/changable-collections/ChangableArrayCollection";
import { IToJSON } from "../serialize/changable-object/changable-object.interface";
import { IChangable } from "../serialize/serialize.interface";

export interface IClass3State extends IClass2State {
  prop31?: Class2Serializable;
  prop32?: ChangableArrayCollection<Class2Serializable>;
}

export type TClass3StateKey = keyof IClass3State;

export interface IClass3Json extends IClass2Json {
  class3: true;
}

export function isClass3Json(value: any): value is IClass3Json {
  if (typeof value !== "object") {
    return false;
  }

  return Boolean(value.class3);
}

export class Class3Serializable extends Class2Serializable
  implements IClass3, IToJSON<IClass3Json>, IChangable<TClass3StateKey> {
  constructor();

  constructor(json: IClass3Json);

  constructor(json?: any) {
    super(json);

    if (this._isStateJson(json)) {
      return;
    }

    this.disableChanges();

    this.prop31 = new Class2Serializable();
    this.prop32 = new ChangableArrayCollection([
      new Class2Serializable(),
      new Class2Serializable(),
    ]);

    this.enableChanges();
  }

  // Proxied stateful properties
  public get prop31() {
    return this._state.getProperty("prop31") as Class2Serializable;
  }

  public set prop31(value: Class2Serializable) {
    this._state.setProperty("prop31", value);
  }

  public get prop32() {
    return this._state.getProperty("prop32") as ChangableArrayCollection<
      Class2Serializable
    >;
  }

  public set prop32(value: ChangableArrayCollection<Class2Serializable>) {
    this._state.setProperty("prop32", value);
  }

  // implementation of interface IToJSON
  toJSON(): IClass3Json {
    return { ...super.toJSON(), class3: true };
  }

  // protected
  // eslint-disable-next-line class-methods-use-this
  protected _isStateJson(value: any): boolean {
    return isClass3Json(value);
  }

  protected _getStateOptionsFromJson(json: IClass3Json): IClass3State {
    const parentOptions = super._getStateOptionsFromJson(json);
    const { state } = json;
    const { prop31, prop32 } = state;

    return {
      ...parentOptions,
      prop31:
        prop31 === undefined
          ? undefined
          : new Class2Serializable(prop31 as IClass2Json),
      prop32:
        prop32 === undefined
          ? undefined
          : new ChangableArrayCollection<Class2Serializable>(
              (prop32 as IClass2Json[]).map(
                (x) => new Class2Serializable(x as IClass2Json)
              )
            ),
    };
  }

  protected _getDefaultStateOptions(): IClass3State {
    const parentOptions = super._getDefaultStateOptions();
    return { ...parentOptions, prop31: undefined, prop32: undefined };
  }
}
