import type { ComponentType, ReactNode } from "react";
import { render as renderReact } from "@testing-library/react";
import type { InstanceSpawnerFor } from "../createInstanceSpawnerHook";
import type { GeneralHookOptions } from "../constants";
import { createImperative } from "../createImperative";
import { ComponentStore } from "../ComponentStore";
import type { AnyComponent } from "../utilityTypes";

export type SimpleHookTestFactory<T extends AnyComponent> = (
  render: (
    Content: ComponentType<{
      spawn: InstanceSpawnerFor<T>;
    }>
  ) => ReturnType<typeof renderReact>
) => void;

export function defineSimpleTestForBothHooks<T extends AnyComponent>(
  component: T,
  defineTest: SimpleHookTestFactory<T>
) {
  return defineTestForBothHooks(component, (useHook, render) =>
    defineTest((Content) => render(() => <Content spawn={useHook()} />))
  );
}

export type HookTestFactory<T extends AnyComponent> = (
  useHook: (options?: GeneralHookOptions) => InstanceSpawnerFor<T>,
  render: (Content: ComponentType) => ReturnType<typeof renderReact>
) => void;

export function defineTestForBothHooks<T extends AnyComponent>(
  component: T,
  defineTest: HookTestFactory<T>
) {
  const { imp, render } = setupImperative();

  test("useInstanceSpawner", () =>
    defineTest(
      (options) => imp.useInstanceSpawner(component, {}, options),
      render
    ));

  test("useComponentSpawner", () =>
    defineTest((options) => {
      const spawnModal = imp.useComponentSpawner(options);
      return (props) => spawnModal(component, props as never);
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
