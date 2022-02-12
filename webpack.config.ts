const path = require("path");
const root = path.resolve(__dirname);
const join = path.join;
const sourceDirectory = join(root, "src");
const distributionDirectory = join(root, "dist");
const entry = join(sourceDirectory, "index.ts");

module.exports = {
	entry: entry,
	mode: "production",
	module: {
		rules: [
			{
				test: /\.ts?$/,
				use: "ts-loader",
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: [".ts", ".js"]
	},
	output: {
		filename: "server.js",
		path: distributionDirectory
	}
};
