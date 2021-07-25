import curry from './curry';

const iterFilter = curry(
  (fn: (item: any) => any, iter: IterableIterator<any>) => {
    const temporary = [];
    for (const item of iter) {
      if (fn(item)) {
        temporary.push(item);
      }
    }

    return temporary;
  }
);

export default iterFilter;
