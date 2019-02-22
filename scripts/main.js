requirejs.config({
    paths: {
        jquery: 'vendor/jquery-3.3.1.min'
    }
});

require(['jquery', 'arabic-shaping'], function ($, arabicShaping) {
    $(document).ready(function () {
        // An example string.
        const str = "يُلاقي اهْتِماماً واسِعاً";

        // Convert the string to an array of character groups. Each group contains at most one letter and
        // its diacritics, with any necessary ZWJ characters added.
        const charGroups = arabicShaping.makeCharGroupsWithZwj(str);

        // Wrap each character group in a <span>.
        const spans = charGroups.map(charGroup => "<span>" + charGroup + "</span>").join("");

        // Insert the <span> elements into the HTML document.
        $("body").append(spans);
    });
});
