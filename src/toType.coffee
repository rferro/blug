
# https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator

module.exports = (obj) ->
  type = ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()

  if type is 'object' and Buffer.isBuffer(obj)
    type = 'buffer'

  type
