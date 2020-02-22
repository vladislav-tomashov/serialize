import { SerializableClass1 } from "./SerializableClass1";
import { OfArray } from "./OfArray";

// console.log(12345);

const a = new SerializableClass1({
  prop1: 1,
  prop2: new OfArray(["abc", "def"]),
  prop3: new Date(),
  prop4: { a: 1, b: "jdfjbfjb" }
});

// console.log("a.prop1:", a.prop1);
a.prop1 = 2;
// console.log("a.prop1:", a.prop1);

// console.log("a.prop3:", a.prop3);
a.prop3 = new Date("1995-12-17T03:24:00");
// console.log("a.prop3:", a.prop3);

// console.log("a.prop4:", a.prop4);
a.prop4 = { a: 3, b: "kjhfihffjb" };
// console.log("a.prop4:", a.prop4);

// console.log("a.prop2:", a.prop2);
a.prop2.push("xyz");
// console.log("a.prop2:", a.prop2);

const changes = a.getChanges();

// console.log("changes:", changes);
console.log("changes in json:", JSON.stringify(changes, null, 4));
