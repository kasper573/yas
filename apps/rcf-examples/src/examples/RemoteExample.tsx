import { z } from "zod";
import type { inferFormValue } from "react-composable-form";
import { QueryClient, QueryClientProvider, useMutation } from "react-query";
import { useMemo } from "react";
import { BaseForm } from "../BaseForm";
import { TextField } from "../fields/TextField";

interface CustomRemoteErrors {
  foo?: string[];
  bar?: Array<[string, string[]]>;
}

type FormData = inferFormValue<typeof UserRegistrationForm>;
const UserRegistrationForm = BaseForm.extend((options) =>
  options
    .schema(
      z.object({
        email: z.string().email(),
        password: z.string().min(1),
        passwordConfirm: z.string().min(1),
      }),
    )
    .field("password", TextField, { password: true })
    .field("passwordConfirm", TextField, { password: true })
    .customExternalErrors((error?: CustomRemoteErrors) => ({
      general: error?.foo ?? [],
      field: Object.fromEntries(error?.bar ?? []),
    })),
);

function RemoteExampleImpl() {
  const { mutate, error, isLoading } = useMutation<
    unknown,
    CustomRemoteErrors,
    FormData
  >(simulatedEndpoint);
  return (
    <UserRegistrationForm
      onSubmit={mutate}
      errors={error}
      title="asdf"
      isLoading={isLoading}
    />
  );
}

export function RemoteExample() {
  const queryClient = useMemo(() => new QueryClient(), []);
  return (
    <QueryClientProvider client={queryClient}>
      <RemoteExampleImpl />
    </QueryClientProvider>
  );
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function simulatedEndpoint(value: FormData) {
  await wait(1000); // Emulate server side validation
  const errors: CustomRemoteErrors = {};
  if (value.password !== value.passwordConfirm) {
    errors.bar = [["password", ["Server error: Passwords do not match"]]];
  }
  errors.foo = ["Server error: You are not allowed to register at this time"];
  throw errors;
}
