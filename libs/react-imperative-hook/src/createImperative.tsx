import { createContext } from "react";
import { ComponentStore } from "./ComponentStore";
import { ComponentOutlet } from "./ComponentOutlet";
import { createPredefinedSpawnerHook } from "./createPredefinedSpawnerHook";
import { createInlineSpawnerHook } from "./createInlineSpawnerHook";
import { createSpawnSustainerHook } from "./createSpawnSustainerHook";
import { DefaultOutletRenderer } from "./DefaultOutletRenderer";

export function createImperative(renderer = DefaultOutletRenderer) {
  const Context = createContext(new ComponentStore());

  return {
    Outlet: () => <ComponentOutlet context={Context} renderer={renderer} />,
    Context,
    usePredefinedSpawner: createPredefinedSpawnerHook(Context),
    useInlineSpawner: createInlineSpawnerHook(Context),
    useSpawnSustainer: createSpawnSustainerHook(Context),
  };
}
