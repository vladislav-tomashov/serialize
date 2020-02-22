import { ChangableValueType } from "./ChangableValueType";
import { ChangableValue } from "./ChangableValue";
import { ChangableArray } from "./ChangableArray";
import { IChangable } from "./interfaces/IChangable";
import { ChangableObject } from "./ChangableObject";
import { ObjectChanges } from "./ObjectChanges";
import { IChangableValue } from "./interfaces/IChangableValue";
import { Contractable } from "./Constructable";

const createChangableClass = (
  classConstructor: Object,
  serializableProps: Record<string, ChangableValueType>
): Contractable => {
  const props: Record<string, IChangableValue<any>> = {};
  const descriptors: Record<string, any> = {};

  Object.getOwnPropertyNames(serializableProps).forEach(prop => {
    const changableType = serializableProps[prop];
    const isArray = changableType === ChangableValueType.Array;
    const changable = isArray ? new ChangableArray() : new ChangableValue();

    props[prop] = changable;

    const descriptor = {
      get: function() {
        return isArray ? changable : changable.value;
      },
      set: function(newValue: any) {
        changable.value = newValue;
      },
      enumerable: true,
      configurable: true
    };

    descriptors[prop] = descriptor;
  });

  const _serializable = new ChangableObject(props);

  const result = class extends classConstructor implements IChangable {
    constructor(...args) {
      super(...args);
      this.clearChanges();
    }

    get changed(): boolean {
      return _serializable.changed;
    }

    getChanges(): ObjectChanges {
      return _serializable.getChanges();
    }

    clearChanges(): void {
      _serializable.clearChanges();
    }

    applyChanges(changes: ObjectChanges): void {
      _serializable.applyChanges(changes);
    }
  };

  Object.defineProperties(result.prototype, descriptors);

  return result;
};

export { createChangableClass };
