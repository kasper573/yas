import type { ComponentProps, ReactNode } from "react";
import { useState } from "react";
import {
  act,
  fireEvent as userEvent,
  screen,
  within,
  describe,
  test,
  expect,
} from "@yas/test/vitest/react";
import type { Deferred } from "../src/deferPromise";
import type { GeneralHookOptions } from "../src/constants";
import type { ModalProps } from "../src/index";
import type { AnyComponent } from "../src/utilityTypes";
import { ModalStore } from "../src/index";
import type { AbstractHookTestFactory } from "./setup";
import { createTestAPI, defineAbstractHookTest } from "./setup";

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
    const api = createTestAPI();
    api.render(() => {
      const alert = api.useModal(Dialog, {
        message: "Default message",
      });
      return <button onClick={() => alert()}>Open dialog</button>;
    });
    userEvent.click(screen.getByText("Open dialog"));
    const dialog = await screen.findByRole("dialog");
    await within(dialog).findByText("Default message");
  });

  test("updates of default props of a predefined dialog", async () => {
    const api = createTestAPI();
    api.render(() => {
      const [message, setMessage] = useState("Default message");
      const alert = api.useModal(Dialog, { message });
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

describe("can filter using ModalOutlet", () =>
  defineAbstractHookTest(
    Dialog,
    async (useHook, render) => {
      let name: string;
      render(() => {
        const spawn = useHook();
        return <button onClick={() => spawn({ name })}>Open dialog</button>;
      });

      async function openDialog(newName: string) {
        name = newName;
        userEvent.click(screen.getByText("Open dialog"));
      }

      await openDialog("first");
      await openDialog("second");

      expect(screen.queryAllByRole("dialog").length).toBe(1);
      const dialog = await screen.findByRole("dialog", { name: "second" });
      userEvent.click(within(dialog).getByRole("button", { name: "OK" }));
    },
    createTestAPI(
      () => new ModalStore(),
      (elements) =>
        elements.filter(
          (el) => (el.props as unknown as { name: string }).name === "second",
        ),
    ),
  ));

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

test("can spawn an instance temporarily for a removed component", async () => {
  const store = new ModalStore();
  const api = createTestAPI(() => store);

  let spawn: () => void;
  function Source() {
    spawn = api.useModal(Dialog, {}, { removeOnUnmount: true });
    return <button onClick={() => spawn()}>Spawn</button>;
  }

  api.render(() => {
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

describe("can open dialog, close it, and then unmount", () => {
  const api = createTestAPI();
  return defineAbstractHookTest(
    Dialog,
    async (useHook, render) => {
      render(App);

      userEvent.click(screen.getByText("Open dialog"));
      userEvent.click(screen.getByRole("button", { name: "OK" }));
      expect(screen.queryByRole("dialog")).toBeNull();
      userEvent.click(screen.getByText("Go to page 2"));
      await screen.findByText("This is page 2");

      function App() {
        const [page, setPage] = useState(1);
        return page === 1 ? <Page1 gotoPage2={() => setPage(2)} /> : <Page2 />;
      }

      function Page1({ gotoPage2 }: { gotoPage2: () => void }) {
        const spawn = useHook();
        return (
          <>
            <button onClick={() => spawn()}>Open dialog</button>
            <button onClick={gotoPage2}>Go to page 2</button>
          </>
        );
      }

      function Page2() {
        return <p>This is page 2</p>;
      }
    },
    api,
  );
});

describe("removeOnUnmount", () => {
  const setupUnmountTest = <T extends AnyComponent>(
    useHook: Parameters<AbstractHookTestFactory<T>>[0],
    render: Parameters<AbstractHookTestFactory<T>>[1],
    hookOptions?: GeneralHookOptions,
  ) => {
    function Source() {
      const spawn = useHook(hookOptions);

      return (
        <button
          onClick={() => {
            // @ts-expect-error lazy avoidance of having to specify the correct generic argument for test convenience. It's okay to pass in empty object.
            spawn({});
          }}
        >
          Open dialog
        </button>
      );
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
    const api = createTestAPI();
    let releaseSustain: Deferred<void>;
    function DialogWithDelay(props: ComponentProps<typeof Dialog>) {
      releaseSustain = api.useModalSustainer(props);
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
      api,
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
  open,
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
    <div
      role="dialog"
      aria-label={name}
      className={open ? "resolved" : "pending"}
    >
      <p>{message}</p>
      <button onClick={() => resolve(resolution)}>OK</button>
    </div>
  );
}
