export type ValueGetter<T> = () => T;

export function isValueGetter<T>(obj: any): obj is ValueGetter<T> {
  return typeof obj === "function";
}
