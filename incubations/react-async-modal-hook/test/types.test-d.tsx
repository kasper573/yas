import { describe, it, expectTypeOf } from "@yas/test/vitest/react";
import type { ModalProps } from "../src/index";
import { useModal, useModals } from "../src/index";

// Notes on weird type checking in this module:
// - We use Extract to work around a limitation in vitest's expectTypeOf.
// - Extract returns never if it doesnt contain the type asked for, which makes it possible to test with toEqualTypeOf

describe("useModal", () => {
  it(`spawn function return type is inferred from modal component props`, async () => {
    function Modal(props: ModalProps<string>) {
      return null;
    }

    const spawn = useModal(Modal);
    const result = await spawn();
    expectTypeOf(result).toEqualTypeOf<string>();
  });

  it(`defaults does not accept internal props`, async () => {
    function Modal(props: ModalProps<string>) {
      return null;
    }

    type DefaultProps = Parameters<typeof useModal<typeof Modal>>[1];
    type T1 = keyof Extract<DefaultProps, Record<string, unknown>>;
    expectTypeOf<T1>().not.toMatchTypeOf<keyof ModalProps<unknown>>();
  });

  it(`spawn function does not accept internal props`, async () => {
    function Modal(props: ModalProps<string>) {
      return null;
    }

    const spawn = useModal(Modal);

    type SpawnProps = Parameters<typeof spawn>[0];
    type T1 = keyof Extract<SpawnProps, Record<string, unknown>>;
    expectTypeOf<T1>().not.toMatchTypeOf<keyof ModalProps<unknown>>();
  });

  it(`custom props, no defaults, spawn function requires an argument`, () => {
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

  it(`custom props, no defaults, spawn function requires the custom prop to be provided`, () => {
    type CustomProps = { custom: string };
    function Modal(props: ModalProps<string> & CustomProps) {
      return null;
    }

    const spawn = useModal(Modal);

    type SpawnProps = Parameters<typeof spawn>[0];

    type T1 = Extract<SpawnProps, CustomProps>;
    expectTypeOf<T1>().toMatchTypeOf<CustomProps>();
  });

  it(`custom props, with defaults, spawn function does not require an argument`, () => {
    function Modal(props: ModalProps<string> & { custom: string }) {
      return null;
    }

    const spawn = useModal(Modal, { custom: "value" });

    type SpawnProps = Parameters<typeof spawn>[0];

    type T1 = Extract<SpawnProps, undefined>;
    expectTypeOf<T1>().toEqualTypeOf<undefined>();
  });

  it(`custom props, with defaults, spawn function does not require the custom prop to be provided`, () => {
    function Modal(props: ModalProps<string> & { custom: string }) {
      return null;
    }

    const spawn = useModal(Modal, { custom: "value" });

    type SpawnProps = Parameters<typeof spawn>[0];

    type T1 = Extract<SpawnProps, { custom?: string }>;
    expectTypeOf<T1>().toMatchTypeOf<{ custom?: string }>();
  });

  it(`optional props, no defaults, spawn function does not require an argument`, () => {
    function Modal(props: ModalProps<string> & { custom?: string }) {
      return null;
    }

    const spawn = useModal(Modal);

    type SpawnProps = Parameters<typeof spawn>[0];

    type T1 = Extract<SpawnProps, undefined>;
    expectTypeOf<T1>().toEqualTypeOf<undefined>();
  });

  it(`optional props, no defaults, spawn function does not require the custom prop to be provided`, () => {
    function Modal(props: ModalProps<string> & { custom?: string }) {
      return null;
    }

    const spawn = useModal(Modal);

    type SpawnProps = Parameters<typeof spawn>[0];

    type T1 = Extract<SpawnProps, { custom?: string }>;
    expectTypeOf<T1>().toMatchTypeOf<{ custom?: string }>();
  });

  it(`optional props, with defaults, spawn function does not require an argument`, () => {
    function Modal(props: ModalProps<string> & { custom?: string }) {
      return null;
    }

    const spawn = useModal(Modal, { custom: "value" });

    type SpawnProps = Parameters<typeof spawn>[0];

    type T1 = Extract<SpawnProps, undefined>;
    expectTypeOf<T1>().toEqualTypeOf<undefined>();
  });

  it(`optional props, with defaults, spawn function does not require the custom prop to be provided`, () => {
    function Modal(props: ModalProps<string> & { custom?: string }) {
      return null;
    }

    const spawn = useModal(Modal, { custom: "value" });

    type SpawnProps = Parameters<typeof spawn>[0];

    type T1 = Extract<SpawnProps, { custom?: string }>;
    expectTypeOf<T1>().toMatchTypeOf<{ custom?: string }>();
  });
});

describe("useModals", () => {
  it(`spawn function return type is inferred from modal component props`, async () => {
    function Modal(props: ModalProps<string>) {
      return null;
    }

    const spawn = useModals();
    const result = await spawn(Modal);
    expectTypeOf(result).toEqualTypeOf<string>();
  });

  it(`spawn function does not accept internal props`, async () => {
    function Modal(props: ModalProps<string>) {
      return null;
    }

    const spawn = useModals();

    type SecondArgument = Parameters<typeof spawn<typeof Modal>>[1];
    type T1 = Extract<SecondArgument, Record<string, unknown>>;
    expectTypeOf<T1>().not.toMatchTypeOf<keyof ModalProps<unknown>>();
  });

  it(`custom props, spawn function requires an argument`, () => {
    function Modal(props: ModalProps<string> & { custom: string }) {
      return null;
    }

    const spawn = useModals();

    type SpawnProps = Parameters<typeof spawn<typeof Modal>>[1];

    type T1 = Extract<SpawnProps, undefined>;
    expectTypeOf<T1>().not.toEqualTypeOf<undefined>();

    type T2 = Exclude<Extract<SpawnProps, void>, undefined>;
    expectTypeOf<T2>().not.toEqualTypeOf<void>();
  });

  it(`custom props, spawn function requires the custom prop to be provided`, () => {
    type CustomProps = { custom: string };
    function Modal(props: ModalProps<string> & CustomProps) {
      return null;
    }

    const spawn = useModals();

    type SpawnProps = Parameters<typeof spawn<typeof Modal>>[1];

    type T1 = Extract<SpawnProps, CustomProps>;
    expectTypeOf<T1>().toMatchTypeOf<CustomProps>();
  });

  it(`optional props, spawn function does not require an argument`, () => {
    function Modal(props: ModalProps<string> & { custom?: string }) {
      return null;
    }

    const spawn = useModals();
    type SpawnProps = Parameters<typeof spawn<typeof Modal>>[1];

    type T1 = Extract<SpawnProps, undefined>;
    expectTypeOf<T1>().toEqualTypeOf<undefined>();
  });

  it(`optional props, spawn function does not require the custom prop to be provided`, () => {
    function Modal(props: ModalProps<string> & { custom?: string }) {
      return null;
    }

    const spawn = useModals();
    type SpawnProps = Parameters<typeof spawn<typeof Modal>>[1];

    type T1 = Extract<SpawnProps, { custom?: string }>;
    expectTypeOf<T1>().toMatchTypeOf<{ custom?: string }>();
  });
});
