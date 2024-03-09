import { api } from "@yas/trpc-client";

import { useDebouncedValue } from "@yas/hooks";
import { Button, NumberField, TextField } from "@yas/ui";
import { useState } from "react";

export default function TRPC() {
  const [name, setName] = useState("");
  const [shouldServerError, setShouldServerError] = useState(false);
  const debouncedName = useDebouncedValue(name, 300);

  const { data: greeting } = api.apiTester.greeting.useQuery(debouncedName);
  const increase = api.apiTester.increaseCount.useMutation();
  const { data: count } = api.apiTester.count.useQuery();
  api.apiTester.error.useQuery(undefined, { enabled: shouldServerError });

  return (
    <>
      <TextField
        label="Enter your name"
        value={name}
        onChange={setName}
        required
      />
      <TextField label="Greeting from server" value={greeting} readOnly />
      <NumberField label="Count from server" value={count} readOnly />
      <Button onClick={() => increase.mutate({ amount: 1 })}>
        Increase count
      </Button>
      <Button
        onClick={() => setShouldServerError(true)}
        disabled={shouldServerError}
      >
        Enable server side error
      </Button>
    </>
  );
}
