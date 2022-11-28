import { getDataFromAPI } from "./getDataFromAPI.js";
import { openModal } from "./modal.js";
import {
	filterRating,
	filterSearch,
	filterType,
	filterLabels
} from "./filters.js";

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

window.addEventListener("hashchange", checkToApplyFilter);
window.addEventListener("load", getChallengesAPI);

function checkToApplyFilter() {
	const inputs = document.querySelectorAll("input[type=checkbox]");

	if (window.location.hash) {
		const currentURL = window.location.hash;
		let event = new Event("change");
		if (currentURL.includes("all")) {
			filterForm.reset();
			filterForm.dispatchEvent(event);
		} else if (currentURL.includes("online")) {
			setTimeout(() => {
				if (inputs[1].checked) inputs[1].checked = false;
				inputs[0].checked = true;
				filterForm.dispatchEvent(event);
			}, 200);
		} else if (currentURL.includes("onsite")) {
			setTimeout(() => {
				if (inputs[0].checked) inputs[0].checked = false;
				inputs[1].checked = true;
				filterForm.dispatchEvent(event);
			}, 200);
		}
	}
}

async function getChallengesAPI() {
	checkToApplyFilter();

	let tagsCollection = new Set();
	resultFromAPI.length = 0;
	resultFromAPI = await getDataFromAPI();
	resultFromAPI.forEach((challenge) => {
		challenge.labels.forEach((label) => {
			tagsCollection.add(label);
		});
	});
	showAllChallenges(resultFromAPI);
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

function showAllChallenges(resultFromAPI) {
	challenge_list.innerHTML = "";
	if (resultFromAPI.length == 0) {
		challenge_list.innerHTML =
			"<p class='filter-error'>No matching challenges.</p>";
		return;
	}

	for (let i = 0; i < resultFromAPI.length; i++) {
	
		const {id, type, rating, title, description, minParticipants, maxParticipants, image, labels,} = resultFromAPI[i]; 

		let challenge_item = document.createElement("li");
		challenge_item.classList.add("challenge-item");

		let setImage = document.createElement("img");
		setImage.classList.add("challenge-image");
		setImage.src = image;
		challenge_item.append(setImage);

		let setRoomImage = document.createElement("img");
		setRoomImage.classList.add("room-image");
		if (type == "onsite") {
			setRoomImage.src = "static/iconOnsite.svg";
		} else {
			setRoomImage.src = "static/iconOnline.svg";
		}
		challenge_item.append(setRoomImage);

		let setTitle = document.createElement("h3");
		setTitle.classList.add("challenge-title");
		setTitle.textContent = title;
		challenge_item.appendChild(setTitle);

		let setRating = document.createElement("ul");
		setRating.classList.add("rating");

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
		btnBook.classList.add("btnBook", "button", "primary");

		btnBook.setAttribute("data-id", id);
		btnBook.setAttribute("data-minparticipants", minParticipants);
		btnBook.setAttribute("data-maxparticipants", maxParticipants);

		if (type == "onsite") {
			btnBook.textContent = "Book this room";
		} else {
			btnBook.textContent = "Take challenge online";
		}
		challenge_item.appendChild(btnBook);

		btnBook.addEventListener("click", openModal);

		challenge_list.appendChild(challenge_item);
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
	fixRatings();
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

let id;

function fixRatings() {
	// - på stjärnorna bör man inte kunna välja lägre på den högra skalan. till exempel 4 till 2 stjärnor.
	const stars = document.querySelectorAll("input[type=radio]");
	stars.forEach((star) => {
		star.disabled = false;
	});

	id = null;

	stars.forEach((star) => {
		if (star.name.includes("min") && star.checked) {
			id = star.value;
		}
		if (star.name.includes("max") && +star.value < +id) {
			star.disabled = true;
		}
		if (star.name.includes("max") && +star.value < +id) {
			star.checked = false;
		}
	});
}
