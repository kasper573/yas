import {
  graphql,
  useGraphQLMutation,
  useGraphQLQuery,
} from "@yas/graphql-client";
import { useDebouncedValue } from "@yas/hooks";
import { Button, NumberField, Stack, TextField } from "@yas/ui";
import { useState } from "react";

const query = graphql(`
  query GraphQLTester($name: String!) {
    greeting(name: $name)
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
  const [name, setName] = useState("");
  const debouncedName = useDebouncedValue(name, 300);
  const { data } = useGraphQLQuery({
    query,
    variables: { name: debouncedName },
  });
  const increase = useGraphQLMutation(increaseQuery);
  useGraphQLQuery({ query: errorQuery, enabled: shouldServerError });

  return (
    <>
      <Stack direction="row" gap="#4">
        <TextField
          label="Enter your name"
          value={name}
          onChange={setName}
          required
        />
        <TextField
          label="Greeting from server"
          value={data?.greeting}
          readOnly
        />
        <NumberField label="Count from server" value={data?.count} readOnly />
      </Stack>

      <Stack direction="row" gap="#4" align="end">
        <Button onClick={() => increase.mutate({ amount: 1 })}>
          Increase count
        </Button>
        <Button
          onClick={() => setShouldServerError(true)}
          disabled={shouldServerError}
        >
          Enable server side error
        </Button>
      </Stack>
    </>
  );
}
