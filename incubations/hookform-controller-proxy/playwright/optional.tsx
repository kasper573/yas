import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import type { FieldProps } from "../src";
import { createControllerProxy } from "../src";

type Data = z.infer<typeof schema>;
const schema = z.object({
  first: z.string().optional(),
  middle: z.string().nullable(),
  last: z.string().nullish(),
});

export function FormWithOptionalField() {
  const [submittedValues, setSubmittedValues] = useState<Data>();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      first: "Foo",
      middle: "Bar",
      last: "Baz",
    },
  });

  const control = createControllerProxy(form);

  return (
    <>
      <form onSubmit={form.handleSubmit(setSubmittedValues)}>
        {control.first$((props) => (
          <TextField {...props} />
        ))}
        {control.middle$((props) => (
          <TextField {...props} />
        ))}
        {control.last$((props) => (
          <TextField {...props} />
        ))}
        <button type="submit">Submit</button>
      </form>
      {submittedValues !== undefined ? (
        <pre data-testid="form-values">{JSON.stringify(submittedValues)}</pre>
      ) : null}
    </>
  );
}

function TextField({ name, value, onChange, error }: FieldProps<string>) {
  return (
    <>
      <label>
        {name}
        <input value={value} onChange={(e) => onChange?.(e.target.value)} />
      </label>
      {error !== undefined ? <p>Error: {error}</p> : null}
    </>
  );
}
