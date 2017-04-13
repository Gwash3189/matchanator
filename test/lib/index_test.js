import { spy } from 'sinon'
import match from ' ./../../lib/index.js'


describe('matchanator', () => {
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

    it('returns undefined', () => {
      expect(result)
        .to.be.undefined
    })
  })
})
