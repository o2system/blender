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

let Purifier = require('purifycss-webpack');
let glob = require('glob');

/**
 * Class CssPurifierPlugin
 *
 * @package Plugins
 */
class CssPurifierPlugin {
    /**
     * Build up the plugin.
     */
    static build() {
        let viewFiles = glob.sync(
            Blender.paths.root('resources/**/*.phtml')
        );
        let vueFiles = glob.sync(
            Blender.paths.root('resources/assets/js/**/*.vue')
        );

        let paths = viewFiles.concat(vueFiles);

        if (Config.purifyCss.paths) {
            paths = paths.concat(Config.purifyCss.paths);
        }

        return new Purifier(
            Object.assign({}, Config.purifyCss, {
                paths,
                minimize: Blender.inProduction()
            })
        );
    }
}

module.exports = CssPurifierPlugin;
