# withStyle

A simple minimalist function to add styles to existing components, in order to create more flexible, reusable functions. Compatible with React & ReactNative with first class Intellisense support.

You can try it out here:

- [React Sandbox](https://codesandbox.io/s/withstyle-qwebt)
- [React Native Sandbox](https://codesandbox.io/s/withstyle-react-native-zfe43) 

## Usage

1) Install

    - yarn: `yarn add reactjs-commons`
    - npm: `npm install reactjs-commons`

2) Create a new component with styling
    ```tsx
   import { withStyle } from "reactjs-commons";
   
    const MyButton = withStyle('button')({
      borderRadius: 10,
    })
    
    const YellowButton = withStyle(MyButton)({
      backgroundColor: '#FFCC00',
    })
    
    const RedButton = withStyle(MyButton)({
      backgroundColor: '#FF3333'
    })
    
    const BlueButton = withStyle(MyButton)({
      backgroundColor: '#0088FF'
    })
    ```

3) Call the component
    ```tsx
    return (
      <div>
        <YellowButton>Yellow Button</YellowButton>
        <RedButton>Red Button</RedButton>
        <BlueButton>Blue Button</BlueButton>
      </div>
    )
    ```

![](https://i.imgur.com/Rpj9AWL.png)

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
<CircleButton size={30}>30</CircleButton>
<CircleButton size={40}>40</CircleButton>
<CircleButton size={50}>50</CircleButton>
```

![](https://i.imgur.com/lNEFDUC.png)

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

Newly added props are also available when performing styling:

![](https://i.imgur.com/0leN9Mb.gif)

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

## Why do I need this?

You might be wondering, why not just write the following code instead:

```tsx
const YellowButton = p => <Button style={{backgroundColor:'yellow'}} {...p} />
```

- You lose out on Intellisense support if you are using a modern IDE like VSCode or WebStorm. All additional props that are available on `Button` such as `onClick` will no longer be suggested.

_____

```tsx
return <YellowButton style={{padding: 4}}>Yellow Button</YellowButton>
```
- In the above code, your styling will clash. Your original style of `backgroundColor:'yellow'` will be overwritten by `padding: 4`. When you use `withStyle`, it will always merge your styles correctly instead of overwriting them.

## Comparison with `styled-components`

`withStyle` is: 
- meant to be a simple lightweight one-line function to help you create re-usable components with no extra setup
- meant to provide a syntax which is more familiar to React developers
- meant to provide accurate Intellisense for both React & ReactNative

In short, it is meant for people who want some of the benefits of `styled-components` paired with accurate Intellisense and a more familiar API, but do not want a full library for it.

If you are already using `styled-components`, this library will not provide you anything new.

However if you are using ReactNative, you may find this library beneficial as it is able to provide you autocompletion of the correct styles
