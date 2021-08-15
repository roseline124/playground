import curry from '../utils/curry';

const takeUntil = curry(function* (fn: any, iter?: any) {
  for (const item of iter) {
    if (fn(item)) return;
    yield item;
  }
});

export default takeUntil;
