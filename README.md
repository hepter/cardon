![cardon](docs/cardon.png)

[![Npm Version][npm-version-image]][npm-version-url] [![License][license-image]][license-url]

## About

Create reusable asynchronous functional cards.

Allows to create the cards used on the pages once and allows them to be called as an async function on all screens.



## Demo

[![Edit Example Usage - cardon](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/example-usage-cardon-u60wc?fontsize=14&hidenavigation=1&theme=dark)

## Installation

Install cardon as a dependency
```shell
# Yarn
$ yarn add cardon

# NPM
$ npm install cardon
```

## Usage

You only need the `'CardonContainer'` and `'withCardon'` methods to use the it.

### `CardonContainer`
Creates an instance for the cards and all cards are displayed inside here.

### `withCardon`
Wraps the component you want to show as a card and injects properties named `'visible'` and `'get'` inside it and then returns an interface to use it.
```ts
{
  visible:(args?: any) => Promise<any>,
  get: (returnValue?:any) => Function
}
```

Every card returns two functions named `'show'` and `'hide'` when called it
```ts
{
  show:(args?: any) => Promise<any>,
  hide:() => void
}
```

####  `get:`  
The prop is a callback generator function and all callback function must be created by calling the `'get'` function to return the desired callback value. Only created callback functions via `'get'` should be used in cards to works properly.
####  `visible:`
The prop indicates whether the card should be visible or not. This value will change according to the call of the `'show'` or `'hide'` function

####  `show:`
The function to be called to show the card. It returns a promise with the data and waits until the card is closed or can be used the callback function with the second parameter. The card will be hidden automatically after the result return it.

####  `hide:`
Allows the card to be canceled and hidden without waiting for data to return. It does not need to be used generally, but can be used according to the situation.

## Example
There are few simple steps to use:

- Put the `CardonContainer` component to the root file

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

- Create a folder named `'cardon'` or any name and after put your cards there.

- Wrap the component you want to use as a card like below 


Example reusable card:
```jsx
// ./cardon/MyModalCard.js
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

Or with Typescript:
```tsx
// ./cardon/MyModalCard.js
import { withCardon } from "cardon";
import React from "react";

interface Props {
    title: string 
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
export default withCardon<Props, boolean>(MyModalCard)

```


Alternative card usage with `'destroyOnHide'` options:
(It is required to destroy the card if the card is not using the `'visible'` prop)
```jsx
// ./cardon/MyModalCard.js
import React from "react";
import { withCardon } from "cardon";

function MyModalCard({ visible, get, title }) {
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


- Import the component and call the '`show`' function to show it, pass props as optional to card and get the result asynchronously

Example call:
```jsx
 let result = await MyModalCard.show({ title: "Awesome" });
```


Example usage:
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
  

## API

Check [here](https://hepter.github.io/cardon/modules) for the API document

## License

MIT - Mustafa Kuru

[license-image]: http://img.shields.io/npm/l/cardon.svg
[license-url]: LICENSE
[npm-version-image]: https://img.shields.io/npm/v/cardon.svg
[npm-version-url]: https://www.npmjs.com/package/cardon
