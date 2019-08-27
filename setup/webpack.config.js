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
 * As our first step, we'll pull in the user's webpack.blender.js
 * file. Based on what the user requests in that file,
 * a generic config object will be constructed for us.
 */
let blender = require('../src/main');

let Factory = require('../src/components/Factory');

new Factory().installAll();

require(Blender.paths.init());

/**
 * Just in case the user needs to hook into this point
 * in the build process, we'll make an announcement.
 */

Blender.dispatch('init', Blender);

/**
 * Now that we know which build tasks are required by the
 * user, we can dynamically create a configuration object
 * for Webpack. And that's all there is to it. Simple!
 */

let WebpackConfig = require('../src/builder/WebpackConfig');

module.exports = new WebpackConfig().build();
