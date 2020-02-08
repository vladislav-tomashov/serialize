import { SerializableType } from "./SerializableType";
import { SerializableObject } from "./SerializableObject";
import { SerializableValue } from "./SerializableValue";
import { SerializableArray } from "./SerializableArray";
import { ISerializable } from "./interfaces/ISerializable";
import { IChanges } from "./interfaces/IChanges";

const createSerializableClass = (
  classConstructor: Object,
  serializableProps: Record<string, SerializableType>
): Object => {
  return class extends classConstructor implements ISerializable {
    private _serializable: SerializableObject;

    constructor(...args) {
      super(...args);

      const props: Record<string, ISerializable> = {};

      Object.keys(props).forEach(prop => {
        const serializableType = serializableProps[prop];
        const initialValue = super.prop;

        props[prop] =
          serializableType === SerializableType.Value
            ? new SerializableValue(initialValue)
            : new SerializableArray(initialValue);
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

    setChanges(changes: IChanges): void {
      throw new Error("Not implemented exception: setChanges()");
    }
  };
};

export { createSerializableClass };
