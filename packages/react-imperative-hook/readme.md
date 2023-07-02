# react-imperative-hook

The declarative nature of React is great for most use cases, but not always.
When working with async UI flows that has resolutions, like modals, toasts, drawers, etc.
you'd much rather want an imperative and promise based interface, which is what this library provides.

### Features

- Designed for modals and toasts, but not limited to.
- Lightweight with zero runtime dependencies.
- Written in TypeScript with proper generics in mind.

### [Try it on CodeSandbox](https://codesandbox.io/p/sandbox/react-imperative-hook-example-4kkvp2)

### Install

    npm install react-imperative-hook

### Usage

#### 1. Define your imperative primitives

Use the [createImperative](#createimperative) factory to define the primitives that you will be using.
The factory is useful to be able to customize rendering, and it allows you to produce multiple instances,
i.e. if you want separate rendering for modals and toasts.

See the [Primitives](#primitives) section for more information on each primitive.

```tsx
// imperative.ts

import {
  createImperative,
  ImperativeComponentProps,
} from "react-imperative-hook";

// The default primitive names are abstract, so it's
// recommended to give them a more concrete name for your use-case.
const {
  Outlet: ModalOutlet,
  Context: ModalContext,
  usePredefinedSpawner: useModal,
  useInlineSpawner: useModals,
} = createImperative();

// For TypeScript users, use this type helper to define a props type
// for components that should be compatible with the imperative hooks.
// T is the type of the value the component resolves with.
export type ModalProps<T = void> = ImperativeComponentProps<T>;
```

#### 2. Create a compatible react component

Any component that accept `ImperativeComponentProps` is compatible with the hooks.

```tsx
// Prompt.tsx

import { ReactNode, useState } from "react";
import { ModalProps } from "./imperative";

function Prompt({
  resolve,
  message,
}: ModalProps<string> & { message: ReactNode }) {
  const [input, setInput] = useState("");
  return (
    <dialog open>
      <p>{message}</p>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={() => resolve(input)}>Submit</button>
    </dialog>
  );
}
```

#### 3. Place the outlet at the root of your app

```tsx
// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ModalOutlet } from "./imperative";
import { App } from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <ModalOutlet />
  </StrictMode>
);
```

#### 4. Use the hooks in your app

```tsx
// App.tsx

import { useModal, useModals } from "./imperative";

export function App() {
  const prompt = useModal(Prompt, { message: "Default message" });
  const showModal = useModals();

  async function promptManyTimes() {
    // Will display a prompt dialog containing the message "Default message"
    const promise = prompt();

    // The function returns a promise that resolves when the `resolve` function
    // is called from within the component, and will resolve with the value that was passed.
    const firstInput = await promise;

    // You can override default props by providing specific props per spawn
    await prompt({
      message: `This was your previous input: "${firstInput}"`,
    });

    await showModal(Prompt, {
      message:
        "Use can use the inline spawner hook to specify a component later",
    });
  }

  return <button onClick={sequence}>Start sequence</button>;
}
```

See [CodeSandbox](#try-it-on-codesandbox) for more examples.

### Primitives

#### Outlet

A React component that renders the currently spawned components.
Allows you to pass in a React component to customize how all spawned components should be rendered in the outlet.

#### ModalContext

A React context that holds the store that contains the currently spawned components.
Has a default store, so usually don't need to use this, but it's exposed in case you need it.

#### usePredefinedSpawner

A hook that takes a component that you specify ahead of time and returns a function that will spawn the given component when called.

- Useful when you want to spawn the same component often.
- Allows you to specify default props ahead of time that when updated will propagate to any spawned components.

#### useInlineSpawner

A hook that just returns a function that will spawn a component when called.
The component is however specified inline when you call the function.

- This is useful when you want to spawn different components, or don't know what component to spawn until later.
- Comes with the caveat that you cannot update default props once the component has been spawned

#### createImperative

Produces the primitives in this list. Allows you to pass in a React component
that will be used as the default renderer passed to the Outlet.

> This is mostly for convenience so that you can define the renderer
> together with the factory and have it become embedded in the Outlet.
