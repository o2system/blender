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

let webpack = require('webpack');
let FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
let BlenderDefinitionsPlugin = require('../Plugins/BlenderDefinitionsPlugin');
let BuildCallbackPlugin = require('../Plugins/BuildCallbackPlugin');
let CustomTasksPlugin = require('../Plugins/CustomTasksPlugin');
let ManifestPlugin = require('../Plugins/ManifestPlugin');
let MockEntryPlugin = require('../Plugins/MockEntryPlugin');

module.exports = function() {
    let plugins = [];

    // If the user didn't declare any JS compilation, we still need to
    // use a temporary script to force a compile. This plugin will
    // handle the process of deleting the compiled script.
    if (!Blender.bundlingJavaScript) {
        plugins.push(new MockEntryPlugin());
    }

    // Activate better error feedback in the console.
    plugins.push(
        new FriendlyErrorsWebpackPlugin({
            clearConsole: Config.clearConsole
        })
    );

    // Activate support for Blender_ .env definitions.
    plugins.push(
        BlenderDefinitionsPlugin.build({
            NODE_ENV: Blender.inProduction()
                ? 'production'
                : process.env.NODE_ENV || 'development'
        })
    );

    // Handle all custom, non-webpack tasks.
    plugins.push(new ManifestPlugin());

    // Handle all custom, non-webpack tasks.
    plugins.push(new CustomTasksPlugin());

    // Notify the rest of our app when Webpack has finished its build.
    plugins.push(
        new BuildCallbackPlugin(stats => Blender.dispatch('build', stats))
    );

    return plugins;
};
