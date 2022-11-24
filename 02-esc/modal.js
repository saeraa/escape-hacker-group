const openModalBtn = document.querySelector('.open-modal-btn');
openModalBtn.addEventListener("click", openModal);

let customerName;
let eMail;
let time;
let participants;



function openModal() {
    let body = document.querySelector('body');
    let modalDiv = document.createElement('div');
    modalDiv.className = 'modal-div';
    modalDiv.innerHTML = `
        <div class="bookingStep1Content">
        <h1>Book room "Title of room" (step 1)</h1>
        <h2>What date would you like to come?</h2>
        <form action="">
            <label class="booking-date-label" for="date">Date</label>
            <input class="input-field" type="date" name="date">
            <input id="firstButton" type="submit" value="Search available times" class="button primary open-modal-step-2">
        </form>
        </div>
    `;
    body.appendChild(modalDiv);


    let openModalStepTwoBtn = document.querySelector(".open-modal-step-2");
    openModalStepTwoBtn.addEventListener("click", 
    openModalStepTwo);

    function openModalStepTwo(e) {

        e.preventDefault();

        modalDiv.innerHTML = `
            <div class="bookingStep2Content">
            <h1>Book room "Title of room" (step 2)</h1>
            <form action="">
                <label for="name">Name</label>
                <input class="input-field" type="text" id="name" name="name">
                <label for="e-mail">E-mail</label>
                <input class="input-field" type="email" id="e-mail" name="e-mail">
                <label for="time">What time?</label>
                <input class="input-field" type="time" name="time" id="time">
                <label for="participants">How many participants?</label>
                <select class="input-field" name="participants" id="participants">
                    <option value="2">2 participants</option>
                    <option value="3">3 participants</option>
                    <option value="4">4 participants</option>
                    <option value="5">5 participants</option>
                    <option value="6">6 participants</option>
                </select>
                <input class="button primary open-modal-step-3" type="submit" value="Submit booking">
            </form>
            </div>
        `;
    
    function getBookingInformationFromForm() {

        customerName = document.querySelector('#name').value;
        eMail = document.querySelector('#e-mail').value;
        time = document.querySelector('#time').value;
        participants = parseInt(document.querySelector('#participants').value);
    }
    
         
    let openModalStepThreeBtn = document.querySelector(".open-modal-step-3");
    openModalStepThreeBtn.addEventListener("click", getBookingInformationFromForm);
    openModalStepThreeBtn.addEventListener("click", makeBooking);
    
    openModalStepThreeBtn.addEventListener("click", openModalStepThree);

    function openModalStepThree(e) {

        e.preventDefault();

        modalDiv.innerHTML = `
        <div class="bookingStep3Content">
            <h1>Thank you!</h1>
            <a href="">Back to challenges</a>
         </div>
        `;

    }
}
}


async function makeBooking() {

const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/booking/reservations', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        challenge: 12,
        name: customerName,
        email: eMail,
        date: "2022-12-12",
        time: time,
        participants: participants,
    }),
});
const data = await res.json();
console.log(data);

}
