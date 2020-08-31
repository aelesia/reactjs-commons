import React from 'react'

export const withStyle = <Component extends React.ElementType>(WrappedComponent: Component) => <
  Props = {}
>(
  style:
    | React.ComponentProps<Component>['style']
    | ((props: React.ComponentProps<Component> & Props) => React.ComponentProps<Component>['style'])
): React.FC<React.ComponentProps<Component> & Props> => {
  return props => {
    return React.createElement(WrappedComponent, {
      ...props,
      style: {
        ...(typeof style === 'function' ? style(props) : style),
        ...props.style
      }
    })
  }
}
