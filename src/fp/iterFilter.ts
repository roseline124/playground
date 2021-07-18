const iterFilter = (
  iter: Generator<number, void, unknown>,
  fn: (item: any) => any
) => {
  const tmp = [];
  for (const item of iter) {
    if (fn(item)) {
      tmp.push(item);
    }
  }
  return tmp;
};

export default iterFilter;
