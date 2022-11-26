import { describe, it, expect } from "@jest/globals";
import { getDataFromAPI } from "../getDataFromAPI.js";

describe("Check API return", () => {
	it("Should return an array with 30 challenges", async () => {
		const data = await getDataFromAPI();
		expect(data).toHaveLength(30);
	});
});
