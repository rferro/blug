# blug

Nice debug/dump function

![Screenshot](https://raw.githubusercontent.com/rferro/blug/master/screenshot.png)

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
blug.max(3)({ a: { b: { c: { d: { e: 1 } } } } });

```

## License

MIT
