import type { ComponentType, ReactNode } from "react";
import {
  screen,
  within,
  render as renderReact,
  fireEvent as userEvent,
  act,
} from "@testing-library/react";
import { useState } from "react";
import { createImperative } from "../createImperative";
import type { ImperativeComponentProps, InstanceSpawnerFor } from "../index";
import { ComponentStore } from "../index";
import { deferPromise } from "../deferPromise";

describe("can display", () => {
  describe("built-in message", () =>
    testsForBothHooks(async (render) => {
      render(({ spawn }) => (
        <button onClick={() => spawn()}>Open dialog</button>
      ));
      userEvent.click(screen.getByText("Open dialog"));
      const dialog = await screen.findByRole("dialog");
      await within(dialog).findByText("Built-in message");
    }));

  describe("custom message", () =>
    testsForBothHooks(async (render) => {
      render(({ spawn }) => (
        <button onClick={() => spawn({ message: "Custom message" })}>
          Open dialog
        </button>
      ));
      userEvent.click(screen.getByText("Open dialog"));
      const dialog = await screen.findByRole("dialog");
      await within(dialog).findByText("Custom message");
    }));

  test("predefined dialog with default message", async () => {
    const { render, imp } = setupImperative();
    render(() => {
      const alert = imp.useInstanceSpawner(Dialog, {
        message: "Default message",
      });
      return <button onClick={() => alert()}>Open dialog</button>;
    });
    userEvent.click(screen.getByText("Open dialog"));
    const dialog = await screen.findByRole("dialog");
    await within(dialog).findByText("Default message");
  });

  test("updates of default props of a predefined dialog", async () => {
    const { render, imp } = setupImperative();
    render(() => {
      const [message, setMessage] = useState("Default message");
      const alert = imp.useInstanceSpawner(Dialog, { message });
      return (
        <>
          <button onClick={() => alert()}>Open dialog</button>
          <button onClick={() => setMessage("Custom message")}>
            Update message
          </button>
        </>
      );
    });
    userEvent.click(screen.getByText("Open dialog"));
    userEvent.click(screen.getByText("Update message"));
    await screen.findByText("Custom message");
  });
});

describe("removeOnUnmount", () => {
  const defineUnmountTestCase =
    (hookOptions?: HookOptions): HookTestFactory =>
    (render) => {
      render(({ spawn }) => {
        function Source() {
          return <button onClick={() => spawn()}>Open dialog</button>;
        }

        const [visible, setVisible] = useState(true);
        return (
          <>
            {visible && <Source />}
            <button onClick={() => setVisible(false)}>Unmount</button>
          </>
        );
      }, hookOptions);
      userEvent.click(screen.getByText("Open dialog"));
      userEvent.click(screen.getByText("Unmount"));
    };

  describe("is disabled by default", () =>
    testsForBothHooks(async (render) => {
      defineUnmountTestCase()(render);
      await screen.findByRole("dialog");
    }));

  describe("can be opt-in enabled", () =>
    testsForBothHooks(async (render) => {
      defineUnmountTestCase({ removeOnUnmount: true })(render);
      expect(screen.queryByRole("dialog")).toBeNull();
    }));
});

describe("can resolve instance", () => {
  describe("immediately", () =>
    testsForBothHooks(async (render) => {
      render(({ spawn }) => (
        <button onClick={() => spawn()}>Open dialog</button>
      ));
      userEvent.click(screen.getByText("Open dialog"));
      userEvent.click(screen.getByRole("button", { name: "OK" }));
      expect(screen.queryByRole("dialog")).toBeNull();
    }));

  describe("delayed", () =>
    testsForBothHooks(async (render) => {
      const delay = deferPromise();
      render(({ spawn }) => (
        <button onClick={() => spawn({ removeDelay: delay.promise })}>
          Open dialog
        </button>
      ));
      userEvent.click(screen.getByText("Open dialog"));
      userEvent.click(screen.getByRole("button", { name: "OK" }));
      expect(screen.queryByRole("dialog")).not.toBeNull();
      await act(async () => {
        delay.resolve();
        await delay.promise;
      });
      expect(screen.queryByRole("dialog")).toBeNull();
    }));

  describe("with value", () =>
    testsForBothHooks(async (render) => {
      let promise: Promise<unknown> | undefined;
      render(({ spawn }) => {
        return (
          <button onClick={() => (promise = spawn({ resolution: "foo" }))}>
            Open dialog
          </button>
        );
      });
      userEvent.click(screen.getByText("Open dialog"));
      userEvent.click(screen.getByRole("button", { name: "OK" }));
      const value = await promise;
      expect(value).toBe("foo");
    }));

  describe("when there are multiple instances", () =>
    testsForBothHooks(async (render) => {
      render(({ spawn }) => (
        <>
          <button onClick={() => spawn({ name: "foo" })}>Spawn foo</button>
          <button onClick={() => spawn({ name: "bar" })}>Spawn bar</button>
        </>
      ));
      userEvent.click(screen.getByText("Spawn foo"));
      userEvent.click(screen.getByText("Spawn bar"));
      const fooDialog = await screen.findByRole("dialog", { name: "foo" });
      userEvent.click(within(fooDialog).getByRole("button", { name: "OK" }));
      const remainingDialog = await screen.findByRole("dialog");
      expect(remainingDialog.getAttribute("aria-label")).toBe("bar");
    }));
});

function Dialog({
  state,
  message = "Built-in message",
  name,
  resolve,
  resolution,
  removeDelay,
}: ModalProps<unknown> & {
  message?: ReactNode;
  name?: string;
  resolution?: unknown;
  removeDelay?: Promise<unknown>;
}) {
  return (
    <div role="dialog" aria-label={name} className={state.type}>
      <p>{message}</p>
      <button onClick={() => resolve(resolution, removeDelay)}>OK</button>
    </div>
  );
}

type HookOptions = { removeOnUnmount?: boolean };
type HookTestFactory = (
  render: (
    Content: ComponentType<{
      spawn: InstanceSpawnerFor<typeof Dialog>;
    }>,
    hookOptions?: HookOptions
  ) => ReturnType<typeof renderReact>
) => void;

function testsForBothHooks(createTest: HookTestFactory) {
  const { imp, render } = setupImperative();

  test("useInstanceSpawner", () =>
    createTest((Content, hookOptions) =>
      render(() => (
        <Content spawn={imp.useInstanceSpawner(Dialog, {}, hookOptions)} />
      ))
    ));

  test("useComponentSpawner", () =>
    createTest((Content, hookOptions) =>
      render(() => {
        const spawnModal = imp.useComponentSpawner(hookOptions);
        return <Content spawn={(props) => spawnModal(Dialog, props)} />;
      })
    ));
}

function setupImperative() {
  const imp = createImperative();

  function render(Content: ComponentType) {
    const store = new ComponentStore();
    function Wrapper({ children }: { children?: ReactNode }) {
      return (
        <imp.Context.Provider value={store}>
          {children}
          <imp.Outlet />
        </imp.Context.Provider>
      );
    }
    return renderReact(<Content />, { wrapper: Wrapper });
  }

  return { imp, render };
}

type ModalProps<Output = void> = ImperativeComponentProps<Output>;
