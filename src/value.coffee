
_        = require('lodash')
theme    = require('./theme')

module.exports = (value) ->
  if _.isFunction value
    type  = 'function'
    value = theme.function '[Function]'
  else if _.isRegExp value
    type  = 'regexp'
    value = theme.regexp value.toString()
  else if _.isNull value
    type  = 'null'
    value = theme.null 'null'
  else if _.isArray value
    type  = 'array'
    value = theme.array.empty '[]'
  else if _.isUndefined value
    type  = 'undefined'
    value = theme.undefined 'undefined'
  else if _.isObject value
    if Buffer.isBuffer value
      type  = 'buffer'
      value = theme.buffer "Buffer(#{value.length})"
    else
      type = 'object'

      if _.isEmpty value
        value = theme.object.empty '{}'
      else
        value = theme.object.valid '[Object ...]'
  else if _.isString value
    type  = 'string'
    value = value
      .split /[\r\n]+/g
      .map (v) -> theme.string.value v
      .join theme.string.nl '\\n'
    value = theme.string.quote('"') + value + theme.string.quote('"')
  else if _.isNumber value
    type  = 'number'
    value = theme.number String value
  else if _.isBoolean value
    type = 'boolean'

    if value
      value = theme.boolean.true String value
    else
      value = theme.boolean.false String value
  else
    type  = 'other'
    value = theme.other String value

  type:  type
  value: value
