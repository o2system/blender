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

let path = require('path');

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
                    name: filepath => {
                        if(filepath.indexOf('resources') == -1) {
                            filepath = Config.outputPath
                            if (!/node_modules|bower_components/.test(filepath)) {
                                return Config.outputPath + '/' + Config.fileLoaderDirs.fonts + '/[name].[ext]?[hash]';
                            }

                            return (
                                Config.outputPath + '/' +
                                Config.fileLoaderDirs.fonts + '/' +
                                filepath
                                    .replace(/\\/g, '/')
                                    .replace(
                                        /((.*(node_modules|bower_components))|images|image|img|assets)\//g,
                                        ''
                                    ) +
                                '?[hash]'
                            );
                        } else {
                            filepath = filepath.replace(path.resolve('./resources') + '/', '');

                            if (!/node_modules|bower_components/.test(filepath)) {
                                return filepath + '?[hash]';
                            }

                            return (
                                filepath
                                    .replace(/\\/g, '/')
                                    .replace(
                                        /((.*(node_modules|bower_components))|images|image|img|assets)\//g,
                                        ''
                                    ) +
                                '?[hash]'
                            );
                        }
                    }
                }
            },

            {
                loader: 'img-loader',
                options: Config.imgLoaderOptions
            }
        ]
    });

    // Add support for loading media.
    rules.push({
        // only include svg that doesn't have font in the path or file name by using negative lookahead
        test: /(\.(webm|mp4|mp3|ogg))/,
        loaders: [
            {
                loader: 'file-loader',
                options: {
                    name: filepath => {
                        if(filepath.indexOf('resources') == -1) {
                            filepath = Config.outputPath
                            if (!/node_modules|bower_components/.test(filepath)) {
                                return Config.outputPath + '/' + Config.fileLoaderDirs.fonts + '/[name].[ext]?[hash]';
                            }

                            return (
                                Config.outputPath + '/' +
                                Config.fileLoaderDirs.fonts + '/' +
                                filepath
                                    .replace(/\\/g, '/')
                                    .replace(
                                        /((.*(node_modules|bower_components))|media|image|img|assets)\//g,
                                        ''
                                    ) +
                                '?[hash]'
                            );
                        } else {
                            filepath = filepath.replace(path.resolve('./resources') + '/', '');

                            if (!/node_modules|bower_components/.test(filepath)) {
                                return filepath + '?[hash]';
                            }

                            return (
                                filepath
                                    .replace(/\\/g, '/')
                                    .replace(
                                        /((.*(node_modules|bower_components))|media|image|img|assets)\//g,
                                        ''
                                    ) +
                                '?[hash]'
                            );
                        }
                    }
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
            name: filepath => {
                if(filepath.indexOf('resources') == -1) {
                    filepath = Config.outputPath
                    if (!/node_modules|bower_components/.test(filepath)) {
                        return Config.outputPath + '/' + Config.fileLoaderDirs.fonts + '/[name].[ext]?[hash]';
                    }

                    return (
                        Config.outputPath + '/' +
                        Config.fileLoaderDirs.fonts + '/' +
                        filepath
                            .replace(/\\/g, '/')
                            .replace(
                                /((.*(node_modules|bower_components))|fonts|font|assets)\//g,
                                ''
                            ) +
                        '?[hash]'
                    );
                } else {
                    filepath = filepath.replace(path.resolve('./resources') + '/', '');

                    if (!/node_modules|bower_components/.test(filepath)) {
                        return filepath + '?[hash]';
                    }

                    return (
                        filepath
                            .replace(/\\/g, '/')
                            .replace(
                                /((.*(node_modules|bower_components))|fonts|font|assets)\//g,
                                ''
                            ) +
                        '?[hash]'
                    );
                }
            }
        }
    });

    // Add support for loading cursor files.
    rules.push({
        test: /\.(cur|ani)$/,
        loader: 'file-loader',
        options: {
            name: '[name].[ext]?[hash]',
            outputPath: Config.outputPath
        }
    });

    return rules;
};
