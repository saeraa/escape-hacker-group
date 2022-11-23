
const testBtn = document.querySelector(".testBtn");
//testBtn.addEventListener("click", getChallengesAPI);
const challenge_list = document.querySelector('.challenge-list');
let resultFromAPI = []; 

window.onload = getChallengesAPI();
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

            let challenge_item = document.createElement("li");
            challenge_item.classList.add('challenge-item');
            
            let setImage = document.createElement("img");
            setImage.classList.add('challenge-image');
            setImage.src = image;
            challenge_item.append(setImage);

            let setRoomImage = document.createElement("img");
            setRoomImage.classList.add('room-image');
                if (type == 'onsite') {
                    setRoomImage.src = "static/iconOnsite.svg";
                } else {
                    setRoomImage.src = "static/iconOnline.svg";
                }
            challenge_item.append(setRoomImage);

            let setRating = document.createElement("ul");
            setRating.classList.add('rating');

            /* I måpn av tid på slutet, fixa loop */
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
            
            if (rating < 1) {
                setRating_star_1.classList.add('rating-star');
            } else if (rating == 1 || rating < 2) {
                setRating_star_1.classList.add('active');
            } else if (rating == 2  || rating < 3) {
                setRating_star_1.classList.add('active');
                setRating_star_2.classList.add('active');    
            } else if (rating == 3  || rating < 4) {
                setRating_star_1.classList.add('active');
                setRating_star_2.classList.add('active');
                setRating_star_3.classList.add('active');
            } else if (rating == 4  || rating < 5) {
                setRating_star_1.classList.add('active');
                setRating_star_2.classList.add('active');
                setRating_star_3.classList.add('active');
                setRating_star_4.classList.add('active');
            } else {
                setRating_star_1.classList.add('active');
                setRating_star_2.classList.add('active');
                setRating_star_3.classList.add('active');
                setRating_star_4.classList.add('active');
                setRating_star_5.classList.add('active'); 
            }
            
            challenge_item.appendChild(setRating);
            
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

            //btnBook.setAttribute("data-id", resultFromAPI.id);
                
                if (type == 'onsite') {
                    btnBook.textContent = 'Take challenge online';
                } else {
                    btnBook.textContent = 'Book this room';
                }
            challenge_item.appendChild(btnBook);

            btnBook.addEventListener("click", function(){
                console.log(id);
            });

    
            challenge_list.appendChild(challenge_item);
            
            console.log(title);
      
    };



}  