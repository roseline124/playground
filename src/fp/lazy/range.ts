export const range = (start: number, end: number) => {
	if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end)) {
		throw new TypeError(
			'Expected \'start\', \'end\' to be an integer from -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER',
		);
	}

	const array = [];
	for (let i = start; i < end; i++) {
		array.push(i);
	}

	return array;
};

export function * lazyRange(start: number, end: number) {
	for (let i = start; i < end; i++) {
		yield i;
	}
}
