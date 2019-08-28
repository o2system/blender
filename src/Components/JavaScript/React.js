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
 * Class React
 *
 * @package Components/JavaScript
 */
class React extends JavaScript {
    /**
     * Required dependencies for the component.
     */
    dependencies() {
        return ['@babel/preset-react'];
    }

    /**
     * Babel config to be merged with Blender's defaults.
     */
    babelConfig() {
        return {
            presets: ['@babel/preset-react']
        };
    }
}

module.exports = React;
