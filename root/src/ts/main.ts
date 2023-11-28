/*
 * {%= name %}
 * {%= homepage %}
 *
 * Copyright (c) {%= grunt.template.today('yyyy') %} {%= vendor_title %}
 * Licensed under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.
 */

/// <reference path="../../typings/MashupPlatform/MashupPlatform.d.ts"/>
{% if (ngsi) { %}/// <reference path="../../typings/NGSI/NGSI.d.ts"/>{% }%}

"use strict";

/* import-block */
import MashupPlatform = require("MashupPlatform");
{% if (ngsi) { %}import NGSI = require("NGSI");{% }%}
/* end-import-block */

export class {%= jsname %} {
    private MashupPlatform: MashupPlatform;
    {% if (ngsi) { %}private NGSI: NGSI;{% }%}

    constructor(MashupPlatform: MashupPlatform, extra: any) {
        this.MashupPlatform = MashupPlatform;
        {% if (ngsi) { %}this.NGSI = extra.NGSI;{% }%}

        this.init();
    }

    init() {
        console.log("Loaded!!");
    }
}

// We define the class as part of the window object so that it can be instantiated by Wirecloud
(<any>window)["{%= jsname %}"] = {%= jsname %};