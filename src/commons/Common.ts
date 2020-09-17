import React from 'react'

export type Props<T extends React.ElementType> = React.ComponentProps<T>
export type OmitProps<T extends React.ElementType, P extends keyof React.ComponentProps<T>> = Omit<
  React.ComponentProps<T>,
  P
>
export type PickProps<T extends React.ElementType, P extends keyof React.ComponentProps<T>> = Pick<
  React.ComponentProps<T>,
  P
>
export type Style<Component extends React.ElementType> = React.ComponentProps<Component>['style']
