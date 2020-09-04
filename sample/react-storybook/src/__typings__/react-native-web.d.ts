declare module 'react-native-web' {
  import {TextProps} from "react-native";
  export * from 'react-native'
  export class Text extends React.Component<TextProps>{}
}
