requirejs.config({
    paths: {
        jquery: 'vendor/jquery-3.3.1.min'
    }
});

require(['jquery', 'arabic-shaping'], function ($, arabicShaping) {
    $(document).ready(function () {
        const str = "يُلاقي اهْتِماماً واسِعاً";
        const charGroups = arabicShaping.makeCharGroupsWithZwj(str);
        const spans = charGroups.map(charGroup => "<span>" + charGroup + "</span>").join("");
        $("body").append(spans);
    });
});
