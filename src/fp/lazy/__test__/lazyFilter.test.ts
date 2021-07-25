import lazyFilter from '../lazyFilter';
import take from '../take';
import go from '../../utils/go';

test('lazyFilter', () => {
	function * gen(index: number) {
		for (let i = 0; i < index; i++) {
			yield i;
		}
	}

	const result = go(
		gen(Number.POSITIVE_INFINITY),
		lazyFilter((item: number) => item % 2 === 0),
		take(5),
	);

	expect(result).toEqual([0, 2, 4, 6, 8]);
});
