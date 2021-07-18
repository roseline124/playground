const iterMap = (iter: IterableIterator<any>, fn: (item: any) => any) => {
  let tmp = [];
  for (const item of iter) {
    tmp.push(fn(item));
  }
  return tmp;
};

export default iterMap;
