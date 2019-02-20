#!/usr/bin/env python3

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

    with open("arabic-shaping-data.json", "w") as output_file:
        json.dump(char_data, output_file, indent=2, separators=(',', ': '))


if __name__ == "__main__":
    main()
