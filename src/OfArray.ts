class OfArray<T> {
  constructor(private _array: Array<T> = []) {}

  get length() {
    return this._array.length;
  }

  toArray() {
    return [...this._array];
  }

  get(index: number): T {
    return this._array[index];
  }

  set(index: number, value: T) {
    this._array[index] = value;
  }

  push(value: T) {
    this._array.push(value);
  }

  pop(): T | undefined {
    return this._array.pop();
  }

  clear() {
    this._array.length = 0;
  }

  concat(...args) {
    return this._array.concat(...args);
  }

  indexOf(...args) {
    return this._array.indexOf(...args);
  }

  sort(...args) {
    return this._array.sort(...args);
  }

  reverse(...args) {
    return this._array.reverse(...args);
  }

  unshift(...args) {
    return this._array.unshift(...args);
  }

  shift(...args) {
    return this._array.shift(...args);
  }

  map(...args) {
    return this._array.map(...args);
  }

  reduce(...args) {
    return this._array.reduce(...args);
  }

  reduceRight(...args) {
    return this._array.reduceRight(...args);
  }

  lastIndexOf(...args) {
    return this._array.lastIndexOf(...args);
  }

  join(...args) {
    return this._array.join(...args);
  }

  filter(...args) {
    return this._array.filter(...args);
  }

  every(...args) {
    return this._array.every(...args);
  }

  some(...args) {
    return this._array.some(...args);
  }

  forEach(...args) {
    return this._array.forEach(...args);
  }

  slice(...args) {
    return this._array.slice(...args);
  }

  splice(...args) {
    return this._array.splice(...args);
  }

  toString(...args) {
    return this._array.toString(...args);
  }

  toJSON() {
    return this._array;
  }
}

export { OfArray };
