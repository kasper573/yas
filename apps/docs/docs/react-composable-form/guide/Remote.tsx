import { z } from "@yas/validate";
import type { inferFormValue } from "react-composable-form";
import { QueryClient, QueryClientProvider, useMutation } from "react-query";
import { useMemo, useState } from "react";
import { TextField, SingleSelectField, BaseForm } from "@yas/ui";
import { err, unwrapUnsafe_useWithCaution } from "@yas/result";
import { ExampleContent } from "../../../src/components/ExampleContent";

interface CustomRemoteErrors {
  generalErrors?: string[];
  fieldErrors?: Array<[string, string[]]>;
}

const passwordType = z.string().min(1).brand("password");

type FormData = inferFormValue<typeof UserRegistrationForm>;
const UserRegistrationForm = BaseForm.extend((options) =>
  options
    .schema(
      z.object({
        email: z.string().email(),
        password: passwordType,
        passwordConfirm: passwordType,
      }),
    )
    .type(passwordType, TextField, {
      type: "password",
      inputProps: { autoComplete: "off" },
    })
    .customExternalErrors((error?: CustomRemoteErrors) => ({
      general: error?.generalErrors ?? [],
      field: Object.fromEntries(error?.fieldErrors ?? []),
    })),
);

function RemoteExampleImpl() {
  const [errorType, setErrorType] = useState<ErrorType>("No Error");

  const endpoint = useMemo(
    () => createSimulatedRemoteEndpoint(errorType),
    [errorType],
  );

  const { mutate, error, isLoading, reset } = useMutation<
    unknown,
    CustomRemoteErrors,
    FormData
  >(endpoint);

  return (
    <ExampleContent
      menu={
        <SingleSelectField
          sx={{ mb: "#4" }}
          name="Select error type to simulate"
          value={errorType}
          options={simulatedErrorTypes.map((x) => ({ label: x, value: x }))}
          onChange={(option) => option && setErrorType(option)}
        />
      }
    >
      {(props) => (
        <UserRegistrationForm
          {...props}
          onSubmit={mutate}
          errors={error}
          onChange={reset}
          title="Remote error handling"
          isLoading={isLoading}
        />
      )}
    </ExampleContent>
  );
}

export default function RemoteExample() {
  const queryClient = useMemo(() => new QueryClient(), []);
  return (
    <QueryClientProvider client={queryClient}>
      <RemoteExampleImpl />
    </QueryClientProvider>
  );
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type ErrorType = (typeof simulatedErrorTypes)[number];
const simulatedErrorTypes = [
  "Internal Server Error",
  "Email Already Taken",
  "No Error",
] as const;

function createSimulatedRemoteEndpoint(errorType?: ErrorType) {
  return async function simulatedRemoteEndpoint(value: FormData) {
    await wait(1000); // Emulate server side validation
    let errors: CustomRemoteErrors | undefined;
    switch (errorType) {
      case "Internal Server Error":
        errors = { generalErrors: ["Internal Server Error"] };
        break;
      case "Email Already Taken":
        errors = { fieldErrors: [["email", ["Your email is already taken"]]] };
        break;
    }
    if (errors) {
      unwrapUnsafe_useWithCaution(err(errors));
    }
  };
}
