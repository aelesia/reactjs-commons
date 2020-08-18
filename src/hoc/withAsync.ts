import React, { JSXElementConstructor, useState } from 'react'

export type AsyncProps<T = unknown> = {
  loading: boolean
  disabled: boolean
} & T

export type AsyncComponent<T extends React.FC> = {
  loading: boolean
  disabled: boolean
} & React.ComponentProps<T>

type withAsyncOptions<T extends JSXElementConstructor<any>> = {
  asyncHandler?: keyof React.ComponentProps<T> | (keyof React.ComponentProps<T>)[]
  omitProps?: ('loading' | 'disabled')[]
}
function getAsyncHandlers(key?: string | string[]): string[] {
  if (!key) {
    return ['onClick']
  } else if (typeof key === 'string') {
    return [key]
  } else if (key instanceof Array) {
    return key
  } else {
    throw TypeError('Invalid input for asyncHandler: ' + key)
  }
}

export const withAsync = <T extends JSXElementConstructor<any>>(
  WrappedComponent: T,
  options?: withAsyncOptions<T>
) => {
  const HOC: React.FC<React.ComponentProps<T>> = (p: any) => {
    // @ts-ignore
    const asyncHandler = getAsyncHandlers(options?.asyncHandler)
    const [loading, setLoading] = useState<boolean>(false)
    const map: Record<string, Function> = {}
    asyncHandler.forEach(funcName => {
      // @ts-ignore
      map[funcName] = async (...args: any[]) => {
        if (p[funcName]) {
          try {
            const result = p[funcName](...args)
            if (result instanceof Promise) {
              setLoading(true)
            }
            await result
          } catch (err) {
            console.error('Uncaught promise in AsyncButton: ' + err)
          } finally {
            setLoading(false)
          }
        }
      }
    })
    const props: any = {}
    if (!options?.omitProps?.includes('loading')) {
      props['loading'] = loading
    }
    if (!options?.omitProps?.includes('disabled')) {
      props['disabled'] = p.disabled === true || loading
    }
    return React.createElement(WrappedComponent, {
      ...p,
      ...props,
      ...map
    })
  }
  return HOC
}
