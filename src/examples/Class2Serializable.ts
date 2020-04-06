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

interface IClass2State {
  prop1?: Class1Serializable;
  prop2?: ChangableArrayCollection<Class1Serializable>;
}

type TClass2StateKey = keyof IClass2State;

function getDefaultClass2State(): IClass2State {
  return { prop1: undefined, prop2: undefined };
}

function getClass2StateFromJson(json: IClass2State): IClass2State {
  const { prop1, prop2 } = json;
  return {
    prop1: new Class1Serializable(<IClass1Json>(<unknown>prop1)),
    prop2: new ChangableArrayCollection(<Class1Serializable[]>(<unknown>prop2)),
  };
}

export interface IClass2Json {
  class2State: IClass2State;
}

export class Class2Serializable
  implements IClass2, IToJSON<IClass2Json>, IChangable<TClass2StateKey> {
  protected _state: ChangableObjectState<IClass2State, TClass2StateKey>;

  constructor(json?: IClass2Json) {
    this._state = new ChangableObjectState<IClass2State, TClass2StateKey>(
      json ? getClass2StateFromJson(json.class2State) : getDefaultClass2State()
    );

    if (json) {
      return;
    }

    this._state.disableChanges();

    this.prop1 = new Class1Serializable(5, "hfufhvhf");
    this.prop2 = new ChangableArrayCollection([
      new Class1Serializable(1, "test1"),
      new Class1Serializable(2, "test2"),
    ]);

    this._state.enableChanges();
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
    return { class2State: this._state.toJSON() };
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
}
