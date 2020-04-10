import {
  IChangable,
  TObjectChange,
  TNestedChanges,
} from "../serialize.interface";
import { ChangableObjectState } from "./ChangableObjectState";
import { IToJSON } from "./changable-object.interface";

export interface IBaseState {
  [key: string]: any;
}

export type IBaseStateKey = keyof IBaseState;

export interface IBaseJson {
  state: { [key: string]: any };
}

export function isStateJson(value: any): value is IBaseJson {
  if (typeof value !== "object") {
    return false;
  }

  return Boolean(value.state);
}

export class ChangableBase
  implements IChangable<IBaseStateKey>, IToJSON<IBaseJson> {
  protected _state: ChangableObjectState<IBaseState, IBaseStateKey>;

  constructor(json?: IBaseJson) {
    this._state = this._getStateFromJson(json);
  }

  // implementation of interface IToJSON
  toJSON(): IBaseJson {
    return { state: this._state.toJSON() };
  }

  // implementation of interface IChangable
  isChangable: true = true;

  get changed(): boolean {
    return this._state.changed;
  }

  clearChanges(): void {
    this._state.clearChanges();
  }

  getChanges(): [TObjectChange, TNestedChanges<IBaseStateKey>] {
    return this._state.getChanges();
  }

  setChanges(changes: [TObjectChange, TNestedChanges<IBaseStateKey>]): void {
    this._state.setChanges(changes);
  }

  // protected
  // eslint-disable-next-line class-methods-use-this
  protected _isStateJson(value: any): boolean {
    return isStateJson(value);
  }

  // eslint-disable-next-line class-methods-use-this
  protected _getStatePropsFromJson(json: IBaseJson): IBaseState {
    return {};
  }

  private _getStateFromJson(
    json?: IBaseJson
  ): ChangableObjectState<IBaseState, IBaseStateKey> {
    if (this._state) {
      return this._state;
    }

    const stateProps =
      json && this._isStateJson(json) ? this._getStatePropsFromJson(json) : {};

    return new ChangableObjectState<IBaseState, IBaseStateKey>(stateProps);
  }
}
