
toType   = require('./toType')
theme    = require('./theme')

module.exports = (value) ->
  switch type = toType(value)
    when 'object'
      if value.__circular
        type  = 'circular'
        value = theme.circular("@#{value.__circular.join('.')}")
      else
        if Object.keys(value).length
          value = theme.object.valid '{...}'
        else
          value = theme.object.empty '{}'
    when 'buffer'
      value = theme.buffer "buffer(#{value.length})"
    when 'function'
      value = theme.function 'function'
    when 'regexp'
      value = theme.regexp value.toString()
    when 'array'
      value = theme.array.empty '[]'
    when 'string'
      value = value
        .split /[\r\n]+/g
        .map (v) -> theme.string.value v
        .join theme.string.nl '\\n'
      value = theme.string.quote('"') + value + theme.string.quote('"')
    when 'number'
      value = theme.number String value
    when 'boolean'
      if value
        value = theme.boolean.true String value
      else
        value = theme.boolean.false String value
    when 'undefined'
      value = theme.undefined 'undefined'
    when 'null'
      value = theme.null 'null'
    else
      value = theme.other String value

  type:  type
  value: value
