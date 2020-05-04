import take from 'lodash/take'
import some from 'lodash/some'
import isEqual from 'lodash/isEqual'
import { object, func } from '../Types'

type LeftObject = {
  [key: string]: LeftObject | Function
}

type Parameters = {
  [key: string]: Parameters | any
}

const isFunction = func
const isObject = object
const partialMatch = (leftObject: LeftObject, parameters: Parameters) => Object.keys(leftObject)
  .some((key: string): boolean => {
    const leftItem = leftObject[key]
    const parameter = parameters[key]

    if (isObject(leftItem)) {
      return partialMatch(leftItem as LeftObject, parameter as Parameters)
    }

    if (isFunction(leftItem)) {
      return (leftItem as Function)(parameter)
    }

    return false
  })
const allExceptLast = (arr: Array<any>) => take(arr, arr.length - 1)
const stopOnTrue = (x: any, func: (...x: any) => boolean) => {
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
const equals = (leftArray: Array<any>, paramsArray: Array<any>) => leftArray
.every((leftItem: any, index: number) => {
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
