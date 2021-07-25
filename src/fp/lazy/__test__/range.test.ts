import { range, lazyRange } from '../range';
import iterReduce from '../../utils/iterReduce';

describe('Range', () => {
  describe('range', () => {
    test('함수 호출 시 바로 평가된다', () => {
      const list = range(1, 5);
      expect(list).toEqual([1, 2, 3, 4]);
    });

    test('start parameter is inclusive and end parameter is exclusive', () => {
      const list = range(1, 5);
      expect(list).toEqual([1, 2, 3, 4]);
    });

    test('Infinity를 인자로 전달하면 에러가 발생한다', () => {
      expect(() =>
        range(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)
      ).toThrow(
        new TypeError(
          "Expected 'start', 'end' to be an integer from -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER"
        )
      );
    });
  });

  describe('lazy', () => {
    test('lRange를 호출해도 값에 접근하기 전까지는 평가하지 않는다', () => {
      const list = lazyRange(0, 3);
      expect(list).not.toEqual([0, 1, 2]);
    });

    test('값에 접근하면 평가된다', () => {
      const list = lazyRange(0, 3);
      expect(
        iterReduce((previous: any, curr: any) => previous + curr, list)
      ).toBe(3);
    });

    test('Infinity를 인자로 전달해도 에러를 발생시키지 않는다.', () => {
      expect(() => {
        const list = lazyRange(0, Number.POSITIVE_INFINITY);
        list.next().value;
      }).not.toThrow();
    });
  });
});
