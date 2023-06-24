import { createContext } from "react";
import { ComponentStore } from "./ComponentStore";
import type { OutletRenderer } from "./ComponentOutlet";
import { ComponentOutlet } from "./ComponentOutlet";
import { createInstanceSpawnerHook } from "./createInstanceSpawnerHook";
import { createComponentSpawnerHook } from "./createComponentSpawnerHook";

export function createImperative(renderer: OutletRenderer) {
  const Context = createContext(new ComponentStore());

  return {
    Context,
    Outlet: () => <ComponentOutlet context={Context} renderer={renderer} />,
    useInstanceSpawner: createInstanceSpawnerHook(Context),
    useComponentSpawner: createComponentSpawnerHook(Context),
  };
}
