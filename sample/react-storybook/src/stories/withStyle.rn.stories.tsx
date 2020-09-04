import React, { HTMLAttributes } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { withStyle } from '../reactjs-commons/src/hoc/withStyle'
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

const MyButton = withStyle(Button)({
  width: 200,
  marginTop: 4,
  marginBottom: 4,
  borderWidth: 1,
  borderRadius: 10
})

const RoundedButton = withStyle(MyButton)({
  borderRadius: 10
})
const CircleButton = withStyle(MyButton)<{ size: number }>(props => ({
  borderRadius: props.size,
  height: props.size,
  width: props.size
}))

// Colored Buttons
const YellowButton = withStyle(MyButton)({
  backgroundColor: '#FFCC00'
})
const RedButton = withStyle(MyButton)({
  backgroundColor: '#FF3333'
})
const BlueButton = withStyle(MyButton)({
  backgroundColor: '#0088FF'
})

// Combined Buttons
const YellowRoundedButton = withStyle(RoundedButton)({
  backgroundColor: '#FFCC00'
})
const YellowCircleButton = withStyle(CircleButton)({
  backgroundColor: '#FFCC00'
})

export const _Button = () => {
  return (
    <View style={{ display: 'flex', flexDirection: 'column' }}>
      <Text>Styled Buttons</Text>
      <MyButton>My Button</MyButton>
      <RoundedButton>Rounded Button</RoundedButton>
      <CircleButton size={50}>Circle</CircleButton>

      <Text>Colored Buttons</Text>
      <YellowButton>Yellow Button</YellowButton>
      <RedButton>Red Button</RedButton>
      <BlueButton>Blue Button</BlueButton>

      <Text>Combined</Text>
      <YellowRoundedButton>Yellow Rounded Button</YellowRoundedButton>
      <YellowCircleButton size={50}>Yellow Circle</YellowCircleButton>
    </View>
  )
}
