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
 * Class Browsersync
 *
 * @package  Components
 */
class Browsersync {
    /**
     * The API name for the component.
     */
    name() {
        return 'browserSync';
    }

    /**
     * Required dependencies for the component.
     */
    dependencies() {
        this.requiresReload = true;

        return ['browser-sync', 'browser-sync-webpack-plugin@2.0.1'];
    }

    /**
     * Register the component.
     *
     * @param {Object} userConfig
     */
    register(userConfig) {
        this.userConfig =
            typeof userConfig == 'string' ? { proxy: userConfig } : userConfig;
    }

    /**
     * webpack plugins to be appended to the master config.
     */
    webpackPlugins() {
        let BrowserSyncPlugin = require('browser-sync-webpack-plugin');

        return new BrowserSyncPlugin(this.config(), { reload: false });
    }

    /**
     * Build the BrowserSync configuration.
     */
    config() {
        return Object.assign(
            {
                host: 'localhost',
                port: 3000,
                proxy: 'app.local',
                files: [
                    'app/**/*.php',
                    'resources/**/*.phtml',
                    `${Config.publicPath || 'public'}/**/*.(js|css)`
                ],
                snippetOptions: {
                    rule: {
                        match: /(<\/body>|<\/pre>)/i,
                        fn: function(snippet, match) {
                            return snippet + match;
                        }
                    }
                }
            },
            this.userConfig
        );
    }
}

module.exports = Browsersync;
