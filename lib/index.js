var _, blug, getValue, show, theme;

_ = require('lodash');

getValue = require('./value');

theme = require('./theme');

show = function(data, level, stack, names, max) {
  var circular, name, obj, stack_index, t, value;
  if (level == null) {
    level = 0;
  }
  if (stack == null) {
    stack = [];
  }
  if (names == null) {
    names = [];
  }
  if (max == null) {
    max = null;
  }
  if (level === 0) {
    obj = {};
    obj[getValue(data).type] = data;
    data = obj;
  }
  stack_index = _.findIndex(stack, function(item) {
    return item[0] === data;
  });
  if (stack_index !== -1) {
    data = {
      __circular: stack[stack_index][1]
    };
    circular = true;
  } else {
    circular = false;
  }
  if (!circular && (!max || level < max) && ((_.isObject(data) && !_.isNull(data) && !Buffer.isBuffer(data) && !_.isEmpty(data)) || _.isFunction(data))) {
    stack.push([data, names]);
    if (_.isFunction(data)) {
      process.stdout.write(getValue(data).value);
    }
    if (level > 0) {
      process.stdout.write('\n');
    }
    for (name in data) {
      value = data[name];
      process.stdout.write(' ' + theme.bar(' ') + ' ');
      process.stdout.write(((function() {
        var j, ref, results;
        results = [];
        for (t = j = 0, ref = level; 0 <= ref ? j < ref : j > ref; t = 0 <= ref ? ++j : --j) {
          results.push(theme.tabs('| '));
        }
        return results;
      })()).join(''));
      if (data instanceof Array) {
        process.stdout.write(theme.array.bracket('['));
      }
      process.stdout.write(theme.name(name));
      if (data instanceof Array) {
        process.stdout.write(theme.array.bracket(']'));
      }
      process.stdout.write(theme.dots(': '));
      stack.concat(show(value, level + 1, stack, names.slice(0).concat(name), max));
    }
  } else {
    process.stdout.write(getValue(data).value + '\n');
  }
  return stack;
};

blug = function() {
  var i, j, len, ref, results, value;
  ref = Array.prototype.slice.call(arguments);
  results = [];
  for (i = j = 0, len = ref.length; j < len; i = ++j) {
    value = ref[i];
    results.push(show(value));
  }
  return results;
};

blug.max = function(max_level) {
  return function() {
    var i, j, len, ref, results, value;
    ref = Array.prototype.slice.call(arguments);
    results = [];
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      value = ref[i];
      results.push(show(value, null, null, null, max_level));
    }
    return results;
  };
};

module.exports = blug;
