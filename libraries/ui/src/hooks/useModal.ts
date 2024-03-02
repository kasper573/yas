import { createImperative } from "react-async-modal-hook";

export const {
  useSpawnSustainer: useModalSustainer,
  usePredefinedSpawner: useModal,
  useInlineSpawner: useModals,
  Context: ModalContext,
  Outlet: ModalOutlet,
  Store: ModalStore,
} = createImperative();
