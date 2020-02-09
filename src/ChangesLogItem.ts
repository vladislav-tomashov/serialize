import { IChangeItem } from "./interfaces/IChangeItem";

class ChangesLogItem implements IChangeItem {
  private _action: string;
  private _params?: Object;

  constructor({ action, params }: { action: string; params?: Object }) {
    this._action = action;
    this._params = params;
  }

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
