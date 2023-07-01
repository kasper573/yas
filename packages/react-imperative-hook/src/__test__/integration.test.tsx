import type { ReactNode } from "react";
import { useState } from "react";
import {
  act,
  fireEvent as userEvent,
  screen,
  within,
} from "@testing-library/react";
import { deferPromise } from "../deferPromise";
import type { GeneralHookOptions } from "../constants";
import type { ImperativeComponentProps } from "../ComponentStore";
import type { AnyComponent } from "../utilityTypes";
import type { HookTestFactory } from "./setup";
import {
  setupImperative,
  defineSimpleTestForBothHooks,
  defineTestForBothHooks,
} from "./setup";

describe("can display", () => {
  describe("built-in message", () =>
    defineSimpleTestForBothHooks(Dialog, async (render) => {
      render(({ spawn }) => (
        <button onClick={() => spawn()}>Open dialog</button>
      ));
      userEvent.click(screen.getByText("Open dialog"));
      const dialog = await screen.findByRole("dialog");
      await within(dialog).findByText("Built-in message");
    }));

  describe("custom message", () =>
    defineSimpleTestForBothHooks(Dialog, async (render) => {
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
  const setupUnmountTest = <T extends AnyComponent>(
    useHook: Parameters<HookTestFactory<T>>[0],
    render: Parameters<HookTestFactory<T>>[1],
    hookOptions?: GeneralHookOptions
  ) => {
    function Source() {
      const spawn = useHook(hookOptions);
      return <button onClick={() => spawn({} as never)}>Open dialog</button>;
    }
    render(() => {
      const [visible, setVisible] = useState(true);
      return (
        <>
          {visible ? <Source /> : undefined}
          <button onClick={() => setVisible(false)}>Unmount</button>
        </>
      );
    });
    userEvent.click(screen.getByText("Open dialog"));
    userEvent.click(screen.getByText("Unmount"));
  };

  describe("is disabled by default", () =>
    defineTestForBothHooks(Dialog, async (useHook, render) => {
      setupUnmountTest(useHook, render);
      await screen.findByRole("dialog");
    }));

  describe("can be opt-in enabled", () =>
    defineTestForBothHooks(Dialog, async (useHook, render) => {
      setupUnmountTest(useHook, render, { removeOnUnmount: true });
      expect(screen.queryByRole("dialog")).toBeNull();
    }));
});

describe("can resolve instance", () => {
  describe("immediately", () =>
    defineSimpleTestForBothHooks(Dialog, async (render) => {
      render(({ spawn }) => (
        <button onClick={() => spawn()}>Open dialog</button>
      ));
      userEvent.click(screen.getByText("Open dialog"));
      userEvent.click(screen.getByRole("button", { name: "OK" }));
      expect(screen.queryByRole("dialog")).toBeNull();
    }));

  describe("delayed", () =>
    defineSimpleTestForBothHooks(Dialog, async (render) => {
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
    defineSimpleTestForBothHooks(Dialog, async (render) => {
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
    defineSimpleTestForBothHooks(Dialog, async (render) => {
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

type ModalProps<Output = void> = ImperativeComponentProps<Output>;
