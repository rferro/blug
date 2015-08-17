
nice = require('../index.coffee')

fn = ->
fn.a = ->
fn.b = 2
fn.prototype.a = 2
fn.a.a = 2

o =
  _a: 1
  _string:
    a: ""
    b: "foo bar"
    buffer:
      a: new Buffer(0)
      b: new Buffer("foo bar")
  _number:
    a: 1
    b: 2.2
    c: NaN
    d: Infinity
  _boolean:
    true:  true
    false: false
  _object:
    a: {}
    b: null
    fn: fn
  _array:
    a: [1, 2]
    b: []
  _regexp: /^.$/g

o._array.c = a: o._array, b: o

nice.max(1) o, (->), {}, "a", a:{b:(->),c:(->)}, fn, /^a/g, 100
