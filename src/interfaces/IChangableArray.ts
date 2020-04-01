import { ArrayAnalog } from "../ArrayAnalog";
import { IChangable } from "./IChangable";

export interface IChangableArray<T> extends IChangable, ArrayAnalog<T> {}
