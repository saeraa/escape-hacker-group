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
	for (const [key, value] of formData) {
		if (value !== "") {
			console.log(`${key}: ${value}\n`);
		}

		dummyData.forEach((entry) => {
			// boolean addToArray = true

			// by Type:
			// if (type:online: on) && (entry.type = online), addToArray = true
			// if (type:onsite: on) && (entry.type = onsite), addToArray = true
			// if typeOnline and entryType is NOT online, addToArray = false

			// if type:online:on AND entry.type matches EITHER type:online:on OR type:onsite:on

			// search functionality
			// go through the array of data, if any entry's title or description contains the string from the search field, add to filteredData
			if (key == "search") {
				if (entry.title.includes(value) || entry.description.includes(value)) {
					filteredData.push(entry);
				}
			}

			// rating:
			// check each entry if rating is greater than rating:min
			// check each entry if rating is smaller than rating:max
			//

			//! this does not work:
			// if (
			// 	key == "rating:min" &&
			// 	+value < +entry.rating &&
			// 	+key.next().value < +entry.rating // key has no access to next() function here
			// ) {
			// 	console.log("value: ", value, "entry.rating: ", entry.rating);
			// }
		});
	}

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
