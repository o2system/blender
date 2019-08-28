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

let chokidar = require('chokidar');

/**
 * Class Task
 *
 * @package Tasks
 */
class Task {
    /**
     * Create a new task instance.
     *
     * @param {Object} data
     */
    constructor(data) {
        this.data = data;
        this.assets = [];
        this.isBeingWatched = false;
    }

    /**
     * Watch all relevant files for changes.
     *
     * @param {boolean} usePolling
     */
    watch(usePolling = false) {
        if (this.isBeingWatched) return;

        let files = this.files.get();
        let watcher = chokidar
            .watch(files, { usePolling, persistent: true })
            .on('change', this.onChange.bind(this));

        // Workaround for issue with atomic writes.
        // See https://github.com/paulmillr/chokidar/issues/591
        if (!usePolling) {
            watcher.on('raw', (event, path, { watchedPath }) => {
                if (event === 'rename') {
                    watcher.unwatch(files);
                    watcher.add(files);
                }
            });
        }

        this.isBeingWatched = true;
    }
}

module.exports = Task;
