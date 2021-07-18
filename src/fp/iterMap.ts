const iterMap = (
  iter: Generator<number, void, unknown>,
  fn: (item: any) => any
) => {
  let tmp = [];
  for (const item of iter) {
    tmp.push(fn(item));
  }
  return tmp;
};

export default iterMap;
