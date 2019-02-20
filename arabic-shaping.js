const arabic_shaping_data = require("./arabic-shaping-data.json");

exports.isDiacritic = isDiacritic;

exports.addZwj = function(charGroup, previousCharGroup, nextCharGroup) {
    const char = removeDiacritics(charGroup);
    const previousChar = removeDiacritics(previousCharGroup);
    const nextChar = removeDiacritics(nextCharGroup);

    const zwjInstruction = getZwjInstruction(char, previousChar, nextChar);

    switch(zwjInstruction) {
        case ZwjInstructions.ZwjBefore:
            return ZWJ + charGroup;

        case ZwjInstructions.ZwjAfter:
            return charGroup + ZWJ;

        case ZwjInstructions.ZwjBoth:
            return ZWJ + charGroup + ZWJ;

        default:
            return charGroup;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////

ZWJ = "&zwj;";

function removeDiacritics(str) {
    if (str === undefined || str === null || str === "") {
        return str;
    }

    let result = "";

    for (let i = 0; i < str.length; i++) {
        let char = str.charAt(i);

        if (!isDiacritic(char)) {
            result += char;
        }
    }

    return result;
}

function isDiacritic(char) {
    if (!isArabicChar(char)) {
        return false;
    } else {
        return diacritics.has(charToCodePointStr(char));
    }
}

const ZwjInstructions = {
    ZwjBefore: "Zwj_Before",
    ZwjAfter: "Zwj_After",
    ZwjBoth: "Zwj_Both",
    ZwjNone: "Zwj_None",
};

Object.freeze(ZwjInstructions);

function getZwjInstruction(char, previousChar, nextChar) {
    const charJoiningProperty = getJoiningProperty(char);
    const previousCharJoiningProperty = getJoiningProperty(previousChar);
    const nextCharJoiningProperty = getJoiningProperty(nextChar);

    const needsZwJBefore = joinsLeft(previousCharJoiningProperty) && joinsRight(charJoiningProperty);
    const needsZwJAfter = joinsLeft(charJoiningProperty) && joinsRight(nextCharJoiningProperty);

    if (needsZwJBefore && needsZwJAfter) {
        return ZwjInstructions.ZwjBoth;
    } else if (needsZwJBefore) {
        return ZwjInstructions.ZwjBefore;
    } else if (needsZwJAfter) {
        return ZwjInstructions.ZwjAfter;
    } else {
        return ZwjInstructions.ZwjNone;
    }
}

function isArabicChar(char) {
    if (char === undefined || char === null || char === "") {
        return false;
    }

    const codePoint = char.codePointAt(0);

    return (codePoint >= 0x0600 && codePoint <= 0x06FF) ||
        (codePoint >= 0x0750 && codePoint <= 0x077F) ||
        (codePoint >= 0x08A0 && codePoint <= 0x08FF) ||
        (codePoint >= 0xFB50 && codePoint <= 0xFDFF) ||
        (codePoint >= 0xFE70 && codePoint <= 0xFEFF) ||
        (codePoint >= 0x10E60 && codePoint <= 0x10E7F) ||
        (codePoint >= 0x1EC70 && codePoint <= 0x1ECBF) ||
        (codePoint >= 0x1EE00 && codePoint <= 0x1EEFF)
}

function charToCodePointStr(char) {
    return char.codePointAt(0).toString(16).toUpperCase();
}

const JoiningProperties = {
    RightJoining: "R",
    LeftJoining: "L",
    DualJoining: "D",
    JoinCausing: "C",
    NonJoining: "U",
    Transparent: "T"
};

Object.freeze(JoiningProperties);

function getJoiningProperty(char) {
    if (!isArabicChar(char)) {
        return JoiningProperties.NonJoining;
    } else {
        const codePointStr = charToCodePointStr(char);

        if (diacritics.has(codePointStr)) {
            return JoiningProperties.Transparent;
        } else {
            const char_shaping_data = arabic_shaping_data[codePointStr];

            if (char_shaping_data === undefined) {
                return JoiningProperties.NonJoining;
            } else {
                return char_shaping_data;
            }
        }
    }
}

function joinsLeft(joiningProperty) {
    return joiningProperty === JoiningProperties.LeftJoining || joiningProperty === JoiningProperties.DualJoining;
}

function joinsRight(joiningProperty) {
    return joiningProperty === JoiningProperties.RightJoining || joiningProperty === JoiningProperties.DualJoining;
}

// A set of all the non-spacing characters in the Arabic Unicode character block 0600-06FF.
const diacritics = new Set([
    "610",
    "611",
    "612",
    "613",
    "614",
    "615",
    "616",
    "617",
    "618",
    "619",
    "61A",
    "64B",
    "64C",
    "64D",
    "64E",
    "64F",
    "650",
    "651",
    "652",
    "653",
    "654",
    "655",
    "656",
    "657",
    "658",
    "659",
    "65A",
    "65B",
    "65C",
    "65D",
    "65E",
    "670",
    "6D6",
    "6D7",
    "6D8",
    "6D9",
    "6DA",
    "6DB",
    "6DC",
    "6DF",
    "6E0",
    "6E1",
    "6E2",
    "6E3",
    "6E4",
    "6E7",
    "6E8",
    "6EA",
    "6EB",
    "6EC",
    "6ED",
    "65F"
]);
