export interface IEventParams {
  event: string;
  params?: any;
}

export type EventCallback = (e: IEventParams) => void;

export interface EventSubscribeResult {
  unsubscribe: () => void;
}

export interface IEventing {
  emit(event: string, params?: any): void;

  subscribe(event: Array<string>, cb: EventCallback): EventSubscribeResult;

  subscribe(event: string, cb: EventCallback): EventSubscribeResult;
}

export class Eventing implements IEventing {
  private _events: {
    [key: string]: Array<{ cb: EventCallback }>;
  } = {};

  emit(event: string, params?: any): void {
    const callbacks = this._events[event];

    if (!callbacks || !callbacks.length) {
      return;
    }

    for (let i = 0, { length } = callbacks; i < length; i += 1) {
      const { cb } = callbacks[i];

      cb({ event, params });
    }
  }

  subscribe(event: string[], cb: EventCallback): EventSubscribeResult;

  subscribe(event: string, cb: EventCallback): EventSubscribeResult;

  subscribe(event: string | string[], cb: EventCallback): EventSubscribeResult {
    if (typeof event === "string") {
      return this._subscribeOne(event, cb);
    }

    const arr = event.map((e) => this._subscribeOne(e, cb));
    const unsubscribe = () => {
      arr.forEach((e) => e.unsubscribe());
    };

    return { unsubscribe };
  }

  private _subscribeOne(
    event: string,
    cb: EventCallback
  ): EventSubscribeResult {
    const callbacks: Array<{ cb: EventCallback }> = this._events[event] || [];

    const callback = { cb };
    callbacks.push(callback);

    this._events[event] = callbacks;

    const unsubscribe = () => {
      const index = this._events[event].findIndex((x) => x === callback);

      if (index > -1) {
        this._events[event].splice(index, 1);
      }
    };

    return { unsubscribe };
  }
}
