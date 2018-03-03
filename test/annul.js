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
  annul.then(() => {}, () => {})
})


test('should reject a promise if not resolved before a given time', assert => {
  assert.plan(1)
  cancel(new Promise(resolve => setTimeout(resolve, 400)), 200).then(
    () => assert.end('resolved'),
    () => assert.ok('rejected')
  )
})



test('should reject a promise if not rejected before a given time', assert => {
  assert.plan(1)
  cancel(new Promise((resolve, rejected) => setTimeout(rejected, 400)), 200).then(
    () => assert.end('resolved'),
    () => assert.ok('rejected')
  )
})
