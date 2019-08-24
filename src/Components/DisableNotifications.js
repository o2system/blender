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
 * Class DisableNotifications
 *
 * @package  Components
 */
class DisableNotifications {
    /**
     * The API name for the component.
     */
    name() {
        return ['disableNotifications', 'disableSuccessNotifications'];
    }

    /**
     * Register the component.
     */
    register() {
        if (this.caller === 'disableSuccessNotifications') {
            Config.notifications = {
                onSuccess: false,
                onFailure: true
            };
        } else {
            Config.notifications = false;
        }
    }
}

module.exports = DisableNotifications;
