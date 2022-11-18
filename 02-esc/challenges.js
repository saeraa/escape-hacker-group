
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
        let testVisning = document.getElementById('.challenge-title') 

        

        for (i = 0; i < resultFromAPI.length; i++) {
             let title = resultFromAPI[i].title; 
            
             console.log(title); 
            
            
            // Enligt nedan kan en ju inte hålla på - tips?
            /*
            let card = document.createElement("li");
            let id = document.createElement("span");
            o.s.v. för att sen appenda
            */

           
            // Jag har testat lite men hade inte så mycket tid idag men har återställt allt nu som det var. Jag testar mera morgon såklart.

            // Det här kommer att gå bra tillslut. 
            
        } 
       
        
        
        
       
    };
