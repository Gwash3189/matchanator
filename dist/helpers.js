'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.equals = exports.partialMatch = exports.stopOnTrue = exports.allExceptLast = exports.isObject = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _take = require('lodash/take');

var _take2 = _interopRequireDefault(_take);

var _some = require('lodash/some');

var _some2 = _interopRequireDefault(_some);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isObject = exports.isObject = function isObject(x) {
  return (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && !Array.isArray(x);
};
var allExceptLast = exports.allExceptLast = function allExceptLast(arr) {
  return (0, _take2.default)(arr, arr.length - 1);
};
var stopOnTrue = exports.stopOnTrue = function stopOnTrue(x, func) {
  var returnedValue = void 0;
  (0, _some2.default)(x, function () {
    returnedValue = func.apply(undefined, arguments);
    return returnedValue;
  });
  return returnedValue;
};
var partialMatch = exports.partialMatch = function partialMatch(leftObject) {
  var rightObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Object.keys(leftObject).some(function (key) {
    return isObject(leftObject[key]) ? partialMatch(leftObject[key], rightObject[key]) : leftObject[key] === rightObject[key];
  });
};

var equals = exports.equals = function equals(leftArray, rightArray) {
  return leftArray.every(function (leftItem, index) {
    return isObject(leftItem) ? partialMatch(leftItem, rightArray[index]) : (0, _isEqual2.default)(leftArray, rightArray);
  });
};