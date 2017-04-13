'use strict';

var _last = require('lodash/last');

var _last2 = _interopRequireDefault(_last);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var deconstructMatcher = function deconstructMatcher(matcher) {
  return { logic: (0, _last2.default)(matcher), expected: (0, _helpers.allExceptLast)(matcher) };
};

module.exports = function () {
  for (var _len = arguments.length, matchers = Array(_len), _key = 0; _key < _len; _key++) {
    matchers[_key] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      params[_key2] = arguments[_key2];
    }

    return (0, _helpers.stopOnTrue)(matchers, function (matcher) {
      var _deconstructMatcher = deconstructMatcher(matcher),
          logic = _deconstructMatcher.logic,
          expected = _deconstructMatcher.expected;

      return (0, _helpers.equals)(expected, params) ? logic.apply(undefined, params) : undefined;
    });
  };
};