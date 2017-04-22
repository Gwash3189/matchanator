import { spy } from 'sinon'
import match, { func, array, string } from './../../lib/'

describe('Matchanator', () => {
  let matchFunc,
      trueSpy,
      falseSpy

  context('when given the expected parameters', () => {
    beforeEach(() => {
      trueSpy = spy(() => 'hello')
      falseSpy = spy(() => 'goodbye')
      matchFunc = match(
        [true, trueSpy],
        [false, falseSpy]
      )
      matchFunc(true)
    })

    it('returned the expected value', () => {
      expect(trueSpy)
        .to.have.returned('hello')
    })

    it('runs the corresponding logic', () => {
      expect(trueSpy)
        .to.have.been.called
    })

    it('is given the provided parameters', () => {
      expect(trueSpy)
        .to.have.been.calledWith(true)
    })
  })

  context('when the expected parameter is an object', () => {
    let nestedSpy

    beforeEach(() => {
      trueSpy = spy(() => 'hello')
      falseSpy = spy(() => 'goodbye')
      matchFunc = match(
        [{ hello: 'world' }, trueSpy],
        [{ goodbye: 'dreams' }, falseSpy],
      )
      matchFunc({ hello: 'world', another: 'one' })
    })

    it('can do partial matches', () => {
      expect(trueSpy)
        .to.have.been.called
    })

    context('when the object has type checking functions as properties', () => {
      context('when the type checking function returns true', () => {
        beforeEach(() => {
          trueSpy = spy(() => 'hello')
          matchFunc = match(
            [{ name: string }, trueSpy]
          )

          matchFunc({ name: 'Adam' })
        })

        it('calls the corresponding function body', () => {
          expect(trueSpy)
            .to.have.been.called
        })
      })

      context('when the type checking function returns false', () => {
        beforeEach(() => {
          trueSpy = spy(() => 'hello')
          matchFunc = match(
            [{ name: string }, trueSpy]
          )

          matchFunc({ name: 1 })
        })

        it.only('does not call the corresponding function body', () => {
          expect(trueSpy)
            .to.not.have.been.called
        })
      })
    })

    context('when the object has nested properties', () => {
      let nestedSpy,
          otherNestedSpy

      beforeEach(() => {
        nestedSpy = spy(() => 'nested')
        otherNestedSpy = spy(() => 'nested')
        matchFunc = match(
          [{ hello: { world: 'woo' } }, nestedSpy],
          [{ hello: { world: 'asdf' } }, otherNestedSpy]
        )
        matchFunc({ hello: { world: 'woo' } })
      })

      it('can do partial matches on nested objects', () => {
        expect(nestedSpy)
          .to.have.been.called
      })
    })

    context('when the expected paramters are mixed', () => {
      beforeEach(() => {
        trueSpy = spy(() => true)
        falseSpy = spy(() => false)
        matchFunc = match(
          [{ hello: { world: 'woo' } }, true, trueSpy],
          [{ hello: { world: 'asdf' } }, false, falseSpy]
        )
        matchFunc({ hello: { world: 'woo' } }, true)
      })

      it('calls the expected function', () => {
        expect(trueSpy)
          .to.have.been.called
      })

      it('does not call other functions once the correct function is found', () => {
        expect(falseSpy)
          .to.have.not.been.called
      })
    })
  })

  context('when the expected parameter is an array', () => {
    beforeEach(() => {
      trueSpy = spy(() => 'hello')
      falseSpy = spy(() => 'goodbye')
      matchFunc = match(
        [[true, false], trueSpy],
        [[false, true], falseSpy]
      )
      matchFunc([true, false])
    })

    it('must match the entire array', () => {
      expect(trueSpy)
        .to.have.been.called
      expect(falseSpy)
        .to.not.have.been.called
    })
  })

  context('when there are multiple expected parameters', () => {
    let logicSpy

    beforeEach(() => {
      logicSpy = spy()
      matchFunc = match(
        [array, func, logicSpy]
      )([1], () => {})
    })

    it('runs the corresponding logic', () => {
      expect(logicSpy)
        .to.have.been.called
    })
  })

  context('when given unexpected parameters', () => {
    let trueSpy,
        result

    beforeEach(() => {
      trueSpy = spy(() => 'hello')
      falseSpy = spy(() => 'goodbye')
      matchFunc = match(
        [true, trueSpy]
      )
      result = matchFunc(false)
    })

    it('does not call the provided functions', () => {
      expect(trueSpy)
        .to.have.not.been.called
    })

    it('returns null', () => {
      expect(result)
        .to.be.null
    })
  })

  describe('when given a function as a matcher', () => {
    let matcherSpy

    beforeEach(() => {
      matcherSpy = spy()
      matchFunc = match(
        [matcherSpy, () => {}]
      )
      matchFunc({})
    })

    it('runs that function', () => {
      expect(matcherSpy)
        .to.have.been.called
    })

    context('when that function returns true', () => {
      let logicSpy
      beforeEach(() => {
        logicSpy = spy()
        matchFunc = match(
          [() => true, logicSpy]
        )
        matchFunc({})
      })


      it('calls the provided logic', () => {
        expect(logicSpy)
          .to.have.been.called
      })
    })

    context('when that function returns false', () => {
      let logicSpy
      beforeEach(() => {
        logicSpy = spy()
        matchFunc = match(
          [() => false, logicSpy]
        )
        matchFunc({})
      })

      it('does not calls the provided logic', () => {
          expect(logicSpy)
            .to.not.have.been.called
      })
    })
  })
})
