import {
  IEventing,
  EventCallback,
  EventSubscribeResult
} from "../Events/eventing";
import { IObservable } from "./IObservable";

export enum ObservableValueEvents {
  SetValue = "SetValue"
}

export class ObservableValue<T> implements IObservable {
  isObservable: true = true;

  constructor(private _value: T, private _eventing: IEventing) {}

  get value() {
    return this._value;
  }

  set value(value: T) {
    const oldValue = this._value;
    this._value = value;
    this._eventing.emit(ObservableValueEvents.SetValue, {
      oldValue,
      newValue: this._value
    });
  }

  subscribe(event: string[], cb: EventCallback): EventSubscribeResult;
  subscribe(event: string, cb: EventCallback): EventSubscribeResult;
  subscribe(event: any, cb: any) {
    return this._eventing.subscribe(event, cb);
  }
}
