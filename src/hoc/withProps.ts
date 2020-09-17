import React, { forwardRef, ReactHTML } from 'react'
import { Props, Style } from '../commons/Common'

function mapStyles(defaultProps: any, props: any) {
  const keys = Object.keys(props)
  return keys
    .filter(key => key.endsWith('style'))
    .map(key => ({
      [key]: { ...defaultProps[key], ...props[key] }
    }))
}

// Takes in any ReactComponent
// @usage: `withStyle(Button)`
export function withProps<Component extends React.ElementType>(WrappedComponent: Component) {
  //
  return function curry<ExtraProps = {}>(
    defaultProps: Props<Component> | ((props: Props<Component> & ExtraProps) => Props<Component>)
  ): React.FC<Props<Component> & ExtraProps> {
    //
    return forwardRef((props: any, ref: any) => {
      //
      const _defaultPropsEval = // @ts-ignore
        typeof defaultProps === 'function' ? defaultProps(props) : defaultProps
      //
      return React.createElement(WrappedComponent, {
        ..._defaultPropsEval,
        ...props,
        ...mapStyles(_defaultPropsEval, props),
        ref: ref
      })
    }) as React.FC
  }
}
