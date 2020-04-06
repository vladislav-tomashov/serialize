import { Class1 } from "./Class1";
import { IArrayCollection } from "../collections/collections.interface";
import { IClass1 } from "./IClass1";
import { IClass2 } from "./IClass2";
import { ArrayCollection } from "../collections/ArrayCollection";

export class Class2 implements IClass2 {
  prop1: IClass1;
  prop2: IArrayCollection<IClass1>;

  constructor() {
    this.prop1 = new Class1(5, "abc");
    this.prop2 = new ArrayCollection([
      new Class1(1, "test1"),
      new Class1(2, "test2"),
    ]);
  }
}
