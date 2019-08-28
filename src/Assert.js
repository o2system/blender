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

let assert = require('assert');
let Dependencies = require('./Dependencies');
let argv = require('yargs').argv;

/**
 * Class Assert
 */
class Assert {
    /**
     * Assert that the call the blender.js() is valid.
     *
     * @param {*} entry
     * @param {*} output
     */
    static js(entry, output) {
        assert(
            typeof entry === 'string' || Array.isArray(entry),
            'blender.js() is missing required parameter 1: entry'
        );

        assert(
            typeof output === 'string',
            'blender.js() is missing required parameter 2: output'
        );
    }

    /**
     * Assert that the calls to blender.sass() and blender.less() are valid.
     *
     * @param {string} type
     * @param {string} src
     * @param {string} output
     */
    static preprocessor(type, src, output) {
        assert(
            typeof src === 'string',
            `blender.${type}() is missing required parameter 1: src`
        );

        assert(
            typeof output === 'string',
            `blender.${type}() is missing required parameter 2: output`
        );
    }

    /**
     * Assert that calls to blender.combine() are valid.
     *
     * @param {string} src
     * @param {File}   output
     */
    static combine(src, output) {
        assert(
            output.isFile(),
            'blender.combine() requires a full output file path as the second argument.'
        );
    }

    /**
     * Assert that the given file exists.
     *
     * @param {string} file
     */
    static exists(file) {
        assert(
            File.exists(file),
            `Whoops, you are trying to compile ${file}, but that file does not exist.`
        );
    }

    /**
     * Assert that the necessary dependencies are available.
     *
     * @param {Array}  list
     * @param {Boolean} abortOnComplete
     */
    static dependencies(dependencies, abortOnComplete = false) {
        if (argv['$0'].includes('ava')) return;

        new Dependencies(dependencies).install(abortOnComplete);
    }
}

module.exports = Assert;
