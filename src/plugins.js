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
const _MiniCssExtractPlugin = require("mini-css-extract-plugin");
const _TerserPlugin = require("terser-webpack-plugin");
const _OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const _CleanWebpackPlugin = require("clean-webpack-plugin");

const CleanWebpackPlugin = new _CleanWebpackPlugin(path.resolve(process.cwd(), "public/assets"));

const MiniCssExtractPlugin = new _MiniCssExtractPlugin({
	// Options similar to the same options in webpackOptions.output
	// both options are optional
	filename: "[name].css",
	chunkFilename: "[id].css"
});

const TerserPlugin = new _TerserPlugin({
	terserOptions: {
		output: {
			comments: false,
		},
	},
});


const OptimizeCSSAssetsPlugin = new _OptimizeCSSAssetsPlugin({
	assetNameRegExp: /\.min\.css$/g,
	cssProcessor: require("cssnano"),
	cssProcessorPluginOptions: {
		preset: ["default", { discardComments: { removeAll: true } }],
	},
	canPrint: true
});

module.exports = {
	MiniCssExtractPlugin: MiniCssExtractPlugin,
	TerserPlugin: TerserPlugin,
	OptimizeCSSAssetsPlugin: OptimizeCSSAssetsPlugin,
	CleanWebpackPlugin: CleanWebpackPlugin
};