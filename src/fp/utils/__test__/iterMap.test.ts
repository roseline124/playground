import iterMap from '../iterMap';

describe('iterMap', () => {
  function* gen() {
    yield 1;
    yield 2;
    yield 3;
  }

  test('map은 iterable을 처리할 수 없다.', () => {
    const iter = gen();
    // @ts-expect-error
    expect(() => iter.map((item) => item)).toThrow();
  });

  test('iterMap은 iterable을 처리할 수 있다.', () => {
    expect(iterMap((item: any) => item * 2, gen())).toEqual([2, 4, 6]);
  });
});
