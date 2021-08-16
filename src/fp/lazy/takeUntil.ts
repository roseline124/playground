import curry from '../utils/curry';

const nop = Symbol.for('nop');
const toIter = (iter?: any) => iter?.[Symbol.iterator]?.();

const takeUntil = curry(function (fn: any, iter?: any) {
  iter = toIter(iter);
  if (!iter) throw new Error('It is not iterable');

  return (function recur(): any {
    const res: any[] = [];
    let cur = iter.next();
    while (!cur.done) {
      const result = (res.push(cur.value), fn(cur.value));
      if (result instanceof Promise) {
        return result
          .then((v) => (v ? result : recur()))
          .catch((e) => (e == nop ? recur() : Promise.reject(e)));
      }

      if (result) break;
    }

    return res;
  })();
});

export default takeUntil;
