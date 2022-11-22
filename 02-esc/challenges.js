

const testBtn = document.querySelector(".testBtn");
testBtn.addEventListener("click", getChallengesAPI);

const challenge_list = document.querySelector('.challenge-list');

//const section_challenges = document.querySelector('.challenges');


let resultFromAPI = []; 



    async function getChallengesAPI() {
        const resultList = await fetch(
            "https://lernia-sjj-assignments.vercel.app/api/challenges"
        );
         const result = await resultList.json(); 
    
        result.challenges.forEach((challenge) => {
            resultFromAPI.push(challenge);
            });

            showAllChallenges(resultFromAPI);
        };
    

    function showAllChallenges (resultFromAPI) {
    
        for (i = 0; i < resultFromAPI.length; i++) {
            let id = resultFromAPI[i].id;
            let type = resultFromAPI[i].type;
            let rating = resultFromAPI[i].rating;
            let title = resultFromAPI[i].title; 
            let description = resultFromAPI[i].description;
            let minParticipants = resultFromAPI[i].minParticipants;
            let maxParticipants = resultFromAPI[i].maxParticipants;
            let image = resultFromAPI[i].image; 
            let labels = resultFromAPI[i].labels;

            /*let challenge_list = document.createElement("ul");
            challenge_list.classList.add('challenge-list');*/

            let challenge_item = document.createElement("li");
            challenge_item.classList.add('challenge-item');
            
            let setImage = document.createElement("img");
            setImage.classList.add('challenge-image');
            setImage.src = image;
            challenge_item.append(setImage);

            let setRating = document.createElement("ul");
            setRating.classList.add('rating');



            /* Dålig lösning. Hade en loop för skapandet av listelementet, men tröttnade... */
            let setRating_star_1 = document.createElement("li");
            setRating_star_1.classList.add('rating-star');
            setRating.appendChild(setRating_star_1);

            let setRating_star_2 = document.createElement("li");
            setRating_star_2.classList.add('rating-star');
            setRating.appendChild(setRating_star_2);

            let setRating_star_3 = document.createElement("li");
            setRating_star_3.classList.add('rating-star');
            setRating.appendChild(setRating_star_3);

            let setRating_star_4 = document.createElement("li");
            setRating_star_4.classList.add('rating-star');
            setRating.appendChild(setRating_star_4);

            let setRating_star_5 = document.createElement("li");
            setRating_star_5.classList.add('rating-star');
            setRating.appendChild(setRating_star_5);


            
            /* Tråkig if-sats, men den borde fungera. Måste kunna byta klass på stjärnorna dock,
               men hajar inte riktigt då det är "space" i klassnamnet och får felmeddelande om det. */

            /*if (rating == 1 & < 2) {
                setRating_star_1.classList.add('rating-star active');  
            } else if (rating == 2 & < 3) {
                setRating_star_1.classList.add('rating-star active');
                setRating_star_2.classList.add('rating-star active');
            } else if (rating == 3 & < 4) {
                setRating_star_1.classList.add('rating-star active');
                setRating_star_2.classList.add('rating-star active');
                setRating_star_3.classList.add('rating-star active');
            } else if (rating == 4 & < 5) {
                setRating_star_1.classList.add('rating-star active');
                setRating_star_2.classList.add('rating-star active');
                setRating_star_3.classList.add('rating-star active');
                setRating_star_4.classList.add('rating-star active');
            } else {
                setRating_star_1.classList.add('rating-star active');
                setRating_star_2.classList.add('rating-star active');
                setRating_star_3.classList.add('rating-star active');
                setRating_star_4.classList.add('rating-star active');
                setRating_star_5.classList.add('rating-star active'); 
            }*/
            
            
            challenge_item.appendChild(setRating);
            
            // Payriks:
            /*Add setRating-number to site

            let setRating = document.createElement("ul");
            setRating.classList.add('rating');
            setRating.innerHTML =  `${rating}`;
            challenge_item.appendChild(setRating);

            // Add ratingStar to site
            // fortsätter imorgon med rating star problemet
            // Jag har lokaliserat den tomma rutan och knappen, det är ju själva sectionen
            // class "challenges" som är problemet.*/ 



            let setTitle = document.createElement("h3");
            setTitle.classList.add('challenge-title');
            setTitle.textContent = title;
            challenge_item.appendChild(setTitle);

            let setParticipants = document.createElement("small");
            setParticipants.classList.add('challenge-meta');
            setParticipants.innerHTML = `${minParticipants} - ${maxParticipants} participants`;
            challenge_item.appendChild(setParticipants);

            let setDescription = document.createElement("p");
            setDescription.classList.add('challenge-description');
            setDescription.textContent = description;
            challenge_item.appendChild(setDescription);

            let btnBook = document.createElement("button");
            btnBook.classList.add('btnBook');
                
                if (type == 'onsite') {
                    btnBook.textContent = 'Take challenge online';
                } else {
                    btnBook.textContent = 'Book this room';
                }
            challenge_item.appendChild(btnBook);

            btnBook.addEventListener("click", function(){
                console.log('Knapptryck');
            });
            
    
            challenge_list.appendChild(challenge_item);
            

            console.log(rating);
      
    };

}  