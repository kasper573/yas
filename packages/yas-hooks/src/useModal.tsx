import type { ImperativeComponentProps } from "react-imperative-hook";
import { createImperative } from "react-imperative-hook";

export const {
  useInstanceSpawner: useModal,
  useComponentSpawner: useModals,
  Outlet: ModalOutlet,
} = createImperative();

export type ModalProps<Output = void> = ImperativeComponentProps<Output>;
