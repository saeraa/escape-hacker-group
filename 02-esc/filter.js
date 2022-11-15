const form = document.querySelector("form");
const searchInput = document.querySelector("input[type='search']");

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
}
