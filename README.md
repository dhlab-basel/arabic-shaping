# arabic-shaping

This library implements a workaround for the WebKit bug,
[WebKit doesn't shape characters (like Arabic) across style changes](https://bugs.webkit.org/show_bug.cgi?id=6148),
when formatting Arabic text in HTML. The workaround involves adding zero-width-joiner (`&zwj;`) characters before
and/or after characters that need to be joined, taking into account the joining properties and context of each letter.
This implementation is intended for the use case where each letter and its diacritics are wrapped in a separate
`<span>` element.

It provides these functions:
 
- `isArabicChar`: Determines whether a character is an Arabic character.
- `isArabicNonDiacritic`: Determines whether a character is an Arabic non-diacritic (e.g. a letter).
- `isArabicDiacritic`: Determines whether a character is an Arabic diacritic.
- `addZwj`: Adds ZWJ as needed before and/or after a character group.
- `removeZwj`: Removes ZWJ from a character group.
- `getNextCharGroup`: Extracts a substring containing at most one letter and its diacritics.
- `makeCharGroupsWithZwj`: Converts a string to an array of character groups, with any necessary ZWJ characters
  added. Each group can then be wrapped in a `<span>`.
 
See `index.html` and `main.js` for an example.
