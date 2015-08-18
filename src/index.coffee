
_        = require('lodash')
getValue = require('./value')
theme    = require('./theme')

show = (data, lvl = 0, stack = [], max = null) ->
  if lvl is 0
    obj = {}
    obj[getValue(data).type] = data
    data = obj

  if stack.indexOf(data) isnt -1
    return process.stdout.write theme.circular('[Circular]') + '\n'

  if (not max or lvl < max) and ((_.isObject(data) and not _.isNull(data) and not Buffer.isBuffer(data) and not _.isEmpty(data)) or _.isFunction(data))
    if _.isFunction(data)
      process.stdout.write getValue(data).value

    if lvl > 0
      process.stdout.write '\n'

    stack.push data

    for name,value of data
      process.stdout.write ' ' + theme.bar(' ') + ' '
      process.stdout.write (theme.tabs('| ') for t in [0...lvl]).join('')
      process.stdout.write theme.name(name) + theme.dots(': ')

      stack.concat show value, lvl + 1, stack, max
  else
    process.stdout.write getValue(data).value + '\n'

  stack

blug = -> for value,i in Array::slice.call(arguments)
  show value

blug.max = (max_level) -> -> for value,i in Array::slice.call(arguments)
  show value, null, null, max_level

module.exports = blug
