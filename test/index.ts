import {deepClone} from '../src';
import * as chai from 'chai'


const assert = chai.assert
describe('deepClone', () => {
  it('should clone basic types', function () {
    const string = '文字'
    const stringClone = deepClone(string)
    assert(string === stringClone)

    const number = 123
    const numberClone = deepClone(number)
    assert(number === numberClone)

    const boolean = true
    const booleanClone = deepClone(boolean)
    assert(boolean === booleanClone)


    const symbol = Symbol('symbol')
    const symbolClone = deepClone(symbol)
    assert(symbol === symbolClone)
  });
  describe('Object', () => {
    it('should clone object', () => {
      const obj = {a: 1, b: {c: 2}}
      const objClone = deepClone(obj)
      assert(obj !== objClone)
      assert(obj.a === objClone.a)
      assert(obj.b !== objClone.b)
      assert(obj.b.c === objClone.b.c)
    })
  })
})
