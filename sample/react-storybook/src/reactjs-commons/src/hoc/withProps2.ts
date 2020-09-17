import React, { ReactHTML } from 'react'
import { Props, Style } from '../commons/Common'

// function overwriteStyles<T extends Record<string, any>>(defaultProps: any, props: T): T {
//   const keys = Object.keys(props)
//   const returnProp: any = {}
//   const allStyleProps = keys.forEach(k => {
//     if (k.endsWith('style')) {
//       returnProp[k] = {
//         ...props[k]
//       }
//     }
//     returnProp[k] = props[k]
//   })
//   return allStyleProps
// }

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
    defaultProps:
      | Props<Component>
      | ((props: Props<Component> & ExtraProps) => Props<Component>)
  ): React.FC<Props<Component> & ExtraProps> {
    //
    return function overwrite(props) {

      // @ts-ignore
      const _defaultPropsEval = typeof defaultProps === 'function' ? defaultProps(props) : defaultProps

      return React.createElement(WrappedComponent, {
        ..._defaultPropsEval,
        ...props,
        ...mapStyles(_defaultPropsEval, props)
      })
    }
  }
}
