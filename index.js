

/**
 * Cancel promise afer a given time.
 *
 * @param {Any} promise
 * @param {Number} ms
 * @api public
 */

module.exports = (promise, ms) => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error(`Promise canceled after ${ms} milliseconds`))
    }, ms)
    promisify(promise).then(value => {
      clearTimeout(timeout)
      resolve(value)
    }, reason => {
      clearTimeout(timeout)
      reject(reason)
    })
  })
}


/**
 * Transform any passed value into a promise.
 *
 * @param {Any} value
 * @return {Promise}
 * @api private
 */

function promisify (value) {
  return new Promise((resolve, reject) => {
    if (typeof value === 'function') value(resolve, reject)
    else resolve(value)
  })
}
