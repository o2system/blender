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
 * Class Preact
 *
 * @package Components/JavaScript
 */
class Preact extends JavaScript {
    /**
     * Required dependencies for the component.
     */
    dependencies() {
        return ['babel-preset-preact'].concat(super.dependencies());
    }

    /**
     * Babel config to be merged with Blender's defaults.
     */
    babelConfig() {
        return {
            presets: ['preact']
        };
    }
}

module.exports = Preact;
