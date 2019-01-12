
const path = require("path");
const Config = require("./Options");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const JSLoader = {
	test: /\.js$/,
	exclude: /(node_modules|bower_components)/,
	use: [{
		loader: "babel-loader",
		options: Config.BabelConfig()
	}]
};

// export  default JSLoader;

// const ESLintLoader = {
// 	test: /\.js$/,
// 	enforce: "pre",
// 	exclude: /(node_modules|bower_components)/,
// 	use: {
// 		loader: "eslint-loader",
// 		options: {
// 			configFile: __dirname + "./../.eslintrc"
// 		},
// 	}
// };
const SASSLoader = {
	test: /\.(sa|sc|c)ss$/,
	use: [
		MiniCssExtractPlugin.loader,
		"css-loader",
		// "postcss-loader",
		"sass-loader",
	],
};

// const SASSLoader = {
// 	test: /\.(sa|sc|c)ss$/,
// 	use: [
// 		MiniCssExtractPlugin.loader,
// 		{loader: "style-loader", sourceMap: true},
// 		{
// 			loader: "css-loader",
// 			options: { importLoaders: 2, sourceMap: true },
// 		},
// 		{
// 			loader: "postcss-loader",
// 			options: {
// 				config: {
// 					path:  path.resolve(__dirname, "postcss.config.js")
// 				}
// 			},
// 		},
// 		{loader: "sass-loader", sourceMap: true}
// 	],
// };

const ImageLoader = {
	test: /\.(jpg|jpeg|gif|png|webpm|svg)$/,
	use: [{
		loader: "file-loader",
		options: {
			name: "assets/img/[name].[ext]"
		}
	}]
};

const FontsLoader = {
	test: /.(woff|woff2|ttf|eot)$/,
	use: [
		{
			loader: "file-loader",
			options: {
				name: "assets/fonts/[name].[ext]"
			}
		}
	]
};

const HTMLLoader = {
	test: /\.html$/,
	use: [
		{
			loader: "html-loader",
			options: { minimize: true }
		}
	]
};

// module.exports = {
// 	JSLoader: JSLoader,
// 	// ESLintLoader: ESLintLoader,
// 	HTMLLoader: HTMLLoader,
// 	SASSLoader: SASSLoader,
// 	ImageLoader: ImageLoader,
// 	FontsLoader: FontsLoader
//
// };

export default {
	JSLoader
}

export class jsLoader {
}