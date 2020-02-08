import { ISerializable } from "./ISerializable";

export interface ISerializableValue<T> extends ISerializable {
  value: T;
}
