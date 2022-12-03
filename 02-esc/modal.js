let customerName;
let eMail;
let time;
let participants;
let date;
let idVariabelForModal;
let minParticipantsVaribelForModal;
let maxParticipantsVaribaleForModal;
let modalDiv;
let roomTitleforModal;

// -- MODAL STEP 1 --

export function openModal(e) {
	const currentDate = new Date().toLocaleDateString();
	idVariabelForModal = parseInt(e.target.dataset.id);
	minParticipantsVaribelForModal = e.target.dataset.minparticipants;
	maxParticipantsVaribaleForModal = e.target.dataset.maxparticipants;
	roomTitleforModal = e.target.dataset.title;
	let body = document.querySelector("body");
	modalDiv = document.createElement("div");
	modalDiv.className = "modal-div";
	modalDiv.innerHTML = `
		<div class="modalContents">
        <div class="bookingStep1Content">
        <form action="">
        <h1>Book room "${roomTitleforModal}" (step 1)</h1>
        <h2>What date would you like to come?</h2>
            <label class="modalInputLabels" for="date">Date</label>
			
            <input id="date" class="input-field" type="date" name="date"
            min="${currentDate}">
            <input id="firstButton" type="submit" value="Search available times" class="button primary open-modal-step-2">
        </form>
        </div>
		</div>
    `;
	body.appendChild(modalDiv);

	let openModalStepTwoBtn = document.querySelector(".open-modal-step-2");
	openModalStepTwoBtn.addEventListener("click", checkModalStepOneInput);

	if ((document.querySelector(".modal-div").style.position = "fixed")) {
		document.querySelector("body").style.overflow = "hidden";
	}
}

function checkModalStepOneInput(e) {
	e.preventDefault();
	let ok = false;
	let dateInput = document.querySelector("#date");

	if (dateInput.value == "") {
		dateInput.style.outline = "solid 2px red";
		dateInput.addEventListener("click", normalBorderColor);

		function normalBorderColor() {
			dateInput.style.outline = "none";
		}
	}
	if (dateInput.value !== "") {
		ok = true;
	}
	if (ok) {
		getDateFromForm(e);
		openModalStepTwo(e);
	}
}

function getDateFromForm() {
	date = document.querySelector("#date").value;
	checkAvailableTimes(date, idVariabelForModal);
}

async function checkAvailableTimes(selectedDate, challengeId) {
	const res = await fetch(
		`https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=${selectedDate}&challenge=${challengeId}`
	);
	const data = await res.json();
	data.slots.forEach((slot) => {
		showAvailableTimes(slot);
	});
}

// -- MODAL STEP 2 --

function showAvailableTimes(slot) {
	let option = document.createElement("option");
	option.innerHTML = slot;
	let select = document.querySelector("#time");
	select.appendChild(option);
}

function possibleNumberOfParticipants(min, max) {
	let numberOfOptions = max - min;

	for (let i = 0; i <= numberOfOptions; i++) {
		createOptionForParticipants();
		min++;
	}

	function createOptionForParticipants() {
		let participantsOption = document.createElement("option");
		participantsOption.innerHTML = `${min} participants`;
		let participantsSelect = document.querySelector("#participants");
		participantsSelect.appendChild(participantsOption);
	}
}

function openModalStepTwo(e) {
	e.preventDefault();
	modalDiv.innerHTML = `
		<div class="modalContents">
        <div class="bookingStep2Content">
        <form action="">
        <h1>Book room "${roomTitleforModal}" (step 2)</h1>
            <label class="modalInputLabels" for="name">Name</label>
						<input class="input-field" type="text" id="name" name="name">
						<label class="modalInputLabels" for="e-mail">E-mail</label>
						<input class="input-field" type="email" id="e-mail" name="e-mail">
						<label class="modalInputLabels" for="time">What time?</label>
						<select class="input-field" name="time" id="time">
            </select>
						<label class="modalInputLabels" for="participants">How many participants?</label>
						<select class="input-field" name="participants" id="participants">
            </select>
            <input id="secondButton" class="button primary open-modal-step-3" type="submit" value="Submit booking">
        </form>
        </div>
		</div>
    `;

	possibleNumberOfParticipants(
		minParticipantsVaribelForModal,
		maxParticipantsVaribaleForModal
	);

	let openModalStepThreeBtn = document.querySelector(".open-modal-step-3");
	openModalStepThreeBtn.addEventListener("click", checkModalStepTwoInput);
}

function checkModalStepTwoInput(e) {
	e.preventDefault();
	let ok = false;
	let nameInput = document.querySelector("#name");
	let emailInput = document.querySelector("#e-mail");

	if (nameInput.value == "") {
		nameInput.style.outline = "solid 2px red";
		nameInput.addEventListener("click", normalBorderColor);

		function normalBorderColor() {
			nameInput.style.outline = "none";
		}
	} else if (emailInput.value == "") {
		emailInput.style.outline = "solid 2px red";
		emailInput.addEventListener("click", normalBorderColor);

		function normalBorderColor() {
			emailInput.style.outline = "none";
		}
	} else {
		ok = true;
	}
	if (ok) {
		getBookingInformationFromForm(e);
		makeBooking(e);
		openModalStepThree(e);
	}
}

// -- MODAL STEP 3 --

function openModalStepThree(e) {
	e.preventDefault();
	modalDiv.innerHTML = `
	<div class="modalContents">
	<div class="bookingStep3Content">
    <h1>Thank you!</h1>
    <a href="challenges.html">Back to challenges</a>
    </div>
	</div>
`;
}

function getBookingInformationFromForm() {
	customerName = document.querySelector("#name").value;
	eMail = document.querySelector("#e-mail").value;
	time = document.querySelector("#time").value;
	participants = parseInt(document.querySelector("#participants").value);
}

async function makeBooking() {
	const res = await fetch(
		"https://lernia-sjj-assignments.vercel.app/api/booking/reservations",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				challenge: idVariabelForModal,
				name: customerName,
				email: eMail,
				date: date,
				time: time,
				participants: participants
			})
		}
	);
	const data = await res.json();
}
