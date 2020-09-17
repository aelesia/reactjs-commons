import React from "react";

export type Props<T extends React.ElementType> = React.ComponentProps<T>
export type Style<Component extends React.ElementType> = React.ComponentProps<Component>['style']

