/*
 * remove-null
 *
 *
 * Copyright (c) 2019 Kazuhito Suda
 * Licensed under the MIT license.
 */

(function () {

    "use strict";

    MashupPlatform.wiring.registerCallback('input', function (data) {
        if (data !== null) {
            MashupPlatform.wiring.pushEvent("output", data);
        }
    });

})();
