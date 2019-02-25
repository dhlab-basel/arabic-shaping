#!/usr/bin/env python3

# Converts Unicode Arabic character data files to JavaScript modules.

import re
import json

shaping_data_regex = re.compile(r"^([A-Z0-9]+);.*;\s+([A-Z]);.*$")
non_spacing_data_regex = re.compile(r"^U\+([A-Z0-9]{4})\s+.*$")


def write_js_data(data, path):
    with open(path, "w") as output_file:
        output_file.write("define(")
        json.dump(data, output_file, indent=2, separators=(',', ': '))
        output_file.write(");")


def main():
    shaping_data = {}

    with open("ArabicShaping.txt", "r") as input_file:
        for line in input_file:
            match = shaping_data_regex.match(line)

            if match is not None:
                char_hex_code = format(int(match.group(1), 16), "x").upper()
                joining_type = match.group(2)
                shaping_data[char_hex_code] = joining_type

    write_js_data(shaping_data, "../scripts/arabic-shaping-data.js")

    diacritics = []

    with open("ArabicNonspacing.txt", "r") as input_file:
        for line in input_file:
            match = non_spacing_data_regex.match(line)

            if match is not None:
                char_hex_code = format(int(match.group(1), 16), "x").upper()
                diacritics.append(char_hex_code)

    non_spacing_data = {
        "diacritics": diacritics
    }

    write_js_data(non_spacing_data, "../scripts/arabic-nonspacing-data.js")


if __name__ == "__main__":
    main()
