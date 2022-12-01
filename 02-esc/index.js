/* import { info } from "sass"; */
import { getDataFromAPI } from "./getDataFromAPI.js";


// getDataFromAPI returns an array with all the API data
// console.log(await getDataFromAPI());


/* Testing in challenge.html site first */



 let resFromAPI = []; 
 let ratings;


// First get all API data from getDataFromAPI

 resFromAPI = await getDataFromAPI(); 

 //console.log(getDataFromAPI.rating);

 //ratings = resFromAPI.rating;

 //console.log(resFromAPI[0].rating);



// Then select the three highest rating-star with an if statements

  function getThreeHighestRatingStar(resFromAPI){

    // local variables

    let highest = -Infinity;
    let secondHighest = -Infinity;
    let thirdHighest = -Infinity;
    let r;

    // get the first highest rating-star

    for(let n = 0; n < resFromAPI.length; n++){

       r = resFromAPI[n].rating;

      highest = Math.max(highest, r);
      
    }
    console.log(highest);


    // get the second-highest rating-star  
  
  
    for(let n = 0; n < resFromAPI.length; n++){

      r = resFromAPI[n].rating;

      if(r < highest){        
  
        secondHighest = Math.max(secondHighest, r);
      }
    }
    console.log(secondHighest);


    // get the third highest rating-star  
  
  
    for(let n = 0; n < resFromAPI.length; n++){

      r = resFromAPI[n].rating;

      if(r < secondHighest){
  
        thirdHighest = Math.max(thirdHighest, r);
      }
    }
    console.log(thirdHighest);



    
  

  for(let i = 0; i < resFromAPI.length; i++){

    ratings = resFromAPI[i].rating;

    
    

    // create dynamic li-element

    let challenge_item = document.createElement('li');
    challenge_item.classList.add('challenge-item');


    // create dynamic ul 

    let setRatingUl = document.createElement('ul');
    setRatingUl.classList.add('rating');

    // create dynamic li elements

    let setRatingStar1 = document.createElement('li');
    setRatingStar1.classList.add('rating-star');
    setRatingUl.appendChild(setRatingStar1);

    let setRatingStar2 = document.createElement('li');
    setRatingStar2.classList.add('rating-star');
    setRatingUl.appendChild(setRatingStar2);

    let setRatingStar3 = document.createElement('li');
    setRatingStar3.classList.add('rating-star');
    setRatingUl.appendChild(setRatingStar3);

    let setRatingStar4 = document.createElement('li');
    setRatingStar4.classList.add('rating-star');
    setRatingUl.appendChild(setRatingStar4);

    let setRatingStar5 = document.createElement('li');
    setRatingStar5.classList.add('rating-star');
    setRatingUl.appendChild(setRatingStar5);

    if(ratings == 2 || ratings < 3){

      // print out between 2 < 3
      setRatingStar1.classList.add('active');
      setRatingStar2.classList.add('active');
    }


    else if(ratings == 3 || ratings < 4 ){

      // Print out between 3 < 4
      setRatingStar1.classList.add('active');
      setRatingStar2.classList.add('active');
      setRatingStar3.classList.add('active');
      
    }
    else if(ratings == 4 || ratings < 5){

      // print out between 4 < 5
      setRatingStar1.classList.add('active');
      setRatingStar2.classList.add('active');
      setRatingStar3.classList.add('active');
      setRatingStar4.classList.add('active');
    }
    else if(ratings == 5){

      // print out 5
      setRatingStar1.classList.add('active');
      setRatingStar2.classList.add('active');
      setRatingStar3.classList.add('active');
      setRatingStar4.classList.add('active');
      setRatingStar5.classList.add('active');
    
    }

    // adding ul to li in card

    challenge_item.appendChild(setRatingUl);

     
     //console.log(ratings);
  }

  


}  

// execute function

getThreeHighestRatingStar(resFromAPI);



/* setThreeHighestRate(); */





// and then show them in site index.html.
