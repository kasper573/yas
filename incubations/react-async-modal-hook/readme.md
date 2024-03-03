# react-async-modal-hook

The declarative nature of React is great for most use cases, but not always.
When working with async UI flows like dialogs, toasts and drawers, it's often
preferable to have a promise based interface, which is what this library provides.

> Heads up: This package does not follow semantic versioning. Changes of all types are released to the patch portion of the version string.

### Features

- Designed for dialogs, toasts and drawers (but not limited to).
- Lightweight with zero runtime dependencies.
- Written in TypeScript with superb generics and inference in mind.

### [Try it on StackBlitz](https://stackblitz.com/edit/react-async-modal-hook)

### Install

    npm install react-async-modal-hook

### Usage

#### 1. Create a compatible react component

Any component that accept `ModalProps` is compatible with the hooks.

```tsx
// Prompt.tsx

import { ReactNode, useState } from "react";
import { ModalProps } from "react-async-modal-hook";

function Prompt({
  open,
  resolve,
  message,
}: ModalProps<string> & { message: ReactNode }) {
  const [input, setInput] = useState("");
  return (
    <dialog open={open}>
      <p>{message}</p>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={() => resolve(input)}>Submit</button>
    </dialog>
  );
}
```

#### 2. Place the outlet at the root of your app

```tsx
// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ModalOutlet } from "react-async-modal-hook";
import { App } from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <ModalOutlet />
  </StrictMode>,
);
```

#### 3. Use the hooks in your app

```tsx
// App.tsx

import { useModal, useModals } from "react-async-modal-hook";
import { Prompt } from "./Prompt";

export function App() {
  const prompt = useModal(Prompt, { message: "Default message" });
  const showModal = useModals();

  async function promptManyTimes() {
    // Will display a prompt dialog containing the message "Default message"
    const promise = prompt();

    // The function returns a promise that resolves when the `resolve` function
    // is called from within the component, and will resolve with the value that was passed.
    // Typescript: The promise resolution type is inferred from the component props type (string in this case).
    const input = await promise;

    // You can override default props by providing specific props per spawn
    await prompt({
      message: `This was your previous input: "${input}"`,
    });

    // Typescript: Since `Prompt` has a custom prop `message` that is required,
    // typescript will enforce that you provide it here, or as a default property in the `useModal` call.
    // However, if it would have been optional, then it would be optional here as well.
    await showModal(Prompt, {
      message:
        "Use can use the inline spawner hook to specify a component later",
    });
  }

  return <button onClick={promptManyTimes}>Start sequence</button>;
}
```

### API reference

See [StackBlitz](#try-it-on-stackblitz) for comprehensive examples of the API.

#### useModal

`useModal` is a hook that requires you to specify a component ahead of time and returns a function that will spawn that component as a modal when called.

- Useful when you want to spawn the same component often.
- Allows you to specify default props ahead of time that when updated will propagate to any number of spawned components.

#### useModals

`useModals` is basically identical to `useModal`, except that you do not specify a component ahead of time.
It returns a function that also spawns a modal when called, but the difference being that you provide the component and its props later instead of ahead of time.

- This is useful when you want to spawn many different components and dont want to plug in the `useModal` hook once per component, or don't know which component to spawn until later.

- Comes with the caveat that you cannot provide default props, which means you cannot update a modals props once it has been spawned. You'd have to close it and then respawn for new props to have any effect.

#### useModalSustainer

A hook that is designed to be used from within a component you spawn with useModal or useModals.
Once used it will prevent the spawned component from being removed from the store, keeping it in the DOM.
This is useful to allow animations to finish before removing the component.
Once you no longer want to sustain the component, call the function returned from the hook.

#### ModalOutlet

A React component that renders the currently spawned components. Using this is recommended, and it's desiged to be placed at the root of your app. But if you want to customize how registered modals are rendered you can create your own outlet by creating a react component that uses the `ModalContext` and `ModalStore`.

Comes with a convenience `map` property that allows you to filter and/or map the currently spawned modals before rendering them. Useful if you want to customize minor things without having to create your own custom outlet, i.e. use multiple outlets with selective contents per outlet.

#### ModalStore

A class that holds the state and actions for the library. It is used internally by the hooks, but can be used manually if you want to extend the library with custom behavior.

#### ModalContext

A React context that holds a reference to the ModalStore instance to use. You must define this for the hooks to work.
