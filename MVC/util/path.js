const path = require("path");

/*
path configuration that works on all operating system
 */
module.exports = path.dirname(process.mainModule.filename);
