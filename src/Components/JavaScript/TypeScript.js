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

let JavaScript = require('../JavaScript');

/**
 * Class TypeScript
 *
 * @package Components/JavaScript
 */
class TypeScript extends JavaScript {
    /**
     * The API name for the component.
     */
    name() {
        return ['typeScript', 'ts'];
    }

    /**
     * Required dependencies for the component.
     */
    dependencies() {
        return ['ts-loader', 'typescript'].concat();
    }

    /**
     * webpack rules to be appended to the master config.
     */
    webpackRules() {
        return [].concat(super.webpackRules(), {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
            options: {
                appendTsSuffixTo: [/\.vue$/]
            }
        });
    }

    /**
     * Override the generated webpack configuration.
     *
     * @param {Object} config
     */
    webpackConfig(config) {
        super.webpackConfig(config);

        config.resolve.extensions.push('.ts', '.tsx');
        config.resolve.alias['vue$'] = 'vue/dist/vue.esm.js';
    }
}

module.exports = TypeScript;
