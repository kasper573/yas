# hookform-controller-proxy

Syntax sugar for [react-hook-form](https://react-hook-form.com/) to make it easier to use with controlled components.

[Try it on StackBlitz](https://stackblitz.com/edit/hookform-controller-proxy)

> Heads up: This package does not follow semantic versioning. Changes of all types are released to the patch portion of the version string.

```tsx
import { useForm } from "react-hook-form";
import type { FieldProps } from "hookform-controller-proxy";
import { createControllerProxy } from "hookform-controller-proxy";

interface MyFormData {
  foo: string;
  bar?: string;
  user: User;
}

interface User {
  name: string;
}

export function FormExampleApp() {
  const form = useForm<MyFormData>();
  const control = createControllerProxy(form.control);

  return (
    <form onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data)))}>
      {/* Required fields are denoted using their field name as-is */}
      {control.foo(TextField)}
      {/* 
          Optional fields are denoted using their field name followed by $
          Typescript will complain if you forget the $ for optional fields.
         */}
      {control.bar$(TextField)}
      {/* You can edit nested fields at any level using dot notation */}
      {control.user.name(TextField)}
      {/* Your field components can be for any type, in this case a User */}
      {control.user(UserField)}
      <button type="submit">Submit</button>
    </form>
  );
}

function TextField({
  name,
  value,
  onChange,
  required,
  error,
  ...rest
}: FieldProps<string>) {
  return (
    <label>
      {name}
      <input
        name={name}
        value={value ?? ""}
        onChange={(e) =>
          required
            ? onChange?.(e.target.value)
            : onChange?.(e.target.value || undefined)
        }
        required={required}
        {...rest}
      />
      {error}
    </label>
  );
}

function UserField({ name, value: user, onChange, error }: FieldProps<User>) {
  return (
    <label>
      {name}
      <textarea
        name={name}
        value={user?.name ?? ""}
        onChange={(e) => onChange?.({ name: e.target.value })}
      />
      {error}
    </label>
  );
}
```
