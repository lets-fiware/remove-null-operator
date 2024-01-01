/*
 * remove-null
 *
 *
 * Copyright (c) 2019-2024 Kazuhito Suda
 * Licensed under the MIT license.
 */

(function () {

    "use strict";

    var pushEvent = function pushEvent(data) {
        if (MashupPlatform.operator.outputs.output.connected) {
            MashupPlatform.wiring.pushEvent("output", data);
        }
    }

    var removeNull = function removeNull(data) {
        var mode = MashupPlatform.prefs.get('mode');

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
            pushEvent(data);
        }
    }

    /* TODO
     * this if is required for testing, but we have to search a cleaner way
     */
    if (window.MashupPlatform != null) {
        MashupPlatform.wiring.registerCallback("input", removeNull);
    }

    /* test-code */
    window.removeNull = removeNull;
    /* end-test-code */

})();
