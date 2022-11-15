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
	const formData = new FormData(form);
	for (const [key, value] of formData) {
		console.log(`${key}: ${value}\n`);
	}

	// go through the array of data, if matches, add to filteredData

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
