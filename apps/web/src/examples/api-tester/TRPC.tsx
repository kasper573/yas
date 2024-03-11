import { api } from "@yas/trpc-client";

import { useDebouncedValue } from "@yas/hooks";
import { LoadingButton, NumberField, TextField } from "@yas/ui";
import { useState } from "react";

export default function TRPC() {
  const [name, setName] = useState("");
  const [shouldServerError, setShouldServerError] = useState(false);
  const debouncedName = useDebouncedValue(name, 300);
  const greeting = api.apiTester.greeting.useQuery(debouncedName);
  const increase = api.apiTester.increaseCount.useMutation();
  const count = api.apiTester.count.useQuery();
  api.apiTester.error.useQuery(undefined, { enabled: shouldServerError });

  return (
    <>
      <TextField
        label="Enter your name"
        value={name}
        onChange={setName}
        required
      />
      <TextField label="Greeting from server" value={greeting.data} readOnly />
      <NumberField label="Count from server" value={count.data} readOnly />
      <LoadingButton
        isLoading={increase.isPending}
        onClick={() => increase.mutate({ amount: 1 })}
      >
        Increase count
      </LoadingButton>
      <LoadingButton
        onClick={() => setShouldServerError(true)}
        disabled={shouldServerError}
      >
        Enable server side error
      </LoadingButton>
    </>
  );
}
