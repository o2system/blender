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

let webpack = require('webpack');
let path = require('path');

/**
 * Class Api
 */
class Api {
    /**
     * Enable sourcemap support.
     *
     * @param {Boolean} generateForProduction
     * @param {string}  devType
     * @param {string}  productionType
     */
    sourceMaps(
        generateForProduction = true,
        devType = 'eval-source-map',
        productionType = 'source-map'
    ) {
        let type = devType;

        if (Blender.inProduction()) {
            type = generateForProduction ? productionType : false;
        }

        Config.sourcemaps = type;

        return this;
    }

    /**
     * Override the default path to your project's public directory.
     *
     * @param {string} publicPath
     */
    setPublicPath(publicPath) {
        Config.publicPath = path.normalize(publicPath.replace(/\/$/, ''));

        return this;
    }

    /**
     * Override the default path to your project's public directory.
     *
     * @param {string} outputPath
     */
    setOutputPath(outputPath) {
        Config.outputPath = path.normalize(outputPath.replace(/\/$/, ''));

        return this;
    }

    /**
     * Set a prefix for all generated asset paths.
     *
     * @param {string} resourceRoot
     */
    setResourceRoot(resourceRoot) {
        Config.resourceRoot = resourceRoot;

        return this;
    }

    /**
     * Merge custom config with the provided webpack.config file.
     *
     * @param {object} config
     */
    webpackConfig(config) {
        config = typeof config == 'function' ? config(webpack) : config;

        Config.webpackConfig = require('webpack-merge').smart(
            Config.webpackConfig,
            config
        );

        return this;
    }

    /**
     * Merge custom Babel config with Blender's default.
     *
     * @param {object} config
     */
    babelConfig(config) {
        Config.babelConfig = config;

        return this;
    }

    /* Set Blender-specific options.
     *
     * @param {object} options
     */
    options(options) {
        Config.merge(options);

        return this;
    }

    /**
     * Register a Webpack build event handler.
     *
     * @param {Function} callback
     */
    then(callback) {
        Blender.listen('build', callback);

        return this;
    }

    /**
     * Register an event listen for when the webpack
     * config object has been fully generated.
     *
     * @param {Function} callback
     */
    override(callback) {
        Blender.listen('configReadyForUser', callback);
    }

    /**
     * Helper for determining a production environment.
     */
    inProduction() {
        return Blender.inProduction();
    }
}

module.exports = Api;
