const iterReduce = (
  iter: Generator<number, void, unknown>,
  fn: (prev: any, curr: any) => any,
  initialValue?: any
) => {
  let tmp =
    typeof initialValue !== "undefined" ? initialValue : iter.next().value;

  for (const item of iter) {
    tmp = fn(tmp, item);
  }

  return tmp;
};

export default iterReduce;
