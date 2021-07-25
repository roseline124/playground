import iterReduce from '../iterReduce';

describe('iterReduce', () => {
  function* gen() {
    yield 1;
    yield 2;
    yield 3;
  }

  test('reduce iterable을 처리할 수 없다.', () => {
    const iter = gen();
    // @ts-expect-error
    expect(() => iter.reduce((previous, curr) => previous + curr)).toThrow();
  });

  test('iterReduce은 iterable을 처리할 수 있다.', () => {
    expect(iterReduce(gen(), (previous, curr) => previous + curr)).toEqual(6);
    expect(iterReduce(gen(), (previous, curr) => previous + curr, 0)).toEqual(
      6
    );
  });
});
