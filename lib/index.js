var blug, onFinished, show, theme, toType, toValue;

onFinished = require('on-finished');

toType = require('./toType');

toValue = require('./toValue');

theme = require('./theme');

show = function(data, level, stack, names, max) {
  var circular, item, j, len, name, obj, t, value;
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
    obj[toValue(data).type] = data;
    data = obj;
  }
  circular = false;
  for (j = 0, len = stack.length; j < len; j++) {
    item = stack[j];
    if (item[0] === data) {
      data = {
        __circular: item[1].slice(1)
      };
      circular = true;
      break;
    }
  }
  if (!circular && (!max || level < max) && ((toType(data) === 'object' && Object.keys(data).length) || (toType(data) === 'array' && data.length) || toType(data) === 'function')) {
    stack.push([data, names]);
    if (toType(data) === 'function') {
      process.stdout.write(' ' + toValue(data).value);
    }
    if (level > 0) {
      process.stdout.write('\n');
    }
    for (name in data) {
      value = data[name];
      process.stdout.write(' ' + theme.bar(' ') + ' ');
      process.stdout.write(((function() {
        var k, ref, results;
        results = [];
        for (t = k = 0, ref = level; 0 <= ref ? k < ref : k > ref; t = 0 <= ref ? ++k : --k) {
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
      process.stdout.write(theme.dots(':'));
      stack.concat(show(value, level + 1, stack, names.slice(0).concat(name), max));
    }
  } else {
    process.stdout.write(' ' + toValue(data).value + '\n');
  }
  return stack;
};

module.exports = blug = function() {
  var i, j, len, ref, results, value;
  ref = Array.prototype.slice.call(arguments);
  results = [];
  for (i = j = 0, len = ref.length; j < len; i = ++j) {
    value = ref[i];
    results.push(show(value));
  }
  return results;
};

blug.max = function(maxLevel) {
  return function() {
    var i, j, len, ref, results, value;
    ref = Array.prototype.slice.call(arguments);
    results = [];
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      value = ref[i];
      results.push(show(value, null, null, null, maxLevel));
    }
    return results;
  };
};

blug.middleware = function(maxLevel) {
  return function(req, res, next) {
    onFinished(res, function() {
      var header, headers, j, len, ref;
      headers = {};
      ref = res._header.trim().split('\n').slice(1);
      for (j = 0, len = ref.length; j < len; j++) {
        header = ref[j];
        header = header.trim().split(/\s*:\s*/);
        headers[header[0]] = header[1];
      }
      return blug.max(maxLevel)({
        request: {
          ip: req.ip,
          method: req.method,
          url: req.originalUrl,
          headers: req.headers,
          params: req.params,
          body: req.body,
          files: req.files,
          file: req.file,
          query: req.query
        },
        response: {
          status: res.statusCode + " " + res.statusMessage,
          headers: headers
        }
      });
    });
    return next();
  };
};
