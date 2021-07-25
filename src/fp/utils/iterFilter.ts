const iterFilter = (iter: IterableIterator<any>, fn: (item: any) => any) => {
	const temporary = [];
	for (const item of iter) {
		if (fn(item)) {
			temporary.push(item);
		}
	}

	return temporary;
};

export default iterFilter;
