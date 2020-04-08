import { IClass3 } from "./IClass3";
import { IClass4 } from "./IClass4";
import { Class3Serializable } from "./Class3Serializable";
import { IBaseState, IBaseJson, ChangableBase } from "../serialize/changable-object/ChangableBase";
import { IToJSON } from "../serialize/changable-object/changable-object.interface";
import { IChangable } from "../serialize/serialize.interface";

export interface IClass4State extends IBaseState {
  ref?: Class3Serializable;
  prop41?: string;
}

export type TClass4StateKey = keyof IClass4State;

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
  implements IClass4, IToJSON<IClass4Json>, IChangable<TClass4StateKey> {
  constructor(json: IClass4Json, pRef: Class3Serializable);

  constructor(pRef: Class3Serializable, pProp41: string);

  constructor(pRef: any, pProp41: any) {
    super(pRef, pProp41);

    if (this._isStateJson(pRef)) {
      return;
    }

    this.disableChanges();

    // copied from Class1 constructor
    this.ref = pRef;
    this.prop41 = pProp41;

    this.enableChanges();
  }

  // Proxied state properties
  public get ref() {
    return this._state.getProperty("ref") as IClass3;
  }

  public set ref(value: IClass3) {
    this._state.setProperty("ref", value);
  }

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

  protected _getStateOptionsFromJson(
    json: IClass4Json,
    pRef: Class3Serializable
  ): IClass4State {
    const parentOptions = super._getStateOptionsFromJson(json);

    const { state } = json;
    const { prop41 } = state;

    return {
      ...parentOptions,
      ref: pRef,
      prop41,
    };
  }

  protected _getDefaultStateOptions(): IClass4State {
    const parentOptions = super._getDefaultStateOptions();

    return {
      ...parentOptions,
      ref: undefined,
      prop41: undefined,
    };
  }
}
