import iterReduce from './iterReduce';

const go = (...args: any[]) =>
  iterReduce(
    (arg: any, fn: (arg0: any) => any) => fn(arg),
    args[Symbol.iterator]()
  );

export default go;
