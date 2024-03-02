import { describe, it, expectTypeOf } from "@yas/test/vitest/react";
import type { ModalProps } from "../src/index";
import { useModal } from "../src/index";

// Notes on weird type checking in this module:
// - We use Extract to work around a limitation in vitest's expectTypeOf.
// - Extract returns never if it doesnt contain the type asked for, which makes it possible to test with toEqualTypeOf
// - Extracting void yields void | undefined, so we need to exclude undefined

it("spawn function return type is inferred from modal component props", () => {
  function Modal(props: ModalProps<string>) {
    return null;
  }

  function App() {
    const spawn = useModal(Modal);

    async function doThing() {
      const result = await spawn();
      expectTypeOf(result).toEqualTypeOf<string>();
    }
  }
});

describe("when modal component has custom required props", () => {
  describe("and the hook has no defaults", () => {
    it("spawn function requires an argument", () => {
      function Modal(props: ModalProps<string> & { custom: string }) {
        return null;
      }

      const spawn = useModal(Modal);

      type SpawnProps = Parameters<typeof spawn>[0];

      type T1 = Extract<SpawnProps, undefined>;
      expectTypeOf<T1>().not.toEqualTypeOf<undefined>();

      type T2 = Exclude<Extract<SpawnProps, void>, undefined>;
      expectTypeOf<T2>().not.toEqualTypeOf<void>();
    });

    it("spawn function requires the custom prop to be provided", () => {
      type CustomProps = { custom: string };
      function Modal(props: ModalProps<string> & CustomProps) {
        return null;
      }

      const spawn = useModal(Modal);

      type SpawnProps = Parameters<typeof spawn>[0];

      type T1 = Extract<SpawnProps, CustomProps>;
      expectTypeOf<T1>().toMatchTypeOf<CustomProps>();
    });
  });

  describe("and the hook has defaults", () => {
    it("spawn function does not require an argument", () => {
      function Modal(props: ModalProps<string> & { custom: string }) {
        return null;
      }

      const spawn = useModal(Modal, { custom: "value" });

      type SpawnProps = Parameters<typeof spawn>[0];

      type T1 = Extract<SpawnProps, undefined>;
      expectTypeOf<T1>().toEqualTypeOf<undefined>();

      type T2 = Exclude<Extract<SpawnProps, void>, undefined>;
      expectTypeOf<T2>().toEqualTypeOf<void>();
    });

    it("spawn function does not require the custom prop to be provided", () => {
      function Modal(props: ModalProps<string> & { custom: string }) {
        return null;
      }

      const spawn = useModal(Modal, { custom: "value" });

      type SpawnProps = Parameters<typeof spawn>[0];

      type T1 = Extract<SpawnProps, { custom?: string }>;
      expectTypeOf<T1>().toMatchTypeOf<{ custom?: string }>();
    });
  });
});

describe("when modal component has only custom optional props", () => {
  describe("and the hook has no defaults", () => {
    it("spawn function does not require an argument", () => {
      function Modal(props: ModalProps<string> & { custom?: string }) {
        return null;
      }

      const spawn = useModal(Modal);

      type SpawnProps = Parameters<typeof spawn>[0];

      type T1 = Extract<SpawnProps, undefined>;
      expectTypeOf<T1>().toEqualTypeOf<undefined>();

      type T2 = Exclude<Extract<SpawnProps, void>, undefined>;
      expectTypeOf<T2>().toEqualTypeOf<void>();
    });

    it("spawn function does not require the custom prop to be provided", () => {
      function Modal(props: ModalProps<string> & { custom?: string }) {
        return null;
      }

      const spawn = useModal(Modal);

      type SpawnProps = Parameters<typeof spawn>[0];

      type T1 = Extract<SpawnProps, { custom?: string }>;
      expectTypeOf<T1>().toMatchTypeOf<{ custom?: string }>();
    });
  });

  describe("and the hook has defaults", () => {
    it("spawn function does not require an argument", () => {
      function Modal(props: ModalProps<string> & { custom?: string }) {
        return null;
      }

      const spawn = useModal(Modal, { custom: "value" });

      type SpawnProps = Parameters<typeof spawn>[0];

      type T1 = Extract<SpawnProps, undefined>;
      expectTypeOf<T1>().toEqualTypeOf<undefined>();

      type T2 = Exclude<Extract<SpawnProps, void>, undefined>;
      expectTypeOf<T2>().toEqualTypeOf<void>();
    });

    it("spawn function does not require the custom prop to be provided", () => {
      function Modal(props: ModalProps<string> & { custom?: string }) {
        return null;
      }

      const spawn = useModal(Modal, { custom: "value" });

      type SpawnProps = Parameters<typeof spawn>[0];

      type T1 = Extract<SpawnProps, { custom?: string }>;
      expectTypeOf<T1>().toMatchTypeOf<{ custom?: string }>();
    });
  });
});
