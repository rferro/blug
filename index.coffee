
_      = require('lodash')
colors = require('colors')

theme =
  bar: colors.bgBlue
  name: colors.white
  circular: colors.cyan
  null: colors.magenta
  array:
    bracket: colors.gray
    empty: colors.cyan
  buffer: colors.blue
  string:
    value: colors.blue
    quote: colors.gray
    nl: colors.gray
  object:
    valid: colors.cyan
    empty: colors.cyan
  number: colors.yellow
  boolean:
    true: colors.green
    false: colors.red
  function: colors.cyan
  undefined: colors.magenta
  other: colors.bgWhite.black
  dots: colors.gray
  tabs: colors.gray
  regexp: colors.cyan

show = (data, lvl = 0, stack = [], max = null) ->
  if lvl is 0
    obj = {}
    obj[showValue(data).type] = data
    data = obj

  if stack.indexOf(data) isnt -1
    return process.stdout.write theme.circular('[Circular]') + '\n'

  if (not max or lvl < max) and ((_.isObject(data) and not _.isNull(data) and not Buffer.isBuffer(data) and not _.isEmpty(data)) or _.isFunction(data))
    if _.isFunction(data)
      process.stdout.write showValue(data).value

    if lvl > 0
      process.stdout.write '\n'

    stack.push data

    for name,value of data
      process.stdout.write ' ' + theme.bar(' ') + ' '
      process.stdout.write (theme.tabs('| ') for t in [0...lvl]).join('')
      process.stdout.write theme.name(name) + theme.dots(': ')

      stack.concat show value, lvl + 1, stack, max
  else
    process.stdout.write showValue(data).value + '\n'

  stack

showValue = (value) ->
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

nice = -> for value,i in Array::slice.call(arguments)
  show value

nice.max = (max_level) -> -> for value,i in Array::slice.call(arguments)
  show value, null, null, max_level

module.exports = exports = nice
