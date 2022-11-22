const openModalBtn = document.querySelector('.open-modal-btn');
openModalBtn.addEventListener("click", openModal);


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
        console.log('modal two opened');

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
    
    let openModalStepThreeBtn = document.querySelector(".open-modal-step-3");
    openModalStepThreeBtn.addEventListener("click", 
    openModalStepThree);

    function openModalStepThree(e) {

        e.preventDefault();
        console.log('modal three opened');

        modalDiv.innerHTML = `
        <div class="bookingStep3Content">
            <h1>Thank you!</h1>
            <a href="">Back to challenges</a>
         </div>
        `;

    }
}
}

