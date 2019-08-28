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

let glob = require('glob');
let path = require('path');
let webpack = require('webpack');
let VersionFilesTask = require('../Tasks/VersionFilesTask');

/**
 * Class Version
 *
 * @package Components
 */
class Version {
    /**
     * Register the component.
     *
     * @param {Array} files
     */
    register(files = []) {
        files = flatten(
            [].concat(files).map(filePath => {
                if (File.find(filePath).isDirectory()) {
                    filePath += path.sep + '**/*';
                }

                if (!filePath.includes('*')) return filePath;

                return glob.sync(
                    new File(filePath).forceFromPublic().relativePath(),
                    { nodir: true }
                );
            })
        );

        Blender.addTask(new VersionFilesTask({ files }));
    }

    /**
     * webpack plugins to be appended to the master config.
     */
    webpackPlugins() {
        if (Blender.inProduction()) {
            return [new webpack.HashedModuleIdsPlugin()];
        }
    }
}

module.exports = Version;
