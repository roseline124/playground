import curry from './curry';

const iterReduce = curry(
  (
    fn: (previous: any, curr: any) => any,
    acc: any,
    iter?: IterableIterator<any>
  ) => {
    // iter가 없다면 acc 자리에 iter가 온 것으로 추정
    if (!iter) {
      iter = acc[Symbol.iterator]();
      acc = iter?.next().value;
    }

    // @ts-ignore
    for (const curr of iter) {
      acc = fn(acc, curr);
    }

    return acc;
  }
);

export default iterReduce;
