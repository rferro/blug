
toType  = require('./toType')
toValue = require('./toValue')
theme   = require('./theme')

show = (data, level = 0, stack = [], names = [], max = null) ->
  if level is 0
    obj = {}
    obj[toValue(data).type] = data
    data = obj

  circular = false

  for item in stack
    if item[0] is data
      data     = __circular: item[1].slice(1)
      circular = true
      break

  if not circular and (not max or level < max) and ((toType(data) is 'object' and Object.keys(data).length) or (toType(data) is 'array' and data.length) or toType(data) is 'function')
    stack.push [data, names]

    if toType(data) is 'function'
      process.stdout.write toValue(data).value

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
    process.stdout.write toValue(data).value + '\n'

  stack

blug = -> for value,i in Array::slice.call(arguments)
  show value

blug.max = (maxLevel) -> -> for value,i in Array::slice.call(arguments)
  show value, null, null, null, maxLevel

module.exports = blug
