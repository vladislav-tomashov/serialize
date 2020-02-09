import { ChangableValueType } from "./ChangableValueType";
import { ChangableValue } from "./ChangableValue";
import { ChangableArray } from "./ChangableArray";
import { IChangable } from "./interfaces/IChangable";
import { ChangableObject } from "./SerializableObject";
import { ObjectChanges } from "./ObjectChanges";

const createSerializableClass = (
  classConstructor: Object,
  serializableProps: Record<string, ChangableValueType>
): Object => {
  return class extends classConstructor implements IChangable {
    private _serializable: ChangableObject;

    constructor(...args) {
      super(...args);

      const props: Record<string, IChangable> = {};

      Object.keys(props).forEach(prop => {
        const changableType = serializableProps[prop];
        const initialValue = super.prop;

        props[prop] =
          changableType === ChangableValueType.Value
            ? new ChangableValue(initialValue)
            : new ChangableArray(initialValue);
      });

      this._serializable = new ChangableObject(props);
    }

    get changed(): boolean {
      return this._serializable.changed;
    }

    getChanges(): ObjectChanges {
      return this._serializable.getChanges();
    }

    clearChanges(): void {
      this._serializable.clearChanges();
    }

    applyChanges(changes: ObjectChanges): void {
      this._serializable.applyChanges(changes);
    }
  };
};

export { createSerializableClass };
