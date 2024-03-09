import { api } from "@yas/api-client";

import { useDebouncedValue } from "@yas/hooks";
import { Button, NumberField, Text, TextField } from "@yas/ui";
import { useState } from "react";

export default function TRPC() {
  const [input, setInput] = useState("");
  const [increaseAmount, setIncreaseAmount] = useState(1);
  const [shouldServerError, setShouldServerError] = useState(false);
  const debouncedInput = useDebouncedValue(input, 300);

  const { data: greeting } = api.example.hello.useQuery(debouncedInput);
  const increase = api.example.increaseCount.useMutation();
  const { data: count } = api.example.count.useQuery();
  api.example.error.useQuery(undefined, { enabled: shouldServerError });

  return (
    <>
      <Text>Customers</Text>
      <TextField
        label="send a greeting"
        value={input}
        onChange={setInput}
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
      <Button onClick={() => setShouldServerError(true)}>
        Trigger server side error
      </Button>
      <pre>
        {JSON.stringify({ responseData: { greeting, count } }, null, 2)}
      </pre>
    </>
  );
}
