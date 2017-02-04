const chai = require("chai")
const { expect } = chai
const { spy } = require('sinon')
const { match, any } = require('../../lib/')

chai.use(require("sinon-chai"))

describe('matcher', () => {
  describe('match', () => {
    let matchFunc,
        matchSpy

    beforeEach(() => {
      matchSpy = spy()
      matchFunc = match(
        [true, matchSpy]
      )
    })

    it('returns a function', () => {
      expect(matchFunc).to.be.a('function')
    })

    context('when an expected value is given', () => {
      beforeEach(() => {
        matchFunc(true)
      })

      it('runs the provided function', () => {
        expect(matchSpy).to.have.been.called
      })

      it('passes the provided value down to the provided function', () => {
        expect(matchSpy).to.have.been.calledWith(true)
      })
    })

    context('when an unexpected value is given', () => {
      beforeEach(() => {
        matchFunc(false)
      })

      it('does not run the provided function', () => {
        expect(matchSpy).to.have.not.been.called
      })

      it('does not pass the provided value down to the provided function', () => {
        expect(matchSpy).to.not.have.been.calledWith(true)
      })
    })
  })

  context('when used in a real world example', () => {
    it('works', () => {
      const matchFunc = match(
        ["production", () => true],
        [any, () => false]
      )

      expect(matchFunc("production")).to.be.true
    })
  })
})
