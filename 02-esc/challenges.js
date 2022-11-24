import { getDataFromAPI } from "./getDataFromAPI.js";

const challenge_list = document.querySelector(".challenge-list");
const openFilterBtn = document.querySelector("#btnFilterChallenges");
const closeFilterBtn = document.querySelector(".filter-close");

openFilterBtn.addEventListener("click", () => {
	filterForm.classList.toggle("open");
	if (filterForm.classList.contains("open")) {
		openFilterBtn.style.display = "none";
	}
});

closeFilterBtn.addEventListener("click", () => {
	filterForm.classList.toggle("open");
	if (!filterForm.classList.contains("open")) {
		openFilterBtn.style.display = "block";
	}
});

const filterForm = document.querySelector(".filter-form");
const searchFilterInput = document.querySelector("input[type='search']");
const clearFilterBtn = document.querySelector(".filter-clear");

clearFilterBtn.addEventListener("click", clearFilter);
filterForm.addEventListener("submit", doNotReload);
filterForm.addEventListener("change", useAllFilters);
searchFilterInput.addEventListener("keyup", useAllFilters);

let resultFromAPI = [];

window.addEventListener("load", getChallengesAPI);

async function getChallengesAPI() {
	let tagsCollection = new Set();
	resultFromAPI.length = 0;
	resultFromAPI = await getDataFromAPI();
	console.log({ resultFromAPI });
	resultFromAPI.forEach((challenge) => {
		challenge.labels.forEach((label) => {
			tagsCollection.add(label);
		});
	});
	showAllChallenges(resultFromAPI);
	addLabelsToDOM(tagsCollection);
	//  challenges_visiility.style.display = 'block';
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

function showAllChallenges(resultFromAPI) {
	challenge_list.innerHTML = "";
	if (resultFromAPI.length == 0) {
		challenge_list.innerHTML =
			"<p class='filter-error'>No matching challenges.</p>";
		return;
	}

	console.log({ resultFromAPI });
	for (let i = 0; i < resultFromAPI.length; i++) {
		let id = resultFromAPI[i].id;
		let type = resultFromAPI[i].type;
		let rating = resultFromAPI[i].rating;
		let title = resultFromAPI[i].title;
		let description = resultFromAPI[i].description;
		let minParticipants = resultFromAPI[i].minParticipants;
		let maxParticipants = resultFromAPI[i].maxParticipants;
		let image = resultFromAPI[i].image;
		let labels = resultFromAPI[i].labels;

		let challenge_item = document.createElement("li");
		challenge_item.classList.add("challenge-item");

		let setImage = document.createElement("img");
		setImage.classList.add("challenge-image");
		setImage.src = image;
		challenge_item.append(setImage);

		let setRoomImage = document.createElement("img");
		setRoomImage.classList.add("room-image");
		if (type == "onsite") {
			setRoomImage.src = "static/iconOnline.svg";
		} else {
			setRoomImage.src = "static/iconOnsite.svg";
		}
		challenge_item.append(setRoomImage);

		let setTitle = document.createElement("h3");
		setTitle.classList.add("challenge-title");
		setTitle.textContent = title;
		challenge_item.appendChild(setTitle);

		let setRating = document.createElement("ul");
		setRating.classList.add("rating");

		/* I måpn av tid på slutet, fixa loop */
		let setRating_star_1 = document.createElement("li");
		setRating_star_1.classList.add("rating-star");
		setRating.appendChild(setRating_star_1);

		let setRating_star_2 = document.createElement("li");
		setRating_star_2.classList.add("rating-star");
		setRating.appendChild(setRating_star_2);

		let setRating_star_3 = document.createElement("li");
		setRating_star_3.classList.add("rating-star");
		setRating.appendChild(setRating_star_3);

		let setRating_star_4 = document.createElement("li");
		setRating_star_4.classList.add("rating-star");
		setRating.appendChild(setRating_star_4);

		let setRating_star_5 = document.createElement("li");
		setRating_star_5.classList.add("rating-star");
		setRating.appendChild(setRating_star_5);

		if (rating < 1) {
			setRating_star_1.classList.add("rating-star");
		} else if (rating == 1 || rating < 2) {
			setRating_star_1.classList.add("active");
		} else if (rating == 2 || rating < 3) {
			setRating_star_1.classList.add("active");
			setRating_star_2.classList.add("active");
		} else if (rating == 3 || rating < 4) {
			setRating_star_1.classList.add("active");
			setRating_star_2.classList.add("active");
			setRating_star_3.classList.add("active");
		} else if (rating == 4 || rating < 5) {
			setRating_star_1.classList.add("active");
			setRating_star_2.classList.add("active");
			setRating_star_3.classList.add("active");
			setRating_star_4.classList.add("active");
		} else {
			setRating_star_1.classList.add("active");
			setRating_star_2.classList.add("active");
			setRating_star_3.classList.add("active");
			setRating_star_4.classList.add("active");
			setRating_star_5.classList.add("active");
		}

		challenge_item.appendChild(setRating);

		let setParticipants = document.createElement("small");
		setParticipants.classList.add("challenge-meta");
		setParticipants.innerHTML = `${minParticipants} - ${maxParticipants} participants`;
		challenge_item.appendChild(setParticipants);

		let setDescription = document.createElement("p");
		setDescription.classList.add("challenge-description");
		setDescription.textContent = description;
		challenge_item.appendChild(setDescription);

		let btnBook = document.createElement("button");
		btnBook.classList.add("btnBook");

		btnBook.setAttribute("data-id", id);

		if (type == "onsite") {
			btnBook.textContent = "Take challenge online";
		} else {
			btnBook.textContent = "Book this room";
		}
		challenge_item.appendChild(btnBook);

		btnBook.addEventListener("click", function () {
			//console.log(id);
			// referens till bokningsfunktion
		});

		challenge_list.appendChild(challenge_item);

		//console.log(title);
	}
}

function doNotReload(e) {
	// do not want the form to reload the browser window if submitted
	e.preventDefault();
}

function clearFilter() {
	// this function should restore all filters and use the original array to display the rooms
	filterForm.reset();
	showAllChallenges(resultFromAPI);
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
	console.log("use all filters");
	let filteredData = []; // reset array so it can be repopulated after the filter is applied

	const formData = getFormData();

	resultFromAPI.forEach((entry) => {
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

	showAllChallenges(filteredData);
}
