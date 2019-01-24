
/**
 * This file is part of the O2System Framework package.
 *
 *  For the full copyright and license information, please view the LICENSE
 *  file that was distributed with this source code.
 *
 *  @author         Steeve Andrian Salim
 *  @copyright      Copyright (c) Steeve Andrian Salim
 */

const path = require("path");
const Config = require("./Options");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const jsLoader = {
	test: /\.js$/,
	exclude: /(node_modules|bower_components)/,
	use: [{
		loader: "babel-loader",
		options: Config.BabelConfig()
	}]
};

// export  default JSLoader;

const eslintLoader = {
	test: /\.js$/,
	enforce: "pre",
	exclude: /(node_modules|bower_components)/,
	use: {
		loader: "eslint-loader",
		options: {
			configFile: __dirname + "./../.eslintrc"
		},
	}
};


const sassLoader = {
	test: /\.(sa|sc|c)ss$/,
	use: [
		MiniCssExtractPlugin.loader,
		{loader: "style-loader", sourceMap: true},
		{
			loader: "css-loader",
			options: { importLoaders: 2, sourceMap: true },
		},
		{
			loader: "postcss-loader",
			options: {
				config: {
					path:  path.resolve(__dirname, "postcss.config.js")
				}
			},
		},
		{loader: "sass-loader", sourceMap: true}
	],
};

const imageLoader = {
	test: /\.(jpg|jpeg|gif|png|webpm|svg)$/,
	use: [{
		loader: "file-loader",
		options: {
			name: "assets/img/[name].[ext]"
		}
	}]
};

const fontsLoader = {
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

const htmlLoader = {
	test: /\.html$/,
	use: [
		{
			loader: "html-loader",
			options: { minimize: true }
		}
	]
};

module.exports = {
	jsLoader: jsLoader,
	eslintLoader: eslintLoader,
	htmlLoader: htmlLoader,
	sassLoader: sassLoader,
	fontsLoader: fontsLoader,
	imageLoader: imageLoader
};
