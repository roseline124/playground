import type { AnyFunction } from "./types";

const curry =
  (fn: AnyFunction) =>
  (value: any, ...args: any[]) =>
    args.length ? fn(value, ...args) : (...args: any[]) => fn(value, ...args);

export default curry;
