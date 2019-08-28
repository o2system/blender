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
 * Class CustomTasksPlugin
 *
 * @package Plugins
 */
class CustomTasksPlugin {
    /**
     * Apply the plugin.
     *
     * @param {Object} compiler
     */
    apply(compiler) {
        compiler.plugin('done', stats => {
            Blender.tasks.forEach(task => this.runTask(task, stats));

            if (Blender.components.get('version')) {
                this.applyVersioning();
            }

            if (Blender.inProduction()) {
                this.minifyAssets();
            }

            if (Blender.isWatching()) {
                Blender.tasks.forEach(task => task.watch(Blender.isPolling()));
            }

            Blender.manifest.refresh();
        });
    }

    /**
     * Execute the task.
     *
     * @param {Task} task
     */
    runTask(task, stats) {
        task.run();

        task.assets.forEach(asset => {
            Blender.manifest.add(asset.pathFromPublic());

            // Update the Webpack assets list for better terminal output.
            stats.compilation.assets[asset.pathFromPublic()] = {
                size: () => asset.size(),
                emitted: true
            };
        });
    }

    /**
     * Minify the given asset file.
     */
    minifyAssets() {
        let tasks = Blender.tasks.filter(task => {
            return (
                task.constructor.name !== 'VersionFilesTask' &&
                task.constructor.name !== 'CopyFilesTask'
            );
        });

        tasks.forEach(task => {
            task.assets.forEach(asset => {
                try {
                    asset.minify();
                } catch (e) {
                    Log.error(
                        `Whoops! We had trouble minifying "${asset.relativePath()}". ` +
                            `Perhaps you need to use blender.babel() instead?`
                    );

                    throw e;
                }
            });
        });
    }

    /**
     * Version all files that are present in the manifest.
     */
    applyVersioning() {
        let manifest = Object.keys(Blender.manifest.get());

        manifest.forEach(file => Blender.manifest.hash(file));
    }
}

module.exports = CustomTasksPlugin;
