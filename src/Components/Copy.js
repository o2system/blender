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

let CopyFilesTask = require('../Tasks/CopyFilesTask');

/**
 * Class Copy
 *
 * @package Components
 */
class Copy {
    /**
     * The API name for the component.
     */
    name() {
        return ['copy', 'copyDirectory'];
    }

    /**
     * Register the component.
     *
     * @param {*} from
     * @param {string} to
     */
    register(from, to) {
        Blender.addTask(new CopyFilesTask({ from, to: new File(to) }));
    }
}

module.exports = Copy;
