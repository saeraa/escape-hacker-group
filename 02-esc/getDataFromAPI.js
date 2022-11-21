window.addEventListener("load", getDataFromAPI);

let dataFromAPI = [];

async function getDataFromAPI() {
	const res = await fetch(
		"https://lernia-sjj-assignments.vercel.app/api/challenges"
	);
	const data = await res.json();
	data.challenges.forEach((challenge) => {
		dataFromAPI.push(challenge);
	});
	return dataFromAPI;
}

export { getDataFromAPI };
