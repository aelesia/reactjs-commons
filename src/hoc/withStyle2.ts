import React, {ReactHTML} from 'react'
import {Props, Style} from "../commons/Common";

// type HTMLKey = keyof ReactHTML
// type HTMLComponent<T extends HTMLKey> = JSX.IntrinsicElements[T]
//
// export function withStyle<T extends HTMLKey, Component extends HTMLComponent<T>>(
//   HTMLFactory: T
// ): <ExtraProps = {}>(
//   style:
//     | JSX.IntrinsicElements[T]['style']
//     | ((props: JSX.IntrinsicElements[T] & ExtraProps) => JSX.IntrinsicElements[T]['style'])
// ) => React.FC<JSX.IntrinsicElements[T] & ExtraProps>

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
    defaultStyle:
      | Style<Component>
      | ((props: Props<Component> & ExtraProps) => Style<Component>)
  ): React.FC<Props<Component> & ExtraProps> {
    // Performs the actual overwriting of props
    // Props must be passed first to prevent overwriting of styles
    // Style will be passed after
    // props.style will always have the final overwrite
    return function overwrite(props) {
      return React.createElement(WrappedComponent, {
        ...props,
        style: {
          ...(typeof defaultStyle === 'function' ? defaultStyle(props) : defaultStyle),
          ...props.style
        }
      })
    }
  }
}
