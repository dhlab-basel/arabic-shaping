#!/usr/bin/env python3

# Converts the Unicode data file ArabicShaping.txt to
# scripts/arabic-shaping-data.js.

import re
import json

character_data_regex = re.compile(r"^([A-Z0-9]+);.*;\s+([A-Z]);.*$")


def main():
    char_data = {}

    with open("ArabicShaping.txt", "r") as input_file:
        for line in input_file:
            match = character_data_regex.match(line)

            if match is not None:
                char_hex_code = format(int(match.group(1), 16), "x").upper()
                char_data[char_hex_code] = match.group(2)

    with open("../scripts/arabic-shaping-data.js", "w") as output_file:
        output_file.write("define(")
        json.dump(char_data, output_file, indent=2, separators=(',', ': '))
        output_file.write(");")


if __name__ == "__main__":
    main()
