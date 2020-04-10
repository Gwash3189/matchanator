import take from 'lodash/take'
import some from 'lodash/some'
import isEqual from 'lodash/isEqual'
import { object, func } from './../Types'

const isFunction = func
const isObject = object
const partialMatch = (leftObject, parameters = {}) => Object.keys(leftObject)
  .some(key => {
    const leftItem = leftObject[key]
    const parameter = parameters[key]

    if (isObject(leftItem)) {
      return partialMatch(leftObject[key], parameters[key])
    }

    if (isFunction(leftItem)) {
      return leftItem(parameter)
    }

    return leftObject[key] === parameters[key]
  })
const allExceptLast = (arr) => take(arr, arr.length - 1)
const stopOnTrue = (x, func) => {
  let returnedValue = null
  let i = 0

  for (i = 0; i < x.length; i++) {
    returnedValue = func(...x)
    if (!!returnedValue) {
      break;
    }
  }

  return returnedValue
}
const equals = (leftArray, paramsArray) => leftArray
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

export default {
  allExceptLast,
  stopOnTrue,
  equals
}
