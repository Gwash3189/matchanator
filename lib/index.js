import flow from 'lodash/flow'

import Matcher from './Matcher'
import { stopOnTrue } from './helpers'
export * from './types'

export default (...matchers) => (...params) => {

  const result = stopOnTrue(matchers, flow(Matcher.create, Matcher.find(params)))

  return Matcher.isNotFound(result)
    ? Matcher.exception(matchers, params)
    : result
}
