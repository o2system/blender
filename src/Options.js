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