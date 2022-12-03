/* import { info } from "sass";  */
import { getDataFromAPI } from "./getDataFromAPI.js";
import { showAllChallenges } from "./showAllChallenges.js";

const challenge_list = document.querySelector('.challenge-list');


// getDataFromAPI returns an array with all the API data
//console.log(await getDataFromAPI());


/* Testing in challenge.html site first */



 let resFromAPI = []; 
 let ratings;
 let sortRating = [];
 let output = [];

resFromAPI = await getDataFromAPI();

function sortRatingArray(resFromAPI){ 

  
  resFromAPI.sort(function(a, b){
      return b.rating - a.rating
    });

    
    let newArray = [];
    newArray.push(resFromAPI[0], resFromAPI[1], resFromAPI[2]);
    
  
  showAllChallenges(newArray, challenge_list);
}

sortRatingArray(resFromAPI);
