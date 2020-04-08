import { Class4Serializable } from "./Class4Serializable";
import { Class3Serializable } from "./Class3Serializable";

console.log("");
console.log("========== Class4Serializable tests ==========");

const class3Inst = new Class3Serializable();

const a = new Class4Serializable(class3Inst, "test");
const serializedA = JSON.stringify(a);

const b = new Class4Serializable(JSON.parse(serializedA), class3Inst);
const serializedB = JSON.stringify(b);

// console.log("a", a);
// console.log("b", b);
// console.log("serializedA", serializedA);
// console.log("serializedB", serializedB);
console.log("serializedB=serializedA", serializedB === serializedA);
console.log("a.ref=b.ref", a.ref === b.ref);

// console.log("Changes test");
// console.log("a before changes", a);
// console.log("a before changes JSON", JSON.stringify(a));

// console.log("before");
// console.log(JSON.stringify(a, undefined, 4));
a.ref.prop31.prop1.func1();
a.ref.prop31.prop1.prop3 = "ula-la";
// a.prop1.prop3 = "test";
// a.prop31.prop1.prop3 = "Super Puper!!!";
// a.prop31.prop1.func1();
// a.prop32.get(1).prop1.prop3 = "WWWWWWWWWWWWW";
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
// console.log("b after changes JSON", JSON.stringify(b));
console.log("serializedB=serializedA", JSON.stringify(a) === JSON.stringify(b));
console.log("");
