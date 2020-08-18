# withAsync

A powerful function to abstract away your loading states

![](https://i.imgur.com/QYJdyHy.gif)
 
- [Usage](#usage)
- [Sandbox with Sample Code](https://codesandbox.io/s/weathered-breeze-x0kt1)
  - [Ant Design](https://codesandbox.io/s/weathered-breeze-x0kt1?file=/src/samples/AntButton.tsx)
  - [Bootstrap](https://codesandbox.io/s/weathered-breeze-x0kt1?file=/src/samples/BootstrapButton.tsx)
  - [Material UI](https://codesandbox.io/s/weathered-breeze-x0kt1?file=/src/samples/MaterialButton.tsx)
  - [Vanilla React](https://codesandbox.io/s/weathered-breeze-x0kt1?file=/src/samples/ReactButton.tsx)

## Why

Have you ever had to display a loading state on your button while it completes an asynchronous request? Chances are you've written code similar to this before:

```tsx
const [loading, setLoading] = useState(false);

async function onClick() {
  setLoading(true);
  await delay(1000);
  setLoading(false);
}

return (
  <Button 
    onClick={onClick} 
    loading={loading} 
    disabled={loading}
  >
    Button
  </Button>
)
```

It works fine if you only have 1 or 2 buttons. But it gets tedious to write after a few times. `withAsync` abstracts this code from you so you never need to manage `loading` states again.

## What does withAsync do?

`withAsync` wraps any component that has a handler (the most common one being `onClick()`), and automatically injects two props:

- loading: boolean
- disabled: boolean

`withAsync` will automatically detect if an async function is being passed to the handler, then set both `loading` and `disabled` to `true` when the handler is invoked.

After the handler has resolved the promise, it will set `loading` and `disabled` back to `false`

## Usage

[Click here for examples in other mainstream libraries](docs/samples.md)  

1) Convert your Button to an AsyncButton:

```tsx
// If you are using a Component Library
import { withAsync } from "reactjs-commons";

export const AsyncButton = withAsync(Button);
```

```tsx
// If you are using pure React
import { withAsync } from "reactjs-commons";

export const AsyncButton = withAsync((props) => {
  return <button {...props} />;
});
```

2) Replace all instances of your old `Button` with the newly created `AsyncButton`

3) Either 
    - Pass in an `async function` to your `onClick` handler, then remember to call `await` on all async functions. 
    - Alternatively, use a synchronous function and return the Promise

```tsx
// Either use an async function and AWAIT all Promises
async function onClick() {
  await delay(1000);
  alert("The task has completed");
}

return <AsyncButton onClick={() => onClick()}>
  withAsync Button
</AsyncButton>
```
```tsx
// Or use a normal function and RETURN the Promise
function onClick() {
  return delay(1000).then(() => {
    alert("The task has completed");
  });
}

return <AsyncButton onClick={() => onClick()}>
  withAsync Button
</AsyncButton>
```

## Customization when Loading

If you wish to display something else while the Button is loading, it can be easily customized like so:

![](https://i.imgur.com/IO0ArQV.gif)

a) Change Text to 'Loading...'

```tsx
export const LoadingTextButton = withAsync((props) => {
  if (props.loading) {
    return <button {...props}>Loading...</button>;
  } else {
    return <button {...props} />;
  }
});
```

b) Use a Loading Spinner

```tsx
export const SpinnerButton = withAsync((props) => {
  if (props.loading) {
    return (
      <button {...props}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <SvgSpinner />
          {props.children}
        </div>
      </button>
    );
  } else {
    return <button {...props} />;
  }
});
```

https://codesandbox.io/s/weathered-breeze-x0kt1?file=/src/samples/CustomizedButtons.tsx

## Usage with non-Buttons, non-onClick, or ReactNative

withAsync can also be used with components that don't have the `onClick` interface.

### Binding loading state to a separate function

By default, the `loading` and `disabled` state is set based on the `onClick` handler. However you can choose to bind it to a different handler instead, such as `onMouseEnter` or `onMouseLeave`

![](https://i.imgur.com/zV8ScIT.gif)

```tsx
export const OnClickButton = withAsync(Button);
export const OnClickButton = withAsync(Button);
export const OnMouseEnterButton = withAsync(Button, {
  asyncHandlers: "onMouseEnter"
});
export const OnMouseLeaveButton = withAsync(Button, {
  asyncHandlers: "onMouseLeave"
});
```

```tsx
<>
  <OnClickButton onClick={() => onClick()}>
    onClick
  </OnClickButton>
  <OnMouseEnterButton onMouseEnter={() => onClick()}>
    onMouseEnter
  </OnMouseEnterButton>
  <OnMouseLeaveButton onMouseLeave={() => onClick()}>
    onMouseLeave
  </OnMouseLeaveButton>
</>
```

https://codesandbox.io/s/weathered-breeze-x0kt1?file=/src/samples/CustomHandlers.tsx

### React Native

As React Native uses `onPress` instead of `onClick`, pass in an `'onPress'` as the second argument so that withAsync knows to listen to onPress instead.

```tsx
export const OnClickButton = withAsync(Button, ['onPress']);
```

### Non Buttons

`withAsync` can overwrite any handler. It can also be used with custom Components even if they are not Buttons. Here's a sample of how well it integrates with `AntDesign` components.

![](https://i.imgur.com/7eqYUp8.gif)


```tsx
import { Button, Switch, Select } from "antd";

export const AsyncButton = withAsync(Button);
export const AsyncSwitch = withAsync(Switch, {
  asyncHandler: "onChange"
});
export const AsyncSelect = withAsync(Select, {
  asyncHandler: "onSelect"
});

<AsyncButton onClick={() => onClick()}>
  withAsync Button
</AsyncButton>

<AsyncSelect onSelect={() => onClick()}>
  <Option value="1">Value 1</Option>
</AsyncSelect>

<AsyncSwitch onChange={() => onClick()} />
```

https://codesandbox.io/s/weathered-breeze-x0kt1?file=/src/samples/NonButtons.tsx
