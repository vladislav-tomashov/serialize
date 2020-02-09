import {
  IObjectChangeItem,
  ObjectAction
} from "./interfaces/IObjectChangeItem";
import { IChanges } from "./interfaces/IChanges";

class ObjectChangeItem implements IObjectChangeItem {
  private _action: ObjectAction;
  private _property: string;
  private _changes: IChanges;

  constructor({
    action,
    property,
    changes
  }: {
    action: ObjectAction;
    property: string;
    changes: IChanges;
  }) {
    this._action = action;
    this._property = property;
    this._changes = changes;
  }

  get action() {
    return this._action;
  }

  get property() {
    return this._property;
  }

  get changes() {
    return this._changes;
  }

  toJSON() {
    return {
      changes: this.changes,
      property: this.property,
      action: this.action
    };
  }
}

export { ObjectChangeItem };
