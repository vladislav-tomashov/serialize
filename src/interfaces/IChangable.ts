import { IChanges } from "./IChanges";

export interface IChangable {
  readonly changed: boolean;

  getChanges(): IChanges;

  clearChanges(): void;

  applyChanges(changes: IChanges): void;
}
