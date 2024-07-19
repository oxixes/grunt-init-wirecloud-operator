/*
 * {%= name %}
 * {%= homepage %}
 *
 * Copyright (c) {%= grunt.template.today('yyyy') %} {%= vendor_title %}
 * Licensed under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.
 */

/* global Wirecloud */

(function (script) {

    "use strict";

    class Operator {
        constructor(MashupPlatform, extra) {
            this.MashupPlatform = MashupPlatform;

            MashupPlatform.prefs.registerCallback(function (new_preferences) {

            }.bind(this));
        }
    }

    if (!('Wirecloud') in window) {
        // For testing purposes
        window.Operator = Operator;
    } else {
        Wirecloud.registerOperatorClass(script, Operator);
    }

    /* test-code */

    /* end-test-code */

})(document.currentScript);
