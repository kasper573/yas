import { z } from "zod";
import type { inferFormValue } from "react-composable-form";
import { useCallback, useState } from "react";
import { BaseForm } from "../BaseForm";

type User = inferFormValue<typeof UserRegistrationForm>;
const UserRegistrationForm = BaseForm.extend((options) =>
  options.schema(
    z.object({
      email: z.string().email(),
      password: z.string().min(6),
      passwordConfirm: z.string().min(6),
    }),
  ),
);

function useMutation() {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [generalErrors, setGeneralErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const submit = useCallback(
    async (value: User) => {
      setIsLoading(true);
      setFieldErrors({});
      setGeneralErrors([]);
      await wait(1000); // Emulate server side validation
      if (value.password !== value.passwordConfirm) {
        setFieldErrors({
          password: ["Passwords must match"],
          passwordConfirm: ["Passwords must match"],
        });
      } else {
        setFieldErrors({});
      }
      setGeneralErrors(["You are not allowed to register at this time"]);
      setIsLoading(false);
    },
    [setFieldErrors],
  );
  return { submit, fieldErrors, generalErrors, isLoading };
}

export function RemoteExample() {
  const { submit, fieldErrors, generalErrors, isLoading } = useMutation();
  return (
    <>
      <UserRegistrationForm
        onSubmit={submit}
        generalErrors={generalErrors}
        fieldErrors={fieldErrors}
        title="asdf"
        isLoading={isLoading}
      />
    </>
  );
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
