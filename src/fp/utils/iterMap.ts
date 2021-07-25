import curry from './curry';

const iterMap = curry((fn: (item: any) => any, iter: IterableIterator<any>) => {
  const temporary = [];
  for (const item of iter) {
    temporary.push(fn(item));
  }

  return temporary;
});

export default iterMap;
