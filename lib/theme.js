var colors;

colors = require('colors');

module.exports = {
  bar: colors.bgBlue,
  name: colors.white.bold,
  circular: colors.cyan,
  "null": colors.magenta,
  array: {
    bracket: colors.white,
    empty: colors.cyan
  },
  buffer: colors.blue,
  string: {
    value: colors.blue,
    quote: colors.white,
    nl: colors.white
  },
  object: {
    valid: colors.cyan,
    empty: colors.cyan
  },
  number: colors.yellow,
  boolean: {
    "true": colors.green,
    "false": colors.red
  },
  "function": colors.cyan,
  undefined: colors.magenta,
  other: colors.bgWhite.black,
  dots: colors.white,
  tabs: colors.white,
  regexp: colors.cyan
};
