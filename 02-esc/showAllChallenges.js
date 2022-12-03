import { openModal } from "./modal.js";

export function showAllChallenges(resultFromAPI, challenge_list) {
	challenge_list.innerHTML = "";
	if (resultFromAPI.length == 0) {
		challenge_list.innerHTML =
			"<p class='filter-error'>No matching challenges.</p>";
		return;
	}

	for (let i = 0; i < resultFromAPI.length; i++) {
		const {
			id,
			type,
			rating,
			title,
			description,
			minParticipants,
			maxParticipants,
			image
		} = resultFromAPI[i];

		let challenge_item = document.createElement("li");
		challenge_item.classList.add("challenge-item");

		let setImage = document.createElement("img");
		setImage.classList.add("challenge-image");
		setImage.src = image;
		challenge_item.append(setImage);

		let setRoomImage = document.createElement("img");
		setRoomImage.classList.add("room-image");
		if (type == "onsite") {
			setRoomImage.src = "static/iconOnsite.svg";
		} else {
			setRoomImage.src = "static/iconOnline.svg";
		}
		challenge_item.append(setRoomImage);

		let setTitle = document.createElement("h3");
		setTitle.classList.add("challenge-title");
		setTitle.textContent = title;
		challenge_item.appendChild(setTitle);

		let setRating = document.createElement("ul");
		setRating.classList.add("rating");

		let setRating_star_1 = document.createElement("li");
		setRating_star_1.classList.add("rating-star");
		setRating.appendChild(setRating_star_1);

		let setRating_star_2 = document.createElement("li");
		setRating_star_2.classList.add("rating-star");
		setRating.appendChild(setRating_star_2);

		let setRating_star_3 = document.createElement("li");
		setRating_star_3.classList.add("rating-star");
		setRating.appendChild(setRating_star_3);

		let setRating_star_4 = document.createElement("li");
		setRating_star_4.classList.add("rating-star");
		setRating.appendChild(setRating_star_4);

		let setRating_star_5 = document.createElement("li");
		setRating_star_5.classList.add("rating-star");
		setRating.appendChild(setRating_star_5);

		if (rating < 1) {
			setRating_star_1.classList.add("rating-star");
		} else if (rating == 1 || rating < 2) {
			setRating_star_1.classList.add("active");
		} else if (rating == 2 || rating < 3) {
			setRating_star_1.classList.add("active");
			setRating_star_2.classList.add("active");
		} else if (rating == 3 || rating < 4) {
			setRating_star_1.classList.add("active");
			setRating_star_2.classList.add("active");
			setRating_star_3.classList.add("active");
		} else if (rating == 4 || rating < 5) {
			setRating_star_1.classList.add("active");
			setRating_star_2.classList.add("active");
			setRating_star_3.classList.add("active");
			setRating_star_4.classList.add("active");
		} else {
			setRating_star_1.classList.add("active");
			setRating_star_2.classList.add("active");
			setRating_star_3.classList.add("active");
			setRating_star_4.classList.add("active");
			setRating_star_5.classList.add("active");
		}

		challenge_item.appendChild(setRating);

		let setParticipants = document.createElement("small");
		setParticipants.classList.add("challenge-meta");
		setParticipants.innerHTML = `${minParticipants} - ${maxParticipants} participants`;
		challenge_item.appendChild(setParticipants);

		let setDescription = document.createElement("p");
		setDescription.classList.add("challenge-description");
		setDescription.textContent = description;
		challenge_item.appendChild(setDescription);

		let btnBook = document.createElement("button");
		btnBook.classList.add("btnBook", "button", "primary");

		btnBook.setAttribute("data-id", id);
		btnBook.setAttribute("data-minparticipants", minParticipants);
		btnBook.setAttribute("data-maxparticipants", maxParticipants);
		btnBook.setAttribute("data-title", title);

		if (type == "onsite") {
			btnBook.textContent = "Book this room";
		} else {
			btnBook.textContent = "Take challenge online";
		}
		challenge_item.appendChild(btnBook);

		btnBook.addEventListener("click", openModal);

		challenge_list.appendChild(challenge_item);
	}
}
