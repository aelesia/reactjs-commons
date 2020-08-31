import React from 'react'
import { HTMLAttributes } from 'react'
import { withStyle } from '../../hoc/withStyle'

const Div: React.FC<HTMLAttributes<HTMLDivElement>> = p => <div {...p} />
const Span: React.FC<HTMLAttributes<HTMLSpanElement>> = p => <span {...p} />

export const Text = Span
export const View = withStyle(Div)({
  display: 'flex',
  flexDirection: 'column'
})
export const Row = withStyle(Div)({
  display: 'flex',
  flexDirection: 'row'
})
