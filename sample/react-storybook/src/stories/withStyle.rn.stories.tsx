import React, { HTMLAttributes } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { withStyle } from '../reactjs-commons/src/hoc/withStyle2'
import { Text, View, TextStyle, TouchableOpacity } from 'react-native-web'

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

const RoundedButton = withStyle(Button)({
  marginTop: 8,
  borderRadius: 10,
  borderWidth: 0.5,
})

const ShadowRoundedButton = withStyle(RoundedButton)({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 4
  },
  shadowOpacity: 0.5,
  shadowRadius: 2.62,
  elevation: 2
})

const DisabledButton = withStyle(RoundedButton)(props => ({
  backgroundColor: props.disabled ? '#999' : '#F0F0F0',
}))

const CircleButton = withStyle(Button)<{ size: number }>(props => ({
  borderRadius: props.size / 2,
  height: props.size,
  width: props.size
}))

export const _Button = () => {
  return (
    <View style={{ width: 200 }}>
      <Button>Regular Button</Button>
      <RoundedButton onPress={() => console.log('onClick')}>My Rounded Button</RoundedButton>
      <RoundedButton style={{ backgroundColor: '#FFCC00' }}>My Yellow Button</RoundedButton>
      <RoundedButton style={{ borderWidth: 1, borderColor: '#FF3333' }}>My Red Border Button</RoundedButton>
      <ShadowRoundedButton>My Shadow Button</ShadowRoundedButton>

      <DisabledButton>Enabled</DisabledButton>
      <DisabledButton disabled={true}>Disabled</DisabledButton>

      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <CircleButton size={40}>S40</CircleButton>
        <CircleButton size={60}>S60</CircleButton>
        <CircleButton size={50}>S50</CircleButton>
      </View>
    </View>
  )
}
