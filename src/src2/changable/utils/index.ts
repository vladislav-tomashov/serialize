import { IChangable } from "../interfaces/IChangable";

export function isChangable<T>(value: any): value is IChangable<T> {
  if (typeof value !== "object") {
    return false;
  }

  return value.isChangable;
}

export function toChangable<T>(value: any): undefined | IChangable<T> {
  return isChangable(value) ? (value as IChangable<T>) : undefined;
}
