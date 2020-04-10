import { search } from './Matcher'
export * from './Types'

const match = (...matchers: Array<Function>) => (...params: Array<any>) => search(matchers, params)



export default match
