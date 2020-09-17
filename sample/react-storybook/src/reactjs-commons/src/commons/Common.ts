import React from "react";

export type Props<T extends React.ElementType> = React.ComponentProps<T>
export type Style<Component extends React.ElementType> = React.ComponentProps<Component>['style']

export function reduceObjOrFn<T extends Object>(objectOrFn: T | ((...params: any)=>T), ...params: any): T {
  if (typeof objectOrFn === 'object') {
    return objectOrFn
  } else if (typeof objectOrFn === 'function') {
    return objectOrFn(params)
  }
  throw new TypeError('')
}
