import { IChangesItem } from "./IChangesItem";

export interface IChanges {
  readonly empty: boolean;

  toArray(): IChangesItem[];

  add(item: IChangesItem): void;

  clear(): void;

  toJSON(): any;

  fromJSON(json: any): void;
}
