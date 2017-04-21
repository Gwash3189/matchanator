import last from 'lodash/last'
import { allExceptLast, equals, stopOnTrue } from './../Helpers'

const MATCH_NOT_FOUND = 'match not found'

const find = (params, matcher) => {
  const { body, expected } = matcher

  return equals(expected, params)
      ? body(...params)
      : MATCH_NOT_FOUND
}
const create = (matcher) => ({ body: last(matcher), expected: allExceptLast(matcher) })
const isNotFound = (item) => item === MATCH_NOT_FOUND
const warn = (matches, params) => {
  console.warn(
`
Given the matches of: ${matches},
Given the provided params: ${JSON.stringify(params, null, 2)},
A match was not found
`
  )

  return null
}

export default {
  search (matchers, params) {
    const found = stopOnTrue(matchers, (matcher) => {
      const result = find(params, create(matcher))
      return isNotFound(result)
        ? null
        : result
    })

    return found === null
      ? warn(matchers, params)
      : found
  }
}
