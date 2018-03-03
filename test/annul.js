/**
 * Dependencie(s)
 */

const test = require('tape')
const promise = require('atleast')
const cancel = require('..')


test('should return a promise', assert => {
  assert.plan(2)
  const annul = cancel(promise('hello', 400), 200)
  assert.equal(typeof annul, 'object')
  assert.equal(typeof annul.then, 'function')
  // remove warning
  annul.then(() => {}, () => {})
})


test('should reject a promise if not resolved before a given time', assert => {
  assert.plan(1)
  cancel(promise('hello', 400), 200).then(
    () => assert.end('resolved'),
    () => assert.ok('rejected')
  )
})



test('should reject a promise if not rejected before a given time', assert => {
  assert.plan(1)
  cancel(promise(Promise.reject('hello'), 400), 200).then(
    () => assert.end('resolved'),
    () => assert.ok('rejected')
  )
})


test('should resolve a promise if resolved before a given time', assert => {
  assert.plan(1)
  cancel(promise('hello', 100), 200).then(
    val => assert.equal(val, 'hello'),
    () => assert.end('rejected')
  )
})


test('should reject a promise if rejected before a given time', assert => {
  assert.plan(1)
  cancel(promise(Promise.reject('hello'), 100), 200).then(
    () => assert.end('rejected'),
    reason => assert.equal(reason, 'hello')
  )
})

test('should cancel a promise with error message', assert => {
  assert.plan(2)
  cancel(promise(Promise.reject('hello'), 400), 200).then(
    () => assert.end('resolved'),
    reason => {
      assert.equal(reason instanceof Error, true)
      assert.equal(reason.message, 'Promise canceled after 200 milliseconds')
    }
  )
})


test('should create a promise from a function and cancel it if necessary', assert => {
  assert.plan(1)
  cancel(() => promise('hello', 100), 200)
    .then(val => assert.equal(val, 'hello'))
})
