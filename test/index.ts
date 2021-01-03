import {DeepCloner} from '../src';
import * as chai from 'chai'


const assert = chai.assert
describe('new DeepCloner().clone', () => {
  it('can clone basic types', function () {
    const string = '文字'
    const stringClone = new DeepCloner().clone(string)
    assert(string === stringClone)

    const number = 123
    const numberClone = new DeepCloner().clone(number)
    assert(number === numberClone)

    const boolean = true
    const booleanClone = new DeepCloner().clone(boolean)
    assert(boolean === booleanClone)


    const symbol = Symbol('symbol')
    const symbolClone = new DeepCloner().clone(symbol)
    assert(symbol === symbolClone)
  });
  describe('Object', () => {
    it('can clone object', () => {
      const obj = {a: 1, b: {c: 2}}
      const objClone = new DeepCloner().clone(obj)
      assert(obj !== objClone)
      assert(obj.a === objClone.a)
      assert(obj.b !== objClone.b)
      assert(obj.b.c === objClone.b.c)
    })
    it('can clone array', () => {
      const array = [[1,2], [3,4], [5,6]]
      const arrayClone = new DeepCloner().clone(array)
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
      const fnClone = new DeepCloner().clone(fn)
      assert(fn !== fnClone)
      assert(fn.a === fnClone.a)
      assert(fn.b !== fnClone.b)
      assert(fn.b.c === fnClone.b.c)
      assert(fn(1, 2) === fnClone(1,2))
    })
    it('can clone cycle object', () => {
      const obj:any = {a: 1}
      obj.self = obj
      const objClone = new DeepCloner().clone(obj)
      assert(obj !== objClone)
      assert(obj.a === objClone.a)
      assert(obj.self !== objClone.self)
    })
    it.skip('will not stack over flow', () => {
      const obj = { child: null };
      let obj1 = obj;
      for (let i = 0; i < 10000; i++) {
        obj1.child = {
          child: null
        };
        obj1 = obj1.child;
      }
      const objClone = new DeepCloner().clone(obj)
      assert(obj !== objClone)
      assert(obj.child !== objClone.child)
    })
    it('can clone date', () => {
      const date:any = new Date()
      date.a = 1
      date.b = {c: 1}
      const dateClone = new DeepCloner().clone(date)
      assert(date.getTime() === dateClone.getTime())
      assert(date.a === dateClone.a)
      assert(date.b !== dateClone.b)
      assert(date.b.c === dateClone.b.c)
    })
    it('can clone regexp', () => {
      const regexp:any = new RegExp('h1\\d+', 'gi')
      regexp.a = 1
      regexp.b = {c: 1}
      const regexpClone = new DeepCloner().clone(regexp)
      assert(regexp !== regexpClone)
      assert(regexp.source === regexp.source)
      assert(regexp.flags === regexp.flags)
      assert(regexp.a === regexpClone.a)
      assert(regexp.b !== regexpClone.b)
      assert(regexp.b.c === regexpClone.b.c)
    })
    it('will not clone origin attribute', () => {
      const obj = Object.create({xxx: 1})
      obj.a = 1
      obj.b = {c: 1}
      const objClone = new DeepCloner().clone(obj)
      assert.isTrue('xxx' in obj)
      assert.isFalse('xxx' in objClone)
      assert(obj.a === objClone.a)
      assert(obj.b !== objClone.b)
      assert(obj.b.c === objClone.b.c)
    })
  })
})
