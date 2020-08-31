import React from 'react'

// export const withStyles = <Component extends React.ElementType>(WrappedComponent: Component[]) => <
//   Props = {}
// >(): React.FC<React.ComponentProps<Component> & Props> => {
//   return props => {
//     for (let i=0; i<WrappedComponent.length; i++) {
//       withStyle()
//       // return React.createElement(WrappedComponent, {
//       //   ...props,
//       //   style: {
//       //     ...(typeof style === 'function' ? style(props) : style),
//       //     ...props.style
//       //   }
//       // })
//     }
//   }
// }

export const combine = (WrappedComponent: any[]) => {
  let style = WrappedComponent[0]['style']
  for (let i = 0; i < WrappedComponent.length; i++) {
    style = { ...style, ...WrappedComponent[i]['style'] }
  }
  return (props: any) => {
    return React.createElement(WrappedComponent[0], { style })
  }
}
