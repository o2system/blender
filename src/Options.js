/**
 * This file is part of the O2System Framework package.
 *
 *  For the full copyright and license information, please view the LICENSE
 *  file that was distributed with this source code.
 *
 *  @author         Steeve Andrian Salim
 *  @copyright      Copyright (c) Steeve Andrian Salim
 */

class Options {

	static BabelConfig() {
		return {
			cacheDirectory: true,
			presets: [
				[
					"@babel/preset-env",
					{
						modules: false,
						forceAllTransforms: true
					}
				]
			],
			plugins: [
				"@babel/plugin-proposal-object-rest-spread",
				[
					"@babel/plugin-transform-runtime",
					{
						helpers: false
					}
				]
			]
		};
	}
}


module.exports = Options;