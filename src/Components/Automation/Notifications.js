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

/**
 * Class Notifications
 *
 * @package Components/Automation
 */
class Notifications extends Automation {
    /**
     * webpack plugins to be appended to the master config.
     */
    webpackPlugins() {
        if (Blender.isUsing('notifications')) {
            let WebpackNotifierPlugin = require('webpack-notifier');

            return new WebpackNotifierPlugin({
                title: 'O2System Blender',
                alwaysNotify: Config.notifications.onSuccess,
                hint:
                    process.platform === 'linux'
                        ? 'int:transient:1'
                        : undefined,
		timeout: 2,
                contentImage: Blender.paths.root(
                    'node_modules/o2system-blender/icons/logo.png'
                )
            });
        }
    }
}

module.exports = Notifications;
