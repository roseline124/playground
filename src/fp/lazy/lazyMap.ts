import curry from '../utils/curry';

const lazyMap = curry(function * (
	fn: (item: any) => any,
	iter: IterableIterator<any>,
) {
	for (const item of iter) {
		yield fn(item);
	}
});

export default lazyMap;
