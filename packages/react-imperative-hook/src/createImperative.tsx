import { createContext } from "react";
import { ComponentStore } from "./ComponentStore";
import type { OutletRenderer } from "./ComponentOutlet";
import { ComponentOutlet } from "./ComponentOutlet";
import { createHook } from "./createHook";

export function createImperative(renderer: OutletRenderer) {
  const Context = createContext(new ComponentStore());

  return {
    Context,
    Outlet: () => <ComponentOutlet context={Context} renderer={renderer} />,
    use: createHook(Context),
  };
}
