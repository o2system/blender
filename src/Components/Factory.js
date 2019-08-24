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

let blender = require('../main');
let Assert = require('../Assert');
let webpackMerge = require('webpack-merge');

let components = {
    'base': [
        'JavaScript',
        'Browsersync',
        'Combine',
        'Copy',
        'Autoload',
        'Version',
        'Extend',
        'Extract',
        'DisableNotifications',
        'DumpWebpackConfig'
    ],
    'automation': [
        'Notifications',
        'Css',
        'PurifyCss',
    ],
    'javascript': [
        'Preact',
        'React',
        'Coffee',
        'TypeScript',
    ],
    'preprocessor': [
        'Less',
        'Sass',
        'Stylus',
        'PostCss',
    ]
};

/**
 * Class Factory
 *
 * @package Components
 */
class Factory {
    /**
     * Install all default components.
     */
    installAll() {
        // Install Base Components
        components.base
            .map(name => require(`./${name}`))
            .forEach(this.install.bind(this));

        // Install Automation Components
        components.automation
            .map(name => require(`./Automation/${name}`))
            .forEach(this.install.bind(this));

         // Install JavaScript Components
         components.javascript
             .map(name => require(`./JavaScript/${name}`))
             .forEach(this.install.bind(this));

         // Install Preprocessor Components
         components.preprocessor
             .map(name => require(`./Preprocessor/${name}`))
             .forEach(this.install.bind(this));
    }

    /**
     * Install a component.
     *
     * @param {Component} Component
     */
    install(Component) {
        let component =
            typeof Component === 'function' ? new Component() : Component;

        this.registerComponent(component);

        Blender.listen('init', () => {
            if (!component.activated && !component.passive) {
                return;
            }

            component.dependencies && this.installDependencies(component);
            component.boot && component.boot();
            component.babelConfig && this.applyBabelConfig(component);

            Blender.listen('loading-entry', entry => {
                if (component.webpackEntry) {
                    component.webpackEntry(entry);
                }
            });

            Blender.listen('loading-rules', rules => {
                component.webpackRules && this.applyRules(rules, component);
            });

            Blender.listen('loading-plugins', plugins => {
                component.webpackPlugins &&
                    this.applyPlugins(plugins, component);
            });

            Blender.listen('configReady', config => {
                component.webpackConfig && component.webpackConfig(config);
            });
        });
    }

    /**
     * Register the component.
     *
     * @param {Object} component
     */
    registerComponent(component) {
        []
            .concat(
                typeof component.name === 'function'
                    ? component.name()
                    : component.constructor.name.toLowerCase()
            )
            .forEach(name => {
                blender[name] = (...args) => {
                    Blender.components.record(name, component);

                    component.caller = name;

                    component.register && component.register(...args);

                    component.activated = true;

                    return blender;
                };

                // If we're dealing with a passive component that doesn't
                // need to be explicitly triggered by the user, we'll
                // call it now.
                if (component.passive) {
                    blender[name]();
                }

                // Components can optionally write to the Blender API directly.
                if (component.blender) {
                    Object.keys(component.blender()).forEach(name => {
                        blender[name] = component.blender()[name];
                    });
                }
            });
    }

    /**
     * Install the component's dependencies.
     *
     * @param {Object} component
     */
    installDependencies(component) {
        []
            .concat(component.dependencies())
            .filter(dependency => dependency)
            .tap(dependencies => {
                Assert.dependencies(dependencies, component.requiresReload);
            });
    }

    /**
     *
     * Apply the Babel configuration for the component.
     *
     * @param {Object} component
     */
    applyBabelConfig(component) {
        Config.babelConfig = webpackMerge.smart(
            Config.babelConfig,
            component.babelConfig()
        );
    }

    /**
     *
     * Apply the webpack rules for the component.
     *
     * @param {Object} component
     */
    applyRules(rules, component) {
        tap(component.webpackRules(), newRules => {
            newRules && rules.push(...[].concat(newRules));
        });
    }

    /**
     *
     * Apply the webpack plugins for the component.
     *
     * @param {Object} component
     */
    applyPlugins(plugins, component) {
        tap(component.webpackPlugins(), newPlugins => {
            newPlugins && plugins.push(...[].concat(newPlugins));
        });
    }
}

module.exports = ComponentFactory;
