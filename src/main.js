/*
 |--------------------------------------------------------------------------
 | Welcome to O2System Blender!
 |--------------------------------------------------------------------------
 |
 | Blender provides a clean, fluent API for defining basic webpack
 | build steps for your Blender application. O2System Blender supports a variety
 | of common CSS and JavaScript pre-processors out of the box.
 |
 */

/**
 * We'll begin by pulling in a few globals that Blender often uses.
 */

require('./Helpers');
require('dotenv').config();

global.path = require('path');
global.File = require('./File');

/**
 * This config object is what Blender will reference, when it's time
 * to dynamically build up your Webpack configuration object.
 */

global.Config = require('./Config')();
global.Blender = new (require('./Blender'))();

/**
 * If we're working in a O2System Framework, we'll explicitly
 * set the default public path, as a convenience.
 */

if (Blender.sees('o2system')) {
    Config.outputPath = 'assets';
    Config.publicPath = 'public';
}

/**
 * If the user activates hot reloading, with the --hot
 * flag, we'll record it as a file, so that O2System
 * can detect it and update its blender() url paths.
 */

Blender.listen('init', () => {
    if (Blender.shouldHotReload()) {
        let http = process.argv.includes('--https') ? 'https' : 'http';
        let port = process.argv.includes('--port')
            ? process.argv[process.argv.indexOf('--port') + 1]
            : Config.hmrOptions.port;

        new File(path.join(Config.publicPath, 'hot')).write(
            http + '://' + Config.hmrOptions.host + ':' + port + '/'
        );
    }
});

/**
 * Blender exposes a simple, fluent API for activating many common build
 * steps that a typical project should require. Behind the scenes,
 * all calls to this fluent API will update the above config.
 */

let Api = require('./Api');
let api = new Api();

module.exports = api;
module.exports.config = Config;
