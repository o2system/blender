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

/**
 * Class Autoload
 *
 * @package  Components
 */
class Autoload {
    
    /**
     * Register the component.
     *
     * @param  {Object} libs
     * @return {void}
     */
    register(libs) {
        let aliases = {};

        Object.keys(libs).forEach(library => {
            [].concat(libs[library]).forEach(alias => {
                aliases[alias] = library.includes('.')
                    ? library.split('.')
                    : library;
            });
        });

        this.aliases = aliases;
    }

    /**
     * webpack plugins to be appended to the master config.
     */
    webpackPlugins() {
        let webpack = require('webpack');

        return new webpack.ProvidePlugin(this.aliases);
    }
}

module.exports = Autoload;
