import { expect } from 'chai'
import match, { any, string, number } from './../src'

describe('Matchanator', () => {
  let returnValue,
      result,
      inputValue,
      matcher

  beforeEach(() => {
    returnValue = 'value'
    matcher = match(
      [any, () => returnValue]
    )
    inputValue = 0
    result = matcher(inputValue)
  })

  it('returns the nested return value', () => {
    expect(result).to.equal(returnValue)
  })

  describe('when the provided definition is a predicate function', () => {
    let mock

    beforeEach(() => {
      mock = jest.fn(() => true)
      matcher = match(
        [mock, () => returnValue]
      );
      result = matcher(inputValue)
    })

    it('runs the provided predicate', () => {
      expect(mock).to.have.beenCalled()
    })
  })

  describe('when the provided definition is an object', () => {
    let definition

    beforeEach(() => {
      definition = { user: { name: string } }
      inputValue = {
        user: {
          name: 'Adam'
        }
      }
      returnValue = inputValue.user.name
      matcher =  match(
        [definition, (state) => state.user.name]
      )
      result = matcher(inputValue)
    })

    it('runs the predicates on the leaf nodes of the object', () => {
      expect(result).to.equal(returnValue)
    })
  })

  describe('when multiple parameters are provided to the matcher function', () => {
    let mock,
      inputValues

    beforeEach(() => {
      inputValues = [1, 2]
      mock = jest.fn()
      matcher = match(
        [number, number, mock]
      )
      result = matcher(...inputValues)
    })

    it('passes those parameters to the provided function', () => {
      expect(mock).to.have.beenCalledWith(...inputValues)
    })
  })

  describe('when the provided values are exact values', () => {
    let oneMock,
        twoMock

    describe('when the input matches the exact values', () => {
      beforeEach(() => {
        inputValue = 1
        oneMock = jest.fn()
        twoMock = jest.fn()
        matcher = match(
          [inputValue, oneMock],
          [2, twoMock]
        )
        result = matcher(inputValue)
      })


      it('calls the expected function', () => {
        expect(oneMock).to.have.beenCalled()
      })

      describe('when the provided function returns undefined', () => {
        let warnSpy

        beforeEach(() => {
          warnSpy = jest.spyOn(console, 'warn')
        })

        afterEach(() => {
          warnSpy.mockRestore()
        })

        it('it does not log a warning', () => {
          expect(warnSpy).to.have.not.beenCalled()
        })
      })
    })
  })
})
