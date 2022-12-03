import { getDataFromAPI } from "./getDataFromAPI.js";
import { showAllChallenges } from "./showAllChallenges.js";
import { openModal } from "./modal.js";
import {
	filterRating,
	filterSearch,
	filterType,
	filterLabels
} from "./filters.js";

document.querySelector(".main-nav-toggle").addEventListener("click", () => {
	document.querySelector(".main-nav").classList.toggle("open");
});

document.querySelector("h1").addEventListener("click", () => {
	window.location.href = "index.html";
});

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

async function getChallengesAPI() {
	resultFromAPI = await getDataFromAPI();

	showAllChallenges(resultFromAPI, challenge_list);
}

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

function doNotReload(e) {
	e.preventDefault();
}

function clearFilter() {
	filterForm.reset();
	showAllChallenges(resultFromAPI);
}

function getFormData() {
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
	let filteredData = [];

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

		if (typeMatches && labelMatches && searchMatches && ratingMatches) {
			filteredData.push(entry);
		}
	});

	showAllChallenges(filteredData);
}

let id;

function fixRatings() {
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
