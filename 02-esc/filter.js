import dummyData from "/02-esc/static/dummy-data.js";

const form = document.querySelector("form");
const searchInput = document.querySelector("input[type='search']");
const outputElement = document.querySelector("#output");
let filteredData = [];

function displayData(array) {
	if (array.length == 0) {
		outputElement.innerHTML = "<h2>No matching challenges.</h2>";
		return;
	}
	let dataString = "";
	array.forEach((data) => {
		dataString += `<p>
    <b>${data.title}</b><br /> 
    ${data.min_participants} - ${data.max_participants} participants<br />
    rating: ${data.rating}<br />
    ${data.description} <br />
    type: ${data.type}<br />
    tags: ${data.tags}<br />
    </p>`;
	});
	outputElement.innerHTML = dataString;
}

displayData(dummyData);

form.addEventListener("change", filterResults);
form.addEventListener("submit", doNotReload);
searchInput.addEventListener("keyup", filterResults);

function doNotReload(e) {
	e.preventDefault();
}

function filterResults(e) {
	filteredData = [];
	const formData = new FormData(form);

	dummyData.forEach((entry) => {
		// If an entry matches these criteria, add to array of entries to display

		// if rating selected: exclude if rating is smaller than min, or bigger than max
		// if tags selected: tags exist in entry.tag[]
		// if search term: exclude if title/description does not include the search term
		// if type selected: type:online matches OR type onsite matches

		let searchMatches = true;
		let ratingMatches = true;

		let typeMatches = true;
		let tagsMatches = true;

		for (const [key, value] of formData) {
			// if (value !== "") {
			// 	console.log(`${key}: ${value}\n`);
			// }

			// typeMatches = true if typeSelected && entry.type
			// is typeSelected? //* typeSelected =	[type:online: on OR type:onsite: on]
			// yes = is type online? is entry.type == online? true
			// yes = is type onsite? is entry.type == onsite? true

			//TODO: This needs rewriting. If both options are selected, no entries are shown.
			if (key == "type:online" && entry.type != "online") {
				typeMatches = false;
			}
			if (key == "type:onsite" && entry.type != "on-site") {
				typeMatches = false;
			}

			if (
				(key == "rating:min" && +entry.rating < +value) ||
				(key == "rating:max" && +entry.rating > +value)
			) {
				ratingMatches = false;
			}

			if (key == "search") {
				if (
					!entry.title.includes(value) &&
					!entry.description.includes(value)
				) {
					searchMatches = false;
				}
			}
		}
		if (typeMatches && tagsMatches && searchMatches && ratingMatches) {
			filteredData.push(entry);
		}
	});

	// type:online: on
	// type:onsite: on
	// rating:min: 5
	// rating:max: 5
	// tag:web: on
	// tag:crypto: on
	// tag:linux: on
	// tag:coding: on
	// search: he

	displayData(filteredData);
}

/* 



tagsMatches = true if 
tag:web: on && entry.tags.contains(web)
tag:crypto: on && entry.tags.contains(crypto)
tag:linux: on && entry.tags.contains(linux)
tag:coding: on && entry.tags.contains(coding)

OR if !tag:web && !tag:crypto && !tag:coding && !tag:linux
*/

// boolean addToArray = true

// by Type:
// if (type:online: on) && (entry.type = online), addToArray = true
// if (type:onsite: on) && (entry.type = onsite), addToArray = true
// if typeOnline and entryType is NOT online, addToArray = false

// if type:online:on AND entry.type matches EITHER type:online:on OR type:onsite:on
