import take from 'lodash/take'
import some from 'lodash/some'
import isEqual from 'lodash/isEqual'

export const isObject = (x) => typeof x === 'object' && !Array.isArray(x)
export const allExceptLast = (arr) => take(arr, arr.length - 1)
export const stopOnTrue = (x, func) => {
  let returnedValue
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

export const equals = (leftArray, rightArray) => leftArray
.every((leftItem, index) => isObject(leftItem)
  ? partialMatch(leftItem, rightArray[index])
  : isEqual(leftArray, rightArray)
)
