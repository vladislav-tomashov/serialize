import { IChangeItem } from "./IChangeItem";

export interface IChanges {
  readonly empty: boolean;

  toArray(): IChangeItem[];

  add(item: IChangeItem): void;

  clear(): void;
}
