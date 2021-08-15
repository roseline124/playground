import go from '../../utils/go';
import { lazyRange, takeWhile } from '..';

describe('takeWhile', () => {
  test('함수 실행 결과가 참인 값을 만나는 동안만 실행한다', () => {
    const result = go(
      lazyRange(1, 10),
      takeWhile((a: number) => a < 5)
    );

    expect([...result]).toEqual([1, 2, 3, 4]);
  });

  test('함수 실행 결과가 거짓인 값을 만나지 못하면 끝까지 실행한다', () => {
    const result = go(
      lazyRange(1, 5),
      takeWhile((a: number) => a < 5)
    );

    expect([...result]).toEqual([1, 2, 3, 4]);
  });
});
