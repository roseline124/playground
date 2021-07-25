const iterReduce = (
	iter: IterableIterator<any>,
	fn: (previous: any, curr: any) => any,
	initialValue?: any,
) => {
	let previous
    = typeof initialValue !== 'undefined' ? initialValue : iter.next().value;

	for (const curr of iter) {
		previous = fn(previous, curr);
	}

	return previous;
};

export default iterReduce;
