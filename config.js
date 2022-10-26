const {
  ipfsConnOptions,
  memoryConnOptions,
  fileConnOptions,
} = require("./lib/connect");

const connMethod = fileConnOptions;

module.exports = connMethod;
