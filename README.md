# blug

Nice debug/dump function

## Install

```shell
npm install --save blug
```

## Example

```js
var blug = require("blug");

var object = { a: { b: 1, c: { d: 1 } } };

blug([1, 2, 3])
blug({ a: 1 }, object, 123);
```

## License

MIT
