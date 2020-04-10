import { IClass3 } from "./IClass3";
import { IClass4 } from "./IClass4";
import {
  IBaseState,
  IBaseJson,
  ChangableBase,
} from "../serialize/changable-object/ChangableBase";
import { IToJSON } from "../serialize/changable-object/changable-object.interface";

export interface IClass4State extends IBaseState {
  prop41: string;
}

export interface IClass4Json extends IBaseJson {
  class4: true;
}

export function isClass4Json(value: any): value is IClass4Json {
  if (typeof value !== "object") {
    return false;
  }

  return Boolean(value.class4);
}

export class Class4Serializable extends ChangableBase
  implements IClass4, IToJSON<IClass4Json> {
  ref: IClass3;

  constructor(json: IClass4Json, pRef: IClass3);

  constructor(pRef: IClass3, pProp41: string);

  constructor(pRef: any, pProp41: any) {
    super(pRef);

    if (this._isStateJson(pRef)) {
      this.ref = pProp41;
      return;
    }

    // copied from Class1 constructor
    this.ref = pRef;
    this.prop41 = pProp41;

    this.clearChanges();
  }

  // Proxied state properties
  public get prop41() {
    return this._state.getProperty("prop41") as string;
  }

  public set prop41(value: string) {
    this._state.setProperty("prop41", value);
  }

  // implementation of interface IToJSON
  toJSON(): IClass4Json {
    return { ...super.toJSON(), class4: true };
  }

  // protected
  // eslint-disable-next-line class-methods-use-this
  protected _isStateJson(value: any): boolean {
    return isClass4Json(value);
  }

  protected _getStatePropsFromJson(json: IClass4Json): IClass4State {
    const parentOptions = super._getStatePropsFromJson(json);

    const { state } = json;
    const { prop41 } = state;

    return {
      ...parentOptions,
      prop41,
    };
  }
}
