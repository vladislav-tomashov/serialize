import { IObservable, isObservable, toObservable } from "./IObservable";
import {
  IEventing,
  EventCallback,
  EventSubscribeResult
} from "../Events/eventing";

export interface IObservableObjectConfig {
  isPropertyObservable(property: string | Symbol): boolean;
}

export enum ObservableObjectEvents {
  SetPropertyValue = "SetPropertyValue"
}

export class ObservableObject implements IObservable {
  private _observableObject = {};

  isObservable: true = true;

  constructor(
    value: { [key: string]: any },
    config: IObservableObjectConfig,
    private _eventing: IEventing
  ) {
    Object.keys(value)
      .filter((x) => config.isPropertyObservable(x))
      .forEach(x => {
        const propValue = value[x];
        
        if (typeof propValue === "function") {
          return;
        }

        const observablePropValue = toObservable(propValue);

        if (observablePropValue) {
          observablePropValue.subscribe();
        } else {
          
        }
      });
  }

  subscribe(event: string[], cb: EventCallback): EventSubscribeResult;
  subscribe(event: string, cb: EventCallback): EventSubscribeResult;
  subscribe(event: any, cb: any) {
    return this._eventing.subscribe(event, cb);
  }
}
