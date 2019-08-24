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

let Task = require('../Task');
let FileCollection = require('../FileCollection');

/**
 * Class ConcatenateFilesTask
 *
 * @package Tasks
 */
class ConcatenateFilesTask extends Task {
    /**
     * Run the task.
     */
    run() {
        this.files = new FileCollection(this.data.src);

        this.merge();
    }

    /**
     * Merge the files into one.
     */
    merge() {
        this.assets.push(this.files.merge(this.data.output, this.data.babel));
    }

    /**
     * Handle when a relevant source file is changed.
     */
    onChange(updatedFile) {
        this.merge();
    }
}

module.exports = ConcatenateFilesTask;
