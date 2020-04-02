import { EventCallback, EventSubscribeResult } from "../Events/eventing";

export interface IObservable {
  isObservable: true;

  subscribe(event: Array<string>, cb: EventCallback): EventSubscribeResult;

  subscribe(event: string, cb: EventCallback): EventSubscribeResult;
}

export function isObservable(value: any): value is IObservable {
  if (typeof value !== "object") {
    return false;
  }

  return value.isObservable;
}

export function toObservable(value: any): undefined | IObservable {
  return isObservable(value) ? (value as IObservable) : undefined;
}
