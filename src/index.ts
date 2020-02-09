import { ChangableArray } from "./ChangableArray";
import { SerializableObject } from "./SerializableObject";
import { ChangableValue } from "./ChangableValue";
import { SerializableClass1 } from "./SerializableClass1";
import { Class1 } from "./Class1";
import { createSerializableClass } from "./createSerializable";
import { ChangableValueType } from "./ChangableValueType";

const arr1 = new ChangableArray([1, 2, 3, 4]);
const objVal = new SerializableObject({ prop1: 1, prop2: 2, arr1 });

// const numberVal = new ChangableValue(5);
// const prop1 = new ChangableValue("some string");
// const prop2 = new ChangableValue(new Date());

// const objVal = new SerializableObject({ prop1, prop2 });

// const obj = new SerializableObject({
//   arr1,
//   numberVal,
//   objVal
// });

// arr1.push(23);
// arr1.delete(0);
// arr1.insert(3, 45);

// numberVal.value = 6;

// prop1.value = "changes string";
// prop2.value = new Date("1995-12-17T03:24:00");

// console.log(JSON.stringify(obj.getChanges(), null, 4));

// const arr2 = new ChangableArray(arr);
// console.log(arr2.toArray());

// arr2.applyChanges(arr1.changesLog);
// console.log(arr2.toArray());

const SerializableClass1 = createSerializableClass(Class1, {
  prop1: ChangableValueType.Value
});

const a = new SerializableClass1(5);
console.log(a);
// a.prop1 = 55;

// console.log(a.prop1);

// console.log(a.getChanges());
// console.log(JSON.stringify(a.getChanges(), null, 4));
