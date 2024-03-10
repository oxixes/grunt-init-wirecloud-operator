/*
 * {%= name %}
 * {%= homepage %}
 *
 * Copyright (c) {%= grunt.template.today('yyyy') %} {%= vendor_title %}
 * Licensed under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.
 */

/* exported {%= entrypoint %} */

(function () {

    "use strict";

    class {%= entrypoint %} {
        constructor(MashupPlatform, extra) {
            this.MashupPlatform = MashupPlatform;

            MashupPlatform.prefs.registerCallback(function (new_preferences) {

            }.bind(this));
        }
    }

    // We define the class as part of the window object so that it can be instantiated by Wirecloud
    window.{%= entrypoint %} = {%= entrypoint %};

    /* test-code */

    /* end-test-code */

})();
