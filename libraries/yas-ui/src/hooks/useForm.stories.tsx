import type { Meta, StoryObj } from "@storybook/react";
import type { AnyZodObject } from "@yas/validate";
import { z } from "@yas/validate";
import { useRef, useState } from "react";
import type { UseFormReturn } from "./useForm";
import { useForm, useFieldControllers } from "./useForm";

export default {
  component: UseFormControllersExample,
  tags: ["autodocs"],
} satisfies Meta;

export const Default: StoryObj = {};

type User = z.infer<typeof userType>;
const userType = z.object({
  firstName: z.string().min(3).optional(),
  lastName: z.string().min(3).optional(),
});

type Data = z.infer<typeof schema>;
const schema = z.object({
  foo: z.string().min(3).max(7).optional(),
  user: userType,
});

function UseFormControllersExample() {
  const renderCountRef = useRef(0);
  renderCountRef.current++;

  const form = useForm(schema, {
    defaultValues: {
      foo: "fo",
      user: { firstName: "first", lastName: "last" },
    },
    mode: "all",
  });

  const control = useFieldControllers(form);
  function doSomething(values: Data) {
    alert(JSON.stringify(values, null, 2));
  }

  return (
    <form
      onReset={() => form.reset()}
      onSubmit={form.handleSubmit(doSomething)}
    >
      {control.foo((props) => (
        <TextField {...props} />
      ))}

      {control.user((props) => (
        <UserForm {...props} />
      ))}

      <FormDataPreview form={form} />

      <p>Render count: {renderCountRef.current}</p>

      <button type="submit">Submit</button>
    </form>
  );
}

function FormDataPreview<Schema extends AnyZodObject>({
  form,
}: {
  form: UseFormReturn<Schema>;
}) {
  const [data, setData] = useState(() => form.getValues());
  form.watch(() => setData(form.getValues()));
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

function UserForm({ value: user, onChange }: FieldProps<User>) {
  const form = useForm(userType, { defaultValues: user });
  const control = useFieldControllers(form);
  return (
    <>
      {control.firstName((props) => (
        <TextField {...props} />
      ))}
      {control.lastName((props) => (
        <TextField {...props} />
      ))}
    </>
  );
}

function TextField({
  value,
  onChange,
  error,
  required,
  ...rest
}: FieldProps<string | undefined>) {
  return (
    <div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...rest}
      />
      {error}
    </div>
  );
}

interface FieldProps<Value> {
  value: Value;
  onChange: (value: Value) => void;
  error?: string;
  required?: boolean;
}
