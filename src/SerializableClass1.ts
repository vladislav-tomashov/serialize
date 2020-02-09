import { Class1 } from "./Class1";

import { IChangableValue } from "./interfaces/IChangableValue";
import { ChangableValue } from "./ChangableValue";
import { IChangable } from "./interfaces/IChangable";
import { IChanges } from "./interfaces/IChanges";
import { SerializableObject } from "./SerializableObject";

class SerializableClass1 extends Class1 implements IChangable {
  private _prop1: IChangableValue<number>;
  private _serializable: SerializableObject;

  constructor(prop1: number) {
    super(prop1);

    this._prop1 = new ChangableValue<number>(super.prop1);
  }

  get prop1() {
    return super.prop1;
  }

  set prop1(value: number) {
    super.prop1 = value;
    this._prop1.value = super.prop1;
  }

  get changed(): boolean {
    return this._prop1.changed;
  }

  getChanges(): IChanges {
    return this._prop1.getChanges();
  }

  clearChanges(): void {
    this._prop1.clearChanges();
  }

  applyChanges(changes: IChanges): void {
    this._prop1.applyChanges(changes);
    super.prop1 = this._prop1.value;
  }
}

export { SerializableClass1 };
