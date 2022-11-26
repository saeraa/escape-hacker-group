import { getDataFromAPI } from "./getDataFromAPI.js";

// getDataFromAPI returns an array with all the API data
// console.log(await getDataFromAPI());

document.querySelector(".main-nav-toggle").addEventListener("click", () => {
	document.querySelector(".main-nav").classList.toggle("open");
});

document.querySelector("h1").addEventListener("click", () => {
	window.location.href = "index.html";
});
