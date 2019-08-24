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
let Log = require('../Log');
const path = require('path');

/**
 * Class CopyFilesTask
 *
 * @package Tasks
 */
class CopyFilesTask extends Task {
    /**
     * Run the task.
     */
    run() {
        let copy = this.data;

        this.files = new FileCollection(copy.from);

        this.files.copyTo(copy.to);

        this.assets = this.files.assets;
    }

    /**
     * Handle when a relevant source file is changed.
     *
     * @param {string} updatedFile
     */
    onChange(updatedFile) {
        let destination = this.data.to;

        // If we're copying a src directory recursively, we have to calculate
        // the correct destination path, based on the src directory tree.
        if (
            !Array.isArray(this.data.from) &&
            new File(this.data.from).isDirectory()
        ) {
            destination = destination.append(
                path
                    .normalize(updatedFile)
                    .replace(path.normalize(this.data.from), '')
            );
        }

        Log.feedback(`Copying ${updatedFile} to ${destination.path()}`);

        this.files.copyTo(destination, new File(updatedFile));
    }
}

module.exports = CopyFilesTask;
