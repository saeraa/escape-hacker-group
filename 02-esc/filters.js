export function filterRating(entry, formData) {
	if (
		(formData.hasOwnProperty("rating:min") &&
			+entry.rating < +formData["rating:min"]) ||
		(formData.hasOwnProperty("rating:max") &&
			+entry.rating > +formData["rating:max"])
	) {
		return false;
	} else return true;
}

export function filterLabels(entry, key) {
	if (
		key.includes("tags:") &&
		!entry.labels.includes(key.substring(5))
		// only check the "javascript" part of "tags:javascript", for example
	) {
		return false;
	} else {
		return true;
	}
}

export function filterType(entry, formData) {
	if (
		formData.hasOwnProperty("type:onsite") &&
		formData.hasOwnProperty("type:online")
	) {
		return true;
	} else if (formData.hasOwnProperty("type:online") && entry.type != "online") {
		return false;
	} else if (formData.hasOwnProperty("type:onsite") && entry.type != "onsite") {
		return false;
	} else return true;
}

export function filterSearch(entry, value) {
	const titleAndDescription = entry.title
		.concat(" ", entry.description)
		.toLowerCase()
		.split(/[ ,]+/);
	const valueArray = value.toLowerCase().split(/[ ,]+/);

	const trueOrFalse = valueArray.every((value) => {
		const match = titleAndDescription.find((element) => {
			if (element.includes(value)) {
				//Check if the element contains the substring
				return true;
			}
		});
		return match;
	});

	if (trueOrFalse) {
		return true;
	} else {
		return false;
	}
}
