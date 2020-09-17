import React, { HTMLAttributes, useRef } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { ScrollView, Text, View, TextStyle, TouchableOpacity } from 'react-native-web'
import { withProps } from '../reactjs-commons/src/hoc/withProps2'
import { withStyle } from '../reactjs-commons/src/hoc/withStyle2'

export default {
  title: 'HOC/withProps (RN)'
} as Meta

const Button: React.FC<
  {
    textStyle?: TextStyle
    children?: string
  } & React.ComponentProps<typeof TouchableOpacity>
> = p => {
  return (
    <TouchableOpacity disabled={p.disabled} onPress={p.onPress}>
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
        )}>
        <Text style={{ textAlign: 'center', ...p.textStyle }}>{p.children}</Text>
      </View>
    </TouchableOpacity>
  )
}

const MyDisabledButton = withProps(Button)({
  disabled: true
})

const MyStyledButton = withProps(Button)(props => ({
  style: { backgroundColor: 'red' },
  textStyle: { color: 'blue' }
}))

const MyStyledDisabledButton = withProps(Button)(props => ({
  textStyle: { color: props.disabled ? '#666' : undefined }
}))

const MyLoadingButton = withProps(Button)<{
  loading?: boolean
}>(p => ({
  disabled: p.loading,
  style: { backgroundColor: p.loading ? 'red' : undefined }
}))

const MyLoadingDisabledButton = withProps(MyStyledDisabledButton)<{
  loading?: boolean
}>(p => ({
  disabled: p.loading,
  style: { backgroundColor: p.loading ? 'red' : undefined }
}))

const BorderedScrollView = withStyle(ScrollView)({
  height: 100,
  borderWidth: 1,
  borderColor: 'black',
  borderStyle: 'solid'
})

const BorderedScrollPropView = withProps(ScrollView)({
  showsVerticalScrollIndicator: false
})

export const _Button = () => {
  const ref = useRef(null)

  return (
    <>
      <BorderedScrollPropView
        ref={ref}
        style={{ height: 100, borderWidth: 1, borderColor: 'black', borderStyle: 'solid' }}>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
      </BorderedScrollPropView>

      <Button
        onPress={() => {
          ref.current?.scrollTo(0)
        }}>
        1
      </Button>
      <Button
        onPress={() => {
          ref.current?.scrollToEnd()
        }}>
        2
      </Button>

      <Button>Hello</Button>

      <MyDisabledButton>Disabled</MyDisabledButton>

      <MyStyledButton>Styled</MyStyledButton>

      <MyStyledButton style={{ backgroundColor: 'yellow' }}>Styled</MyStyledButton>

      <MyStyledButton textStyle={{ color: 'green' }}>Styled</MyStyledButton>

      <MyStyledDisabledButton>MyStyledDisabled enabled</MyStyledDisabledButton>

      <MyStyledDisabledButton disabled>MyStyledDisabled disabled</MyStyledDisabledButton>

      <MyLoadingButton loading>MyLoadingButton</MyLoadingButton>
      <MyLoadingButton>My Not LoadingButton</MyLoadingButton>
      <MyLoadingDisabledButton loading={true}>Loading Disabled</MyLoadingDisabledButton>
    </>
  )
}
