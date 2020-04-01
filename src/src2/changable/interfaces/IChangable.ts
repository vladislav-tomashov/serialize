import { TChanges } from "../types";

export interface IChangable<T> {
  readonly isChangable: true;

  readonly changed: boolean;

  getChanges(): TChanges<T>;

  setChanges(changes: TChanges<T>): void;

  clearChanges(): void;
}
