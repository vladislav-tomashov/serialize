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

  constructor(json?: IBaseJson, ...rest: any[]) {
    this._state = this._getStateFromJson(json, ...rest);
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

  disableChanges(): void {
    this._state.disableChanges();
  }

  enableChanges(): void {
    this._state.enableChanges();
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
  protected _getStateOptionsFromJson(
    json: IBaseJson,
    ...rest: any[]
  ): IBaseState {
    return {};
  }

  // eslint-disable-next-line class-methods-use-this
  protected _getDefaultStateOptions(): IBaseState {
    return {};
  }

  private _getStateFromJson(
    json?: IBaseJson,
    ...rest: any[]
  ): ChangableObjectState<IBaseState, IBaseStateKey> {
    if (this._state) {
      return this._state;
    }

    const stateOptions =
      json && this._isStateJson(json)
        ? this._getStateOptionsFromJson(json, ...rest)
        : this._getDefaultStateOptions();

    const result = new ChangableObjectState<IBaseState, IBaseStateKey>(
      stateOptions,
    );

    return result;
  }
}
