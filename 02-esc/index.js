/* import { info } from "sass";  */
import { getDataFromAPI } from "./getDataFromAPI.js";

const challenge_list = document.querySelector('.challenge-list');


// getDataFromAPI returns an array with all the API data
//console.log(await getDataFromAPI());


/* Testing in challenge.html site first */



 let resFromAPI = []; 
 let ratings;


// First get all API data from getDataFromAPI

resFromAPI = await getDataFromAPI();

 //console.log(getDataFromAPI.rating);

 //ratings = resFromAPI.rating;

 //console.log(resFromAPI[0].rating);


 /* control function */

function checkRatingIndex(resFromAPI){

  let r = [];

  for(let i = 0; i < resFromAPI.length; i++){

    r = resFromAPI[i].rating;


    if(r === 4.5){
      return r;
    }
  }
}

console.log(resFromAPI.findIndex(checkRatingIndex));
 


 





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


  /************** creating of card ***************/
    
  

  for(let i = 0; i < resFromAPI.length; i++){

    //ratings = resFromAPI[i].rating;

    let id = resFromAPI[i].id;
    let type = resFromAPI[i].type;
    let title = resFromAPI[i].title;
    let description = resFromAPI[i].description;
    let minParticipants = resFromAPI[i].mindescription;
    let maxParticipants = resFromAPI[i].maxParticipants;
    let image = resFromAPI[i].image;

    
    

    // create dynamic li-element

    let challenge_item = document.createElement('li');
    challenge_item.classList.add('challenge-item');

    let setImage = document.createElement('img');
    setImage.classList.add('challenge-image');
    setImage.src = image;
    challenge_item.append(setImage);

    let setRoomImage = document.createElement('image');
    setRoomImage.classList.add('room-image');
      if(type == 'onsite')
      {
        setRoomImage.src = "static/iconOnline.svg"
      }
      else
      {
        setRoomImage.src = "static/iconicOnsite.svg";
      }

    challenge_item.append(setRoomImage);


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

    if(r == highest){

      // print out between 2 < 3
      setRatingStar1.classList.add('active');
      setRatingStar2.classList.add('active');
      setRatingStar3.classList.add('active');
      setRatingStar4.classList.add('active');
    }


    else if(r < secondHighest){

      // Print out between 3 < 4
      setRatingStar1.classList.add('active');
      setRatingStar2.classList.add('active');
      setRatingStar3.classList.add('active');
      setRatingStar4.classList.add('active');
      
    }
    else if(r < thirdHighest){

      // print out between 4 < 5
      setRatingStar1.classList.add('active');
      setRatingStar2.classList.add('active');
      setRatingStar3.classList.add('active');
      
    }
    

   

    challenge_item.appendChild(setRatingUl);

    let set_Title = document.createElement('h3');
    set_Title.classList.add('challenge-title');
    set_Title.textContent = title;
    challenge_item.appendChild(set_Title);

    let set_Participants = document.createElement('small');
    set_Participants.classList.add('challenge-meta');
    set_Participants.innerHTML = `${minParticipants} - ${maxParticipants} participants`;
    challenge_item.appendChild(set_Participants);

    let set_Description = document.createElement('p');
    set_Description.classList.add('challenge-description');
    set_Description.textContent = description;
    challenge_item.appendChild(set_Description);

    let btn_Book = document.createElement('button');
    btn_Book.classList.add('btnBook');
    btn_Book.setAttribute('data-id', id);

      if(type == 'onsite')
      {
        btn_Book.textContent = 'Take challenge online';
      }else
      {
        btn_Book.textContent = 'Book this room';
      }

    challenge_item.appendChild(btn_Book);

    btn_Book.addEventListener('click', function(){

      // referens till bokningsfunktionen
    });

    challenge_list.appendChild(challenge_item);



   
  }

  


}  

// execute function

getThreeHighestRatingStar(resFromAPI);










