import React from 'react'
import {reduceObjOrFn} from "../commons/Common";

type Props<T extends React.ElementType> = React.ComponentProps<T>
type StyleFn<Component extends React.ElementType, ExtraProps = {}> = (
  props: React.ComponentProps<Component> & ExtraProps
) => React.ComponentProps<Component>['style']
type Style<Component extends React.ElementType> = React.ComponentProps<Component>['style']
// type StyleParam<Component extends React.ElementType, ExtraProps> = StyleFn<Component> | Style<Component>

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
    styleParam: Style<Component> | StyleFn<Component, ExtraProps>
  ): React.FC<Props<Component> & ExtraProps> {

    // Performs the actual overwriting of props
    // Props must be passed first to prevent overwriting of styles
    // Style will be passed after
    // props.style will always have the final overwrite
    return function overwrite(props: Props<Component> & ExtraProps) {
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
