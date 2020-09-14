import React, { HTMLAttributes } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { withStyle } from '../../reactjs-commons/src/hoc/withStyle'
import { Text, View, TextStyle, TouchableOpacity } from 'react-native-web'
import { withLoading } from '../../reactjs-commons/src/hoc/withLoading'
import { sleep } from '@aelesia/commons'

export default {
  title: 'HOC/withLoading (RN)'
} as Meta

const Button: React.FC<
  {
    textStyle?: TextStyle
    children?: string
    disabled?: boolean
  } & React.ComponentProps<typeof TouchableOpacity>
> = p => {
  const { style, ...otherProps } = p
  return (
    <TouchableOpacity {...otherProps}>
      <View
        style={Object.assign(
          {
            backgroundColor: p.disabled ? '#999' : '#F0F0F0',
            margin: 1,
            padding: 2,
            justifyContent: 'center',
            alignItems: 'center'
          },
          style
        )}
      >
        <Text style={{ textAlign: 'center', ...p.textStyle }}>{p.children}</Text>
      </View>
    </TouchableOpacity>
  )
}

const LoadingButton = withLoading(Button, { asyncHandler: 'onPress' })

export const _Button = () => {
  return (
    <View style={{ width: 200 }}>
      <Button>Regular Button</Button>
      <LoadingButton
        onPress={async () => {
          await sleep(1000)
        }}
        onLoadingStart={() => console.info('onLoadingStart')}
        onLoadingEnd={() => console.info('onLoadingEnd')}
      >
        Loading Button
      </LoadingButton>
    </View>
  )
}
