
blug = require('../src')

test_circular =
  a: {}

test_circular.a.a1 = test_circular.a
test_circular.b = test_circular

test_function =
  a: ->

test_function.a.b = 1
test_function.a.c = 1

tests =
  test_boolean:
    a: true
    b: false
  test_array:
    a: []
    b: [1]
    c: [1,2]
  test_string:
    a: ""
    b: "foo bar"
    c: "foo\nbar"
  test_number:
    a: 1
    b: 1.2
    c: NaN
    c: Infinity
  test_buffer:
    a: new Buffer(0)
    b: new Buffer(1)
  test_regexp:
    a: /./
    b: /./g
    c: /./i
  test_object:
    a: {}
    b: { b1: { b2: { b3: { b4: { b5: {} } } } } }
  test_circular: test_circular
  test_null:
    a: null
  test_undefined:
    a: undefined
  test_function: test_function

blug tests, [], 1, false
