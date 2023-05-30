![cardon](https://github.com/hepter/cardon/raw/master/docs/cardon.png)

[![Npm Version][npm-version-image]][npm-version-url] [![License][license-image]][license-url]

# Cardon: Reusable Asynchronous Functional Cards

Cardon is a tool that allows you to create reusable cards that can be used as asynchronous functions on any screen.

## Demo

You can check out a live demo of Cardon on CodeSandbox.

[![Edit Example Usage - cardon](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/example-usage-cardon-u60wc?fontsize=14&hidenavigation=1&theme=dark)

## Installation

To use Cardon in your project, install it as a dependency using either Yarn or NPM.

```shell
# Yarn
$ yarn add cardon

# NPM
$ npm install cardon
```

## How to Use Cardon

Cardon provides two primary methods, `'CardonContainer'` and `'withCardon'`, for usage.

| Component Name  | Description                                                                                                                                                       |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CardonContainer | It creates an instance for the cards. All cards are displayed within this container.                                                                              |
| withCardon      | This method wraps the component you want to display as a card, injects properties named `'visible'` and `'get'` into it, and then returns an interface for usage. |

### `withCardon` Injected props

`withCardon` adds several props to the component it wraps.

| Name    | Type          | Description                                                                                                                                                                                                                            |
| ------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| visible | boolean       | This property controls the visibility of the card. It toggles based on the invocation of the `'show'` or `'hide'` function.                                                                                                            |
| get     | WithCardonGet | This is a callback generator function. Callbacks must be created using the `'get'` function to return the desired callback value. To ensure the correct functioning of the cards, only callbacks generated via `'get'` should be used. |

### `withCardon` Options

`withCardon` also accepts an options object as a second parameter.

| Name          | Type              | Default Value | Description                                                                                                                                                                     |
| ------------- | ----------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| destroyOnHide | boolean           | false         | If set to true, the component will be destroyed when hidden. If left unchanged, the component will remain on the root and must be manually hidden using the 'visible' property. |
| key           | string (optional) | -             | A unique identifier for the card. This key can be used to control the visibility of a specific card using the `Cardon.hide(key)` method.                                        |

When called, each card returns two functions named `'show'` and `'hide'`.

##### `withCardon` methods after wrapping

| Name | Type                                                       | Description                                                                                                                                                                                                                            |
| ---- | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| show | (props?: P, callback?: (result: R) => void) => Promise\<R> | The function to show the card. It returns a promise with data and waits until the card is closed or can utilize the callback function provided as the second parameter. The card is automatically hidden after the result is returned. |
| hide | () => void                                                 | Allows the card to be cancelled and hidden without waiting for data to return. Typically, this doesn't need to be used but can be situationally helpful.                                                                               |

`withCardon` can also receive options with its second parameter as `withCardon(component, options)`.

## Cardon Class

Cardon exports a `Cardon` class with utility methods.

```js
import Cardon from "cardon";
```

| Method                   | Description                                                                                                    |
| ------------------------ | -------------------------------------------------------------------------------------------------------------- |
| Cardon.clear()           | Clears all visible cards.                                                                                      |
| Cardon.hide(key: string) | Hides a specific card. The card must have a unique key assigned during creation using the 'withCardon' method. |

## Example

Here are a few simple steps to use Cardon:

1. Add the `CardonContainer` component to the root file.

```diff
// App.js
function App() {
  return (
    <div>
       <Main />
+      <CardonContainer />
    </div >
  );
}
export default App;
```

2. Create a folder named 'cardon' or any name of your choosing and place your cards within this folder.

3. Wrap the component you want to use as a card as shown in the example below.

```jsx
// ./cardon/MyModalCard.jsx
import { withCardon } from "cardon";
import React from "react";

function MyModalCard({ visible, get, title }) {
  return (
    <Modal open={visible} onClose={get(null)}>
      My Reusable '{title}' Modal!
      <button onClick={get(true)}>Yes</button>
      <button onClick={get(false)}>No</button>
    </Modal>
  );
}
export default withCardon(MyModalCard);
```

Or with TypeScript:

```tsx
// ./cardon/MyModalCard.tsx
import { withCardon } from "cardon";
import React from "react";

interface Props {
  title: string;
}
function MyModalCard({ visible, get, title }) {
  return (
    <div>
      My Reusable '{title}' Card!
      <button onClick={get(true)}>Yes</button>
      <button onClick={get(false)}>No</button>
    </div>
  );
}
export default withCardon<Props, boolean>(MyModalCard);
```

You can alternatively use a card with 'destroyOnHide' options (This is necessary if the card doesn't use the 'visible' prop):

```jsx
// ./cardon/MyModalCard.jsx
import React from "react";
import { withCardon } from "cardon";

function MyModalCard({ get, title }) {
  return (
    <div>
      My Reusable '{title}' Card!
      <button onClick={get(true)}>Yes</button>
      <button onClick={get(false)}>No</button>
    </div>
  );
}
export default withCardon(MyModalCard, { destroyOnHide: true });
```

4. Import the component and call the 'show' function to display it. Optionally, you can pass props to the card and asynchronously receive the result.

```jsx
let result = await MyModalCard.show({ title: "Awesome" });
```

Here's an example of usage:

```jsx
import React from "react";
import { MyModalCard } from "./cardon/MyModalCard";
function HomePage() {
  const [modalResult, setModalResult] = React.useState(false);
  const showModal = async () => {
    let result = await MyModalCard.show({ title: "Awesome" });
    setModalResult(result);
  };

  return (
    <>
      {modalResult ? "Yes" : "No"}
      <button onClick={showModal}>Show</button>
    </>
  );
}
```

You can also use the Cardon class like this:

```js
import Cardon from "cardon";

Cardon.hide("my-modal-card-key");
// or clear all visible cards
Cardon.clear();
```

## API

Check [here](https://hepter.github.io/cardon/modules) for the API document

## Changelog

### v1.0.3

- Added a new optional prop 'key' to the 'withCardon' method. This key is used to uniquely identify a card for specific operations, such as hiding the card.
- Introduced a new class 'Cardon' with utility methods for managing cards. The Cardon class includes the methods 'clear', which removes all visible cards, and 'hide', which hides a specific card given its unique key.
- Fixed an issue where a component wrapped with withCardon would not display after being modified.
- Resolved an issue where the hide() function for cards was not working.

### v1.0.1
- Minor fixes

### v1.0.0
- Initial release
## License

MIT - Mustafa Kuru

[license-image]: http://img.shields.io/npm/l/cardon.svg
[license-url]: LICENSE
[npm-version-image]: https://img.shields.io/npm/v/cardon.svg
[npm-version-url]: https://www.npmjs.com/package/cardon
