import curry from '../utils/curry';

const lazyFilter = curry(function * (
	fn: (item: any) => boolean,
	iter: IterableIterator<any>,
) {
	for (const item of iter) {
		if (fn(item)) {
			yield item;
		}
	}
});

export default lazyFilter;
