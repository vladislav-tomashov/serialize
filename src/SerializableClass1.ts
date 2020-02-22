import { createChangableClass } from "./createChangableClass";
import { Class1 } from "./Class1";
import { ChangableValueType } from "./ChangableValueType";

const SerializableClass1 = createChangableClass(Class1, {
  prop1: ChangableValueType.Value,
  prop2: ChangableValueType.Array,
  prop3: ChangableValueType.Value,
  prop4: ChangableValueType.Value
});

export { SerializableClass1 };
