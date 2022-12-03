const path = require("path");

module.exports = {
	experiments: {
		topLevelAwait: true
	},
	mode: "production",
	entry: {
		index: "./index.js",
		challenge: "./challenges.js"
	},
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname)
	}
};
