import {
  TChanges,
  IChangable,
  TOwnChanges,
  TNestedChanges,
  TObjectChanges,
} from "./interfaces";
import { ObjectChanges } from "./ObjectChanges";

// makeChangable(Class1)
// эта функция преобразует Класс1 таким образом, что он становится IChangable + Class1
// при этом IChangable становятся определённые свойства Класса1 указанные в конфигурации
// конфигурация берётся из метода Class1, который реализует интерфейс IChangableMetadata
// нужно название пропертей, которые завёртывать в геттеры-сеттеры
// нужно 

export class ChangableBase implements IChangable {
  private _changes = new ObjectChanges();

  isChangable: true = true;

  constructor(original: object) {}

  get changed(): boolean {
    return this.hasOwnChanges || this.hasNestedChanges;
  }

  get hasOwnChanges(): boolean {
    return this._changes.length > 0;
  }

  get hasNestedChanges(): boolean {
    const result = this.getChangableEntries().some(([, x]) => x.changed);
    return result;
  }

  getChanges(): TChanges {
    return [this.getOwnChanges(), this.getNestedChanges()];
  }

  getOwnChanges(): TOwnChanges {
    return this._changes.getChanges(this);
  }

  getNestedChanges(): TNestedChanges {
    const result = this.getChangableEntries()
      .filter(([, x]) => x.changed)
      .map(([prop, x]) => [prop, x.getChanges()] as [string, TChanges]);

    return result;
  }

  setChanges(changes: TChanges): void {
    const [ownChanges, nestedChanges] = changes;

    this.setOwnChanges(ownChanges as TObjectChanges);
    this.setNestedChanges(nestedChanges);
  }

  private _setProp(prop: string, value: any) {
    this[prop] = value;
  }

  private _setPropChanges(prop: string, changes: TChanges) {
    const changable = this[prop] as IChangable;
    changable.setChanges(changes);
  }

  setOwnChanges(changes: TObjectChanges): void {
    changes.forEach(([prop, value]) => {
      this._setProp(prop, value);
    });
  }

  setNestedChanges(changes: TNestedChanges): void {
    changes.forEach(([prop, value]) => {
      this._setPropChanges(prop as string, value);
    });
  }

  clearChanges(): void {
    this.clearOwnChanges();
    this.clearNestedChanges();
  }

  clearOwnChanges(): void {
    this._changes.clear();
  }

  clearNestedChanges(): void {
    this.getChangableEntries().forEach(([, x]) => x.clearChanges());
  }

  getChangableEntries(): [string, IChangable][] {
    throw new Error("Method not implemented.");
  }
}
