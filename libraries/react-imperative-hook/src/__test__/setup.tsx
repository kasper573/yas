import type { ComponentType, ReactNode } from "react";
import { render as renderReact } from "@yas/test/vitest/react";
import { useMemo } from "react";
import type { InstanceSpawnerFor } from "../createPredefinedSpawnerHook";
import type { GeneralHookOptions } from "../constants";
import { createImperative } from "../createImperative";
import { ComponentStore } from "../ComponentStore";
import type { AnyComponent } from "../utilityTypes";

export type AbstractHookTestFactory<T extends AnyComponent> = (
  useHook: (options?: GeneralHookOptions) => InstanceSpawnerFor<T>,
  render: (Content: ComponentType) => ReturnType<typeof renderReact>,
) => void;

export function defineAbstractHookTest<T extends AnyComponent>(
  component: T,
  defineTest: AbstractHookTestFactory<T>,
  { imp, render } = setupImperative(),
) {
  test("usePredefinedSpawner", () =>
    defineTest(
      (options) => imp.usePredefinedSpawner(component, {}, options),
      render,
    ));

  test("useInlineSpawner", () =>
    defineTest((options) => {
      const spawnModal = imp.useInlineSpawner(options);
      return (props) => {
        // @ts-expect-error lazy avoidance of having to specify the correct generic argument for test convenience. It's okay to pass in empty object.
        return spawnModal(component, props);
      };
    }, render));
}

export function setupImperative(createStore = () => new ComponentStore()) {
  const imp = createImperative();
  function render(Content: ComponentType) {
    function Wrapper({ children }: { children?: ReactNode }) {
      const store = useMemo(createStore, []);
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