export const object = (o) => typeof o === 'object' && !array(0)
export const func = (f) => typeof f === 'function'
export const string = (s) => typeof s === 'string'
export const number = (n) => typeof n === 'number'
export const array = (a) => Array.isArray(a)
export const emptyArray = (a) => array(a) && a.length === 0
export const any = () => true

export default {
  object,
  func,
  string,
  number,
  array,
  emptyArray,
  any
}
