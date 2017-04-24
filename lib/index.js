import Matcher from './Matcher'
import * as types from './Types'

const match = (...matchers) => (...params) => Matcher.search(matchers, params)

module.exports = Object.assign(match, types)
