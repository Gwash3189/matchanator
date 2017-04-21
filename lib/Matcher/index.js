import last from 'lodash/last'
import curry from 'lodash/curry'
import { allExceptLast, equals } from './../Helpers'

const MATCH_NOT_FOUND = 'match not found'

const BadMatchException = (matches, params) => {
  return {
    message: 'Bad Match Exception',
    name: 'Bad Match Exception',
    matches,
    params
  }
}

export default {
  create (matcher) {
    return {
      body: last(matcher),
      expected: allExceptLast(matcher)
    }
  },
  notFound (matches, params) {
    console.warn(
`
Given the matches of: ${matches},
Given the provided params: ${JSON.stringify(params, null, 2)},
A match was not found
`
    )
  },
  find: curry((params, matcher) => {
    const { body, expected } = matcher

    return equals(expected, params)
        ? body(...params)
        : MATCH_NOT_FOUND
  }),
  isNotFound (item) {
    return item === MATCH_NOT_FOUND
  }
}
