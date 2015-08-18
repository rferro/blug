var _, blug, getValue, show, theme;

_ = require('lodash');

getValue = require('./value');

theme = require('./theme');

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
    obj[getValue(data).type] = data;
    data = obj;
  }
  if (stack.indexOf(data) !== -1) {
    return process.stdout.write(theme.circular('[Circular]') + '\n');
  }
  if ((!max || lvl < max) && ((_.isObject(data) && !_.isNull(data) && !Buffer.isBuffer(data) && !_.isEmpty(data)) || _.isFunction(data))) {
    if (_.isFunction(data)) {
      process.stdout.write(getValue(data).value);
    }
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
      results.push(show(value, null, null, max_level));
    }
    return results;
  };
};

module.exports = blug;
