var _, theme;

_ = require('lodash');

theme = require('./theme');

module.exports = function(value) {
  var type;
  if (_.isFunction(value)) {
    type = 'function';
    value = theme["function"]('function');
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
    if (value.__circular) {
      type = 'circular';
      value = theme.circular("@" + (value.__circular.join('.')));
    } else if (Buffer.isBuffer(value)) {
      type = 'buffer';
      value = theme.buffer("buffer(" + value.length + ")");
    } else {
      type = 'object';
      if (_.isEmpty(value)) {
        value = theme.object.empty('{}');
      } else {
        value = theme.object.valid('{...}');
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
