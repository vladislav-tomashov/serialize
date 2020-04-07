import { IArrayCollection } from "../collections/collections.interface";
import { IClass2 } from "./IClass2";
import { ArrayCollection } from "../collections/ArrayCollection";
import { Class2 } from "./Class2";
import { IClass3 } from "./IClass3";

export class Class3 extends Class2 implements IClass3 {
  prop31: IClass2;
  prop32: IArrayCollection<IClass2>;

  constructor() {
    super();
    this.prop31 = new Class2();
    this.prop32 = new ArrayCollection([new Class2(), new Class2()]);
  }
}
