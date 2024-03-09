import { graphql, useGraphQLQuery } from "@yas/graphql-client";
import { useDebouncedValue } from "@yas/hooks";
import { Text, TextField } from "@yas/ui";
import { useState } from "react";

const query = graphql(`
  query Customers($input: String!) {
    greet(name: $input)
  }
`);

export default function Customers() {
  const [input, setInput] = useState("");
  const debouncedInput = useDebouncedValue(input, 300);
  const { data } = useGraphQLQuery({
    query,
    variables: { input: debouncedInput },
  });
  return (
    <>
      <Text>Customers</Text>
      <TextField label="input" value={input} onChange={setInput} required />
      <pre>{JSON.stringify({ responseData: data }, null, 2)}</pre>
    </>
  );
}
