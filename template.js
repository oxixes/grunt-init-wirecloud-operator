/*
 * grunt-init-gruntfile
 * https://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

var path = require('path');

'use strict';

// Basic template description.
exports.description = 'Create a WireCloud operator with grunt-init, including Jasmine unit tests.';


// Template-specific notes to be displayed before question prompts.
exports.notes = '';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

var sanitizeComparer = function sanitizeComparer(reg) {
    return function(value, data, done) {
        done(null, reg.test(value));
    };
};

var sanitizeLower = function sanitizeLower(value, data, done) {
    done(null, value.toLowerCase());
};

var compose = function compose(f, g) {
    return function() {
        return f.call(this, g.apply(this, arguments));
    };
};

var capitalizeAndRemoveUnderscore = function capitalizeAndRemoveUnderscore(old) {
    var t = old.replace(/^([A-Z])|[\s-_](\w)/g, function(match, p1, p2, offset) {
        if (p2) return p2.toUpperCase();
        return p1.toLowerCase();
    });
    return t.charAt(0).toUpperCase() + t.slice(1);
};

// The actual init template.
exports.template = function(grunt, init, done) {
    init.process([
        {
            name: "js",
            message: "Is the project in javascript or in typescript?",
            default: "js",
            validator: /(js|ts)/i,
            sanitize: sanitizeComparer(/js/i),
            warning: "Valid options: \"js\" for javascript or \"ts\" for typescript"
        },
        // {
        //     name: "widget",
        //     message: "Will it be a widget or an operator?",
        //     default: "widget",
        //     validator: /(widget|operator)/i,
        //     sanitize: sanitizeComparer(/widget/i),
        //     warning: "Valid options: \"widget\" or \"operator\""
        // },
        // {
        //     name: "build_system",
        //     message: "Will the project use grunt, ... (now only grunt)",
        //     default: "grunt",
        //     validator: /grunt/i,
        //     sanitize: sanitizeLower,
        //     warning: "Valid options: \"grunt\""
        // },
        {
            name: "json",
            message: "Will the widget save its configuration in json (recommended) or in xml (soon to be deprecated)?",
            default: "json",
            validator: /(json|xml)/i,
            sanitize: sanitizeComparer(/json/i),
            warning: "Valid options: \"json\" for JSON or \"xml\" for XML"
        },
        {
            name: "jquery",
            message: "Will the project use jquery?",
            default: "y/N",
            sanitize: sanitizeComparer(/^\s*y(es)?\s*$/i)
        },
        init.prompt("author_name"),
        init.prompt("author_email"),
        {
            name: "name",
            message: "Project name",
            default: function (value, data, done) {
                done(null, path.basename(process.cwd()).replace(/-operator$/, ''));
            }
        },
        // Widget Name
        {
            name: "project_name",
            message: "Long Project name",
            default: "My project name"
        },
        init.prompt('description'),
        init.prompt('version'),
        init.prompt('repository'),
        init.prompt('homepage'),
        init.prompt('bugs'),
        init.prompt('licenses'),
        {
            name: "vendor",
            message: "Vendor name",
            default: "Vendor",
            warning: ""
        },
        {
            name: "vendor_title",
            message: "Vendor title (for copyright)",
            default: function(value, data, done) {
                done(null, data.vendor);
            },
            warning: ""
        }

    ], function(err, props){
        var exportsOverride = {};
        props.jsname = capitalizeAndRemoveUnderscore(props.name);
        props.bower = props.jquery; // Change way to determine bower?
        props.ngsi = false; // ??
        var bowerdeps = {};
        var bowerdevDependencies = {};
        var devDependencies = {
            "grunt": "^1.0.4",
            "mock-applicationmashup": "^1.0.0-e"
        };

        if (!props.js) {
            devDependencies["typescript"] = "^1.5.0";
        }

        if (props.bower) {
            // initialize things only for widgets!
            devDependencies["bower"] = "^1.8.8";

            if (props.jquery) {
                // bower
                bowerdeps["jquery"] = "^3.0.0";
                exportsOverride["jquery"] = {
                    "js": "dist/jquery.min.js"
                };
            }
        }

        if (props.js) {
            devDependencies["gruntify-eslint"] = "^5.0.0";
        } else {
            devDependencies["grunt-typescript"] =  "^0.7.0";
            devDependencies["grunt-tslint"] = "^2.4.0";
        }

        if (props.bower) {
            devDependencies["grunt-bower-task"] = "^0.5.0";
        }

        // Testing dependencies
        devDependencies["jasmine-core"] = "^3.5.0";
        devDependencies["grunt-coveralls"] = "^2.0.0";
        devDependencies["grunt-karma"] = "^3.0.2";
        devDependencies["karma"] = "^4.4.1";
        devDependencies["karma-chrome-launcher"] = "^3.1.0";
        devDependencies["karma-coverage"] = "^2.0.1";
        devDependencies["karma-firefox-launcher"] = "^1.2.0";
        devDependencies["karma-jasmine"] = "^2.0.1";
        devDependencies["karma-junit-reporter"] = "^2.0.1";

        devDependencies["grunt-contrib-clean"] = "^2.0.0";
        devDependencies["grunt-contrib-compress"] = "^1.6.0";
        devDependencies["grunt-contrib-copy"] = "^1.0.0";
        devDependencies["grunt-strip-code"] = "^1.0.6";
        devDependencies["grunt-text-replace"] = "~0.4.0";

        devDependencies["grunt-wirecloud"] = "^0.9.7";
        devDependencies["wirecloud-config-parser"] = "^0.2.2";

        // Files to copy (and process).
        var files = init.filesToCopy(props);
        init.addLicenseFiles(files, props.licenses);

        // Actually copy (and process) files.
        init.copyAndProcess(files, props);

        // Write bower.json :)
        if (props.bower) {
            init.writePackageJSON("bower.json",
                                  {name: props.name,
                                   dependencies:  bowerdeps,
                                   devDependencies:  bowerdevDependencies},
                                  function(pkg, props) {
                                      pkg.exportsOverride = exportsOverride;
                                      return pkg;
                                  });
        }

        // Write package.json :)
        var nobj = {};
        if (props.json) {
            nobj.description = "This package.json file is only used for installing npm dependencies. But this is not an installable node package, but a WireCloud widget. Take a look into src/config.json for more details about this widget";
        }
        else {
            nobj.description = "This package.json file is only used for installing npm dependencies. But this is not an installable node package, but a WireCloud widget. Take a look into src/config.xml for more details about this widget";
        }
        nobj.devDependencies = devDependencies;
        init.writePackageJSON('package.json', nobj, function(pkg, props) {
            pkg.private = true;
            pkg.vendor = props.vendor;
            return pkg;
        });
    });
};
