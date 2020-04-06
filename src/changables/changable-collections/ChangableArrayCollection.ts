import { ArrayCollectionChanges } from "./ArrayCollectionChanges";
import { ArrayCollection } from "../../collections/ArrayCollection";
import {
  IChangable,
  isChangable,
  TChanges,
  toChangable,
} from "../changables.interface";
import {
  TCollectionChange,
  CollectionChangeType,
  TCollectionSpliceChange,
  TCollectionPushChange,
  TCollectionUnshiftChange,
  TCollectionClearChange,
  TCollectionSortChange,
  TCollectionReverseChange,
  TCollectionSetChange,
} from "./changable-collections.interface";
import {
  IOwnChanges,
  INestedChanges,
  TNestedChanges,
} from "../changable-object/changable-object.interface";

export class ChangableArrayCollection<T> extends ArrayCollection<T>
  implements IChangable<number>, IOwnChanges, INestedChanges<number> {
  private _changes = new ArrayCollectionChanges<T>();

  // implementation of interface IOwnChanges
  get hasOwnChanges(): boolean {
    return this._changes.length > 0;
  }

  disableOwnChanges(): void {
    this._changes.disable();
  }

  enableOwnChanges(): void {
    this._changes.enable();
  }

  getOwnChanges(): TCollectionChange<T>[] {
    return this._changes.getChanges(super.toArray());
  }

  setOwnChanges(changes: TCollectionChange<T>[]): void {
    this.disableOwnChanges();
    changes.forEach((x) => this._setChange(x));
    this.enableOwnChanges();
  }

  // implementation of interface INestedChanges
  get hasNestedChanges(): boolean {
    return this.getChangableEntries().some(([, x]) => x.changed);
  }

  disableNestedChanges(): void {
    this.getChangableEntries().forEach(([, x]) => x.disableChanges());
  }

  enableNestedChanges(): void {
    this.getChangableEntries().forEach(([, x]) => x.enableChanges());
  }

  getNestedChanges(): TNestedChanges<number> {
    return this.getChangableEntries()
      .filter(([, x]) => x.changed)
      .map(([prop, x]) => <[number, TChanges<any>]>[prop, x.getChanges()]);
  }

  setNestedChanges(changes: TNestedChanges<number>): void {
    changes.forEach(([index, change]) => {
      // const changable = toChangable(this.get(index));
      // if (!changable) {
      //   throw new Error(
      //     `setNestedChanges(): cannot set changes. Value at index=${index} is not IChangable`
      //   );
      // }
      const changable = <IChangable<number>>(<unknown>this.get(index));
      changable.setChanges(change);
    });
  }

  getChangableEntries(): [number, IChangable<any>][] {
    if (!this._itemsAreChangable) {
      return [];
    }

    return this.map((value, index) => {
      const changable = (value as unknown) as IChangable<number>;
      return [index, changable];
    });
  }

  // implementation of interface IChangable
  isChangable: true = true;

  get changed(): boolean {
    return this.hasOwnChanges || this.hasNestedChanges;
  }

  getChanges(): [TCollectionChange<T>[], TNestedChanges<number>] {
    return [this.getOwnChanges(), this.getNestedChanges()];
  }

  setChanges(changes: [TCollectionChange<T>[], TNestedChanges<number>]): void {
    const [ownChanges, nestedChanges] = changes;
    this.setOwnChanges(ownChanges);
    this.setNestedChanges(nestedChanges);
  }

  disableChanges(): void {
    this.disableOwnChanges();
    this.disableNestedChanges();
  }

  enableChanges(): void {
    this.enableOwnChanges();
    this.enableNestedChanges();
  }

  // redefine some methods from parent
  set(index: number, value: T): void {
    super.set(index, value);
    this._changes.registerSet(index, value);

    const changable = toChangable(super.get(index));
    changable?.disableChanges();
  }

  pop(): T | undefined {
    const result = super.pop();
    this._changes.registerPop();
    return result;
  }

  push(...items: T[]): number {
    const result = super.push(...items);
    this._changes.registerPush(items);

    if (isChangable(items[0])) {
      items.forEach((x) => (<IChangable<number>>(<unknown>x)).disableChanges());
    }

    return result;
  }

  reverse(): T[] {
    const result = super.reverse();
    this._changes.registerReverse();
    this.disableNestedChanges();
    return result;
  }

  clear(): void {
    super.clear();
    this._changes.registerClear();
  }

  sort(compareFn?: ((a: T, b: T) => number) | undefined): this {
    super.sort(compareFn);
    this._changes.registerSort();
    this.disableNestedChanges();
    return this;
  }

  unshift(...items: T[]): number {
    const result = super.unshift(...items);
    this._changes.registerUnshift(items);

    if (isChangable(items[0])) {
      items.forEach((x) => (<IChangable<number>>(<unknown>x)).disableChanges());
    }

    return result;
  }

  shift(): T | undefined {
    const result = super.shift();
    this._changes.registerShift();
    return result;
  }

  splice(start: number, deleteCount?: number | undefined): T[];
  splice(start: number, deleteCount: number, ...items: T[]): T[];
  splice(start: any, deleteCount?: any, ...rest: any[]) {
    const result = super.splice(start, deleteCount, ...rest);
    this._changes.registerSplice(start, deleteCount, rest);

    if (rest && isChangable(rest[0])) {
      rest.forEach((x) => (<IChangable<number>>(<unknown>x)).disableChanges());
    }

    return result;
  }

  // private and protected members
  protected get _itemsAreChangable(): boolean {
    return !!(this.length && isChangable(this.get(0)));
  }

  private _setChange(change: TCollectionChange<T>) {
    const [changeType] = change;

    switch (changeType) {
      case CollectionChangeType.Splice: {
        const [, start, deleteCount, items] = change as TCollectionSpliceChange<
          T
        >;
        if (deleteCount && items) {
          super.splice(start, deleteCount, ...items);
        } else {
          super.splice(start, deleteCount);
        }
        break;
      }
      case CollectionChangeType.Push: {
        const [, items] = change as TCollectionPushChange<T>;
        super.push(...items);
        break;
      }
      case CollectionChangeType.Unshift: {
        const [, items] = change as TCollectionUnshiftChange<T>;
        super.unshift(...items);
        break;
      }
      case CollectionChangeType.Pop: {
        super.pop();
        break;
      }
      case CollectionChangeType.Shift: {
        super.shift();
        break;
      }
      case CollectionChangeType.Clear: {
        const [, items] = change as TCollectionClearChange<T>;
        super.clear();
        super.push(...items);
        break;
      }
      case CollectionChangeType.Sort: {
        const [, items] = change as TCollectionSortChange<T>;
        super.clear();
        super.push(...items);
        break;
      }
      case CollectionChangeType.Reverse: {
        const [, items] = change as TCollectionReverseChange<T>;
        super.clear();
        super.push(...items);
        break;
      }
      case CollectionChangeType.Set: {
        const [, index, value] = change as TCollectionSetChange<T>;
        super.set(index, value);
        break;
      }
      default:
        throw new Error(`Unknown array change type=${changeType}`);
    }
  }
}
