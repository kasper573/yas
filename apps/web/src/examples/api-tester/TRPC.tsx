import { api } from "@yas/trpc-client";

import { useDebouncedValue } from "@yas/hooks";
import { Button, NumberField, Text, TextField } from "@yas/ui";
import { useState } from "react";

export default function TRPC() {
  const [name, setName] = useState("");
  const [increaseAmount, setIncreaseAmount] = useState(1);
  const [shouldServerError, setShouldServerError] = useState(false);
  const debouncedName = useDebouncedValue(name, 300);

  const { data: greeting } = api.example.greeting.useQuery(debouncedName);
  const increase = api.example.increaseCount.useMutation();
  const { data: count } = api.example.count.useQuery();
  api.example.error.useQuery(undefined, { enabled: shouldServerError });

  return (
    <>
      <Text>Customers</Text>
      <TextField
        label="Get a greeting from the server"
        inputProps={{ placeholder: "Type your name" }}
        value={name}
        onChange={setName}
        required
      />
      <NumberField
        label="increase amount"
        value={increaseAmount}
        onChange={setIncreaseAmount}
        required
      />
      <Button onClick={() => increase.mutate({ amount: increaseAmount })}>
        Increase count
      </Button>
      <Button
        onClick={() => setShouldServerError(true)}
        disabled={shouldServerError}
      >
        Enable server side error
      </Button>
      <pre>{JSON.stringify({ greeting, count }, null, 2)}</pre>
    </>
  );
}
