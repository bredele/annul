

module.exports = (promise, ms) => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject()
    }, ms)
    Promise.resolve(promise)
      .then(value => {
        clearTimeout(timeout)
        resolve(value)
      }, reason => {
        clearTimeout(timeout)
        reject(value)
      })
  })
}
