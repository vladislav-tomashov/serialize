import { ChangableValueType } from "./ChangableValueType";
import { SerializableObject } from "./SerializableObject";
import { ChangableValue } from "./ChangableValue";
import { ChangableArray } from "./ChangableArray";
import { IChangable } from "./interfaces/IChangable";
import { IChanges } from "./interfaces/IChanges";

const createSerializableClass = (
  classConstructor: Object,
  serializableProps: Record<string, ChangableValueType>
): Object => {
  return class extends classConstructor implements IChangable {
    private _serializable: SerializableObject;

    constructor(...args) {
      super(...args);

      const props: Record<string, IChangable> = {};

      Object.keys(props).forEach(prop => {
        const ChangableValueType = serializableProps[prop];
        const initialValue = super.prop;

        props[prop] =
          ChangableValueType === ChangableValueType.Value
            ? new ChangableValue(initialValue)
            : new ChangableArray(initialValue);
      });

      this._serializable = new SerializableObject(props);
    }

    get changed(): boolean {
      return this._serializable.changed;
    }

    getChanges(): IChanges {
      return this._serializable.getChanges();
    }

    clearChanges(): void {
      this._serializable.clearChanges();
    }

    applyChanges(changes: IChanges): void {
      throw new Error("Not implemented exception: applyChanges()");
    }
  };
};

export { createSerializableClass };
