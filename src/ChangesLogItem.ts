import { IChangesItem } from "./interfaces/IChangesItem";

class ChangesLogItem implements IChangesItem {
  constructor(private _action: string, private _params?: Object | undefined) {}

  get action() {
    return this._action;
  }

  get params() {
    return this._params;
  }

  toJSON(): Record<string, any> {
    return {
      action: this._action,
      params: this._params
    };
  }
}

export { ChangesLogItem };
