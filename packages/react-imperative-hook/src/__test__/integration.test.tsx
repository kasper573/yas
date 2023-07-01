import type { ComponentType, ReactNode } from "react";
import {
  screen,
  within,
  render,
  fireEvent as userEvent,
  act,
} from "@testing-library/react";
import { useState } from "react";
import { createImperative } from "../createImperative";
import type { ImperativeComponentProps, InstanceSpawnerFor } from "../index";
import { ComponentStore } from "../index";
import { deferPromise } from "../deferPromise";

describe("can display", () => {
  test("predefined dialog with built-in message", async () => {
    setup(() => {
      const alert = useModal(Dialog);
      return <button onClick={() => alert()}>Open dialog</button>;
    });
    userEvent.click(screen.getByText("Open dialog"));
    const dialog = await screen.findByRole("dialog");
    await within(dialog).findByText("Built-in message");
  });

  test("predefined dialog with default message", async () => {
    setup(() => {
      const alert = useModal(Dialog, { message: "Default message" });
      return <button onClick={() => alert()}>Open dialog</button>;
    });
    userEvent.click(screen.getByText("Open dialog"));
    const dialog = await screen.findByRole("dialog");
    await within(dialog).findByText("Default message");
  });

  test("predefined dialog with custom message", async () => {
    setup(() => {
      const alert = useModal(Dialog, { message: "Default message" });
      return (
        <button onClick={() => alert({ message: "Custom message" })}>
          Open dialog
        </button>
      );
    });
    userEvent.click(screen.getByText("Open dialog"));
    const dialog = await screen.findByRole("dialog");
    await within(dialog).findByText("Custom message");
  });

  test("updates of default props of a predefined dialog", async () => {
    setup(() => {
      const [message, setMessage] = useState("Default message");
      const alert = useModal(Dialog, { message });
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

  test("inline dialog with built-in message", async () => {
    setup(() => {
      const showModal = useModals();
      return <button onClick={() => showModal(Dialog)}>Open dialog</button>;
    });
    userEvent.click(screen.getByText("Open dialog"));
    const dialog = await screen.findByRole("dialog");
    await within(dialog).findByText("Built-in message");
  });

  test("inline dialog with custom message", async () => {
    setup(() => {
      const showModal = useModals();
      return (
        <button
          onClick={() => showModal(Dialog, { message: "Custom message" })}
        >
          Open dialog
        </button>
      );
    });
    userEvent.click(screen.getByText("Open dialog"));
    const dialog = await screen.findByRole("dialog");
    await within(dialog).findByText("Custom message");
  });
});

it("persists dialog after source component unmounts by default", async () => {
  function Source() {
    const alert = useModal(Dialog);
    return <button onClick={() => alert()}>Open dialog</button>;
  }
  setup(() => {
    const [visible, setVisible] = useState(true);
    return (
      <>
        {visible && <Source />}
        <button onClick={() => setVisible(false)}>Unmount</button>
      </>
    );
  });
  userEvent.click(screen.getByText("Open dialog"));
  userEvent.click(screen.getByText("Unmount"));
  await screen.findByRole("dialog");
});

it("can opt-in to remove dialog when source component unmounts", async () => {
  function Source() {
    const alert = useModal(Dialog, {}, { removeOnUnmount: true });
    return <button onClick={() => alert()}>Open dialog</button>;
  }
  setup(() => {
    const [visible, setVisible] = useState(true);
    return (
      <>
        {visible && <Source />}
        <button onClick={() => setVisible(false)}>Unmount</button>
      </>
    );
  });
  userEvent.click(screen.getByText("Open dialog"));
  userEvent.click(screen.getByText("Unmount"));
  expect(screen.queryByRole("dialog")).toBeNull();
});

describe("can resolve instance", () => {
  it("immediately", () => {
    setup(() => {
      const alert = useModal(Dialog);
      return <button onClick={() => alert()}>Open dialog</button>;
    });
    userEvent.click(screen.getByText("Open dialog"));
    userEvent.click(screen.getByRole("button", { name: "OK" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("delayed", async () => {
    const delay = deferPromise();
    setup(() => {
      const alert = useModal(Dialog, { removeDelay: delay.promise });
      return <button onClick={() => alert()}>Open dialog</button>;
    });
    userEvent.click(screen.getByText("Open dialog"));
    userEvent.click(screen.getByRole("button", { name: "OK" }));
    expect(screen.queryByRole("dialog")).not.toBeNull();
    await act(async () => {
      delay.resolve();
      await delay.promise;
    });
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("with value", async () => {
    let promise: Promise<unknown> | undefined;
    setup(() => {
      const alert = useModal(Dialog, { resolution: "foo" });
      return <button onClick={() => (promise = alert())}>Open dialog</button>;
    });
    userEvent.click(screen.getByText("Open dialog"));
    userEvent.click(screen.getByRole("button", { name: "OK" }));
    const value = await promise;
    expect(value).toBe("foo");
  });

  describe("when there are multiple instances", () => {
    testsForBothHooks(async (setup) => {
      setup(({ spawn }) => (
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
    });
  });
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

function testsForBothHooks(
  createTest: (
    setup: (
      Content: ComponentType<{
        spawn: InstanceSpawnerFor<typeof Dialog>;
      }>
    ) => ReturnType<typeof render>
  ) => void
) {
  test("useModal", () =>
    createTest((Content) =>
      setup(() => {
        const spawn = useModal(Dialog);
        return <Content spawn={spawn} />;
      })
    ));

  test("useModals", () =>
    createTest((Content) =>
      setup(() => {
        const spawnModal = useModals();
        return <Content spawn={(props) => spawnModal(Dialog, props)} />;
      })
    ));
}

function setup(Content: ComponentType) {
  const store = new ComponentStore();
  function Wrapper({ children }: { children?: ReactNode }) {
    return (
      <ModalContext.Provider value={store}>
        {children}
        <ModalOutlet />
      </ModalContext.Provider>
    );
  }
  return render(<Content />, { wrapper: Wrapper });
}

const {
  useInstanceSpawner: useModal,
  useComponentSpawner: useModals,
  Context: ModalContext,
  Outlet: ModalOutlet,
} = createImperative();

type ModalProps<Output = void> = ImperativeComponentProps<Output>;
