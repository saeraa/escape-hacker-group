
// Strunta i att göra objekt, göra en array istället?
/*const challengeCard = {
    title: "" ,
    description: "" ,
    type: "" ,
    minParticipants: "" ,
    maxParticipants: "" ,
    rating: "" ,
    urlPicture: "" ,
    labelList: ""
};*/

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
            //console.log(challenge.rating);   
            });

            // Anropa funktion härifrån för att bygga upp listan och visa på challenges.html?
            // Typ showAllChallenges()
        };
    

    function showAllChallenges () {

        let challenges = document.getElementById('challenge-list')

        // Appenda till listan här
    };
