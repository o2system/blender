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

let ConcatFilesTask = require('../Tasks/ConcatenateFilesTask');
let Assert = require('../Assert');
let _ = require('lodash');
let glob = require('glob');

/**
 * Class Combine
 *
 * @package Components
 */
class Combine {
    /**
     * The API name for the component.
     */
    name() {
        return ['combine', 'scripts', 'babel', 'styles', 'minify'];
    }

    /**
     *
     * Register the component.
     *
     * @param {*} src
     * @param {string} output
     * @param {Boolean} babel
     */
    register(src, output = '', babel = false) {
        if (this.caller === 'babel') {
            babel = true;
        }

        if (this.caller === 'minify') {
            if (Array.isArray(src)) {
                src.forEach(file => this.register(file));

                return this;
            }

            output = src.replace(/\.([a-z]{2,})$/i, '.min.$1');
        }

        output = new File(output);

        Assert.combine(src, output);

        if (typeof src === 'string' && File.find(src).isDirectory()) {
            src = _.pull(
                glob.sync(path.join(src, '**/*'), { nodir: true }),
                output.relativePath()
            );
        }

        let task = new ConcatFilesTask({ src, output, babel });

        Blender.addTask(task);
    }
}

module.exports = Combine;
