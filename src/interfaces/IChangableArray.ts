import { Collection } from "../Collection";
import { IChangable } from "./IChangable";

export interface IChangableArray<T> extends IChangable, Collection<T> {}
