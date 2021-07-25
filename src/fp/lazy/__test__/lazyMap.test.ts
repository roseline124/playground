import lazyMap from '../lazyMap';
import take from '../take';
import go from '../../utils/go';

describe('lazyMap', () => {
	test('iterable 객체를 순회하며 callback함수를 호출한다', () => {
		function * gen(index: number) {
			for (let i = 0; i < index; i++) {
				yield i;
			}
		}

		const result = go(
			gen(Number.POSITIVE_INFINITY),
			lazyMap((item: number) => item + 1),
			take(5),
		);
		expect(result).toEqual([1, 2, 3, 4, 5]);
	});
});
