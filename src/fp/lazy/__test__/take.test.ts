import {lazyRange} from '../range';
import take from '../take';
import go from '../../utils/go';

describe('take', () => {
	test('index 만큼의 item을 반환한다', () => {
		expect(go(lazyRange(0, Number.POSITIVE_INFINITY), take(3))).toEqual([0, 1, 2]);
	});
});
