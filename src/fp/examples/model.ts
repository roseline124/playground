// @ts-ignore
import * as _ from 'fxjs/Strict/index.js';
import lazyMap from '../lazy/lazyMap';
import go from '../utils/go';

export class Model<
  T extends {
    [key: string]: any;
  }
> {
  constructor(private attrs: T) {}

  get<K extends keyof T>(key: K) {
    return this.attrs[key];
  }

  set<K extends keyof T, V extends T[K]>(key: K, value: T[K]) {
    this.attrs[key] = value;
    return this;
  }
}

export class Collection<M> {
  constructor(private models: M[] = []) {}

  at(idx: number) {
    return this.models[idx];
  }

  add(model: M) {
    this.models.push(model);
    return this;
  }

  // *[Symbol.iterator]() {
  //   for (const model of this.models) {
  //     yield model;
  //   }
  // }

  // [Symbol.iterator]() {
  //   return this.models[Symbol.iterator]();
  // }

  *[Symbol.iterator]() {
    yield* this.models;
  }
}

interface User {
  id: number;
  name: string;
}

const main = () => {
  const collection = new Collection<Model<User>>();
  collection.add(new Model({ id: 1, name: 'A' }));
  collection.add(new Model({ id: 2, name: 'B' }));
  collection.add(new Model({ id: 3, name: 'C' }));
  console.log(collection.at(1).get('id'));
  console.log(collection.at(1).get('name'));

  // not good
  // go(
  //   lazyRange(0, 3),
  //   lazyMap((idx: number) => collection.at(idx)),
  //   lazyMap((model: Model) => model.get('name')),
  //   _.each(console.log)
  // );

  go(
    collection,
    lazyMap((model: Model<User>) => model.get('name')),
    _.each(console.log)
  );
};

// main();
