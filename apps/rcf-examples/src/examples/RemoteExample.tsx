import { z } from "zod";
import type { inferFormValue } from "react-composable-form";
import { QueryClient, QueryClientProvider, useMutation } from "react-query";
import { useMemo } from "react";
import { BaseForm } from "../BaseForm";

interface CustomRemoteErrors {
  general?: string[];
  field?: Array<[string, string[]]>;
}

type FormData = inferFormValue<typeof UserRegistrationForm>;
const UserRegistrationForm = BaseForm.extend((options) =>
  options
    .externalErrorsNormalizer(
      ({ general, field = [] }: CustomRemoteErrors) => ({
        general,
        field: Object.fromEntries(field),
      }),
    )
    .schema(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
        passwordConfirm: z.string().min(6),
      }),
    ),
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
    errors.field = [["password", ["Passwords do not match"]]];
  }
  errors.general = ["You are not allowed to register at this time"];
  throw errors;
}
