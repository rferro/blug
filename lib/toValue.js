var theme, toType;

toType = require('./toType');

theme = require('./theme');

module.exports = function(value) {
  var type;
  switch (type = toType(value)) {
    case 'object':
      if (value.__circular) {
        type = 'circular';
        value = theme.circular("@" + (value.__circular.join('.')));
      } else {
        if (Object.keys(value).length) {
          value = theme.object.valid('{...}');
        } else {
          value = theme.object.empty('{}');
        }
      }
      break;
    case 'buffer':
      value = theme.buffer("buffer(" + value.length + ")");
      break;
    case 'function':
      value = theme["function"]('function');
      break;
    case 'regexp':
      value = theme.regexp(value.toString());
      break;
    case 'array':
      value = theme.array.empty('[]');
      break;
    case 'string':
      value = value.split(/[\r\n]+/g).map(function(v) {
        return theme.string.value(v);
      }).join(theme.string.nl('\\n'));
      value = theme.string.quote('"') + value + theme.string.quote('"');
      break;
    case 'number':
      value = theme.number(String(value));
      break;
    case 'boolean':
      if (value) {
        value = theme.boolean["true"](String(value));
      } else {
        value = theme.boolean["false"](String(value));
      }
      break;
    case 'undefined':
      value = theme.undefined('undefined');
      break;
    case 'null':
      value = theme["null"]('null');
      break;
    default:
      value = theme.other(String(value));
  }
  return {
    type: type,
    value: value
  };
};
