

const testBtn = document.querySelector(".testBtn");
testBtn.addEventListener("click", getChallengesAPI);

let resultFromAPI = []; 

const challenge_list = document.querySelector('.challenge-list');

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
            challenge_item.classList.add('.challenge-item');
            
            let setImage = document.createElement("img");
            setImage.classList.add('.challenge-image');
            setImage.src = image;
            challenge_item.append(setImage);

            // Add setRating-number to site

            let setRating = document.createElement("ul");
            setRating.classList.add('.rating');
            setRating.innerHTML =  `${rating}`;
            challenge_item.appendChild(setRating);

            // Add ratingStar to site
            // fortsätter imorgon med rating star problemet
            // Jag har lokaliserat den tomma rutan och knappen, det är ju själva sectionen
            // class "challenges" som är problemet. 

            








            let setTitle = document.createElement("h3");
            setTitle.classList.add('.challenge-title');
            setTitle.textContent = title;
            challenge_item.appendChild(setTitle);

            let setParticipants = document.createElement("small");
            setParticipants.classList.add('.challenge-meta');
            setParticipants.innerHTML = `${minParticipants} - ${maxParticipants} participants`;
            challenge_item.appendChild(setParticipants);

            let setDescription = document.createElement("p");
            setDescription.classList.add('.challenge-description');
            setDescription.textContent = description;
            challenge_item.appendChild(setDescription);

            let btnBook = document.createElement("button");
            btnBook.classList.add('.btnBook');

                
                if (resultFromAPI.type = 'onsite') {
                    btnBook.textContent = 'Take challenge online';
                } else {
                    btnBook.textContent = 'Book this room';
                }

            challenge_item.appendChild(btnBook);

            btnBook.addEventListener("click", function(){
                console.log('Knapptryck');
            });
            
    
            challenge_list.appendChild(challenge_item);
            

            console.log(title);
      
    };

}  