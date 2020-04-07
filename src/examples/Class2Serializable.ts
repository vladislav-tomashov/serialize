import { IClass2 } from "./IClass2";
import { ChangableArrayCollection } from "../changables/changableCollections/ChangableArrayCollection";
import {
  IToJSON,
  TNestedChanges,
  TObjectChange,
} from "../changables/changableObject/changableObject.interface";
import { IChangable } from "../changables/changables.interface";
import { ChangableObjectState } from "../changables/changableObject/ChangableObjectState";
import { Class1Serializable, IClass1Json } from "./Class1Serializable";

export interface IClass2State {
  prop1?: Class1Serializable;
  prop2?: ChangableArrayCollection<Class1Serializable>;
}

export type TClass2StateKey = keyof IClass2State;

export function getDefaultClass2StateOptions(): IClass2State {
  return { prop1: undefined, prop2: undefined };
}

export interface IClass2Json {
  class2: true;
  state: { [key: string]: any };
}

export function isClass2Json(value: any): value is IClass2Json {
  if (typeof value !== "object") {
    return false;
  }

  return Boolean(value.class2);
}

export class Class2Serializable
  implements IClass2, IToJSON<IClass2Json>, IChangable<TClass2StateKey> {
  protected _state: ChangableObjectState<IClass2State, TClass2StateKey>;

  constructor();
  constructor(json: IClass2Json);
  constructor(json?: any) {
    const fromJson = isClass2Json(json);

    if (fromJson) {
      this._state = this._getStateFromJson(json);
      return;
    }

    this._state = this._getDefaultState();

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
    return { class2: true, state: this._state.toJSON() };
  }

  // implementation of interface IChangable
  isChangable: true = true;

  get changed(): boolean {
    return this._state.changed;
  }

  disableChanges(): void {
    this._state.disableChanges();
  }

  enableChanges(): void {
    this._state.enableChanges();
  }

  getChanges(): [TObjectChange, TNestedChanges<TClass2StateKey>] {
    return this._state.getChanges();
  }

  setChanges(changes: [TObjectChange, TNestedChanges<TClass2StateKey>]): void {
    this._state.setChanges(changes);
  }

  // protected
  protected _getStateOptionsFromJson(json: IClass2Json): IClass2State {
    // const parentOptions = super._getStateOptionsFromJson(json);
    const { state } = json;
    const { prop1, prop2 } = state;

    const result = {
      // ...parentOptions,
      prop1:
        prop1 === undefined
          ? undefined
          : new Class1Serializable(<IClass1Json>prop1),
      prop2:
        prop2 === undefined
          ? undefined
          : new ChangableArrayCollection<Class1Serializable>(prop2),
    };

    return result;
  }

  protected _getStateFromJson(
    json: IClass2Json
  ): ChangableObjectState<IClass2State, TClass2StateKey> {
    if (this._state) {
      return this._state;
    }

    const stateOptions = this._getStateOptionsFromJson(json);

    const result = new ChangableObjectState<IClass2State, TClass2StateKey>(
      stateOptions
    );

    return result;
  }

  protected _getDefaultStateOptions(): IClass2State {
    // const parentOptions = super._getDefaultStateOptions();
    const result = { prop1: undefined, prop2: undefined };
    return result;
  }

  protected _getDefaultState(): ChangableObjectState<
    IClass2State,
    TClass2StateKey
  > {
    if (this._state) {
      return this._state;
    }

    const stateOptions = this._getDefaultStateOptions();

    const result = new ChangableObjectState<IClass2State, TClass2StateKey>(
      stateOptions
    );

    return result;
  }
}
