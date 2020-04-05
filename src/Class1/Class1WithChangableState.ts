import { IChangable, TChanges } from "../changable/changable.interfaces";
import {
  IClass1State,
  Class1WithState,
  TClass1StateKey,
} from "./Class1WithState";
import { ChangableObjectState } from "../changable/ChangableObject/ChangableObjectState";

export class Class1WithChangableState extends Class1WithState
  implements IChangable<TClass1StateKey> {
  // implementation of interface IChangable
  isChangable: true = true;

  get changed(): boolean {
    return this._changableState.changed;
  }

  clearChanges(): void {
    this._changableState.clearChanges();
  }

  getChanges(): TChanges<TClass1StateKey> {
    return this._changableState.getChanges();
  }

  setChanges(changes: TChanges<TClass1StateKey>): void {
    this._changableState.setChanges(changes);
  }

  // private and protected memebers
  protected get _changableState(): ChangableObjectState<
    IClass1State,
    TClass1StateKey
  > {
    return <ChangableObjectState<IClass1State, TClass1StateKey>>this._state;
  }
}
