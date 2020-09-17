import React from 'react'
import { Props, reduceObjOrFn, Style } from '../commons/Common'

// Takes in any ReactComponent
// @usage: `withStyle(Button)`
export function withStyle<Component extends React.ElementType>(WrappedComponent: Component) {
  // Takes in ExtraProps as a Generic if user wants to inject additional props
  // Accepts styleParam which can either be
  //   a) Flat style object
  //   b) Function that injects Props + ExtraProps
  // @usage: `withStyle(Button)({ backgroundColor: 'white' })`
  // @usage: `withStyle(Button)(props => { backgroundColor: props.disabled ? 'grey' : 'white' })`
  // @usage: `withStyle(Button)<{ color: string }>(props => { backgroundColor: props.color })`
  // Curries the return component to have ExtraProps included
  return function curry<ExtraProps = {}>(
    styleParam:
      | Style<Component>
      | ((props: Props<Component> & ExtraProps) => Props<Component>['style'])
  ): React.FC<Props<Component> & ExtraProps> {
    // Performs the actual overwriting of props
    // Props must be passed first to prevent overwriting of styles
    // Style will be passed after
    // props.style will always have the final overwrite
    return function overwrite(props) {
      return React.createElement(WrappedComponent, {
        ...props,
        style: {
          ...reduceObjOrFn(styleParam, props),
          ...props.style
        }
      })
    }
  }
}
