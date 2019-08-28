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

let objectValues = require('lodash').values;

/**
 * Generic tap function.
 *
 * @param {mixed}    val
 * @param {Function} callback
 */
global.tap = function(val, callback) {
    callback(val);

    return val;
};

/**
 * Add tap to arrays.
 *
 * @param {mixed}    val
 * @param {Function} callback
 */
Object.defineProperty(Array.prototype, 'tap', {
    value: function(callback) {
        if (this.length) {
            callback(this);
        }
        return this;
    }
});

/**
 * Reject items from an array.
 *
 * @param {mixed}    val
 * @param {Function} callback
 */

Object.defineProperty(Array.prototype, 'reject', {
    value: function(callback) {
        return this.filter(item => !callback(item));
    }
});

/**
 * Flatten the given array.
 *
 * @param {Array} arr
 */
global.flatten = function(arr) {
    return [].concat.apply([], objectValues(arr));
};

/**
 * Sort object by keys
 *
 * @param {Object} obj
 */
global.sortObjectKeys = obj => {
    return Object.keys(obj)
        .sort()
        .reduce((r, k) => ((r[k] = obj[k]), r), {});
};
