
// Testknapp för att kolla att data laddas från API
const testBtn = document.querySelector(".testBtn");
testBtn.addEventListener("click", getChallengesAPI);

// Array för att spara ned data från API
let resultFromAPI = []; 


    async function getChallengesAPI() {
        const resultList = await fetch(
            "https://lernia-sjj-assignments.vercel.app/api/challenges"
        );
         const result = await resultList.json(); 
    
        result.challenges.forEach((challenge) => {
            resultFromAPI.push(challenge);
            //console.log(challenge.description);   
            //console.log(resultFromAPI);
            });

            // Anropar funktion för att bygga upp listan och visa på challenges.html
            showAllChallenges(resultFromAPI);
        };
    

    function showAllChallenges (resultFromAPI) {
        //console.log(resultFromAPI[2].title);

        let challenges = document.getElementById('challenge-list')
        

        

        for (i = 0; i < resultFromAPI.length; i++) {
            let id = resultFromAPI[i].id;
            let type = resultFromAPI[i].type;
            
            let image = resultFromAPI[i].image; // Kolla hur en skriver url:en så att det funkar
            

            let rating = resultFromAPI[i].rating;
            
            let title = resultFromAPI[i].title; 
            let setTitle = document.querySelector('.challenge-title');
            setTitle.innerHTML = title;

            let minParticipants = resultFromAPI[i].minParticipants;
            let maxParticipants = resultFromAPI[i].maxParticipants;

            let description = resultFromAPI[i].description;
            let setDescription = document.querySelector('.challenge-description');
            setDescription.innerHTML = description;
            
            
            
            console.log(rating);
                
        }    
    };

    /* 
    Jag har inte haft tid att greja i princip nånting idag. Men det funkar att visa titel och beskrivning.
    Jag ska klura lite på hur vi får upp bilderna på rätt sätt + hur vi visar antal deltagare (min-max) imorgon, söndag.

    Om du känner att du vill klura på något, så kan du fundera lite på hur vi kan göra med stjärnorna och hur vi 
    presenterar det (alltså bara om du känner ett behov av att göra nåt). Annars tar vi det i veckan
    som kommer, det fixar vi.
    */