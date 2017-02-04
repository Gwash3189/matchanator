'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var getValues = function getValues(args) {
  return Object.keys(args).map(function (key) {
    return args[key];
  });
};
var getIndex = function getIndex(index) {
  return function (arr) {
    return arr[index];
  };
};
var first = getIndex(0);
var second = getIndex(1);
var is = function is(x) {
  return function (y) {
    return x === (typeof y === 'undefined' ? 'undefined' : _typeof(y));
  };
};
var isFunction = is('function');
var doesEveryElementMatch = function doesEveryElementMatch(arrOne, arrTwo) {
  return arrOne.every(function (x, i) {
    return arrTwo[i] === x;
  });
};
var forEach = function forEach(arr, func) {
  for (var i = 0; i < arr.length; i++) {
    var value = func(arr[i], i);
    if (value) {
      return value;
    }
  }
};

var match = function match() {
  var groups = getValues(arguments);
  return function () {
    var values = getValues(arguments);
    return forEach(groups, function (matcher) {
      var predicate = first(matcher);
      var func = second(matcher);
      var result = isFunction(predicate) ? predicate.apply(null, values) : doesEveryElementMatch(values, [predicate]);

      if (result) {
        return func.apply(null, values);
      }
    });
  };
};

var any = function any() {
  return true;
};
var string = is('string');
var number = is('number');
var array = function array(a) {
  return Array.isArray(a);
};
var object = function object(o) {
  return Array.isArray(o) === false && (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object';
};
var func = is('function');

module.exports = {
  match: match,
  any: any,
  string: string,
  number: number,
  array: array,
  object: object,
  func: func
};