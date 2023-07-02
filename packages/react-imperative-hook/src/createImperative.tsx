import { createContext } from "react";
import { ComponentStore } from "./ComponentStore";
import type { OutletRenderer } from "./ComponentOutlet";
import { ComponentOutlet } from "./ComponentOutlet";
import { createPredefinedSpawnerHook } from "./createPredefinedSpawnerHook";
import { createInlineSpawnerHook } from "./createInlineSpawnerHook";
import { createSpawnSustainerHook } from "./createSpawnSustainerHook";

export function createImperative(renderer?: OutletRenderer) {
  const Context = createContext(new ComponentStore());

  return {
    Outlet: () => <ComponentOutlet context={Context} renderer={renderer} />,
    Context,
    usePredefinedSpawner: createPredefinedSpawnerHook(Context),
    useInlineSpawner: createInlineSpawnerHook(Context),
    useSpawnSustainer: createSpawnSustainerHook(Context),
  };
}
