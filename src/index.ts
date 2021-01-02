const deepClone = (source) => {
  if (source instanceof Object) {
    let dist
    if (source instanceof Array) {
      dist = []
    } else if (source instanceof Function) {
      dist = function () {
        return source.apply(this, arguments)
      }
    } else {
      dist = {}
    }
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        dist[key] = deepClone(source[key])
      }
    }
    return dist
  }
  return source
}

export {deepClone}
