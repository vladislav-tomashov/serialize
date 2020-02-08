class Class1 {
  private _prop1: number;

  constructor(prop1: number) {
    this._prop1 = prop1;
  }

  get prop1() {
    return this._prop1;
  }

  set prop1(value: number) {
    this._prop1 = value;
  }
}

export { Class1 };
