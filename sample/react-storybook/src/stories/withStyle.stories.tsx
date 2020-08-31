import React, {HTMLAttributes} from 'react';
import { Meta } from '@storybook/react/types-6-0'
import { withStyle } from "../reactjs-commons/src/hoc/withStyle";

export default {
  title: 'HOC/withStyle',
} as Meta;

const Button: React.FC<HTMLAttributes<HTMLButtonElement>> = p => <button {...p}/>
const Div: React.FC<HTMLAttributes<HTMLDivElement>> = p => <div {...p} />
const Span: React.FC<HTMLAttributes<HTMLSpanElement>> = p => <span {...p} />

const Text = Span
const View = withStyle(Div)({
  display: 'flex',
  flexDirection: "column"
})

const DefaultButton = withStyle(Button)({
  width: 200,
  marginTop: 4,
  marginBottom: 4,
})
const RoundedButton = withStyle(DefaultButton)({
  borderRadius: 50,
})
const CircleButton = withStyle(DefaultButton)<{size: number}>(props=>({
  borderRadius: props.size,
  height: props.size,
  width: props.size
}))

// Colored Buttons
const YellowButton = withStyle(DefaultButton)({
  backgroundColor: '#FFCC00',
})
const RedButton = withStyle(DefaultButton)({
  backgroundColor: '#FF3333',
  color: "white"
})
const BlueButton = withStyle(DefaultButton)({
  backgroundColor: '#0088FF',
  color: "white"
})

// Combined Buttons
const YellowRoundedButton = withStyle(RoundedButton)({
  backgroundColor: '#FFCC00',
})
const YellowCircleButton = withStyle(CircleButton)({
  backgroundColor: '#FFCC00',
})

export const _Button = ()=>{
  return (
    <View>
      <Text>Styled Buttons</Text>
      <DefaultButton>Margin Button</DefaultButton>
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
