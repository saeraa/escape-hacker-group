import { getDataFromAPI } from "./getDataFromAPI.js";

const filterForm = document.querySelector(".filter-form");
const searchFilterInput = document.querySelector("input[type='search']");
const outputElement = document.querySelector("#output"); // placeholder element for output
const clearFilterBtn = document.querySelector(".filter-clear");

clearFilterBtn.addEventListener("click", clearFilter);
filterForm.addEventListener("submit", doNotReload);
filterForm.addEventListener("change", filterResults);
searchFilterInput.addEventListener("keyup", filterResults);
window.addEventListener("load", setupData);

// filtered data to be shown
let filteredData = [];

// original data array to be populated form the API
let dataFromAPI = [];

// adding all tags to a Set, don't need duplicate tags
let tagsCollection = new Set();

async function setupData() {
	const data = await getDataFromAPI();
	dataFromAPI = data;
	dataFromAPI.forEach((challenge) => {
		challenge.labels.forEach((label) => {
			tagsCollection.add(label);
		});
	});
	displayData(dataFromAPI);
	addLabelsToDOM();
}

function addLabelsToDOM() {
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

function filterResults(e) {
	filteredData = []; // reset array so it can be repopulated after the filter is applied
	const formData = new FormData(filterForm); // get the data from the inputs

	dataFromAPI.forEach((entry) => {
		// If an entry matches these criteria, add to array of entries to display
		// if rating selected: exclude if rating is smaller than min, or bigger than max
		// if tags selected: tags exist in entry.tag[]
		// if search term: exclude if title/description does not include the search term
		// if type selected: type:online matches OR type onsite matches

		let searchMatches = true;
		let ratingMatches = true;
		let typeMatches = true;
		let tagsMatches = true;

		let titleAndDescription = entry.title + " " + entry.description;
		titleAndDescription = titleAndDescription.split(/[ ,]+/);
		// splits string using regex on a space or a comma
		// so we later can search for single words

		for (const [key, value] of formData) {
			// check tags
			if (
				key.includes("tags:") &&
				!entry.labels.includes(key.substring(5))
				// only check the "javascript" part of "tags:javascript", for example
			) {
				tagsMatches = false;
			}

			// check types of rooms
			if (key == "type:online" && entry.type != "online") {
				typeMatches = false;
			}
			if (key == "type:onsite" && entry.type != "onsite") {
				typeMatches = false;
			}

			// check rating
			if (
				(key == "rating:min" && +entry.rating < +value) ||
				(key == "rating:max" && +entry.rating > +value)
			) {
				ratingMatches = false;
			}

			// check search input
			if (key == "search") {
				const valueArray = value.toLowerCase().split(/[ ,]+/);
				// putting the input into one array and comparing it to the titleAndDescription array created above. findIndex returns -1 if no matching input is found
				valueArray.forEach((searchTerm) => {
					const index = titleAndDescription.findIndex((element) => {
						if (element.includes(searchTerm)) {
							return true;
						}
					});

					if (index == -1) {
						searchMatches = false;
					}
				});
			}
		}

		// if both onsite and online are clicked
		if (formData.has("type:onsite") && formData.has("type:online")) {
			typeMatches = true;
		}

		// add the room to the displayArray if it matches all criteria
		if (typeMatches && tagsMatches && searchMatches && ratingMatches) {
			filteredData.push(entry);
		}
	});

	displayData(filteredData);
}
