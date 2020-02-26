import { OfArray } from "../OfArray";
import { IChangable } from "./IChangable";

export interface IChangableArray<T> extends IChangable, OfArray<T> {}
