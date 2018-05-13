var path = require("path");
var HtmlWebpackPlugin = require( "html-webpack-plugin" );
 
module.exports = {
	entry: "./src/index.js",
	mode: "development",
	output: {
		path: path.resolve(__dirname, "public"),
		filename: "[name].js"
	},
	module: {
		rules: [
			{ test: /\.(js)$/, exclude: /node_modules/, use: "babel-loader" },
			{ test: /\.(css)$/, use: "css-loader" },
			{ test: /\.(pug)$/, use: "pug-loader" },
			// { test: /\.(sass)$/, use: [ { loader: "style-loader"}, {loader: "sass-loader"}, {loader:"css-loader"}] }
		]
	},
	plugins: [new HtmlWebpackPlugin({
		hash: true,
		template: "./src/index.pug"
	})]
};