/*
 * remove-null
 *
 *
 * Copyright (c) 2019 Kazuhito Suda
 * Licensed under the MIT license.
 */

(function () {

    "use strict";

    var mode = MashupPlatform.prefs.get('mode');

    MashupPlatform.prefs.registerCallback(function (new_preferences) {
        mode = MashupPlatform.prefs.get('mode');
    }.bind(this));

    MashupPlatform.wiring.registerCallback('input', function (data) {
        if (data == null) {
            switch (mode) {
            case 'list':
                data = [];
                break;
            case 'object':
                data = {};
                break;
            }
        }

        if (data !== null || mode == 'pass') {
            MashupPlatform.wiring.pushEvent("output", data);
        }
    });

})();
