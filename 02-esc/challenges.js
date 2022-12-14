import { getDataFromAPI } from "./getDataFromAPI.js";
import { showAllChallenges } from "./showAllChallenges.js";
import {
	filterRating,
	filterSearch,
	filterType,
	filterLabels
} from "./filters.js";

document.querySelector(".main-nav-toggle").addEventListener("click", () => {
	document.querySelector(".main-nav").classList.toggle("open");
});

const menuItems = document.querySelectorAll(".main-menu-item");
menuItems.forEach((item) => {
	item.addEventListener("click", () => {
		document.querySelector(".main-nav").classList.remove("open");
	});
});

document.querySelector("h1").addEventListener("click", () => {
	window.location.href = "index.html";
});

const challenges_list = document.querySelector(".challenge-list");
const openFilterBtn = document.querySelector("#btnFilterChallenges");
const closeFilterBtn = document.querySelector(".filter-close");

function toggleFilter() {
	filterForm.classList.toggle("open");
	if (filterForm.classList.contains("open")) {
		openFilterBtn.style.display = "none";
	} else {
		openFilterBtn.style.display = "block";
	}
}

openFilterBtn.addEventListener("click", toggleFilter);
closeFilterBtn.addEventListener("click", toggleFilter);

const filterForm = document.querySelector(".filter-form");
const searchFilterInput = document.querySelector("input[type='search']");
const clearFilterBtn = document.querySelector(".filter-clear");

clearFilterBtn.addEventListener("click", clearFilter);
filterForm.addEventListener("submit", doNotReload);
filterForm.addEventListener("change", useAllFilters);
searchFilterInput.addEventListener("keyup", useAllFilters);

let resultFromAPI = [];

window.addEventListener("load", getChallengesAPI);

let previousUrl = "";

let observer = new MutationObserver(function (m) {
	if (location.href !== previousUrl) {
		previousUrl = location.href;
	}
});

observer.observe(document.querySelector("body"), {
	childList: true,
	subtree: true
});

function checkToApplyFilter() {
	const inputs = document.querySelectorAll("input[type=checkbox]");

	if (window.location.search) {
		const currentURL = window.location.search;
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
	showAllChallenges(resultFromAPI, challenges_list);
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
	showAllChallenges(resultFromAPI, challenges_list);
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

	showAllChallenges(filteredData, challenges_list);
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
