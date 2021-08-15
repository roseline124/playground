import { lazyMap, lazyRange, take, takeWhile } from '../lazy';
import go from '../utils/go';
// @ts-ignore
import { each } from 'fxjs/Strict';
import { delay, flat, flatMap } from 'fxjs';

const main = async () => {
  /**
   * track은 2000km
   * 4명의 조만 출전 가능
   * 누가 제일 먼저 도착할까.
   */
  const drivers = go(
    lazyRange(0, Infinity),
    lazyMap((i: number) => track[i].cars),
    takeWhile((cars: Cars[]) => cars.length === 4),
    flat,
    lazyMap(
      (car: Car) =>
        new Promise((resolve) => {
          setTimeout(() => resolve(car.driver), 2000 / car.speed);
        })
    )
  );

  const result: string[] = [];
  await Promise.all(
    [...drivers].map(async (driver: string) => result.push(await driver))
  );
  console.log(result);
};

interface Car {
  driver: string;
  speed: number; // km/h
}

interface Cars {
  cars: Car[];
}

/**
 * 자동차 경주
 */
const track: Cars[] = [
  {
    cars: [
      { driver: '철수', speed: 10 },
      { driver: '영희', speed: 20 },
      { driver: '철희', speed: 30 },
      { driver: '영수', speed: 40 },
    ],
  },
  {
    cars: [
      { driver: '히든', speed: 50 },
      { driver: '커리', speed: 60 },
      { driver: '듀란트', speed: 10 },
      { driver: '탐슨', speed: 20 },
    ],
  },
  {
    cars: [
      { driver: '스파이더맨', speed: 80 },
      { driver: '아이언맨', speed: 100 },
      { driver: '타노스', speed: 150 },
      { driver: '블랙위도우', speed: 200 },
    ],
  },
  {
    cars: [
      { driver: '풀', speed: 100 },
      { driver: '어빙', speed: 200 },
      { driver: '릴라드', speed: 100 },
    ],
  },

  { cars: [] },
];

main();
