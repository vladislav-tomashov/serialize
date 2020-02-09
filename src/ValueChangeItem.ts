import { IValueChangeItem } from "./interfaces/IValueChangeItem";

class ValueChangeItem<T> implements IValueChangeItem<T> {
  constructor(public value: T) {}

  get action(): "change" {
    return "change";
  }

  toJSON() {
    return this.value;
  }
}

export { ValueChangeItem };
