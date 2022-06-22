const areEquivalent = (
	firstObject: Record<any, any>, 
	secondObject: Record<any, any>
): boolean => {
	const firstObjectFields = Object.getOwnPropertyNames(firstObject);
	const secondObjectFields = Object.getOwnPropertyNames(secondObject);

	if (firstObjectFields.length !== secondObjectFields.length) {
		return false;
	}

	for (let index = 0; index < firstObjectFields.length; index++) {
		const prop = firstObjectFields[index];
		const bothAreObjects = typeof(firstObject[prop]) === 'object' 
			&& typeof(secondObject[prop]) === 'object';

		if ((!bothAreObjects && (firstObject[prop] !== secondObject[prop]))
		|| (bothAreObjects && !areEquivalent(firstObject[prop], secondObject[prop]))) {
			return false;
		}
	}

	return true;
};

export {
	areEquivalent,
}
