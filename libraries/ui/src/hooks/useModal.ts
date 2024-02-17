import { createImperative } from "react-imperative-hook";

export const {
  useSpawnSustainer: useModalSustainer,
  usePredefinedSpawner: useModal,
  useInlineSpawner: useModals,
  Context: ModalContext,
  Outlet: ModalOutlet,
  Store: ModalStore,
} = createImperative();
