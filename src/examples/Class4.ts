import { IClass4 } from "./IClass4";
import { Class3 } from "./Class3";

export class Class4 implements IClass4 {
  ref: Class3;

  prop41: string;

  constructor(pRef: Class3, pProp41: string) {
    this.ref = pRef;
    this.prop41 = pProp41;
  }
}
