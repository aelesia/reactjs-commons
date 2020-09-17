import React, { HTMLAttributes } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { withStyle } from '../reactjs-commons/src/hoc/withStyle'
import { Text, View, TextStyle, TouchableOpacity } from 'react-native-web'
import {withProps} from "../../../../src/hoc/withProps";

export default {
  title: 'HOC/withStyle (RN)'
} as Meta

const Button: React.FC<
  {
    textStyle?: TextStyle
    children?: string
  } & React.ComponentProps<typeof TouchableOpacity>
> = p => {
  return (
    <TouchableOpacity>
      <View
        style={Object.assign(
          {
            backgroundColor: '#F0F0F0',
            margin: 1,
            padding: 2,
            justifyContent: 'center',
            alignItems: 'center'
          },
          p.style
        )}
      >
        <Text style={{ textAlign: 'center', ...p.textStyle }}>{p.children}</Text>
      </View>
    </TouchableOpacity>
  )
}

const MyButton = withProps(Button, {
  omit: ['hitSlop']
})((p: {hitbox: number})=>({
  hitSlop: {top: p.hitbox, bottom: p.hitbox, left: p.hitbox, right: p.hitbox}
}))

export const _Button = () => {
  return (
    <MyButton hitbox={}/>
  )
}
