import take from 'lodash/take'
import some from 'lodash/some'
import isEqual from 'lodash/isEqual'
import { object, func } from './../Types'

export const isFunction = func
export const isObject = object
export const allExceptLast = (arr) => take(arr, arr.length - 1)
export const stopOnTrue = (x, func) => {
  let returnedValue = 'no match found'
  some(x, (...args) => {
    returnedValue = func(...args)
    return returnedValue
  })
  return returnedValue
}
export const partialMatch = (leftObject, rightObject = {}) => Object.keys(leftObject)
.some(key => isObject(leftObject[key])
  ? partialMatch(leftObject[key], rightObject[key])
  : leftObject[key] === rightObject[key]
)

export const equals = (leftArray, paramsArray) => leftArray
.every((leftItem, index) => {
  const param = paramsArray[index]

  if (isObject(leftItem)) {
    return partialMatch(leftItem, param)
  }

  if (isFunction(leftItem)) {
    return leftItem(param)
  }

  return isEqual(leftItem, param)
})
