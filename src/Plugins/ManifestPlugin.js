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
 * Class ManifestPlugin
 *
 * @package Plugins
 */
class ManifestPlugin {
    /**
     * Apply the plugin.
     *
     * @param {Object} compiler
     */
    apply(compiler) {
        compiler.plugin('emit', (curCompiler, callback) => {
            let stats = curCompiler.getStats().toJson();

            // Handle the creation of the blender-manifest.json file.
            Blender.manifest.transform(stats).refresh();

            callback();
        });
    }
}

module.exports = ManifestPlugin;
