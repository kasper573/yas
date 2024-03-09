import {
  graphql,
  useGraphQLMutation,
  useGraphQLQuery,
} from "@yas/graphql-client";
import { useDebouncedValue } from "@yas/hooks";
import { Button, NumberField, Text, TextField } from "@yas/ui";
import { useState } from "react";

const query = graphql(`
  query GraphQLTester($input: String!) {
    greet(name: $input)
    count
  }
`);

const errorQuery = graphql(`
  query ErrorQuery {
    error
  }
`);

const increaseQuery = graphql(`
  mutation IncreaseCount($amount: Int!) {
    increaseCount(amount: $amount)
  }
`);

export default function GraphQL() {
  const [shouldServerError, setShouldServerError] = useState(false);
  const [input, setInput] = useState("");
  const [increaseAmount, setIncreaseAmount] = useState(1);
  const debouncedInput = useDebouncedValue(input, 300);
  const { data } = useGraphQLQuery({
    query,
    variables: { input: debouncedInput },
  });
  const increase = useGraphQLMutation(increaseQuery);
  useGraphQLQuery({ query: errorQuery, enabled: shouldServerError });

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
      <Button
        onClick={() => setShouldServerError(true)}
        disabled={shouldServerError}
      >
        Enable server side error
      </Button>
      <pre>{JSON.stringify({ responseData: data }, null, 2)}</pre>
    </>
  );
}
