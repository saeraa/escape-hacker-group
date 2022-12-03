import { describe, it, expect } from "@jest/globals";
import {
	filterLabels,
	filterRating,
	filterType,
	filterSearch
} from "../filters.js";

// const exampleEntry = {
// 	description: "Hackers of the world",
// 	id: 1,
// 	labels: ["bash", "linux"],
// 	rating: 2,
// 	title: "Shell 3000",
// 	type: "onsite"
// };

describe("Filter tests", () => {
	it("filterLabels should include entry with the matching tags", () => {
		const exampleEntry = {
			labels: ["bash", "linux"]
		};
		const key = "tags:bash";
		const result = filterLabels(exampleEntry, key);
		expect(result).toBeTruthy();
	});
	it("filterLabels should exclude entry without the matching tags", () => {
		const exampleEntry = {
			labels: ["bash", "linux"]
		};
		const key = "tags:electronics";
		const result = filterLabels(exampleEntry, key);
		expect(result).toBeFalsy();
	});
	it("filterSearch should include rooms which title + description matches ALL the search terms", () => {
		const entry = {
			description: "Hackers of the world",
			title: "Shell 3000"
		};
		const value = "hack 000";
		const result = filterSearch(entry, value);
		expect(result).toBeTruthy();
	});
	it("filterSearch should include rooms which title + description matches ALL the search terms even if they are the wrong case", () => {
		const entry = {
			description: "Hackers of the world",
			title: "Shell 3000"
		};
		const value = "HAck 000";
		const result = filterSearch(entry, value);
		expect(result).toBeTruthy();
	});
	it("filterSearch should exclude rooms which title + description does not match ALL the search terms", () => {
		const entry = {
			description: "Hackers of the world",
			title: "Shell 3000"
		};
		const value = "HAck 0000";
		const result = filterSearch(entry, value);
		expect(result).toBeFalsy();
	});

	it("filterRating should exclude results that are greater than the max rating specified", () => {
		const entry = {
			rating: 2
		};
		const formData = {
			"rating:max": 1
		};
		const result = filterRating(entry, formData);
		expect(result).toBeFalsy();
	});
	it("filterRating should exclude results that are lesser than the min rating specified", () => {
		const entry = {
			rating: 3
		};
		const formData = {
			"rating:min": 4
		};
		const result = filterRating(entry, formData);
		expect(result).toBeFalsy();
	});
	it("filterRating should include results that are in the range specified", () => {
		const entry = {
			rating: 3
		};
		const formData = {
			"rating:min": 2,
			"rating:max": 4
		};
		const result = filterRating(entry, formData);
		expect(result).toBeTruthy();
	});
	it("filterType should exclude onsite results if only the online box is ticked", () => {
		const entry = { type: "onsite" };
		const formData = { "type:online": "yes" };
		const result = filterType(entry, formData);
		expect(result).toBeFalsy();
	});
	it("filterType should exclude online results if only the onsite box is ticked", () => {
		const entry = { type: "online" };
		const formData = { "type:onsite": "yes" };
		const result = filterType(entry, formData);
		expect(result).toBeFalsy();
	});
	it("filterType should show the results if both boxes are ticked", () => {
		const entry = { type: "online" };
		const formData = { "type:onsite": "yes", "type:online": "yes" };
		const result = filterType(entry, formData);
		expect(result).toBeTruthy();
	});
});
