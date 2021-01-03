class DeepCloner {
  cache = []
  findDistCache(cache, source) {
    for (let i = 0; i < cache.length; i++) {
      if (cache[i][0] === source) return cache[i][1] // 0: source 1: dist
    }
    return undefined
  }
  clone(source) {
    if (source instanceof Object) {
      const distCache = this.findDistCache(this.cache, source)
      if (distCache) {
        return distCache
      }
      let dist
      if (source instanceof Array) {
        dist = []
      } else if (source instanceof Function) {
        dist = function () {
          return source.apply(this, arguments)
        }
      } else if (source instanceof Date) {
        dist = new Date(source)
      } else if (source instanceof RegExp) {
        dist = new RegExp(source.source, source.flags)
      } else {
        dist = {}
      }
      this.cache.push([source, dist])
      for (const key in source) {
        if (source.hasOwnProperty(key)) {
          dist[key] = this.clone(source[key])
        }
      }
      return dist
    }
    return source
  }
}

export {DeepCloner}
