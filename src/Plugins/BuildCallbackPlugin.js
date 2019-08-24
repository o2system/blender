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
 * Class BuildCallbackPlugin
 *
 * @package Plugins
 */
class BuildCallbackPlugin {
    /**
     * Create a new plugin instance.
     *
     * @param {Function} callback
     */
    constructor(callback) {
        this.callback = callback;
    }

    /**
     * Apply the plugin.
     *
     * @param {Object} compiler
     */
    apply(compiler) {
        compiler.plugin('done', this.callback);
    }
}

module.exports = BuildCallbackPlugin;
