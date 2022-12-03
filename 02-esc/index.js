import { getDataFromAPI } from "./getDataFromAPI.js";
import { showAllChallenges } from "./showAllChallenges.js";

const challenge_list = document.querySelector('.challenge-list');

let resFromAPI = await getDataFromAPI();

function sortRatingArray(resFromAPI){ 

  resFromAPI.sort(function(a, b){
    return b.rating - a.rating
  });
    
  let newArray = [];
  newArray.push(resFromAPI[0], resFromAPI[1], resFromAPI[2]);

  showAllChallenges(newArray, challenge_list);
}

sortRatingArray(resFromAPI);

document.querySelector(".main-nav-toggle").addEventListener("click", () => {
	document.querySelector(".main-nav").classList.toggle("open");
});

document.querySelector("h1").addEventListener("click", () => {
	window.location.href = "index.html";
});
