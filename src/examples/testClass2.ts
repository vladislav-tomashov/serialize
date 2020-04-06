import { Class2Serializable } from "./Class2Serializable";

// console.log("Serialize test");

const a = new Class2Serializable();
const serializedA = JSON.stringify(a);

const b = new Class2Serializable(JSON.parse(serializedA));
const serializedB = JSON.stringify(b);

// console.log("a", a);
// console.log("b", b);
// console.log("serializedA", serializedA);
// console.log("serializedB", serializedB);
console.log("serializedB=serializedA", serializedB === serializedA);

// console.log("Changes test");
// console.log("a before changes", a);
// console.log("a before changes JSON", JSON.stringify(a));

// console.log("before");
// console.log(JSON.stringify(a, undefined, 4));
a.prop1.func1();
a.prop1.prop3 = "test";
// console.log("after");
// console.log(JSON.stringify(a, undefined, 4));

// console.log("a after changes", a);

const changes = a.getChanges();
const serializedChanges = JSON.stringify(changes);

// // console.log("a changes", changes);
console.log("serialized a changes", serializedChanges);

// // console.log("b before changes", b);
// console.log("b before changes JSON", JSON.stringify(b));
b.setChanges(JSON.parse(serializedChanges));
// // console.log("b after changes", b);
console.log("b after changes JSON", JSON.stringify(b));
console.log("serializedB=serializedA", JSON.stringify(a) === JSON.stringify(b));
