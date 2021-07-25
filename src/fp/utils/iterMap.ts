const iterMap = (iter: IterableIterator<any>, fn: (item: any) => any) => {
	const temporary = [];
	for (const item of iter) {
		temporary.push(fn(item));
	}

	return temporary;
};

export default iterMap;
