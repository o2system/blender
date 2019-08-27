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

module.exports = function() {
    let rules = [];

    // Add support for loading HTML files.
    rules.push({
        test: /\.html$/,
        loaders: ['html-loader']
    });

    // Add support for loading images.
    rules.push({
        // only include svg that doesn't have font in the path or file name by using negative lookahead
        test: /(\.(png|jpe?g|gif|webp)$|^((?!font).)*\.svg$)/,
        loaders: [
            {
                loader: 'file-loader',
                options: {
                    name: path => {
                        if (!/node_modules|bower_components/.test(path)) {
                            return (
                                Config.fileLoaderDirs.images +
                                '/[name].[ext]?[hash]'
                            );
                        }

                        return (
                            Config.fileLoaderDirs.images + '/' +
                            path
                                .replace(/\\/g, '/')
                                .replace(
                                    /((.*(node_modules|bower_components))|images|image|img|assets)\//g,
                                    ''
                                ) +
                            '?[hash]'
                        );
                    },
                    outputPath: Config.outputPath,
                    publicPath: Config.resourceRoot
                }
            },

            {
                loader: 'img-loader',
                options: Config.imgLoaderOptions
            }
        ]
    });

    // Add support for loading fonts.
    rules.push({
        test: /(\.(woff2?|ttf|eot|otf)$|font.*\.svg$)/,
        loader: 'file-loader',
        options: {
            name: path => {
                if (!/node_modules|bower_components/.test(path)) {
                    return Config.fileLoaderDirs.fonts + '/[name].[ext]?[hash]';
                }

                return (
                    Config.fileLoaderDirs.fonts + '/' +
                    path
                        .replace(/\\/g, '/')
                        .replace(
                            /((.*(node_modules|bower_components))|fonts|font|assets)\//g,
                            ''
                        ) +
                    '?[hash]'
                );
            },
            outputPath: Config.outputPath,
            publicPath: Config.resourceRoot
        }
    });

    // Add support for loading cursor files.
    rules.push({
        test: /\.(cur|ani)$/,
        loader: 'file-loader',
        options: {
            name: '[name].[ext]?[hash]',
            outputPath: Config.outputPath,
            publicPath: Config.resourceRoot
        }
    });

    return rules;
};
