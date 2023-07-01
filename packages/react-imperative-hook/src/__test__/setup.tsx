import type { ComponentType, ReactNode } from "react";
import { render as renderReact } from "@testing-library/react";
import type { InstanceSpawnerFor } from "../createInstanceSpawnerHook";
import type { GeneralHookOptions } from "../constants";
import { createImperative } from "../createImperative";
import { ComponentStore } from "../ComponentStore";
import { Dialog } from "./Dialog";

export type SimpleHookTestFactory = (
  render: (
    Content: ComponentType<{
      spawn: InstanceSpawnerFor<typeof Dialog>;
    }>
  ) => ReturnType<typeof renderReact>
) => void;

export function defineSimpleTestForBothHooks(
  defineTest: SimpleHookTestFactory
) {
  return defineTestForBothHooks((useHook, render) =>
    defineTest((Content) => render(() => <Content spawn={useHook()} />))
  );
}

export type HookTestFactory = (
  useHook: (options?: GeneralHookOptions) => InstanceSpawnerFor<typeof Dialog>,
  render: (Content: ComponentType) => ReturnType<typeof renderReact>
) => void;

export function defineTestForBothHooks(defineTest: HookTestFactory) {
  const { imp, render } = setupImperative();

  test("useInstanceSpawner", () =>
    defineTest(
      (options) => imp.useInstanceSpawner(Dialog, {}, options),
      render
    ));

  test("useComponentSpawner", () =>
    defineTest((options) => {
      const spawnModal = imp.useComponentSpawner(options);
      return (props) => spawnModal(Dialog, props);
    }, render));
}

export function setupImperative() {
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
