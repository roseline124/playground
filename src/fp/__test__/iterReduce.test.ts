import iterReduce from "../iterReduce";

describe("iterReduce", () => {
  function* gen() {
    yield 1;
    yield 2;
    yield 3;
  }

  test("reduce iterable을 처리할 수 없다.", () => {
    const iter = gen();
    // @ts-ignore
    expect(() => iter.reduce((prev, curr) => prev + curr)).toThrow();
  });

  test("iterReduce은 iterable을 처리할 수 있다.", () => {
    expect(iterReduce(gen(), (prev, curr) => prev + curr)).toEqual(6);
    expect(iterReduce(gen(), (prev, curr) => prev + curr, 0)).toEqual(6);
  });
});
