import {deepClone} from '../src';
import * as chai from 'chai'


const assert = chai.assert
describe('deepClone', () => {
  it('can clone basic types', function () {
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
    it('can clone object', () => {
      const obj = {a: 1, b: {c: 2}}
      const objClone = deepClone(obj)
      assert(obj !== objClone)
      assert(obj.a === objClone.a)
      assert(obj.b !== objClone.b)
      assert(obj.b.c === objClone.b.c)
    })
    it('can clone array', () => {
      const array = [[1,2], [3,4], [5,6]]
      const arrayClone = deepClone(array)
      assert(array !== arrayClone)
      assert(array[0] !== arrayClone[0])
      assert(array[0][0] === arrayClone[0][0])
      assert(array[1] !== arrayClone[1])
      assert(array[2] !== arrayClone[2])
      assert.deepEqual(array, arrayClone)
    })
    it('can clone function', () => {
      const fn = function (x, y) {
        return x + y
      }
      fn.a = 1
      fn.b = {c: 2}
      const fnClone = deepClone(fn)
      assert(fn !== fnClone)
      assert(fn.a === fnClone.a)
      assert(fn.b !== fnClone.b)
      assert(fn.b.c === fnClone.b.c)
      assert(fn(1, 2) === fnClone(1,2))
    })
    it.only('can clone cycle object', () => {
      const obj:any = {a: 1}
      obj.self = obj
      const objClone = deepClone(obj)
      assert(obj !== objClone)
      assert(obj.a === objClone.a)
      assert(obj.self !== objClone.self)
    })
  })
})
