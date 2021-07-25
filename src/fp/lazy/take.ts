import curry from '../utils/curry';

const take = curry((index: number, iter: IterableIterator<any>) => {
	const array = [];
	for (const item of iter) {
		array.push(item);
		if (array.length === index) {
			return array;
		}
	}
});

export default take;
