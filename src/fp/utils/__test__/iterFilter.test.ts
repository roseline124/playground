import iterFilter from '../iterFilter';

describe('iterFilter', () => {
  function* gen() {
    yield 1;
    yield 2;
    yield 3;
  }

  test('filter는 iterable을 처리할 수 없다.', () => {
    const iter = gen();
    // @ts-expect-error
    expect(() => iter.filter((item) => item)).toThrow();
  });

  test('iterFilter은 iterable을 처리할 수 있다.', () => {
    expect(iterFilter((item: number) => item % 2 === 0, gen())).toEqual([2]);
  });
});
