import Matcher from './Matcher'
export * from './Types'

export default (...matchers) => (...params) => Matcher.search(matchers, params)
