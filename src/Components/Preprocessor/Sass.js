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

let Preprocessor = require('../Preprocessor');

/**
 * Class Sass
 *
 * @package Components/Preprocessor
 */
class Sass extends Preprocessor {
    /**
     * Required dependencies for the component.
     */
    dependencies() {
        this.requiresReload = true;

        return tap(
            [
                'sass-loader@7.*',
                Blender.seesNpmPackage('node-sass') ? 'node-sass' : 'sass'
            ],
            dependencies => {
                if (Config.processCssUrls) {
                    dependencies.push('resolve-url-loader@3.1.0');
                }
            }
        );
    }

    /**
     * Register the component.
     *
     * @param {*} src
     * @param {string} output
     * @param {Object} pluginOptions
     * @param {Array}  postCssPlugins
     */
    register(src, output, pluginOptions = {}, postCssPlugins = []) {
        return this.preprocess(
            'sass',
            src,
            output,
            this.pluginOptions(pluginOptions),
            postCssPlugins
        );
    }

    /**
     * Build the plugin options for sass-loader.
     *
     * @param {Object} pluginOptions
     * @returns {Object}
     */
    pluginOptions(pluginOptions) {
        return Object.assign(
            {
                precision: 8,
                outputStyle: 'expanded',
                implementation: () =>
                    Blender.seesNpmPackage('node-sass')
                        ? require('node-sass')
                        : require('sass')
            },
            pluginOptions,
            { sourceMap: true }
        );
    }
}

module.exports = Sass;
