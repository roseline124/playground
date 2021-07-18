import iterMap from "../iterMap";

describe("iterMap", () => {
  function* gen() {
    yield 1;
    yield 2;
    yield 3;
  }

  test("map은 iterable을 처리할 수 없다.", () => {
    const iter = gen();
    // @ts-ignore
    expect(() => iter.map((item) => item)).toThrow();
  });

  test("iterMap은 iterable을 처리할 수 있다.", () => {
    expect(iterMap(gen(), (item) => item * 2)).toEqual([2, 4, 6]);
  });
});
