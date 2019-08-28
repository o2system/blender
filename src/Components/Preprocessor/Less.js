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
 * Class Less
 *
 * @package Components
 */
class Less extends Preprocessor {
    /**
     * Required dependencies for the component.
     */
    dependencies() {
        return ['less-loader', 'less'];
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
            'less',
            src,
            output,
            pluginOptions,
            postCssPlugins
        );
    }
}

module.exports = Less;
