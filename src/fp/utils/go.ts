import iterReduce from "./iterReduce";

const go = (...args: any[]) =>
  iterReduce(args[Symbol.iterator](), (arg, fn) => fn(arg));

export default go;
