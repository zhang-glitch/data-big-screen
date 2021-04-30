
const debounce = function (callback, delay = 1000) {
  let timer = null;

  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback.apply(this, arguments)
    }, delay)
  }
}

export default debounce