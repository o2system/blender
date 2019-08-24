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

let Factory = require('./Factory');

/**
 * Class Extend
 *
 * @package  Components
 */
class Extend {
    /**
     * Register the component.
     *
     * @param {string} name
     * @param {Component} component
     */
    register(name, component) {
        if (typeof component !== 'function') {
            component.name = () => name;

            return new Factory().install(component);
        }

        new Factory().install({
            name: () => name,

            register(...args) {
                this.args = args;
            },

            webpackConfig(config) {
                component.call(this, config, ...this.args);
            }
        });
    }
}

module.exports = Extend;
