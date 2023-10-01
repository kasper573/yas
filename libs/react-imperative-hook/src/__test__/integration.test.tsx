import type { ComponentProps, ReactNode } from "react";
import { useState } from "react";
import {
  act,
  fireEvent as userEvent,
  screen,
  within,
} from "@testing-library/react";
import type { Deferred } from "../deferPromise";
import type { GeneralHookOptions } from "../constants";
import type { ImperativeComponentProps } from "../ComponentStore";
import type { AnyComponent } from "../utilityTypes";
import { ComponentStore } from "../ComponentStore";
import type { AbstractHookTestFactory } from "./setup";
import { setupImperative, defineAbstractHookTest } from "./setup";

describe("can display", () => {
  describe("built-in message", () =>
    defineAbstractHookTest(Dialog, async (useHook, render) => {
      render(() => {
        const spawn = useHook();
        return <button onClick={() => spawn()}>Open dialog</button>;
      });
      userEvent.click(screen.getByText("Open dialog"));
      const dialog = await screen.findByRole("dialog");
      await within(dialog).findByText("Built-in message");
    }));

  describe("custom message", () =>
    defineAbstractHookTest(Dialog, async (useHook, render) => {
      render(() => {
        const spawn = useHook();
        return (
          <button onClick={() => spawn({ message: "Custom message" })}>
            Open dialog
          </button>
        );
      });
      userEvent.click(screen.getByText("Open dialog"));
      const dialog = await screen.findByRole("dialog");
      await within(dialog).findByText("Custom message");
    }));

  test("predefined dialog with default message", async () => {
    const { render, imp } = setupImperative();
    render(() => {
      const alert = imp.usePredefinedSpawner(Dialog, {
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
      const alert = imp.usePredefinedSpawner(Dialog, { message });
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

  describe("multiple in sequence", () =>
    defineAbstractHookTest(Dialog, async (useHook, render) => {
      let name: string;
      render(() => {
        const spawn = useHook();
        return <button onClick={() => spawn({ name })}>Open dialog</button>;
      });

      async function openAndResolveDialog(newName: string) {
        name = newName;
        userEvent.click(screen.getByText("Open dialog"));
        const dialog = await screen.findByRole("dialog", { name });
        userEvent.click(within(dialog).getByRole("button", { name: "OK" }));
      }

      await openAndResolveDialog("first");
      await openAndResolveDialog("second");
    }));
});

test("can spawn an instance temporarily for a removed component", async () => {
  const store = new ComponentStore();
  const { render, imp } = setupImperative(() => store);

  let spawn: () => void;
  function Source() {
    spawn = imp.usePredefinedSpawner(Dialog, {}, { removeOnUnmount: true });
    return <button onClick={() => spawn()}>Spawn</button>;
  }

  render(() => {
    const [mounted, setMounted] = useState(true);
    return (
      <>
        {mounted ? <Source /> : undefined}
        <button onClick={() => setMounted(false)}>Unmount</button>
      </>
    );
  });

  userEvent.click(screen.getByText("Unmount"));

  act(() => {
    spawn();
  });
  const dialog = await screen.findByRole("dialog");

  userEvent.click(within(dialog).getByRole("button", { name: "OK" }));
  expect(store.state).toEqual({});
});

describe("removeOnUnmount", () => {
  const setupUnmountTest = <T extends AnyComponent>(
    useHook: Parameters<AbstractHookTestFactory<T>>[0],
    render: Parameters<AbstractHookTestFactory<T>>[1],
    hookOptions?: GeneralHookOptions,
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
    defineAbstractHookTest(Dialog, async (useHook, render) => {
      setupUnmountTest(useHook, render);
      await screen.findByRole("dialog");
    }));

  describe("can be opt-in enabled", () =>
    defineAbstractHookTest(Dialog, async (useHook, render) => {
      setupUnmountTest(useHook, render, { removeOnUnmount: true });
      expect(screen.queryByRole("dialog")).toBeNull();
    }));
});

describe("can resolve instance", () => {
  describe("immediately", () =>
    defineAbstractHookTest(Dialog, async (useHook, render) => {
      render(() => {
        const spawn = useHook();
        return <button onClick={() => spawn()}>Open dialog</button>;
      });
      userEvent.click(screen.getByText("Open dialog"));
      userEvent.click(screen.getByRole("button", { name: "OK" }));
      expect(screen.queryByRole("dialog")).toBeNull();
    }));

  describe("delayed", () => {
    const { imp, render } = setupImperative();
    let releaseSustain: Deferred<void>;
    function DialogWithDelay(props: ComponentProps<typeof Dialog>) {
      releaseSustain = imp.useSpawnSustainer(props);
      return <Dialog {...props} />;
    }
    defineAbstractHookTest(
      DialogWithDelay,
      async (useHook, render) => {
        render(() => {
          const spawn = useHook();
          return <button onClick={() => spawn()}>Open dialog</button>;
        });
        userEvent.click(screen.getByText("Open dialog"));
        userEvent.click(screen.getByRole("button", { name: "OK" }));
        expect(screen.queryByRole("dialog")).not.toBeNull();
        await act(async () => {
          releaseSustain();
          await releaseSustain.promise;
        });
        expect(screen.queryByRole("dialog")).toBeNull();
      },
      { imp, render },
    );
  });

  describe("with value", () =>
    defineAbstractHookTest(Dialog, async (useHook, render) => {
      let promise: Promise<unknown> | undefined;
      render(() => {
        const spawn = useHook();
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

  describe("and select the correct one when there are multiple instances", () =>
    defineAbstractHookTest(Dialog, async (useHook, render) => {
      render(() => {
        const spawn = useHook();
        return (
          <>
            <button onClick={() => spawn({ name: "foo" })}>Spawn foo</button>
            <button onClick={() => spawn({ name: "bar" })}>Spawn bar</button>
          </>
        );
      });
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
}: ModalProps<unknown> & {
  message?: ReactNode;
  name?: string;
  resolution?: unknown;
}) {
  return (
    <div role="dialog" aria-label={name} className={state.type}>
      <p>{message}</p>
      <button onClick={() => resolve(resolution)}>OK</button>
    </div>
  );
}

type ModalProps<Output = void> = ImperativeComponentProps<Output>;
