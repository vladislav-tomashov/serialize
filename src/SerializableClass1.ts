import { Class1 } from "./Class1";

import { ISerializableValue } from "./interfaces/ISerializableValue";
import { SerializableValue } from "./SerializableValue";
import { ISerializable } from "./interfaces/ISerializable";
import { IChanges } from "./interfaces/IChanges";
import { SerializableObject } from "./SerializableObject";

class SerializableClass1 extends Class1 implements ISerializable {
  private _prop1: ISerializableValue<number>;
  private _serializable: SerializableObject;

  constructor(prop1: number) {
    super(prop1);

    this._prop1 = new SerializableValue<number>(super.prop1);
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

  setChanges(changes: IChanges): void {
    this._prop1.setChanges(changes);
    super.prop1 = this._prop1.value;
  }
}

export { SerializableClass1 };
