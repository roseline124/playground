/**
 * 시간(지연을 포함하는)을 이터러블로 다루기
 */

import { delay, go } from 'fxjs';
// @ts-ignore
import { each } from 'fxjs/Strict';
import { lazyRange, lazyMap, take, takeUntil, takeWhile } from '../lazy';

const main = () => {
  /**
   * range, take: 최대 몇 번의 일이 일어나고, 최대 몇 번의 값을 취하겠다.
   */
  // @ts-ignore
  go(lazyRange(0, 10), lazyMap(delay(1000)), take(3), each(console.log));

  /**
   * takeWhile, takeUntil
   */
  //   takeWhile: 조건에 맞는 값을 만나는 동안만 fn을 실행한다.
  go(
    lazyRange(1, 10),
    takeWhile((a: any) => a < 5), // 4까지만 취한다.
    each(console.log)
  );

  // takeUntil: 조건에 맞는 값을 만날 때까지 fn을 실행한다.
  go(
    lazyRange(1, 10),
    takeUntil((a: any) => a === 5), // 4까지만
    each(console.log)
  );
};

main();
