// Symbol.iterator: Well-Known Symbol, 자바스크립트에서 기본으로 제공하는 심볼 상수 값
export const iterable = {
  [Symbol.iterator]() {
    let i = 1;
    return {
      next() {
        return i === 4 ? { done: true } : { value: i++, done: false };
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  },
};
