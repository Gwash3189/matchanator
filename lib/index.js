const getValues = (args) => Object.keys(args).map(key => args[key])
const getIndex = (index) => (arr) => arr[index]
const first = getIndex(0)
const second = getIndex(1)
const is = (x) => (y) => x === typeof(y)
const isFunction = is('function')
const doesEveryElementMatch = (arrOne, arrTwo) => {
  return arrOne.every((x, i) => arrTwo[i] === x)
}
const forEach = (arr, func) => {
  for (var i = 0; i < arr.length; i++) {
    const value = func(arr[i], i)
    if (value) {
      return value
    }
  }
}

const match = function() {
  const groups = getValues(arguments)
  return function() {
    const values = getValues(arguments)
    return forEach(groups, (matcher) => {
      const predicate = first(matcher)
      const func = second(matcher)
      const result = isFunction(predicate)
        ? predicate.apply(null, values)
        : doesEveryElementMatch(values, [predicate])

      if (result) {
        return func.apply(null, values)
      }
    })
  }
}

const any = () => true
const string = is('string')
const number = is('number')
const array = (a) => Array.isArray(a)
const object = (o) => Array.isArray(o) === false && typeof(o) === 'object'
const func = is('function')

module.exports = {
  match,
  any,
  string,
  number,
  array,
  object,
  func
}
