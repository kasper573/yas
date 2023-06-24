import { Text } from "@yas/ui";
import * as React from "react";
import type { ReactNode } from "react";
import { env } from "../env";
import { hello } from "../hello";
import { trpc } from "../trpc";
import type { ModalProps } from "../hooks/useModal";
import { useModal } from "../hooks/useModal";

export function Home() {
  const { data: response } = trpc.example.hello.useQuery(hello());
  const alert = useModal(Alert);
  return (
    <>
      <Text variant="h1">Yet Another Stack</Text>
      <Text paragraph>Mode: {env.mode}</Text>
      <Text paragraph>{response}</Text>
      <button onClick={() => alert({ message: "Foo" })}>Alert</button>
    </>
  );
}

function Alert({
  open,
  message,
  resolve,
}: ModalProps & { message: ReactNode }) {
  console.log({ open });
  return (
    <dialog open={open}>
      <p>{message}</p>
      <form method="dialog">
        <button onClick={() => resolve()}>OK</button>
      </form>
    </dialog>
  );
}
