var _, colors, exports, inspect, nice, show, showValue, theme;

_ = require('lodash');

colors = require('colors');

inspect = require('util').inspect;

theme = {
  bar: colors.bgBlue,
  name: colors.white,
  circular: colors.cyan,
  "null": colors.magenta,
  array: {
    bracket: colors.gray,
    empty: colors.cyan
  },
  buffer: colors.blue,
  string: {
    value: colors.blue,
    quote: colors.gray,
    nl: colors.gray
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
  dots: colors.gray,
  tabs: colors.gray,
  regexp: colors.cyan
};

show = function(data, lvl, stack, max) {
  var name, obj, t, value;
  if (lvl == null) {
    lvl = 0;
  }
  if (stack == null) {
    stack = [];
  }
  if (max == null) {
    max = null;
  }
  if (lvl === 0) {
    obj = {};
    obj[showValue(data).type] = data;
    data = obj;
  }
  if (stack.indexOf(data) !== -1) {
    return process.stdout.write(theme.circular('[Circular]') + '\n');
  }
  if ((!max || lvl < max) && ((_.isObject(data) && !_.isNull(data) && !Buffer.isBuffer(data) && !_.isEmpty(data)) || _.isFunction(data))) {
    if (lvl > 0) {
      process.stdout.write('\n');
    }
    stack.push(data);
    for (name in data) {
      value = data[name];
      process.stdout.write(' ' + theme.bar(' ') + ' ');
      process.stdout.write(((function() {
        var j, ref, results;
        results = [];
        for (t = j = 0, ref = lvl; 0 <= ref ? j < ref : j > ref; t = 0 <= ref ? ++j : --j) {
          results.push(theme.tabs('| '));
        }
        return results;
      })()).join(''));
      process.stdout.write(theme.name(name) + theme.dots(': '));
      stack.concat(show(value, lvl + 1, stack, max));
    }
  } else {
    process.stdout.write(showValue(data).value + '\n');
  }
  return stack;
};

showValue = function(value) {
  var type;
  if (_.isFunction(value)) {
    type = 'function';
    value = theme["function"]('[Function]');
  } else if (_.isRegExp(value)) {
    type = 'regexp';
    value = theme.regexp(value.toString());
  } else if (_.isNull(value)) {
    type = 'null';
    value = theme["null"]('null');
  } else if (_.isArray(value)) {
    type = 'array';
    value = theme.array.empty('[]');
  } else if (_.isUndefined(value)) {
    type = 'undefined';
    value = theme.undefined('undefined');
  } else if (_.isObject(value)) {
    if (Buffer.isBuffer(value)) {
      type = 'buffer';
      value = theme.buffer("Buffer(" + value.length + ")");
    } else {
      type = 'object';
      if (_.isEmpty(value)) {
        value = theme.object.empty('{}');
      } else {
        value = theme.object.valid('[Object]');
      }
    }
  } else if (_.isString(value)) {
    type = 'string';
    value = value.split(/[\r\n]+/g).map(function(v) {
      return theme.string.value(v);
    }).join(theme.string.nl('\\n'));
    value = theme.string.quote('"') + value + theme.string.quote('"');
  } else if (_.isNumber(value)) {
    type = 'number';
    value = theme.number(String(value));
  } else if (_.isBoolean(value)) {
    type = 'boolean';
    if (value) {
      value = theme.boolean["true"](String(value));
    } else {
      value = theme.boolean["false"](String(value));
    }
  } else {
    type = 'other';
    value = theme.other(String(value));
  }
  return {
    type: type,
    value: value
  };
};

nice = function() {
  var i, j, len, ref, results, value;
  ref = Array.prototype.slice.call(arguments);
  results = [];
  for (i = j = 0, len = ref.length; j < len; i = ++j) {
    value = ref[i];
    results.push(show(value));
  }
  return results;
};

nice.max = function(max_level) {
  return function() {
    var i, j, len, ref, results, value;
    ref = Array.prototype.slice.call(arguments);
    results = [];
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      value = ref[i];
      results.push(show(value, null, null, max_level));
    }
    return results;
  };
};

module.exports = exports = nice;
