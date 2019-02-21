const assert = require("assert");
const ArabicShaping = require("../arabic-shaping.js");

describe("ArabicShaping", function () {
    describe("#makeCharGroupsWithZwj()", function () {
        it("should add ZWJ correctly to the letters in a string", function () {
            const str = "يُلاقي اهْتِماماً واسِعاً";
            const charGroups = ArabicShaping.makeCharGroupsWithZwj(str);

            const expectedCharGroups = [
                "يُ&zwj;",
                "&zwj;ل&zwj;",
                "&zwj;ا",
                "ق&zwj;",
                "&zwj;ي",
                " ",
                "ا",
                "هْ&zwj;",
                "&zwj;تِ&zwj;",
                "&zwj;م&zwj;",
                "&zwj;ا",
                "م&zwj;",
                "&zwj;اً",
                " ",
                "و",
                "ا",
                "سِ&zwj;",
                "&zwj;ع&zwj;",
                "&zwj;اً"
            ];

            assert.deepEqual(charGroups, expectedCharGroups);
            const spans = charGroups.map(charGroup => "<span>" + charGroup + "</span>").join("");
            const expectedSpans = "<span>يُ&zwj;</span><span>&zwj;ل&zwj;</span><span>&zwj;ا</span><span>ق&zwj;</span><span>&zwj;ي</span><span> </span><span>ا</span><span>هْ&zwj;</span><span>&zwj;تِ&zwj;</span><span>&zwj;م&zwj;</span><span>&zwj;ا</span><span>م&zwj;</span><span>&zwj;اً</span><span> </span><span>و</span><span>ا</span><span>سِ&zwj;</span><span>&zwj;ع&zwj;</span><span>&zwj;اً</span>";
            assert.equal(spans, expectedSpans);
        });
    });
});
