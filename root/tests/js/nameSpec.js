/* globals MockMP */

(function () {

    "use strict";

    describe("{%= jsname %}", function () {

        var MashupPlatform;

        beforeAll(function () {
            MashupPlatform = new MockMP({
                type: 'operator'
            });
        });

        beforeEach(function () {
            MashupPlatform.reset();
        });

        it("Dummy test", function () {
            expect(true).toBeTruthy();
        });

    });
})();
