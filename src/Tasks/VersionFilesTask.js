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
 * Class VersionFilesTask
 *
 * @package Tasks
 */
class VersionFilesTask extends Task {
    /**
     * Run the task.
     */
    run() {
        this.files = new FileCollection(this.data.files);

        this.assets = this.data.files.map(file => {
            file = new File(file);

            Blender.manifest.hash(file.pathFromPublic());

            return file;
        });
    }

    /**
     * Handle when a relevant source file is changed.
     *
     * @param {string} updatedFile
     */
    onChange(updatedFile) {
        Blender.manifest.hash(new File(updatedFile).pathFromPublic()).refresh();
    }
}

module.exports = VersionFilesTask;
