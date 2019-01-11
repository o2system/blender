/**
 * This file is part of the O2System Framework package.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @author         Steeve Andrian Salim
 * @copyright      Copyright (c) Steeve Andrian Salim
 */
// ------------------------------------------------------------------------

const path = require("path");
const { CleanWebpackPlugin, OptimizeCSSAssetsPlugin, TerserPlugin, MiniCssExtractPlugin } = require("./plugins");
const { JSLoader, SASSLoader, ImageLoader, FontsLoader } = require("./loaders");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
	// entry: {
	// 	"assets/app": "./resources/app.js",
	// },
	output: {
		filename: "[name].js",
		path: path.resolve(process.cwd(), "public"),
		publicPath: "/"
	},
	devServer: {
		contentBase: "dev",
		overlay: true,
		stats: {
			colors: true
		}
	},
	devtool: "source-map",
	module: {
		rules: [
			JSLoader,
			SASSLoader,
			ImageLoader,
			FontsLoader
		]
	},
	plugins: [
		CleanWebpackPlugin,
		MiniCssExtractPlugin
	],
	optimization: {
		minimizer: getMinimizer(),
	}
};


function getMinimizer() {
	let result = [OptimizeCSSAssetsPlugin];
	if (!devMode) {
		result.push(TerserPlugin);
	}

	return result;
}