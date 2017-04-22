# Matchanator

Multiple function heads with pattern matching
---

## Why

Pattern matching is a powerful artefact of (typically) functional programming languages. While we have some of these items in JavaScript, we don't have the ability to express exact value matches within function definitions.

While this is a language level construct in other languages, we can still achieve this in JavaScript through functions. Matchanator is just that, **a higher order function** that takes **parameter and function definitions** and **only runs one matching result**. If a result is not found, a warning issued.

## Usage

### Examples

#### Simplify State Transitions

```
import match, { string, number } from 'matchanator'

const transition = match(
  [{ user: { name: string, id: number }, authenticated: true }, (state) => redirectToProfile(state)]
  [{ user: { authenticated: false } }, (state) => redirectToLoginPage(state)]
)
```

#### Reduce `if` Branching

From
```
import match, { not, nil, any, emptyArray, array } from 'matchanator'

const pgCallbackWrapper = (f) => match(
  [not(nil), any, (error, _) => console.error(error)], // when there is an error
  [nil, { rows: not(emptyArray) }, (_, empty) => console.log('no results')], // no error, but no results either
  [nil, { rows: array }, (_ results) => f(results.rows)] // no error, but results this time
)

const database = (query, data, callback) => pg.client(query, data, pgCallbackWrapper(callback))

database(
  'select * from users where name = $1::string',
  ['Adam'],
  (results) => results.each(name => console.log(name))
)
```

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
  [array, ([h, ..._]) => h],
  [emptyArray, (empty) => empty]
)

head([1, 2]) // 1
head([]) // []
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

#### Not finding a match

When a match is not found a `console.warn` is issued with the originaly provided matchers, the provided parameters. An example is below.

```
const square = match(
  [number, (x) => x * x]
)

square('1')
// Given the matches of: function () {
//          return typeof n === 'number'
//        }, (x) => x * x,
// Given the provided params: [
//  {}
// ],
// A match was not found
```

## Roadmap
- [ ] Break type checking functions out into their own repository
- [ ] Allow type checking functions from within arrays
- [ ] Improve 'no match found' warning
