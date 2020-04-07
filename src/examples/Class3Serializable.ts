import { ChangableArrayCollection } from "../changables/changableCollections/ChangableArrayCollection";
import { IToJSON } from "../changables/changableObject/changableObject.interface";
import { IChangable } from "../changables/changables.interface";
import { ChangableObjectState } from "../changables/changableObject/ChangableObjectState";
import {
  IClass2Json,
  Class2Serializable,
  IClass2State,
} from "./Class2Serializable";
import { IClass3 } from "./IClass3";

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

    const fromJson = isClass3Json(json);

    if (fromJson) {
      this._state = this._getStateFromJson(json);
      return;
    }

    this._state = this._getDefaultState();

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
    const state = this._state as ChangableObjectState<
      IClass3State,
      TClass3StateKey
    >;
    return <Class2Serializable>state.getProperty("prop31");
  }

  public set prop31(value: Class2Serializable) {
    const state = this._state as ChangableObjectState<
      IClass3State,
      TClass3StateKey
    >;
    state.setProperty("prop31", value);
  }

  public get prop32() {
    const state = this._state as ChangableObjectState<
      IClass3State,
      TClass3StateKey
    >;
    return <ChangableArrayCollection<Class2Serializable>>(
      state.getProperty("prop32")
    );
  }

  public set prop32(value: ChangableArrayCollection<Class2Serializable>) {
    const state = this._state as ChangableObjectState<
      IClass3State,
      TClass3StateKey
    >;
    state.setProperty("prop32", value);
  }

  // implementation of interface IToJSON
  toJSON(): IClass3Json {
    const parentJson = super.toJSON();
    return { ...parentJson, class3: true };
  }

  // protected
  protected _getStateOptionsFromJson(json: IClass3Json): IClass3State {
    const parentOptions = super._getStateOptionsFromJson(json);
    const { state } = json;
    const { prop31, prop32 } = state;

    const result = {
      ...parentOptions,
      prop31:
        prop31 === undefined
          ? undefined
          : new Class2Serializable(<IClass2Json>prop31),
      prop32:
        prop32 === undefined
          ? undefined
          : new ChangableArrayCollection<Class2Serializable>(prop32),
    };

    return result;
  }

  protected _getStateFromJson(
    json: IClass3Json
  ): ChangableObjectState<IClass3State, TClass3StateKey> {
    if (this._state) {
      return this._state;
    }

    const stateOptions = this._getStateOptionsFromJson(json);

    const result = new ChangableObjectState<IClass3State, TClass3StateKey>(
      stateOptions
    );

    return result;
  }

  protected _getDefaultStateOptions(): IClass3State {
    const parentOptions = super._getDefaultStateOptions();
    const result = { ...parentOptions, prop31: undefined, prop32: undefined };
    return result;
  }

  protected _getDefaultState(): ChangableObjectState<
    IClass3State,
    TClass3StateKey
  > {
    if (this._state) {
      return this._state;
    }

    const stateOptions = this._getDefaultStateOptions();

    const result = new ChangableObjectState<IClass3State, TClass3StateKey>(
      stateOptions
    );

    return result;
  }
}
