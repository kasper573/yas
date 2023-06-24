import { Stack, Text } from "@yas/ui";
import * as React from "react";
import type { ReactNode } from "react";
import type { ModalProps } from "@yas/hooks";
import { useModal, useModals } from "@yas/hooks";
import { env } from "../env";
import { hello } from "../hello";
import { trpc } from "../trpc";

export function Home() {
  const { data: response } = trpc.example.hello.useQuery(hello());
  const alert = useModal(Alert, { message: "Default message" });
  const modal = useModals();
  return (
    <>
      <Text variant="h1">Yet Another Stack</Text>
      <Text paragraph>Mode: {env.mode}</Text>
      <Text paragraph>{response}</Text>
      <Stack direction="column" css={{ maxWidth: 250 }}>
        <button onClick={() => alert()}>
          Predefined Alert with default message
        </button>
        <button onClick={() => alert({ message: "Custom" })}>
          Predefined Alert with custom message
        </button>
        <button onClick={() => modal(Alert)}>
          Inline Alert with default message
        </button>
        <button onClick={() => modal(Alert, { message: "Custom" })}>
          Inline Alert custom message
        </button>
      </Stack>
    </>
  );
}

function Alert({
  state,
  message,
  resolve,
}: ModalProps & { message: ReactNode }) {
  return (
    <dialog open={state.type === "pending"}>
      <p>{message}</p>
      <form method="dialog">
        <button onClick={() => resolve()}>OK</button>
      </form>
    </dialog>
  );
}
