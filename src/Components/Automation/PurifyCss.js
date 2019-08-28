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

let Automation = require('../Automation');
let glob = require('glob');

/**
 * Class PurifyCss
 *
 * @package Components/Automation
 */
class PurifyCss extends Automation {
    /**
     * Required dependencies for the component.
     */
    dependencies() {
        if (Config.purifyCss) {
            this.requiresReload = true;

            return ['purifycss-webpack', 'purify-css'];
        }
    }

    /**
     * Override the generated webpack configuration.
     *
     * @param {Object} config
     */
    webpackConfig(config) {
        if (Config.purifyCss) {
            Config.purifyCss = this.build(Config.purifyCss);

            let CssPurifierPlugin = require('../webpackPlugins/CssPurifierPlugin');

            config.plugins.push(CssPurifierPlugin.build());
        }
    }

    /**
     * Build the CSSPurifier plugin options.
     *
     * @param {Object} options
     */
    build(options) {
        if (typeof options === 'object') {
            if (options.paths) {
                let paths = options.paths;

                paths.forEach(path => {
                    if (!path.includes('*')) return;

                    options.paths.splice(paths.indexOf(path), 1);

                    options.paths = paths.concat(glob.sync(path));
                });
            }
            options.minimize = options.hasOwnProperty('minimize')
                ? options.minimize
                : Blender.inProduction();
        }

        return options;
    }
}

module.exports = PurifyCss;
