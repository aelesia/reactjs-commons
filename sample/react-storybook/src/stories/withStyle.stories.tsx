import React, { HTMLAttributes } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { withStyle } from '../reactjs-commons/src/hoc/withStyle'
import { View } from 'react-native'

export default {
  title: 'HOC/withStyle'
} as Meta

const RoundedButton = withStyle('button')({
  marginTop: 8,
  borderRadius: 10
})

const ShadowRoundedButton = withStyle(RoundedButton)({
  boxShadow: '1px 4px 1px #9E9E9E'
})

const DisabledButton = withStyle(RoundedButton)(props => ({
  backgroundColor: props.disabled ? '#999' : '#FF'
}))

const CircleButton = withStyle('button')<{ size: number }>(props => ({
  borderRadius: props.size / 2,
  height: props.size,
  width: props.size
}))

export const _Button = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: 200 }}>
      <button>Regular Button</button>
      <RoundedButton onClick={() => console.log('onClick')}>My Rounded Button</RoundedButton>
      <RoundedButton style={{ backgroundColor: '#FFCC00' }}>My Yellow Button</RoundedButton>
      <RoundedButton style={{ borderColor: '#FF3333' }}>My Red Border Button</RoundedButton>
      <ShadowRoundedButton>My Shadow Button</ShadowRoundedButton>

      <DisabledButton>Enabled</DisabledButton>
      <DisabledButton disabled={true}>Disabled</DisabledButton>

      <div style={{ flexDirection: 'row', display: 'flex', marginTop: 10 }}>
        <CircleButton size={40}>S40</CircleButton>
        <CircleButton size={60}>S60</CircleButton>
        <CircleButton size={50}>S50</CircleButton>
      </div>
    </div>
  )
}
