#!/usr/bin/env node

const cw = require('../index.js');
const pt = require('path');
const path = process.cwd();

(function (args) {
    cw.startup(pt.resolve(path, args[0]).replace(/\\/g, '/') + '/');
})(process.argv.slice(2));
