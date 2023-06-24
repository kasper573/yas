import { createContext } from "react";
import { ComponentStore } from "./ComponentStore";
import type { OutletRenderer } from "./ComponentOutlet";
import { ComponentOutlet } from "./ComponentOutlet";
import { createInstanceSpawnerHook } from "./createInstanceSpawnerHook";
import { createComponentSpawnerHook } from "./createComponentSpawnerHook";

export function createImperative(renderer?: OutletRenderer) {
  const context = createContext(new ComponentStore());

  return {
    Outlet: () => <ComponentOutlet context={context} renderer={renderer} />,
    context,
    useInstanceSpawner: createInstanceSpawnerHook(context),
    useComponentSpawner: createComponentSpawnerHook(context),
  };
}
