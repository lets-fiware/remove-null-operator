/* globals MockMP */

(function () {

    "use strict";

    describe("RemoveNull", function () {

        beforeAll(function () {
            window.MashupPlatform = new MockMP({
                type: 'operator',
                prefs: {
                    "mode": "remove",
                },
                inputs: ['input'],
                outputs: ['output']
            });
        });

        beforeEach(function () {
            MashupPlatform.reset();
            MashupPlatform.operator.outputs.output.connect({simulate: () => {}});
        });

        it("remove null", function () {
            MashupPlatform.prefs.set("mode", "remove");

            removeNull(null);

            expect(MashupPlatform.wiring.pushEvent).not.toHaveBeenCalled();
        });

        it("replace null with list", function () {
            MashupPlatform.prefs.set("mode", "list");

            removeNull(null);

            expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('output', []);
        });

        it("pass through number (list)", function () {
            MashupPlatform.prefs.set("mode", "list");

            removeNull(123);

            expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('output', 123);
        });

        it("replace null with object", function () {
            MashupPlatform.prefs.set("mode", "object");

            removeNull(null);

            expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('output', {});
        });

        it("pass through string (object)", function () {
            MashupPlatform.prefs.set("mode", "object");

            removeNull("null");

            expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('output', "null");
        });

        it("pass through null", function () {
            MashupPlatform.prefs.set("mode", "pass");

            removeNull(null);

            expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('output', null);
        });

        it("pass through number", function () {
            MashupPlatform.prefs.set("mode", "remove");

            removeNull(123);

            expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('output', 123);
        });

        it("pass through string", function () {
            MashupPlatform.prefs.set("mode", "remove");

            removeNull("xyz");

            expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('output', "xyz");
        });

        it("pass through list", function () {
            MashupPlatform.prefs.set("mode", "remove");

            removeNull([1, 2, 3]);

            expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('output', [1, 2, 3]);
        });

        it("pass through list", function () {
            MashupPlatform.prefs.set("mode", "remove");

            removeNull({"data": 123});

            expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('output', {"data": 123});
        });

    });

})();
