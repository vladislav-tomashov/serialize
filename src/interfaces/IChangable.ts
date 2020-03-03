import { IChanges } from "./IChanges";

export interface IChangable {
  readonly changed: boolean;

  getChanges(): IChanges;

  clearChanges(): void;

  applyChanges(changes: IChanges): void;
}

function isChangable(obj: any): obj is IChangable {
  const { getChanges, clearChanges, applyChanges } = obj as IChangable;

  return (
    getChanges !== undefined &&
    clearChanges !== undefined &&
    applyChanges !== undefined
  );
}

function toChangable(obj: any): IChangable | undefined {
  return isChangable(obj) ? obj : undefined;
}

export { isChangable, toChangable };
