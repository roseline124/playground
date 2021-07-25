import { iterable } from '../customIterable';

describe('iterable protocol', () => {
  describe('iterable인 경우', () => {
    it('Symbol.iterator를 key로 가진다', () => {
      expect(iterable[Symbol.iterator]).not.toBeUndefined();
      expect(typeof iterable[Symbol.iterator]).toBe('function');
    });
    describe('obj[Symbol.iterator]는 iterator를 반환하는 함수이다', () => {
      it('iterator.next 함수는 value와 done 프로퍼티를 가진 객체를 반환한다', () => {
        const iter = iterable[Symbol.iterator]();
        const object = iter.next();
        expect('value' in object).toBe(true);
        expect('done' in object).toBe(true);
        expect(typeof object.done).toBe('boolean');
      });

      it('next를 실행할 때마다 value, done 프로퍼티를 가진 객체를 하나씩 반환한다. 마지막 객체의 done은 true이다.', () => {
        const iter = iterable[Symbol.iterator]();
        const object = iter.next();
        expect(object.value).toBe(1);
        expect(object.done).toBe(false);

        iter.next();
        iter.next();
        const last = iter.next();
        expect(last.value).toBeUndefined();
        expect(last.done).toBe(true);
      });
    });
    describe('for..of, spread 연산자, destructuring과 함께 사용 가능하다', () => {
      it('for..of', () => {
        const iter = iterable[Symbol.iterator]();
        iter.next();
        iter.next();
        for (const a of iter) {
          expect(a).toBe(3);
        }
      });
      it('spread operator', () => {
        expect([...iterable]).toEqual([1, 2, 3]);
      });
      it('destructuring', () => {
        const [a, b, c] = iterable;
        expect([a, b, c]).toEqual([1, 2, 3]);
      });
    });
  });

  describe('well-formed iterable', () => {
    it('wellFormedIterable[Symbol.iterator]는 iterator 객체를 반환한다', () => {
      const iter = iterable[Symbol.iterator]();
      expect(iter[Symbol.iterator]() === iter).toBe(true);
    });
    it('nonWellFormedIterable[Symbol.iterator]는 TypeError를 발생시킨다', () => {
      const nonWellFormedIterable = {};
      // @ts-expect-error
      nonWellFormedIterable[Symbol.iterator] = () => 1;
      // @ts-expect-error
      expect(() => [...nonWellFormedIterable]).toThrow();
    });
  });

  describe('iterable이 아닌 경우', () => {
    it('Symbol.iterator를 key로 가지지 않는다.', () => {
      const object = {};
      expect(Symbol.iterator in object).toBe(false);
    });
    it('obj[Symbol.iterator]는 iterator를 반환하지 않는다', () => {
      const object = {};
      // @ts-expect-error
      const notIterator = object[Symbol.iterator];
      expect(notIterator).toBeUndefined();
    });
    // Spread, destructuring 런타임에러는 나지 않는다
    it('for..of와 함께 사용할 수 없다.', () => {
      const object = {};
      expect(() => {
        // @ts-expect-error
        for (const iterator of object) {
          console.log(iterator);
        }
      }).toThrow();
    });
  });
});
