/**
 * Dependencie(s)
 */

const test = require('tape')
const promise = require('atleast')
const cancel = require('..')


test('should return a promise', assert => {
  assert.plan(2)
  const annul = cancel(promise('hello', 2000), 200)
  assert.equal(typeof annul, 'object')
  assert.equal(typeof annul.then, 'function')
})

//
// test('should reject a promise if not resolved before a given time', assert => {
//   assert.plan(1)
//   cancel(promise('hello', 2000), 200)
//     .then(null, () => assert.ok())
// })
