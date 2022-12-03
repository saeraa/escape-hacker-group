
import { getDataFromAPI } from "./getDataFromAPI.js";
import { showAllChallenges } from "./showAllChallenges.js";
const testBtn = document.querySelector(".testBtn");
//testBtn.addEventListener("click", getChallengesAPI);
const challenge_list = document.querySelector('.challenge-list');
// const challenges_visiility = document.querySelector('.challenges'); 

//const section_challenges = document.querySelector('.challenges');


let resultFromAPI = []; 

window.onload = getChallengesAPI();

async function getChallengesAPI() {
    resultFromAPI = await getDataFromAPI();

    showAllChallenges(resultFromAPI, challenge_list);
};