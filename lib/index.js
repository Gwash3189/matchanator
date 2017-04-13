import last from 'lodash/last'
import { allExceptLast, stopOnTrue, equals } from './helpers'

const deconstructMatcher = (matcher) => ({ logic: last(matcher), expected: allExceptLast(matcher) })


module.exports = (...matchers) => (...params) => stopOnTrue(matchers, (matcher) => {
  const { logic, expected } = deconstructMatcher(matcher)
  return equals(expected, params)
    ? logic(...params)
    : undefined
})
