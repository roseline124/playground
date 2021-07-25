import { simpleGen } from "../generator";

describe("Generator", () => {
  describe("generator는 iterable을 반환한다", () => {
    it("well-formed iterable을 반환한다", () => {
      const iterable = simpleGen();
      const iter = iterable[Symbol.iterator]();
      expect(iter[Symbol.iterator]() === iter).toBe(true);
    });

    it("Symbol.iterator를 key로 가진다", () => {
      const iterable = simpleGen();
      expect(iterable[Symbol.iterator]).not.toBeUndefined();
      expect(typeof iterable[Symbol.iterator]).toBe("function");
    });

    describe("obj[Symbol.iterator]는 iterator를 반환하는 함수이다", () => {
      it("iterator.next 함수는 value와 done 프로퍼티를 가진 객체를 반환한다", () => {
        const iterable = simpleGen();
        const iter = iterable[Symbol.iterator]();
        const obj = iter.next();
        expect("value" in obj).toBe(true);
        expect("done" in obj).toBe(true);
        expect(typeof obj.done).toBe("boolean");
      });

      it("next를 실행할 때마다 value, done 프로퍼티를 가진 객체를 하나씩 반환한다. 마지막 객체의 done은 true이다.", () => {
        const iterable = simpleGen();
        const iter = iterable[Symbol.iterator]();
        const obj = iter.next();
        expect(obj.value).toBe(1);
        expect(obj.done).toBe(false);

        iter.next();
        iter.next();
        const last = iter.next();
        expect(last.value).toBeUndefined();
        expect(last.done).toBe(true);
      });
    });
    describe("for..of, spread 연산자, destructuring과 함께 사용 가능하다", () => {
      it("for..of", () => {
        const iterable = simpleGen();
        const iter = iterable[Symbol.iterator]();
        iter.next();
        iter.next();
        for (const a of iter) {
          expect(a).toBe(3);
        }
      });
      it("spread operator", () => {
        const iterable = simpleGen();
        expect([...iterable]).toEqual([1, 2, 3]);
      });
      it("destructuring", () => {
        const iterable = simpleGen();
        const [a, b, c] = iterable;
        expect([a, b, c]).toEqual([1, 2, 3]);
      });
    });
  });
});
