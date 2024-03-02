import { createImperative } from "./createImperative";

export type * from "./ComponentOutlet";
export type * from "./ComponentStore";
export type * from "./constants";
export type * from "./createInlineSpawnerHook";
export type * from "./createPredefinedSpawnerHook";
export type * from "./createSpawnSustainerHook";
export type * from "./deferPromise";

export const {
  Outlet: ModalOutlet,
  Context: ModalContext,
  useInlineSpawner: useModals,
  usePredefinedSpawner: useModal,
  useSpawnSustainer: useModalSustainer,
  Store: ModalStore,
} = createImperative();
