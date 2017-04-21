# Matchanator

Multiple function heads with pattern matching
---

## Why

Pattern matching is a powerful artefact of (typically) functional programming languages. While we have some of these items in JavaScript, we don't have the ability to express exact value matches within function definitions.

The idea comes from Elixir (Erlang) where a function is identified by it's name and it's arity (number of parameters). That means that the function `hello (name)` is different from the function `hello (first, last)`. While this isn't anything special, the real power comes from providing pattern matches within the functions head.

While this is a language level construct in other languages, we can still achieve this in JavaScript through functions. Matchanator is just that, a higher order function that takes parameter and function definitions and only runs one matching result. If a result is not found, a warning issued.

## Usage

### Match
_(...matchers) => (...params) => any_
The main interface for matchanator. It takes _matcher_ definitions and returns a function that will match against these definitions and run the corresponding function body.


#### Matcher Definitions
_[...any, func(...any) => any]_

A matcher definition is an array with N elements. All elements can be a mixture of any javascript primitive. The last element **must** be a function. This function will be called with the provided arguments if there are a successful match.

```
// valid matcher definitions
[1, (one) => 1]
[1, 2, 3 (one, two ,three) => 'onetwothree']
```

#### Exact Matches

Anything that is **not** an object is matched exactly, using `===`.

```
import match from 'matchanator'

const hello = match(
  ['Dave', () => 'Hello, Dave'],
  ['Sally', () => 'Hello, Sally']
)

hello('Dave') // 'Hello, Dave'
```

#### Partial Matches

In the above example, we use strings to match against a provided name. Anything that **is not an object** requires an exact match. Objects, however, are partially matched.

```
import match from 'matchanator'

const street = match(
  [{ address: { street: { name: 'Foo' } } }, () => 'your street is Foo']
)

street({ address: { street: { name: 'Foo' } } }) // your street is Foo

// also fine
street({ address: { street: { name: 'Foo' , number: 123 } } })// your street is Foo
```

#### Typed parameter matches

Matchanator comes with basic type checkers as to do generic matching on provided parameters. These type checkers cover the basic primitives available in javascript.

Matchers are processed in the order in which they are provided. It is best to organise your matches from most specific to least specific.

Matchanator exports the following type checkers
 * object
 * func
 * string
 * number
 * array
 * emptyArray
 * any

```
import match, {
  object,
  func,
  string,
  number,
  array,
  emptyArray,
  any
} from 'matchanator'

const head = match(
  [array, ([h, ..._]) => h),
  [emptyArray, (empty) => empty),
  [any, () => undefined)
)

head([1, 2]) // 1
head([]) // []
head(1) // undefined
```
##### Type checkers

The provided type checkers are simple functions that take the suggested item and perform a `typeof` check on the item.

#### Custom Type Checkers
_(T) => boolean_

The provided type checkers are functions. You can provide your own type checkers by implementing the `(T) => boolean` signature.

For example, if you wanted to check for `NaN` then the following function could be used

```
import match from 'matchanator'

const nan = (n) => isNaN(n)
const notNan = (n) => !nan(n)

const square = match(
  [nan, (nan) => nan],
  [notNan, (x) => x * x]
)
```