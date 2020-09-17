
export function reduceObjOrFn<T extends Object>(objectOrFn: T | ((...params: any)=>T), ...params: any): T {
  if (typeof objectOrFn === 'object') {
    return objectOrFn
  } else if (typeof objectOrFn === 'function') {
    return objectOrFn(params)
  }
  throw new TypeError('')
}
