import { IToJSON } from "../changable/ChangableObject/ChangableObject.interfaces";
import { IClass1State, TClass1StateKey } from "./Class1WithState";
import { ChangableObjectState } from "../changable/ChangableObject/ChangableObjectState";
import { Class1WithChangableState } from "./Class1WithChangableState";

interface IClass1Json {
  class1State: IClass1State;
}

function isClass1Json(value: any): value is IClass1Json {
  if (typeof value !== "object") {
    return false;
  }

  return value.class1State;
}

export class Class1Serializable extends Class1WithChangableState
  implements IToJSON<IClass1Json> {
  constructor(arg1: IClass1Json, arg2: any);
  constructor(arg1: number, arg2: string);
  constructor(arg1: any, arg2: any) {
    super(
      new ChangableObjectState<IClass1State, TClass1StateKey>(
        isClass1Json(arg1)
          ? arg1.class1State
          : {
              _prop1: "Hello!",
              _prop2: 0,
              prop3: undefined,
            }
      ),
      arg1,
      arg2
    );
  }

  // implementation of interface IToJSON
  toJSON(): IClass1Json {
    return { class1State: this._changableState.toJSON() };
  }
}
