import flow from 'lodash/flow'

import Matcher from './Matcher'
import { stopOnTrue } from './Helpers'
export * from './Types'

export default (...matchers) => (...params) => Matcher.search(matchers, params)
