import { getDataFromAPI } from "./getDataFromAPI.js";

const outputElement = document.querySelector("#output"); // placeholder element for output

const filterForm = document.querySelector(".filter-form");
const searchFilterInput = document.querySelector("input[type='search']");
const clearFilterBtn = document.querySelector(".filter-clear");

clearFilterBtn.addEventListener("click", clearFilter);
filterForm.addEventListener("submit", doNotReload);
filterForm.addEventListener("change", useAllFilters);
searchFilterInput.addEventListener("keyup", useAllFilters);
window.addEventListener("load", setupData);

// original data array to be populated form the API
let dataFromAPI = [];

async function setupData() {
	// adding all tags to a Set, don't need duplicate tags
	let tagsCollection = new Set();
	const data = await getDataFromAPI();
	// console.log(data);
	dataFromAPI = data;
	dataFromAPI.forEach((challenge) => {
		challenge.labels.forEach((label) => {
			tagsCollection.add(label);
		});
	});
	displayData(dataFromAPI);
	addLabelsToDOM(tagsCollection);
}

function addLabelsToDOM(tagsCollection) {
	let labelString = "";
	tagsCollection.forEach((label) => {
		labelString += `
		<input type="checkbox" name="tags:${label}" id="tags:${label}">
		<label for="tags:${label}">${label}</label>
		`;
	});
	document.querySelector("#tags").innerHTML = labelString;
}

function displayData(array) {
	if (array.length == 0) {
		outputElement.innerHTML =
			"<p class='filter-error'>No matching challenges.</p>";
		return;
	}
	let dataString = "";
	array.forEach((data) => {
		// placeholder room data output
		dataString += `<p>
    <b>${data.title}</b><br /> 
    ${data.minParticipants} - ${data.maxParticipants} participants<br />
    rating: ${data.rating}<br />
    ${data.description} <br />
    type: ${data.type}<br />
    tags: ${data.labels}<br />
    </p>`;
	});
	outputElement.innerHTML = dataString;
}

function doNotReload(e) {
	// do not want the form to reload the browser window if submitted
	e.preventDefault();
}

function clearFilter() {
	// this function should restore all filters and use the original array to display the rooms
	filterForm.reset();
	displayData(dataFromAPI);
}

function filterRating(entry, formData) {
	if (
		(formData.hasOwnProperty("rating:min") &&
			+entry.rating < +formData["rating:min"]) ||
		(formData.hasOwnProperty("rating:max") &&
			+entry.rating > +formData["rating:max"])
	) {
		return false;
	} else return true;
}

function filterLabels(entry, key) {
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

function filterType(entry, formData) {
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

function filterSearch(entry, value) {
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

function getFormData() {
	// get the data from the inputs and convert to object to make it easier to work with
	const tempFormData = new FormData(filterForm);
	let formData = {};
	for (const [key, value] of tempFormData) {
		if (value !== "") {
			formData[key] = value;
		}
	}
	return formData;
}

function useAllFilters(e) {
	let filteredData = []; // reset array so it can be repopulated after the filter is applied

	const formData = getFormData();

	dataFromAPI.forEach((entry) => {
		let searchMatches = true;
		let ratingMatches = true;
		let typeMatches = true;
		let labelMatches = true;

		ratingMatches = filterRating(entry, formData);
		typeMatches = filterType(entry, formData);

		for (const key in formData) {
			labelMatches = filterLabels(entry, key);
			if (!labelMatches) break;

			if (key == "search") {
				searchMatches = filterSearch(entry, formData[key]);
				if (!searchMatches) break;
			}
		}

		// add the room to the displayArray if it matches all criteria
		if (typeMatches && labelMatches && searchMatches && ratingMatches) {
			filteredData.push(entry);
		}
	});

	displayData(filteredData);
}
