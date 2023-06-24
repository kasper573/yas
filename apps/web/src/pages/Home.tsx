import { Text } from "@yas/ui";
import * as React from "react";
import type { ReactNode } from "react";
import type { ModalProps } from "@yas/hooks";
import { useModal } from "@yas/hooks";
import { env } from "../env";
import { hello } from "../hello";
import { trpc } from "../trpc";

export function Home() {
  const { data: response } = trpc.example.hello.useQuery(hello());
  const alert = useModal(Alert, { message: "Default message" });
  return (
    <>
      <Text variant="h1">Yet Another Stack</Text>
      <Text paragraph>Mode: {env.mode}</Text>
      <Text paragraph>{response}</Text>
      <button onClick={() => alert()}>Default alert</button>
      <button onClick={() => alert({ message: "custom" })}>Custom alert</button>
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
