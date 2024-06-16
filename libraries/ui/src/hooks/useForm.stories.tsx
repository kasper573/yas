import type { Meta, StoryObj } from "@yas/test/storybook";
import type { AnyZodObject } from "@yas/validate";
import { z } from "@yas/validate";
import { useRef, useState } from "react";
import type { FieldProps } from "../form/types";
import type { UseSchemaFormReturn } from "./useForm";
import {
  createControllerProxy,
  useFormChanges,
  useSchemaForm,
} from "./useForm";

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

  const form = useSchemaForm(schema, {
    defaultValues: {
      foo: "foo",
      user: { firstName: "first", lastName: "last" },
    },
    mode: "all",
  });

  const control = createControllerProxy(form);
  function doSomething(values: Data) {
    alert(JSON.stringify(values, null, 2));
  }

  return (
    <form
      onReset={() => form.reset()}
      onSubmit={form.handleSubmit(doSomething)}
    >
      {control.foo$((props) => (
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
  form: UseSchemaFormReturn<Schema>;
}) {
  const [data, setData] = useState(() => form.getValues());
  form.watch(() => setData(form.getValues()));
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

function UserForm({ value: user, onChange, error }: FieldProps<User>) {
  const form = useSchemaForm(userType, { defaultValues: user });
  const control = createControllerProxy(form);
  useFormChanges(form, onChange);
  return (
    <>
      {control.firstName$((props) => (
        <TextField {...props} />
      ))}
      {control.lastName$((props) => (
        <TextField {...props} />
      ))}
      {error}
    </>
  );
}

function TextField({
  value,
  onChange,
  error,
  size,
  ...rest
}: FieldProps<string>) {
  return (
    <div>
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        {...rest}
      />
      {error}
    </div>
  );
}
