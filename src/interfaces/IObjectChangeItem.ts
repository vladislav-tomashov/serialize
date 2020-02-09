import { IChangeItem } from "./IChangeItem";
import { IChanges } from "./IChanges";

export type ObjectAction = "change";

export interface IObjectChangeItem extends IChangeItem {
  readonly action: ObjectAction;
  readonly property: string;
  readonly changes: IChanges;
}
