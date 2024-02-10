import { useForm } from "react-hook-form";
import type { AnyZodObject } from "@yas/validate";
import { typeAtPath, z } from "@yas/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import type { FieldProps } from "../src";
import { createControllerProxyFactory } from "../src";

type Data = z.infer<typeof schema>;
const schema = z.object({
  name: z.string().refine((name) => name === "Correct", {
    message: "Name must be Correct",
  }),
});

const createControllerProxy = createControllerProxyFactory(
  (schema: AnyZodObject, path) => !typeAtPath(schema, path)?.isOptional(),
);

export function FormWithRequiredField() {
  const [submittedValues, setSubmittedValues] = useState<Data>();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const control = createControllerProxy(form, schema);

  return (
    <>
      <form onSubmit={form.handleSubmit(setSubmittedValues)}>
        {control.name((props) => (
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

function TextField({ value, onChange, error }: FieldProps<string>) {
  return (
    <>
      <label>
        Name
        <input value={value} onChange={(e) => onChange?.(e.target.value)} />
      </label>
      {error !== undefined ? <p>Error: {error}</p> : null}
    </>
  );
}
