import curry from '../curry';

describe('curry', () => {
  test('인자가 1개면 함수를 반환한다.', () => {
    const add = curry((a: number, b: number) => a + b);
    const fn = add(1);
    expect(typeof fn).toBe('function');
  });
  test('인자가 2개 이상이면 함수 실행의 결과값을 반환한다.', () => {
    const add = curry((a: number, b: number) => a + b);
    const result = add(1)(2);
    expect(result).toBe(3);
  });
});
