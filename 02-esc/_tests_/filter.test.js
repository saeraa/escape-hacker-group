/**
 * @jest-environment jsdom
 */

import { describe, it, expect } from "@jest/globals";
import {
	filterLabels,
	filterRating,
	filterType,
	filterSearch
} from "./filtersForTesting.js";

// const exampleEntry = {
// 	description: "Hackers of the world",
// 	id: 1,
// 	labels: ["bash", "linux"],
// 	rating: 2,
// 	title: "Shell 3000",
// 	type: "onsite"
// };

describe("Filter tests", () => {
	// (entry, key)
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
		// filterSearch(entry, value)
		const entry = {
			description: "Hackers of the world",
			title: "Shell 3000"
		};
		const value = "hack 000";
		const result = filterSearch(entry, value);
		expect(result).toBeTruthy();
	});
	it("filterSearch should include rooms which title + description matches ALL the search terms even if they are the wrong case", () => {
		// filterSearch(entry, value)
		const entry = {
			description: "Hackers of the world",
			title: "Shell 3000"
		};
		const value = "HAck 000";
		const result = filterSearch(entry, value);
		expect(result).toBeTruthy();
	});
	it("filterSearch should exclude rooms which title + description does not match ALL the search terms", () => {
		// filterSearch(entry, value)
		const entry = {
			description: "Hackers of the world",
			title: "Shell 3000"
		};
		const value = "HAck 0000";
		const result = filterSearch(entry, value);
		expect(result).toBeFalsy();
	});

	it.skip("filterRating should exclude results that are greater than the max rating specified", () => {
		// filterRating(entry, formData)
		const entry = {
			rating: 2
		};
		const formData = {};
	});
	it.skip("filterRating should exclude results that are lesser than the min rating specified", () => {
		// filterRating(entry, formData)
	});
	it("filterType should exclude onsite results if only the online box is ticked", () => {
		// filterType(entry, formData)
		const entry = { type: "onsite" };
		const formData = { "type:online": "yes" };
		const result = filterType(entry, formData);
		expect(result).toBeFalsy();
	});
	it("filterType should exclude online results if only the onsite box is ticked", () => {
		// filterType(entry, formData)
		const entry = { type: "online" };
		const formData = { "type:onsite": "yes" };
		const result = filterType(entry, formData);
		expect(result).toBeFalsy();
	});
	it("filterType should show the results if both boxes are ticked", () => {
		// filterType(entry, formData)
		const entry = { type: "online" };
		const formData = { "type:onsite": "yes", "type:online": "yes" };
		const result = filterType(entry, formData);
		expect(result).toBeTruthy();
	});
});
