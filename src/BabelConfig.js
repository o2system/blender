/**
 * This file is part of the O2System Blender package.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @author         Steeve Andrian Salim
 * @copyright      Copyright (c) Steeve Andrian Salim
 */
// ------------------------------------------------------------------------

let merge = require('babel-merge');

/**
 * Class BabelConfig
 */
class BabelConfig {
    /**
     * Generate the appropriate Babel configuration for the build.
     *
     * @param {Object} blenderBabelConfig
     * @param {String} babelRcPath
     */
    static generate(blenderBabelConfig, babelRcPath) {
        return merge.all(
            [
                BabelConfig.default(),
                new BabelConfig().fetchBabelRc(babelRcPath),
                blenderBabelConfig
            ],
            {
                arrayMerge: (destinationArray, sourceArray, options) =>
                    sourceArray
            }
        );
    }

    /**
     * Fetch the user's .babelrc config file, if any.
     *
     * @param {String} path
     */
    fetchBabelRc(path) {
        return File.exists(path) ? JSON.parse(File.find(path).read()) : {};
    }

    /**
     * Fetch the default Babel configuration.
     */
    static default() {
        return {
            cacheDirectory: true,
            presets: [
                [
                    '@babel/preset-env',
                    {
                        modules: false,
                        forceAllTransforms: true
                    }
                ]
            ],
            plugins: [
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-proposal-object-rest-spread',
                [
                    '@babel/plugin-transform-runtime',
                    {
                        helpers: false
                    }
                ]
            ]
        };
    }
}

module.exports = BabelConfig;
