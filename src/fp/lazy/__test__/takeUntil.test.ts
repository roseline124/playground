import { lazyRange, takeUntil } from '..';
import go from '../../utils/go';

describe('takeUntil', () => {
  test('함수 실행 결과가 참인 값을 만나면 실행을 멈춘다', () => {
    const result = go(
      lazyRange(1, 10),
      takeUntil((a: number) => a === 5)
    );

    expect([...result]).toEqual([1, 2, 3, 4]);
  });

  test('함수 실행 결과가 참인 값을 만나지 못하면 끝까지 실행한다', () => {
    const result = go(
      lazyRange(1, 5),
      takeUntil((a: number) => a > 5)
    );

    expect([...result]).toEqual([1, 2, 3, 4]);
  });
});
