import React, { HTMLAttributes } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { withStyle } from '../reactjs-commons/src/hoc/withStyle'

export default {
  title: 'HOC/withStyle'
} as Meta

const MyButton = withStyle('button')({
  width: 200,
  marginTop: 4,
  marginBottom: 4,
  borderWidth: 1
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
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span>Styled Buttons</span>
      <MyButton>My Button</MyButton>
      <RoundedButton>Rounded Button</RoundedButton>
      <CircleButton size={50}>Circle</CircleButton>

      <span>Colored Buttons</span>
      <YellowButton>Yellow Button</YellowButton>
      <RedButton>Red Button</RedButton>
      <BlueButton>Blue Button</BlueButton>

      <span>Combined</span>
      <YellowRoundedButton>Yellow Rounded Button</YellowRoundedButton>
      <YellowCircleButton size={50}>Yellow Circle</YellowCircleButton>
    </div>
  )
}
