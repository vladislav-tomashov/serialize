import { IChanges } from "./IChanges";

export interface IAgregatedChanges extends IChanges {
  readonly length: number;

  readonly changes: Array<IChanges>;
}
