import {
  Class1WithState,
  IClass1State,
  TClass1StateKey,
} from "./Class1WithState";
import { SimpleObjectState } from "../changable/ChangableObject/SimpleObjectState";

export class Class1WithSimpleState extends Class1WithState {
  constructor(arg1: number, arg2: string) {
    super(
      new SimpleObjectState<IClass1State, TClass1StateKey>({
        _prop1: "Hello!",
        _prop2: 0,
        prop3: undefined,
      }),
      arg1,
      arg2
    );
  }
}
