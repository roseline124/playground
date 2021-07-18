import go from "./go";

type AnyFunction = (...args: any[]) => any;

const pipe =
  (...fns: AnyFunction[]) =>
  (initialValue: any) =>
    go(initialValue, ...fns);

export default pipe;
