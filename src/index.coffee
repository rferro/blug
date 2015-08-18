
_        = require('lodash')
getValue = require('./value')
theme    = require('./theme')

show = (data, level = 0, stack = [], names = [], max = null) ->
  if level is 0
    obj = {}
    obj[getValue(data).type] = data
    data = obj

  stack_index = _.findIndex stack, (item) -> item[0] is data

  if stack_index isnt -1
    data = __circular: stack[stack_index][1]
    circular = true
  else
    circular = false

  if not circular and (not max or level < max) and ((_.isObject(data) and not _.isNull(data) and not Buffer.isBuffer(data) and not _.isEmpty(data)) or _.isFunction(data))
    stack.push [data, names]

    if _.isFunction(data)
      process.stdout.write getValue(data).value

    if level > 0
      process.stdout.write '\n'

    for name,value of data
      process.stdout.write ' ' + theme.bar(' ') + ' '
      process.stdout.write (theme.tabs('| ') for t in [0...level]).join('')
      process.stdout.write theme.array.bracket '[' if data instanceof Array
      process.stdout.write theme.name(name)
      process.stdout.write theme.array.bracket ']' if data instanceof Array
      process.stdout.write theme.dots(': ')

      stack.concat show value, level + 1, stack, names.slice(0).concat(name), max
  else
    process.stdout.write getValue(data).value + '\n'

  stack

blug = -> for value,i in Array::slice.call(arguments)
  show value

blug.max = (max_level) -> -> for value,i in Array::slice.call(arguments)
  show value, null, null, null, max_level

module.exports = blug
