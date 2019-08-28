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

let Log = require('../Log');

/**
 * Class DumpWebpackConfig
 *
 * @package Components
 */
class DumpWebpackConfig {
    /**
     * The optional name to be used when called by Blender.
     * Defaults to the class name, lowercased.
     */
    name() {
        return ['dumpWebpackConfig', 'dump'];
    }

    /**
     * Register the component.
     */
    register() {
        Blender.listen('configReadyForUser', config => {
            RegExp.prototype.toJSON = function() {
                return this.toString();
            };

            Log.info(JSON.stringify(config, null, 2));
        });
    }
}

module.exports = DumpWebpackConfig;
