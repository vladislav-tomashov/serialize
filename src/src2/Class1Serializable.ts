export class Class1Serializable {
  private __primitiveProp: ChangableValue<string>;

  private __arrProp: ChangableValue<ChangablePrimitiveCollection<string>>;

  constructor() {
    __primitiveProp = new ChangableValue<string>("abc");

    __arrProp = new ChangableValue<ChangablePrimitiveCollection<string>>([
      "a",
      "b",
      "c"
    ]);
  }

  private get _primitiveProp(): string {
    return this.__primitiveProp.value;
  }

  private set _primitiveProp(value: string) {
    this.__primitiveProp.value = value;
  }

  private get _arrProp(): ICollection<string> {
    return this.__arrProp.value;
  }

  private set _arrProp(value: ICollection<string>) {
    this.__arrProp.value = value;
  }

  protected getSerializableProps() {
    return [this.__primitiveProp, this.__arrProp];
  }

  getChanges(): Array<TValueChanges<any>> {
    return this.getSerializableProps().map((x) => x.getChanges());
  }

  setChanges(changes: Array<TValueChanges<any>>) {
    this.getSerializableProps().forEach((x, index) =>
      x.setChanges(changes[index])
    );
  }

  clearChanges() {
    this.getSerializableProps().forEach((x) => x.clearChanges());
  }
}
