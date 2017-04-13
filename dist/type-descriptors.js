'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require('./helpers');

var object = { type: 'object', validation: _helpers.isObject };
var any = { type: 'any', valudation: function valudation() {
    return true;
  } };

exports.default = {
  any: any,
  object: object,
  run: function run() {
    return false;
  },
  isDescriptor: function isDescriptor(descriptor) {
    return descriptor.type && descriptor.validation;
  }
};