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

let Paths = require('./Paths');
let Manifest = require('./Manifest');
let Dispatcher = require('./Dispatcher');
let Components = require('./Components');
let isFunction = require('lodash').isFunction;

/**
 * Class Blender
 */
class Blender {
    /**
     * Create a new instance.
     */
    constructor() {
        this.paths = new Paths();
        this.manifest = new Manifest();
        this.dispatcher = new Dispatcher();
        this.tasks = [];
        this.bundlingJavaScript = false;
        this.components = new Components();
    }

    /**
     * Determine if the given config item is truthy.
     *
     * @param {string} tool
     */
    isUsing(tool) {
        return !!Config[tool];
    }

    /**
     * Determine if Blender is executing in a production environment.
     */
    inProduction() {
        return Config.production;
    }

    /**
     * Determine if Blender should watch files for changes.
     */
    isWatching() {
        return (
            process.argv.includes('--watch') || process.argv.includes('--hot')
        );
    }

    /**
     * Determine if polling is used for file watching
     */
    isPolling() {
        return this.isWatching() && process.argv.includes('--watch-poll');
    }

    /**
     * Determine if Blender sees a particular tool or framework.
     *
     * @param {string} tool
     */
    sees(tool) {
        if (tool === 'o2system') {
            return File.exists('./o2system');
        }

        return false;
    }

    /**
     * Determine if the given npm package is installed.
     *
     * @param {string} npmPackage
     */
    seesNpmPackage(npmPackage) {
        try {
            require.resolve(npmPackage);

            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * Determine if Blender should activate hot reloading.
     */
    shouldHotReload() {
        new File(path.join(Config.publicPath, 'hot')).delete();

        return this.isUsing('hmr');
    }

    /**
     * Queue up a new task.
     *
     * @param {Task} task
     */
    addTask(task) {
        this.tasks.push(task);
    }

    /**
     * Listen for the given event.
     *
     * @param {string}   event
     * @param {Function} callback
     */
    listen(event, callback) {
        this.dispatcher.listen(event, callback);
    }

    /**
     * Dispatch the given event.
     *
     * @param {string} event
     * @param {*}      data
     */
    dispatch(event, data) {
        if (isFunction(data)) {
            data = data();
        }

        this.dispatcher.fire(event, data);
    }
}

module.exports = Blender;
