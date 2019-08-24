
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

let Assert = require('../../Assert');
let Preprocessor = require('../Preprocessor');

/**
 * Class PostCss
 *
 * @package Components/Preprocessor
 */
class PostCss extends Preprocessor {
    /**
     * The API name for the component.
     */
    name() {
        return 'postCss';
    }

    /**
     * Register the component.
     *
     * @param {*} src
     * @param {string} output
     * @param {Array} postCssPlugins
     */
    register(src, output, postCssPlugins = []) {
        Assert.preprocessor('postCss', src, output);

        src = new File(src);

        output = this.normalizeOutput(
            new File(output),
            src.nameWithoutExtension() + '.css'
        );

        this.details = (this.details || []).concat({
            type: 'postCss',
            src,
            output,
            postCssPlugins: [].concat(postCssPlugins)
        });
    }

    /**
     * Override the generated webpack configuration.
     *
     * @param {Object} config
     */
    webpackConfig(config) {
        config.module.rules.find(
            rule => rule.test.toString() === '/\\.css$/'
        ).exclude = this.details.map(postCss => postCss.src.path());
    }
}

module.exports = PostCss;
