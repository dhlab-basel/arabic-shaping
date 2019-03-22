requirejs.config({
    paths: {
        jquery: 'vendor/jquery-3.3.1.min'
    }
});

require(['jquery', 'arabic-shaping'], function ($, arabicShaping) {
    $(document).ready(function () {
        // An example string.
        const str = "بدأ العام الدراسى الجديد , و فرح التلاميذُ كثيراً بذهابهم إلى المدرسة و مقابلة زملاءهم . و دخل المُدرسُّ الفصلَ مبتسماً , و كان مسروراً بنظام التلاميذ و حماسهم , و قال لهم : ” اجتهدوا فالعلمُ أساسُ التقدم , و ليس النجاحُ صعباً على المجتهدين , و المجتهدُ دائماً يحافظُ على وقته .” و قد أصبحَ الحاسوب ضرورةً من ضرورات الحياة و مهارةً لازمةً لكل عمل . و ما زالَ الإنسان متعلماً فى مدرسة الحياة حتى يلاقى حتفه .";

        // Convert the string to an array of character groups. Each group contains at most one letter and
        // its diacritics, with any necessary ZWJ characters added.
        const charGroups = arabicShaping.makeCharGroupsWithZwj(str);

        // Wrap each character group in a <span>.
        const spans = charGroups.map(charGroup => "<span>" + charGroup + "</span>").join("");

        // Insert the <span> elements into the HTML document.
        $("body").append(spans);
    });
});
