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
 * Class Coffee
 *
 * @package Components/JavaScript
 */
class Coffee extends JavaScript {
    /**
     * Required dependencies for the component.
     */
    dependencies() {
        return ['coffee-loader', 'coffeescript'].concat();
    }

    /**
     * webpack rules to be appended to the master config.
     */
    webpackRules() {
        return [
            {
                test: /\.coffee$/,
                use: ['coffee-loader']
            }
        ].concat(super.webpackRules());
    }
}

module.exports = Coffee;
