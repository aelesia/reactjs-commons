import React, { ReactHTML } from 'react'

export function withStyle<T extends keyof ReactHTML>(
  HTMLFactory: T
): <Props = {}>(
  style:
    | JSX.IntrinsicElements[T]['style']
    | ((props: JSX.IntrinsicElements[T] & Props) => JSX.IntrinsicElements[T]['style'])
) => React.FC<JSX.IntrinsicElements[T] & Props>

export function withStyle<Component extends React.ElementType>(
  WrappedComponent: Component
): <Props = {}>(
  style:
    | React.ComponentProps<Component>['style']
    | ((props: React.ComponentProps<Component> & Props) => React.ComponentProps<Component>['style'])
) => React.FC<React.ComponentProps<Component> & Props>


export function withStyle<Component extends React.ElementType>(WrappedComponent: Component) {
  return <Props = {}>(
    style:
      | React.ComponentProps<Component>['style']
      | ((
      props: React.ComponentProps<Component> & Props
    ) => React.ComponentProps<Component>['style'])
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
}
