import flow from 'lodash/flow'

import Matcher from './Matcher'
import { stopOnTrue } from './Helpers'
export * from './Types'

export default (...matchers) => (...params) => {

  const result = stopOnTrue(matchers, flow(Matcher.create, Matcher.find(params)))

  return Matcher.isNotFound(result)
    ? Matcher.notFound(matchers, params)
    : result
}
