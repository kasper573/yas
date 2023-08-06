import { z } from "zod";
import type { FormValidationMode, inferFormValue } from "react-composable-form";
import { QueryClient, QueryClientProvider, useMutation } from "react-query";
import { useMemo, useState } from "react";
import { formValidationModes } from "react-composable-form";
import { BaseForm } from "../BaseForm";
import { TextField } from "../fields/TextField";
import { SingleSelectField } from "../fields/SelectField";

interface CustomRemoteErrors {
  generalErrors?: string[];
  fieldErrors?: Array<[string, string[]]>;
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
      general: error?.generalErrors ?? [],
      field: Object.fromEntries(error?.fieldErrors ?? []),
    })),
);

function RemoteExampleImpl() {
  const [errorType, setErrorType] = useState<ErrorType>("No Error");
  const [validateOn, setValidateOn] = useState<FormValidationMode>("submit");

  const endpoint = useMemo(
    () => createSimulatedRemoteEndpoint(errorType),
    [errorType],
  );

  const { mutate, error, isLoading } = useMutation<
    unknown,
    CustomRemoteErrors,
    FormData
  >(endpoint);

  const UserRegistrationFormWithCustomValidateOnOption = useMemo(
    () =>
      UserRegistrationForm.extend((options) => options.validateOn(validateOn)),
    [validateOn],
  );

  return (
    <>
      <SingleSelectField
        sx={{ mb: 4 }}
        name="Select error type to simulate"
        value={errorType}
        options={simulatedErrorTypes.map((x) => ({ label: x, value: x }))}
        onChange={(option) => option && setErrorType(option)}
      />
      <SingleSelectField
        sx={{ mb: 4 }}
        name="Validate on"
        value={validateOn}
        options={formValidationModes.map((x) => ({ label: x, value: x }))}
        onChange={(mode) => mode && setValidateOn(mode)}
      />
      <UserRegistrationFormWithCustomValidateOnOption
        onSubmit={mutate}
        errors={error}
        title="asdf"
        isLoading={isLoading}
      />
    </>
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

type ErrorType = (typeof simulatedErrorTypes)[number];
const simulatedErrorTypes = [
  "Internal Server Error",
  "Email Already Taken",
  "No Error",
] as const;

function createSimulatedRemoteEndpoint(errorType?: ErrorType) {
  return async function simulatedRemoteEndpoint(value: FormData) {
    await wait(1000); // Emulate server side validation
    const errors: CustomRemoteErrors = {};
    switch (errorType) {
      case "Internal Server Error":
        errors.generalErrors = ["Internal Server Error"];
        break;
      case "Email Already Taken":
        errors.fieldErrors = [["email", ["Your email is already taken"]]];
        break;
    }
    throw errors;
  };
}
