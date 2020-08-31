# withStyle

A simple function to add styles to existing components with full Intellisense support. Compatible with React & ReactNative.

## Basic Usage

Create a new component with styling
```tsx
const Button: React.FC<HTMLAttributes<HTMLButtonElement>> = p => <button {...p}/>

const YellowButton = withStyle(Button)({
  backgroundColor: '#FFCC00',
})

const RedButton = withStyle(Button)({
  backgroundColor: '#FF3333',
  color: "white"
})

const BlueButton = withStyle(Button)({
  backgroundColor: '#0088FF',
  color: "white"
})
```

Call the component
```tsx
return (
  <div>
    <YellowButton>Yellow Button</YellowButton>
    <RedButton>Red Button</RedButton>
    <BlueButton>Blue Button</BlueButton>
  </div>
)
```

![](https://i.imgur.com/fgN5aFs.png)

## Adding Props

Props can be added to your components and they can be used directly.

In this example, I'm adding a prop `size`, which takes in a `number`. This new prop `size` can be used for styling attributes.

```jsx
const CircleButton = withStyle(Button)(props=>({
  borderRadius: props.size,
  height: props.size,
  width: props.size
}))
```

CircleButton now takes in a new prop `size`
```jsx
return <CircleButton size={50}>Circle</YellowCircleButton>
```

## Combining Components

Components can be combined to build upon one another.

In this example, I can make use of the previously created `CircleButton`, to make a `YellowCircleButton`.

```jsx
const YellowCircleButton = withStyle(CircleButton)(props=>({
  backgroundColor: '#FFCC00'
}))
```

```jsx
return( 
  <div>
    <CircleButton size={50}>Circle</CircleButton>
    <YellowCircleButton size={50}>Yellow Circle</YellowCircleButton>
  </div>
)
```

![](https://i.imgur.com/iheAy1T.png)

## Intellisense

`withStyles` was built with full Typescript & Intellisense support.

As such, all components will retain the props of the original component that it extended:

![](https://i.imgur.com/9eQHzlW.gif)

Existing and newly added props are also available when performing styling:

![](https://i.imgur.com/yRVOGJd.gif)

## Typescript

If you are adding a new prop to your component, you may use the following syntax for better Intellisense:

```tsx
const CircleButton = withStyle(Button)<size: number>(props=>({
  borderRadius: props.size,
  height: props.size,
  width: props.size
}))
```

You will now be prompted to include the `size` prop when constructing a new `CircleButton`

![](https://i.imgur.com/nSQl0qx.gif)

## Comparison with `styled-components`

`withStyle` is: 
- meant to be a simple lightweight one-line function to help you create re-usable and composable components.
- meant to provide a syntax which is more familiar to React developers
- meant to provide a consistent API between React and ReactNative
- meant to provide accurate Intellisense for all platforms

In short, it is meant for people who want some of the benefits of `styled-components` paired with accurate Intellisense with a more familiar API.

If you are presently using `styled-components`, this library will not provide you anything new.

However if you are using ReactNative, you may find this library beneficial as it provides first class Intellisense support.

## Why do I need this?

You might be wondering, why not just write the following code instead:

```tsx
const YellowButton = p => <Button style={{backgroundColor:'yellow'}} {...p} />
```

- You lose out on Intellisense support if you are using a modern IDE like VSCode or WebStorm. All additional props that are available on `Button` such as `onClick` will no longer be suggested.

```tsx
return <YellowButton style={{padding: 4}}>Yellow Button</YellowButton>
```
- In the above code, your styling will clash. Your original style of `backgroundColor:'yellow'` will be overwritten by `padding: 4`. `withStyle` will always merge your styling properly.
