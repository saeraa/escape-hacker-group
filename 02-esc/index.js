import { getDataFromAPI } from "./getDataFromAPI.js";


// getDataFromAPI returns an array with all the API data
// console.log(await getDataFromAPI());


/* Testing in challenge.html site first */



 let resFromAPI = []; 
 let ratings = [];


// First get all API data from getDataFromAPI

 resFromAPI = await getDataFromAPI(); 

 //console.log(getDataFromAPI.rating);


// Then select the three highest rating-star with an if statements

  function getThreeHighestRatingStar(resFromAPI){

  for(let i = 0; i < resFromAPI.length; i++){

     ratings = resFromAPI[i].rating;
     console.log(ratings);
  }

  


}  

getThreeHighestRatingStar(resFromAPI);



/* setThreeHighestRate(); */





// and then show them in site index.html.
