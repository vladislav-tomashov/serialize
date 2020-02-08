import { IChanges } from "./IChanges";

export interface ISerializable {
  readonly changed: boolean;

  getChanges(): IChanges;

  clearChanges(): void;

  setChanges(changes: IChanges): void;
}
