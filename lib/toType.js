module.exports = function(obj) {
  var type;
  type = {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  if (type === 'object' && Buffer.isBuffer(obj)) {
    type = 'buffer';
  }
  return type;
};
