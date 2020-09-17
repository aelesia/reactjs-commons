import React from 'react'

export const withProps = <
  Component extends React.ElementType,
  OmitProps extends keyof React.ComponentProps<Component>
>(
  WrappedComponent: Component,
  options?: {
    omit?: OmitProps[]
  }
) => <Props = {}>(
  props:
    | React.ComponentProps<Component>
    | ((_props: React.ComponentProps<Component> & Props) => React.ComponentProps<Component>)
): React.FC<Omit<React.ComponentProps<Component>, OmitProps> & Props> => {
  return p => {
    return React.createElement(WrappedComponent, {
      // @ts-ignore
      ...(typeof props === 'function' ? props(p) : props),
      ...p,
      style: {
        // @ts-ignore
        ...(typeof props === 'function' ? props(p)['style'] : props['style']),
        // @ts-ignore
        ...p.style
      }
    })
  }
}
