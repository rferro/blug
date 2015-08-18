var colors;

colors = require('colors');

module.exports = {
  bar: colors.bgBlue,
  name: colors.white.bold,
  circular: colors.red.bold,
  "null": colors.magenta.bold,
  array: {
    bracket: colors.cyan.bold,
    empty: colors.cyan.bold
  },
  buffer: colors.blue.bold,
  string: {
    value: colors.blue.bold,
    quote: colors.white,
    nl: colors.white.bold
  },
  object: {
    valid: colors.cyan.bold,
    empty: colors.cyan.bold
  },
  number: colors.yellow.bold,
  boolean: {
    "true": colors.bgGreen.white.bold,
    "false": colors.bgRed.white.bold
  },
  "function": colors.green.bold,
  undefined: colors.magenta.bold,
  other: colors.bgWhite.black.bold,
  dots: colors.white,
  tabs: colors.white,
  regexp: colors.yellow.bold
};
