// class Class1 {
//   private _prop1: string; // serialize
//   private _prop2: number; // serialize
//   prop3: string; // serialize
//   prop4: string; // do not serialize
// }

interface IClass1StateOptions {
  _prop1: string;
  _prop2: number;
  prop3: string;
}

interface IChanges {
  readonly isChangable: true;

  readonly changed: boolean;

  clearChanges(): void;

  getChanges(): TChanges;

  setChanges(changes: TChanges): void;
}

interface IOwnChanges {
  readonly hasOwnChanges: boolean;

  clearOwnChanges(): void;

  getOwnChanges(): TChanges;

  setOwnChanges(changes: TChanges): void;
}

interface INestedChanges {
  readonly hasNestedChanges: boolean;

  clearNestedChanges(): void;

  getNestedChanges(): TChanges;

  setNestedChanges(changes: TChanges): void;
}

interface IToJSON<T> {
  toJSON(): T;
}

interface IGetProperty<T, K extends keyof T> {
  getProperty(prop: K): T[K];
}

interface ISetProperty<T, K extends keyof T> {
  setProperty(prop: K, value: T[K]): void;
}

type TPropertyChange<T> = [string, T];

type TChanges = TPropertyChange<any>[];

class ObjectChanges<T, K extends keyof T> {
  private _changes = new Set<K>();
  private _disabled = false;

  get length() {
    return this._changes.size;
  }

  enable() {
    if (this._disabled) {
      this._disabled = false;
    }
  }

  disable() {
    if (!this._disabled) {
      this._disabled = true;
    }
  }

  clear() {
    if (this._disabled) {
      return;
    }

    if (this.length > 0) {
      this._changes.clear();
    }
  }

  registerPropertyUpdate(prop: K) {
    if (this._disabled) {
      return;
    }

    this._changes.add(prop);
  }

  getChanges(source: IGetProperty<T, K>): TPropertyChange<any>[] {
    const result = Array.from(this._changes).map(
      (x) => <TPropertyChange<any>>[x, source.getProperty(x)]
    );

    return result;
  }
}

class ObjectState<T extends object, K extends keyof T>
  implements IChanges, IToJSON<T>, IGetProperty<T, K>, ISetProperty<T, K> {
  isChangable: true = true;

  private _changes = new ObjectChanges<T, K>();

  constructor(private _state: T) {}

  get changed(): boolean {
    return this._changes.length > 0;
  }

  getProperty(prop: K): T[K] {
    const result = this._state[prop];
    return result;
  }

  setProperty(prop: K, value: T[K]) {
    this._state[prop] = value;
    this._changes.registerPropertyUpdate(prop);
  }

  clearChanges(): void {
    this._changes.clear();
  }

  getChanges(): TPropertyChange<any>[] {
    return this._changes.getChanges(this);
  }

  setChanges(changes: TPropertyChange<any>[]): void {
    this.clearChanges();
    this._changes.disable();

    changes.forEach((change) => {
      const [key, value] = change;
      const prop = <K>key;
      this.setProperty(prop, value);
    });

    this._changes.enable();
  }

  toJSON(): T {
    const result = <T>{};

    Object.keys(this._state).forEach((key) => {
      const prop = <K>key;
      result[prop] = this.getProperty(prop);
    });

    return result;
  }
}

interface IClass1Json {
  class1State: IClass1StateOptions;
}

function isClass1Json(value: any): value is IClass1Json {
  if (typeof value !== "object") {
    return false;
  }

  return value.class1State;
}

type TClass1StateOptionsKeys = keyof IClass1StateOptions;

class Class1 implements IToJSON<IClass1Json> {
  // serializable
  private _state: ObjectState<IClass1StateOptions, TClass1StateOptionsKeys>;

  // not serializable
  prop4: string;

  constructor(prop1: IClass1Json, prop4: any);
  constructor(prop1: string, prop4: string);
  constructor(prop1: any, prop4: string) {
    if (isClass1Json(prop1)) {
      // restore object state
      this._state = new ObjectState(prop1.class1State);
    } else {
      this._state = new ObjectState({
        _prop1: prop1,
        _prop2: 1,
        prop3: "bvc",
      });
    }

    this.prop4 = "bvc";
  }

  private get _prop1() {
    return <string>this._state.getProperty("_prop1");
  }

  private set _prop1(value: string) {
    this._state.setProperty("_prop1", value);
  }

  private get _prop2() {
    return <number>this._state.getProperty("_prop2");
  }

  private set _prop2(value: number) {
    this._state.setProperty("_prop2", value);
  }

  get prop3() {
    return <string>this._state.getProperty("prop3");
  }

  set prop3(value: string) {
    this._state.setProperty("prop3", value);
  }

  toJSON(): IClass1Json {
    return { class1State: this._state.toJSON() };
  }

  get changed(): boolean {
    return this._state.changed;
  }

  clearChanges(): void {
    this._state.clearChanges();
  }

  getChanges() {
    this._state.getChanges();
  }

  setChanges(changes: any) {
    this._state.setChanges(changes);
  }
}
