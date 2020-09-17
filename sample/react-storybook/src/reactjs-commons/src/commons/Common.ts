import React from "react";

export type Props<T extends React.ElementType> = React.ComponentPropsWithRef<T>
export type Style<Component extends React.ElementType> = React.ComponentProps<Component>['style']

